import { api } from '@/lib/api'
import { handleApiError, toApiError } from '@/lib/api-error'
import { Conversation } from '@/types/conversation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCloseConversation = () => {
  const queryClient = useQueryClient()

  return useMutation<Conversation, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      try {
        const response = await api.patch<Conversation>(`/conversation/${id}/close`)
        return response.data
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      toast.success('Conversation closed successfully')
    },
    onError: err => {
      handleApiError(err)
    },
  })
}

export const useReplyToPendingConversation = () => {
  const queryClient = useQueryClient()

  return useMutation<Conversation, Error, { id: string; message: string }>({
    mutationFn: async ({ id, message }) => {
      try {
        const conversationRes = await api.post<Conversation>('/conversation', {
          pending_conversation_id: id,
        })
        const conversation = conversationRes.data

        await api.post(`/conversation/${conversation.id}/message`, {
          content: message,
        })

        return conversation
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-conversations'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })

      toast.success('Conversation accepted with visitor')
    },
    onError: err => {
      handleApiError(err)
    },
  })
}
