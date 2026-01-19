import { api } from '@/lib/api'
import { handleApiError, toApiError } from '@/lib/api-error'
import { Widget } from '@/types/widget'
import { useMutation } from '@tanstack/react-query'

interface CreateWidgetInput {
  title: string
  description?: string
  site_url: string
}

export function useCreateWidget(projectId: string | null) {
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
    onError: err => {
      handleApiError(err)
    },
  })
}
