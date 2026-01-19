'use client'

import { useCreateWidget } from '@/hooks/mutations/use-widget-mutations'
import { OnboardingStage, useOnboardingStageStore } from '@/hooks/use-onboarding-stage-store'
import { useOnboardingStore } from '@/hooks/use-onboarding-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const WidgetForm: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [siteUrl, setSiteUrl] = useState('')

  const onboardingProjectId = useOnboardingStore(state => state.projectId)
  const setOnboardingWidgetSlug = useOnboardingStore(state => state.setWidgetSlug)

  const createWidget = useCreateWidget(onboardingProjectId ?? '')

  const setOnboardingStage = useOnboardingStageStore(state => state.setStage)

  const router = useRouter()

  const onSubmit = async () => {
    try {
      const widget = await createWidget.mutateAsync({
        title: name,
        description,
        site_url: siteUrl,
      })

      setOnboardingStage(OnboardingStage.EMBED)

      setOnboardingWidgetSlug(widget.slug)

      router.push('/dashboard/onboarding/embed')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-800" htmlFor="name">
          Widget name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Homepage Widget"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800" htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="A chat widget to place in my homepage"
          className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800" htmlFor="name">
          Site URL
        </label>

        <input
          id="siteUrl"
          type="text"
          value={siteUrl}
          onChange={e => setSiteUrl(e.target.value)}
          placeholder="example.com"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {createWidget.isPending ? 'Saving...' : 'Continue'}
      </button>
    </form>
  )
}
