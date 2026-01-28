'use client'

import { widgetFormSchema } from '@/schema/widget-form-schema'
import { Widget } from '@/types/widget'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const WidgetForm: React.FC<{
  projectId: string
  widget?: Widget
  onCancel: () => void
  onSubmit: (data: { title: string; description?: string; site_url: string }) => Promise<void>
  isLoading: boolean
}> = ({ widget, onCancel, onSubmit, isLoading }) => {
  const [title, setTitle] = useState(widget?.title || '')
  const [description, setDescription] = useState(widget?.description || '')
  const [siteUrl, setSiteUrl] = useState(widget?.site_url || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formData = {
        title,
        description: description || undefined,
        site_url: siteUrl,
      }

      widgetFormSchema.parse(formData)
      await onSubmit(formData)
    } catch (err) {
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Widget title"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700">Site URL</label>
          <input
            type="url"
            value={siteUrl}
            onChange={e => setSiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Widget description (optional)"
            rows={2}
            className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <X size={16} />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {widget ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  )
}
