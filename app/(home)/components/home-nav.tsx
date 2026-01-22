'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const HomeNav: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Kaboom logo" width={32} height={32} />
          <span className="text-lg font-semibold text-gray-900">Kaboom</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/features"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Docs
          </Link>

          <Link
            href="/admin"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
          >
            Get started
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 my-2 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 px-4 py-4">
              <Link
                href="/features"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                Docs
              </Link>

              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-full bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
