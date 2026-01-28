'use client'

import { useConversations } from '@/hooks/queries/use-conversation-queries'
import { useState } from 'react'
import { ConversationList } from './conversation-list'

export const ChatPageBody: React.FC = () => {
  const { data: conversations, isLoading, error } = useConversations()
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-gray-500">Loading conversations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-800">Failed to load conversations</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-9rem)] gap-6">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        setSelectedConversationId={setSelectedConversationId}
      />

      <div className="hidden lg:flex w-full lg:w-2/3 flex-col rounded-lg border border-dashed border-gray-200 bg-white/40">
        <div className="border-b border-gray-200 px-4 py-3">
          {selectedConversationId ? (
            <div className="space-y-1">
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">No conversation selected</p>
                <p className="mt-1 text-xs text-gray-500">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between px-4 py-6">
          <div className="space-y-3">
            <div className="flex justify-start">
              <div className="h-10 w-40 animate-pulse rounded-2xl bg-gray-200" />
            </div>
            <div className="flex justify-end">
              <div className="h-10 w-52 animate-pulse rounded-2xl bg-indigo-100" />
            </div>
            <div className="flex justify-start">
              <div className="h-10 w-32 animate-pulse rounded-2xl bg-gray-200" />
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-10 w-full animate-pulse rounded-xl bg-gray-100" />
              </div>
              <div className="h-10 w-20 animate-pulse rounded-xl bg-indigo-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
