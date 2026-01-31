import { ProjectsPageBody } from './components/project-page-body'

export default function ProjectPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <ProjectsPageBody />
      </div>
    </div>
  )
}
