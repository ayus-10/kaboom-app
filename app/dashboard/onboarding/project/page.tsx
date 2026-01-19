import { ProjectForm } from './components/project-form'

export default function OnboardingProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
        Create a project
      </h1>

      <ProjectForm />
    </div>
  )
}
