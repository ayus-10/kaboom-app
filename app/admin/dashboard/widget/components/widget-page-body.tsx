'use client'

import { useDeleteWidget } from '@/hooks/mutations/use-widget-mutations'
import { useProjects } from '@/hooks/queries/use-project-queries'
import { useState } from 'react'
import { toast } from 'sonner'
import { ProjectWidgetsSection } from './project-widgets-section'

export const WidgetsPageBody: React.FC = () => {
  const { data: projects, isLoading, error } = useProjects()
  const deleteMutation = useDeleteWidget()

  const [creatingForProjectId, setCreatingForProjectId] = useState<string | null>(null)
  const [editingWidget, setEditingWidget] = useState<{
    projectId: string
    widgetId: string
  } | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-gray-500">Loading widgets...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-sm text-gray-500">No projects found. Create a project first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {projects &&
        projects.map(project => (
          <ProjectWidgetsSection
            key={project.id}
            projectId={project.id}
            projectTitle={project.title}
            isCreating={creatingForProjectId === project.id}
            onStartCreate={() => setCreatingForProjectId(project.id)}
            onCancelCreate={() => setCreatingForProjectId(null)}
            editingWidget={editingWidget}
            onStartEdit={(widgetId: string) =>
              setEditingWidget({ projectId: project.id, widgetId })
            }
            onCancelEdit={() => setEditingWidget(null)}
            onDelete={(widgetId: string) =>
              toast('Delete this widget?', {
                description: 'All integrated chat widgets will be unusable.',
                action: {
                  label: 'Delete',
                  onClick: () => deleteMutation.mutateAsync({ projectId: project.id, widgetId }),
                },
                cancel: {
                  label: 'Cancel',
                  onClick: () => {},
                },
              })
            }
          />
        ))}
    </div>
  )
}
