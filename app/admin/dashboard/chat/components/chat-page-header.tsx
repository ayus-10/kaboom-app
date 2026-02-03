'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ChatPageHeader: React.FC = () => {
  const router = useRouter()

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-100 p-2 rounded-full group cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="group-hover:-translate-x-0.5 ease-in-out duration-200" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Existing Chats</h1>
      </div>
      <p className="mt-1 text-sm text-gray-600">Browse and respond to ongoing conversations</p>
    </div>
  )
}
