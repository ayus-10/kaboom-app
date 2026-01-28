import { WidgetsPageBody } from './components/widget-page-body'

export default function WidgetPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="mx-auto px-12 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Widgets</h1>
          <p className="mt-1 text-sm text-gray-600">Review and manage widgets for your projects</p>
        </div>

        <WidgetsPageBody />
      </div>
    </div>
  )
}
