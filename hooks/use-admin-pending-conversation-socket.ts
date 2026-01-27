import { connectAdminPendingConversationSocket } from '@/lib/admin-pending-conversation-socket'
import { AdminPendingConversationEventType } from '@/types/admin-pc-ws-events'
import { PendingConversationWithMessages } from '@/types/conversation'
import { PendingMessage } from '@/types/message'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const useAdminPendingConversationSocket = (isReady: boolean) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isReady) return

    const socket = connectAdminPendingConversationSocket(event => {
      if (event.type === AdminPendingConversationEventType.PENDING_CONVERSATION_CREATED) {
        const newPendingConv: PendingConversationWithMessages = {
          id: event.payload.pending_conversation_id,
          visitor_id: event.payload.visitor_id,
          created_at: new Date().toISOString(),
          pending_messages: [],
        }

        queryClient.setQueryData<PendingConversationWithMessages[]>(
          ['pending-conversations'],
          old => {
            if (!old) return [newPendingConv]
            if (old.some(pc => pc.id === newPendingConv.id)) return old

            toast.info('New visitor request for chat')

            return [...old, newPendingConv]
          }
        )
      } else if (event.type === AdminPendingConversationEventType.PENDING_CONVERSATION_CLOSED) {
        const closedPendingConv = event.payload

        queryClient.setQueryData<PendingConversationWithMessages[]>(
          ['pending-conversations'],
          old => {
            if (!old) return old

            if (!old.some(pc => pc.id === closedPendingConv.pending_conversation_id)) {
              return old
            }

            return old.filter(pc => pc.id !== closedPendingConv.pending_conversation_id)
          }
        )
      } else if (event.type === AdminPendingConversationEventType.PENDING_MESSAGE_CREATED) {
        const newPendingMessage: PendingMessage = {
          id: event.payload.pending_message_id,
          content: event.payload.pending_message_content,
          created_at: new Date().toISOString(),
        }

        queryClient.setQueryData<PendingConversationWithMessages[]>(
          ['pending-conversations'],
          old => {
            if (!old) return old

            return old.map(conv => {
              if (conv.id === event.payload.pending_conversation_id) {
                return {
                  ...conv,
                  pending_messages: [newPendingMessage, ...conv.pending_messages],
                }
              }
              return conv
            })
          }
        )
      }
    })

    return () => {
      if (socket.readyState !== WebSocket.CONNECTING) {
        socket.close()
      }
    }
  }, [queryClient, isReady])
}
