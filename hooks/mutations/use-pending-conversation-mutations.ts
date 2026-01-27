import { api } from '@/lib/api'
import { handleApiError, toApiError } from '@/lib/api-error'
import { Conversation } from '@/types/conversation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useApprovePendingConversation = () => {
  const queryClient = useQueryClient()

  return useMutation<Conversation, Error, string>({
    mutationFn: async data => {
      try {
        const res = await api.post<Conversation>('/conversation', { pending_conversation_id: data })
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-conversations'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
    onError: err => {
      handleApiError(err)
    },
  })
}

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
