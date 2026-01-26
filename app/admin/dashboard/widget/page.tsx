import { WidgetsPageBody } from './components/widget-page-body'

export default function WidgetPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="mx-auto px-12 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 pb-8">Widgets</h1>
        <WidgetsPageBody />
      </div>
    </div>
  )
}
