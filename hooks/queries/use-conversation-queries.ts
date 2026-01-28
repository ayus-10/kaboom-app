import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { ConversationReadWithLatestMessage } from '@/types/conversation'
import { useQuery } from '@tanstack/react-query'

export const useConversations = () => {
  return useQuery<ConversationReadWithLatestMessage[], Error>({
    queryKey: ['conversations'],
    queryFn: async () => {
      try {
        const response = await api.get<ConversationReadWithLatestMessage[]>('/conversation')
        return response.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
