'use client'

import { FormEvent, useState } from 'react'

export const ProjectForm: React.FC = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        {saving ? 'Saving...' : 'Continue'}
      </button>
    </form>
  )
}
