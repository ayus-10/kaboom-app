'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OAuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.replace('#', ''))
    const accessToken = params.get('access_token')

    if (!accessToken) {
      router.replace('/')
      return
    }

    localStorage.setItem('access_token', accessToken)

    window.history.replaceState(null, '', '/oauth/callback')

    router.replace('/dashboard')
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Signing you in…</p>
    </div>
  )
}
