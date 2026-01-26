import { api } from '@/lib/api'
import { handleApiError, toApiError } from '@/lib/api-error'
import { Widget } from '@/types/widget'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateWidgetInput {
  title: string
  description?: string
  site_url: string
}

export const useCreateWidget = (projectId: string | null) => {
  const queryClient = useQueryClient()

  return useMutation<Widget, Error, CreateWidgetInput>({
    mutationFn: async data => {
      try {
        if (!projectId) throw new Error('No project ID provided')

        const res = await api.post<Widget>(`/project/${projectId}/widget`, {
          ...data,
          project_id: projectId,
        })

        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: () => {
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ['widgets', projectId] })
      }
    },
    onError: err => {
      handleApiError(err)
    },
  })
}

export const useUpdateWidget = (projectId: string, widgetId: string) => {
  const queryClient = useQueryClient()

  return useMutation<Widget, Error, Partial<Pick<Widget, 'title' | 'description' | 'site_url'>>>({
    mutationFn: async data => {
      try {
        const res = await api.patch<Widget>(`/project/${projectId}/widget/${widgetId}`, data)
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['widgets', projectId] })
      queryClient.invalidateQueries({ queryKey: ['widget', projectId, widgetId] })
    },
    onError: err => {
      handleApiError(err)
    },
  })
}

export const useDeleteWidget = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { projectId: string; widgetId: string }>({
    mutationFn: async ({ projectId, widgetId }) => {
      try {
        await api.delete(`/project/${projectId}/widget/${widgetId}`)
      } catch (err) {
        throw toApiError(err)
      }
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['widgets', projectId] })
    },
    onError: err => {
      handleApiError(err)
    },
  })
}
