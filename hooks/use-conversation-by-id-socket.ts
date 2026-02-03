import { connectConversationSocket } from '@/lib/conversation-socket'
import {
  ConversationClientEvent,
  ConversationClientEventType,
  ConversationEventType,
} from '@/types/conversation-ws-events'
import { Message } from '@/types/message'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useConversationStore } from './stores/use-conversation-store'
import { useActiveMessagesStore } from './stores/use-messages-store'

type ConversationByIdSocketParams =
  | {
      conversationId?: string | null
      isVisitor: false
    }
  | {
      conversationId?: string | null
      isVisitor: true
      visitorActorId: string | null
    }

export const useConversationByIdSocket = (params: ConversationByIdSocketParams) => {
  const { conversationId, isVisitor } = params

  const socketRef = useRef<WebSocket | null>(null)

  const queryClient = useQueryClient()

  const addActiveClient = useConversationStore(state => state.addActiveClient)
  const removeActiveClient = useConversationStore(state => state.removeActiveClient)
  const addActiveMessage = useActiveMessagesStore(state => state.addActiveMessage)

  useEffect(() => {
    if (!conversationId) return

    const socket = connectConversationSocket(
      conversationId,
      event => {
        if (event.type === ConversationEventType.MESSAGE_CREATED) {
          const newMsg: Message = {
            id: event.payload.message_id,
            content: event.payload.message_content,
            sender_actor_id: event.payload.message_sender_actor_id,
            created_at: new Date().toISOString(),
            conversation_id: conversationId,
          }
          if (isVisitor) {
            if (newMsg.sender_actor_id !== params.visitorActorId) {
              addActiveMessage(newMsg)
            }
          } else {
            queryClient.setQueryData<Message[]>(['messages', conversationId], prev => {
              if (!prev) return prev
              return [...prev, newMsg]
            })
          }
        } else if (event.type === ConversationEventType.STATUS) {
          const { client_id: clientId, status: activeStatus } = event.payload
          if (activeStatus === 'online') {
            addActiveClient(clientId)
          } else if (activeStatus === 'offline') {
            removeActiveClient(clientId)
          }
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
