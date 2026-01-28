'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const DashboardPageBody: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/dashboard/project')
  }, [router])

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>Please wait...</p>
    </div>
  )
}
