'use client'

import { useCreateWidget } from '@/hooks/mutations/use-widget-mutations'
import { useWidgets } from '@/hooks/queries/use-widget-queries'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { WidgetCard } from './widget-card'
import { WidgetForm } from './widget-form'

export const ProjectWidgetsSection: React.FC<{
  projectId: string
  projectTitle: string
  isCreating: boolean
  onStartCreate: () => void
  onCancelCreate: () => void
  editingWidget: { projectId: string; widgetId: string } | null
  onStartEdit: (widgetId: string) => void
  onCancelEdit: () => void
  onDelete: (widgetId: string) => void
}> = ({
  projectId,
  projectTitle,
  isCreating,
  onStartCreate,
  onCancelCreate,
  editingWidget,
  onStartEdit,
  onCancelEdit,
  onDelete,
}) => {
  const { data: widgets, isLoading, error } = useWidgets(projectId)
  const createMutation = useCreateWidget(projectId)

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Loading widgets for {projectTitle}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-800">Failed to load widgets for {projectTitle}</p>
      </div>
    )
  }

  const isEditingThisProject = editingWidget?.projectId === projectId

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{projectTitle}</h2>
        {!isCreating && (
          <button
            onClick={onStartCreate}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus size={16} />
            New Widget
          </button>
        )}
      </div>

      {isCreating && (
        <WidgetForm
          projectId={projectId}
          onCancel={onCancelCreate}
          onSubmit={async data => {
            try {
              await createMutation.mutateAsync(data)
              toast.success('Widget created successfully')
              onCancelCreate()
            } catch (err) {
              if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
              }
            }
          }}
          isLoading={createMutation.isPending}
        />
      )}

      {widgets && widgets.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {widgets.map(widget => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              projectId={projectId}
              isEditing={isEditingThisProject && editingWidget?.widgetId === widget.id}
              onEdit={() => onStartEdit(widget.id)}
              onCancelEdit={onCancelEdit}
              onDelete={() => onDelete(widget.id)}
            />
          ))}
        </div>
      ) : (
        !isCreating && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-sm text-gray-500">No widgets for this project</p>
          </div>
        )
      )}
    </div>
  )
}
