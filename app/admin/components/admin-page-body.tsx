'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AdminPageBody: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/dashboard')
  }, [router])

  return <div className="flex h-screen items-center justify-center">Please wait…</div>
}
