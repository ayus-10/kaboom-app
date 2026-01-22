import { api } from '@/lib/api'
import { toApiError } from '@/lib/api-error'
import { User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const res = await api.get<User>(`/user/me`)
        return res.data
      } catch (err) {
        throw toApiError(err)
      }
    },
  })
}
