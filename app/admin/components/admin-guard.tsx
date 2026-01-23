'use client'

import { useUser } from '@/hooks/queries/use-user'
import { API_BASE_URL } from '@/lib/constants'
import { useEffect } from 'react'

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isSuccess: isAuthenticated } = useUser()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = `${API_BASE_URL}/auth/google`
    }
  }, [isLoading, isAuthenticated])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Checking session…</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
