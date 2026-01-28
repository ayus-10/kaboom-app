'use client'

import { useUpdateWidget } from '@/hooks/mutations/use-widget-mutations'
import { Widget } from '@/types/widget'
import { Edit2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { WidgetForm } from './widget-form'

export const WidgetCard: React.FC<{
  widget: Widget
  projectId: string
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
  onDelete: () => void
}> = ({ widget, projectId, isEditing, onEdit, onCancelEdit, onDelete }) => {
  const updateMutation = useUpdateWidget(projectId, widget.id)

  if (isEditing) {
    return (
      <WidgetForm
        projectId={projectId}
        widget={widget}
        onCancel={onCancelEdit}
        onSubmit={async data => {
          try {
            await updateMutation.mutateAsync(data)
            toast.success('Widget updated successfully')
            onCancelEdit()
          } catch (err) {
            if (err instanceof ZodError) {
              toast.error(err.issues[0].message)
            }
          }
        }}
        isLoading={updateMutation.isPending}
      />
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{widget.title}</h3>
          {widget.description && <p className="mt-1 text-sm text-gray-600">{widget.description}</p>}
          <p className="mt-2 text-xs text-gray-500">Site: {widget.site_url}</p>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
