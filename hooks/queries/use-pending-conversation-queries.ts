import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { PendingConversationWithMessages } from '@/types/conversation'
import { useQuery } from '@tanstack/react-query'

export const usePendingConversations = () => {
  return useQuery<PendingConversationWithMessages[]>({
    queryKey: ['pending-conversations'],
    queryFn: async () => {
      try {
        const res = await api.get<PendingConversationWithMessages[]>('/pending-conversation')
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
