import { connectAdminPendingConversationSocket } from '@/lib/admin-pending-conversation-socket'
import { AdminPendingConversationEventType } from '@/types/ws-events'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export const useAdminPendingConversationSocket = () => {
  const socketRef = useRef<WebSocket | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    socketRef.current = connectAdminPendingConversationSocket(event => {
      switch (event.type) {
        case AdminPendingConversationEventType.PENDING_CONVERSATION_CREATED:
          queryClient.invalidateQueries({ queryKey: ['pending-conversations'] })
          queryClient.invalidateQueries({ queryKey: ['conversations'] })
          break

        case AdminPendingConversationEventType.PENDING_CONVERSATION_CLOSED:
          queryClient.invalidateQueries({ queryKey: ['pending-conversations'] })
          break
      }
    })

    return () => {
      socketRef.current?.close()
    }
  }, [queryClient])
}
