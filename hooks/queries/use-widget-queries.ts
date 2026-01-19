import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { Widget } from '@/types/widget'
import { useQuery } from '@tanstack/react-query'

export function useWidgets(projectId: string) {
  return useQuery<Widget[]>({
    queryKey: ['widgets', projectId],
    enabled: !!projectId,
    queryFn: async () => {
      try {
        const res = await api.get<Widget[]>(`/project/${projectId}/widget`)
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}

export function useWidget(projectId: string, widgetId: string) {
  return useQuery<Widget>({
    queryKey: ['widget', projectId, widgetId],
    enabled: !!widgetId,
    queryFn: async () => {
      try {
        const res = await api.get<Widget>(`/project/${projectId}/widget/${widgetId}`)
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
