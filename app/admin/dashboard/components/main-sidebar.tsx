'use client'

import { useUser } from '@/hooks/queries/use-user'
import { useActivePage } from '@/hooks/use-active-page'
import { API_BASE_URL } from '@/lib/constants'
import { ChevronDown, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const MainSidebar: React.FC = () => {
  const { data: user } = useUser()

  const activePage = useActivePage()

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
      path: 'requests',
      title: 'Chat Requests',
    },
  ]

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = `${API_BASE_URL}/auth/logout`
  }

  if (!activePage) return null

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-100 bg-white">
      <div className="px-4 py-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Kaboom logo" width={32} height={32} />
          <span className="text-lg font-semibold text-gray-900">Kaboom</span>
        </div>

        <ul className="mt-6 space-y-1">
          {mainPages.map(p => (
            <li key={p.path}>
              <Link
                href={p.path}
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
            <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
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
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Details
                  </Link>
                </li>

                <li>
                  <div
                    onClick={handleLogout}
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

      {user && (
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <span className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            {user.avatar_url ? (
              <Image
                height={40}
                width={40}
                alt="Profile"
                src={user.avatar_url}
                className="rounded-full size-[40]"
              />
            ) : (
              <User size={40} />
            )}

            <div>
              <p className="text-xs">
                <strong className="block font-medium">{`${user.first_name} ${user.last_name}`}</strong>
                <span>{user.email}</span>
              </p>
            </div>
          </span>
        </div>
      )}
    </div>
  )
}
