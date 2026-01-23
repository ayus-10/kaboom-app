'use client'

import { useOnboardingStore } from '@/hooks/use-onboarding-store'
import { APP_URL } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export const EmbedPageBody: React.FC = () => {
  const widgetId = useOnboardingStore(state => state.widgetId)
  const router = useRouter()

  const embedUrl = `${APP_URL}/chat/${widgetId}`

  const goToDashboard = () => {
    router.push('/admin')
  }

  useEffect(() => {
    if (!widgetId) router.push('/admin')
  }, [widgetId, router])

  if (!widgetId) return null

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Embed your Widget</h1>

      <p className="text-gray-700">
        Your widget is ready. You can embed it using the following URL:
      </p>

      <div className="rounded-lg bg-gray-100 p-4 font-mono text-indigo-600 break-all">
        {embedUrl}
      </div>

      <button
        onClick={goToDashboard}
        className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-white text-sm font-medium transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        Go to Dashboard
      </button>
    </div>
  )
}
