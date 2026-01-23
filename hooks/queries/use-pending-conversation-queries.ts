import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { PendingConversation } from '@/types/conversation'
import { useQuery } from '@tanstack/react-query'

export const usePendingConversations = () => {
  return useQuery<PendingConversation[]>({
    queryKey: ['pending-conversations'],
    queryFn: async () => {
      try {
        const res = await api.get<PendingConversation[]>('/pending-conversation')
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}

export const usePendingConversation = (id: string) => {
  return useQuery<PendingConversation>({
    queryKey: ['pending-conversation', id],
    enabled: !!id,
    queryFn: async () => {
      try {
        const res = await api.get<PendingConversation>(`/pending-conversation/${id}`)
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
