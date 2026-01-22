'use client'

import { useCreateProject } from '@/hooks/mutations/use-project-mutations'
import { OnboardingStage, useOnboardingStageStore } from '@/hooks/use-onboarding-stage-store'
import { useOnboardingStore } from '@/hooks/use-onboarding-store'
import { projectFormSchema } from '@/schema/project-form-schema'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ZodError } from 'zod'

export const ProjectForm: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const createProject = useCreateProject()

  const setOnboardingStage = useOnboardingStageStore(state => state.setStage)
  const setOnboardingProjectId = useOnboardingStore(state => state.setProjectId)

  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const projectFormData = {
        title: name,
        description,
      }

      projectFormSchema.parse(projectFormData)

      const project = await createProject.mutateAsync(projectFormData)

      setOnboardingStage(OnboardingStage.WIDGET)

      setOnboardingProjectId(project.id)

      router.push('/admin/onboarding/widget')
    } catch (err) {
      if (err instanceof ZodError) {
        alert(err.issues[0].message)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-800" htmlFor="name">
          Project name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Customer support chat"
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
          placeholder="A chat widget to talk with website visitors in real time"
          className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {createProject.isPending ? 'Saving...' : 'Continue'}
      </button>
    </form>
  )
}
