'use client'

import { useAuthCheck } from '@/hooks/use-auth-check'
import { API_BASE_URL } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useAuthCheck()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`${API_BASE_URL}/auth/google`)
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-gray-500">
        Checking session…
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
