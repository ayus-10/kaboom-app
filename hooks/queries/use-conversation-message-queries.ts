import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { Message } from '@/types/message'
import { useQuery } from '@tanstack/react-query'

export const useConversationMessages = (conversationId?: string) => {
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    enabled: !!conversationId,
    queryFn: async () => {
      try {
        const res = await api.get<Message[]>(`/conversation/${conversationId}/message`)
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
