import { connectAdminPendingConversationSocket } from '@/lib/admin-pending-conversation-socket'
import { AdminPendingConversationEventType } from '@/types/admin-pc-ws-events'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useAdminPendingConversationSocket = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = connectAdminPendingConversationSocket(event => {
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
      if (socket.readyState !== WebSocket.CONNECTING) {
        socket.close()
      }
    }
  }, [queryClient])
}
