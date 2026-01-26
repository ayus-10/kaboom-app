import { ProjectsPageBody } from './components/project-page-body'

export default function ProjectPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="mx-auto px-12 py-8">
        <ProjectsPageBody />
      </div>
    </div>
  )
}
