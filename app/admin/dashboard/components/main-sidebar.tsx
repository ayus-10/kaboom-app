'use client'

import { useActivePage } from '@/hooks/use-active-page'
import { api } from '@/lib/api'
import { API_BASE_URL } from '@/lib/constants'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const MainSidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const activePage = useActivePage()

  const queryCliet = useQueryClient()
  const router = useRouter()

  const mainPages = [
    {
      path: 'project',
      title: 'Projects',
    },
    {
      path: 'widget',
      title: 'Widgets',
    },
    {
      path: 'chat',
      title: 'Existing Chats',
    },
    {
      path: 'chat-requests',
      title: 'Chat Requests',
    },
  ]

  const handleLogout = () => {
    api
      .post(`${API_BASE_URL}/auth/logout`)
      .then(() => {
        localStorage.clear()
        queryCliet.clear()
        router.push('/')
      })
      .catch(() => {
        toast.error('Unable to logout')
      })
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  if (!activePage) return null

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm md:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMenu} />
      )}

      <div
        className={`
          fixed md:static inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          flex h-screen w-64 flex-col justify-between border-e border-gray-100 bg-white
        `}
      >
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mt-12 md:mt-0">
            <Image src="/logo.png" alt="Kaboom logo" width={32} height={32} />
            <span className="text-lg font-semibold text-gray-900">Kaboom</span>
          </div>

          <ul className="mt-6 space-y-1">
            {mainPages.map(p => (
              <li key={p.path}>
                <Link
                  href={p.path}
                  onClick={closeMenu}
                  className={
                    activePage === p.path
                      ? 'block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700'
                      : 'block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }
                >
                  {p.title}
                </Link>
              </li>
            ))}

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <ChevronDown />
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <Link
                      href="account"
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Details
                    </Link>
                  </li>

                  <li>
                    <div
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                      className="w-full cursor-pointer rounded-lg px-4 py-2 [text-align:inherit] text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
