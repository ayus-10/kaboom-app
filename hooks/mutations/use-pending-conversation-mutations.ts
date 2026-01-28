import { api } from '@/lib/api'
import { handleApiError, toApiError } from '@/lib/api-error'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRejectPendingConversation = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: async id => {
      try {
        await api.post(`/pending-conversation/${id}/close`)
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-conversations'] })
    },
    onError: err => {
      handleApiError(err)
    },
  })
}
