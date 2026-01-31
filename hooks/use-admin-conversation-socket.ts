import { connectAdminConversationSocket } from '@/lib/admin-conversation-socket'
import { AdminConversationEventType } from '@/types/admin-conv-ws-events'
import { Conversation, ConversationWithLatestMessage } from '@/types/conversation'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useAdminConversationSocket = (isReady: boolean) => {
  const socketRef = useRef<WebSocket | null>(null)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isReady) return

    const socket = connectAdminConversationSocket(event => {
      if (event.type === AdminConversationEventType.CONVERSATION_CREATED) {
        const newConv: Conversation = {
          id: event.payload.conversation_id,
          visitor: {
            id: event.payload.conversation_visitor_id,
            display_id: event.payload.conversation_visitor_display_id,
          },
          created_at: new Date().toISOString(),
        }

        queryClient.setQueryData<ConversationWithLatestMessage[]>(['conversations'], old => {
          if (!old) return [newConv]
          if (old.some(pc => pc.id === newConv.id)) return old

          toast.info(`New conversation started with VISITOR-${newConv.visitor.display_id}`)

          return [...old, newConv]
        })
      } else if (event.type === AdminConversationEventType.CONVERSATION_CLOSED) {
        const closedConv = event.payload

        queryClient.setQueryData<ConversationWithLatestMessage[]>(['conversations'], old => {
          if (!old) return old

          if (!old.some(pc => pc.id === closedConv.conversation_id)) {
            return old
          }

          return old.filter(pc => pc.id !== closedConv.conversation_id)
        })
      }
    })

    socketRef.current = socket

    return () => {
      if (socket.readyState !== WebSocket.CONNECTING) {
        socket.close()
      }
      socketRef.current = null
    }
  }, [queryClient, isReady])
}
