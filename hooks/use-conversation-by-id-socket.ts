import { connectConversationSocket } from '@/lib/conversation-socket'
import {
  ConversationClientEvent,
  ConversationClientEventType,
  ConversationEventType,
} from '@/types/conversation-ws-events'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export const useConversationByIdSocket = ({
  isVisitor,
  conversationId,
}: {
  isVisitor: boolean
  conversationId?: string | null
}) => {
  const socketRef = useRef<WebSocket | null>(null)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!conversationId) return

    const socket = connectConversationSocket(
      conversationId,
      event => {
        if (event.type === ConversationEventType.MESSAGE_CREATED) {
        } else if (event.type === ConversationEventType.STATUS) {
        } else if (event.type === ConversationEventType.TYPING) {
        }
      },
      isVisitor
    )

    socketRef.current = socket

    return () => {
      if (socket.readyState !== WebSocket.CONNECTING) {
        socket.close()
      }
      socketRef.current = null
    }
  }, [queryClient, conversationId])

  const send = (event: ConversationClientEvent) => {
    const socket = socketRef.current
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(event))
  }

  return {
    sendMessage: (message: string) =>
      send({
        type: ConversationClientEventType.SEND_MESSAGE,
        message,
      }),
    sendTypingStatus: (status: boolean) =>
      send({ type: ConversationClientEventType.TYPING, is_typing: status }),
  }
}
