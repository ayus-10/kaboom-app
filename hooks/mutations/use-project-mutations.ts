import { api } from '@/lib/api'
import { handleApiError, toApiError } from '@/lib/api-error'
import { Project } from '@/types/project'
import { useMutation } from '@tanstack/react-query'

interface CreateProjectInput {
  title: string
  description?: string
}

export const useCreateProject = () => {
  return useMutation<Project, Error, CreateProjectInput>({
    mutationFn: async data => {
      try {
        const res = await api.post<Project>('/project', data)
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

export const useUpdateProject = (projectId: string) => {
  return useMutation<Project, Error, Partial<Pick<Project, 'title' | 'description'>>>({
    mutationFn: async data => {
      try {
        const res = await api.patch<Project>(`/project/${projectId}`, data)
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

export const useDeleteProject = () => {
  return useMutation<void, Error, string>({
    mutationFn: async projectId => {
      try {
        await api.delete(`/project/${projectId}`)
      } catch (err) {
        throw toApiError(err)
      }
    },
    onError: err => {
      handleApiError(err)
    },
  })
}
