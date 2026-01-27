'use client'

import { useCreateProject, useDeleteProject } from '@/hooks/mutations/use-project-mutations'
import { useProjects } from '@/hooks/queries/use-project-queries'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { ProjectCard } from './project-card'
import { ProjectForm } from './project-form'

export const ProjectsPageBody: React.FC = () => {
  const { data: projects, isLoading, error } = useProjects()
  const createMutation = useCreateProject()
  const deleteMutation = useDeleteProject()

  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-gray-500">Loading projects...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-800">Failed to load projects</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
          <p className="mt-1 text-sm text-gray-600">Review and manage your active projects</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Plus size={16} />
            New Project
          </button>
        )}
      </div>

      {isCreating && (
        <ProjectForm
          onCancel={() => setIsCreating(false)}
          onSubmit={async data => {
            try {
              await createMutation.mutateAsync(data)
              toast.success('Project created successfully')
              setIsCreating(false)
            } catch (err) {
              if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
              }
            }
          }}
          isLoading={createMutation.isPending}
        />
      )}

      {projects && projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              isEditing={editingId === project.id}
              onEdit={() => setEditingId(project.id)}
              onCancelEdit={() => setEditingId(null)}
              onDelete={() =>
                toast('Delete this project?', {
                  action: {
                    label: 'Delete',
                    onClick: async () => {
                      await deleteMutation.mutateAsync(project.id)
                      toast.success('Project deleted')
                    },
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
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-sm text-gray-500">No projects yet</p>
        </div>
      )}
    </div>
  )
}
