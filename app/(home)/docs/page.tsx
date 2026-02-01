import { EmbedSteps } from './components/embed-steps'

export default function DocsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-indigo-600 mb-3">
          Embed Kaboom Widget
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Add live chat to your website in under 60 seconds
        </p>

        <EmbedSteps />
      </section>
    </main>
  )
}
