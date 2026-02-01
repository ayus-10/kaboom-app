import { connectConversationSocket } from '@/lib/conversation-socket'
import { ConversationEventType } from '@/types/conversation-ws-events'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export const useAdminConversationByIdSocket = (conversationId?: string) => {
  const socketRef = useRef<WebSocket | null>(null)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!conversationId) return

    const socket = connectConversationSocket(conversationId, false, event => {
      if (event.type === ConversationEventType.MESSAGE_CREATED) {
      } else if (event.type === ConversationEventType.STATUS) {
      } else if (event.type === ConversationEventType.TYPING) {
      }
    })

    socketRef.current = socket

    return () => {
      if (socket.readyState !== WebSocket.CONNECTING) {
        socket.close()
      }
      socketRef.current = null
    }
  }, [queryClient, conversationId])
}
