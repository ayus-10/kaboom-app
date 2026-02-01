'use client'

import { ArrowRight, ChevronDown, MessageSquare, Shield, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const HomeBody: React.FC = () => {
  return (
    <main className="bg-white text-gray-900">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
              <Sparkles size={16} />
              Customer conversations, done right
            </span>

            <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Talk to your users
              <br />
              <span className="text-indigo-600">without losing your mind</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Kaboom helps you chat with your website visitors in real time with simple setup,
              thoughtful design, and zero clutter.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/admin"
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
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Designed for calm, human conversations
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Kaboom is built for small teams who value clarity, empathy, and actually listening to
              users, not juggling ten dashboards at once.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl">
              <ImageCard src="/team-chat.jpeg" alt="Team collaborating calmly" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold text-lg">Sync without the noise</h4>
                <p className="mt-2 text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  Keep your team aligned with threaded discussions that prioritize depth over speed.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl">
              <ImageCard src="/support-desk.jpeg" alt="Customer support workspace" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold text-lg">Human-centric support</h4>
                <p className="mt-2 text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  Ditch the ticket numbers. Treat every interaction like a conversation, not a
                  transaction.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl">
              <ImageCard src="/focused-work.jpeg" alt="Focused work environment" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold text-lg">Deep work by default</h4>
                <p className="mt-2 text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  Minimalist interfaces designed to fade into the background so you can stay in
                  flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
          <p className="mt-4 text-gray-600">Three steps to start chatting with your visitors.</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600">
              1
            </span>
            <h3 className="mt-4 font-semibold">Create a project</h3>
            <p className="mt-2 text-sm text-gray-600">
              Sign up, add a project, and get your widget snippet from the dashboard.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600">
              2
            </span>
            <h3 className="mt-4 font-semibold">Add the widget</h3>
            <p className="mt-2 text-sm text-gray-600">
              Paste one script tag on your site. The chat bubble appears; no build step.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600">
              3
            </span>
            <h3 className="mt-4 font-semibold">Reply in the dashboard</h3>
            <p className="mt-2 text-sm text-gray-600">
              When visitors message, conversations show up in Kaboom. Reply from one place.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-12 max-w-2xl md:mb-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-gray-600">
            Kaboom stays out of your way and lets you focus on real conversations.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
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

      <FAQSection />

      <section className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:py-24">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Start talking to your users today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Set up Kaboom in minutes and see what your users actually need.
          </p>

          <Link
            href="/admin"
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

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Do I need to host anything?',
      answer:
        'No. Kaboom hosts the widget and the dashboard. You just add a script tag to your site.',
    },
    {
      question: 'Can I use it on multiple sites?',
      answer:
        'Yes. Create one project per site (or per product). Each project has its own widget and conversations.',
    },
    {
      question: 'Is there a free plan?',
      answer:
        'Yes. Starter is free forever with one project and up to 100 conversations per month. See Pricing for details.',
    },
  ]

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Frequently asked questions
        </h2>
      </div>
      <dl className="mx-auto mt-10 max-w-2xl space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <dt>
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </dt>
            <dd
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                openIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-4 text-sm text-gray-600">{faq.answer}</div>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
