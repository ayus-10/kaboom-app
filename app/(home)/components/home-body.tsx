import { ArrowRight, MessageSquare, Shield, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const HomeBody: React.FC = () => {
  return (
    <main className="bg-white text-gray-900">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
              <Sparkles size={16} />
              Customer conversations, done right
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight">
              Talk to your users
              <br />
              <span className="text-indigo-600">without losing your mind</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Kaboom helps you chat with your website visitors in real time — simple setup,
              thoughtful design, and zero clutter.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
              >
                Get started
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/docs"
                className="rounded-full px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                View docs
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-100 blur-3xl" />
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight">
              Designed for calm, human conversations
            </h3>
            <p className="mt-4 text-gray-600">
              Kaboom is used by small teams who value clarity, empathy, and actually listening to
              users — not juggling ten dashboards at once.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <ImageCard src="/team-chat.jpeg" alt="Team collaborating calmly" />
            <ImageCard src="/support-desk.jpeg" alt="Customer support workspace" />
            <ImageCard src="/focused-work.jpeg" alt="Focused work environment" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-gray-600">
            Kaboom stays out of your way and lets you focus on real conversations.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <FeatureCard
            icon={<MessageSquare />}
            title="Real-time chat"
            desc="Instant conversations with visitors, powered by fast and reliable websockets."
          />
          <FeatureCard
            icon={<Zap />}
            title="Drop-in widget"
            desc="Add Kaboom to your site with a single script. No rebuilds. No drama."
          />
          <FeatureCard
            icon={<Shield />}
            title="Privacy-first"
            desc="Minimal tracking, clear boundaries, and respect for your users."
          />
        </div>
      </section>

      <section className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Start talking to your users today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Set up Kaboom in minutes and see what your users actually need.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            Create your first widget
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({
  icon,
  title,
  desc,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}

const ImageCard: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="h-56 w-full object-cover transition duration-300 hover:scale-105"
      />
    </div>
  )
}
