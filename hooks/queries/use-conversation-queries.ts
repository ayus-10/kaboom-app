import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { ConversationWithLatestMessage } from '@/types/conversation'
import { useQuery } from '@tanstack/react-query'

export const useConversations = () => {
  return useQuery<ConversationWithLatestMessage[], Error>({
    queryKey: ['conversations'],
    queryFn: async () => {
      try {
        const response = await api.get<ConversationWithLatestMessage[]>('/conversation')
        return response.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
