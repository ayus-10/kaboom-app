'use client'

import { useConversations } from '@/hooks/queries/use-conversation-queries'
import { ChatSection } from './chat-section'
import { ConversationList } from './conversation-list'

export const ChatPageBody: React.FC = () => {
  const { data: conversations, isLoading, error } = useConversations()

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
      <ConversationList conversations={conversations} />
      <ChatSection />
    </div>
  )
}
