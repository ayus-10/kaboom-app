'use client'

import { useRejectPendingConversation } from '@/hooks/mutations/use-pending-conversation-mutations'
import { usePendingConversations } from '@/hooks/queries/use-pending-conversation-queries'
import { useAdminPendingConversationSocket } from '@/hooks/use-admin-pending-conversation-socket'
import { PendingConversationCard } from './pending-conversation-card'

export const ChatRequests: React.FC = () => {
  const { data: pendingConversations, isLoading, isFetched, error } = usePendingConversations()

  useAdminPendingConversationSocket(isFetched)

  const rejectMutation = useRejectPendingConversation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm text-gray-500">Loading pending conversations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-800">Failed to load pending conversations</p>
      </div>
    )
  }

  if (pendingConversations && pendingConversations.length > 0) {
    return (
      <div className="space-y-4 grid grid-cols-2">
        {pendingConversations.map(conversation => (
          <PendingConversationCard
            conversation={conversation}
            key={conversation.id}
            handleReject={rejectMutation.mutateAsync}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
      <p className="text-sm text-gray-500">No pending conversation requests</p>
    </div>
  )
}
