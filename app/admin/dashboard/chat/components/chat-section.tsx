'use client'

import { useSelectedConversationStore } from '@/hooks/stores/use-conversation-store'
import { StatusBadge } from './status-badge'

export const ChatSection: React.FC = () => {
  const selectedConversation = useSelectedConversationStore(state => state.selectedConversation)

  return (
    <div className="hidden lg:flex w-full lg:w-2/3 flex-col rounded-lg border border-dashed border-gray-200 bg-white/40">
      <div className="border-b border-gray-200 px-4 py-3">
        {selectedConversation ? (
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">
              VISITOR-{selectedConversation.visitor.display_id}
            </p>
            <StatusBadge status="online" />
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
  )
}
