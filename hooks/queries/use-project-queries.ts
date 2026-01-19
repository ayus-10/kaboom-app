import { api } from '@/lib/api'
import { handleApiError } from '@/lib/api-error'
import { Project } from '@/types/project'
import { useQuery } from '@tanstack/react-query'

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const res = await api.get<Project[]>('/project')
        return res.data
      } catch (err) {
        handleApiError(err)
      }
    },
  })
}

export function useProject(projectId: string) {
  return useQuery<Project>({
    queryKey: ['project', projectId],
    enabled: !!projectId,
    queryFn: async () => {
      try {
        const res = await api.get<Project>(`/project/${projectId}`)
        return res.data
      } catch (err) {
        handleApiError(err)
      }
    },
  })
}
