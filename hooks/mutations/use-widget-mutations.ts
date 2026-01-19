import { api } from '@/lib/api'
import { handleApiError } from '@/lib/api-error'
import { Widget } from '@/types/widget'
import { useMutation } from '@tanstack/react-query'

interface CreateWidgetInput {
  title: string
  description?: string
  site_url: string
}

export function useCreateWidget(projectId: string) {
  return useMutation<Widget, Error, CreateWidgetInput>({
    mutationFn: async data => {
      try {
        const res = await api.post<Widget>('/widget', {
          ...data,
          project_id: projectId,
        })

        return res.data
      } catch (err) {
        handleApiError(err)
      }
    },
  })
}
