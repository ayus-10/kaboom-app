import { WidgetForm } from './components/widget-form'

export default function OnboardingWidgetPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
        Create a widget
      </h1>

      <WidgetForm />
    </div>
  )
}
