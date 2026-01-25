'use client'

import {
  useApprovePendingConversation,
  useRejectPendingConversation,
} from '@/hooks/mutations/use-pending-conversation-mutations'
import { usePendingConversations } from '@/hooks/queries/use-pending-conversation-queries'
import { useAdminPendingConversationSocket } from '@/hooks/use-admin-pending-conversation-socket'
import { PendingConversation } from '@/types/conversation'
import { Check, X } from 'lucide-react'

// TODO: 1. allow users to reply to pending conversation (that also approves) 2. warning on reject

export const ChatRequests: React.FC = () => {
  useAdminPendingConversationSocket()

  const { data: pendingConversations, isLoading, error } = usePendingConversations()

  const approveMutation = useApprovePendingConversation()
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
      <div className="space-y-3">
        {pendingConversations.map(conversation => (
          <PendingConversationCard
            conversation={conversation}
            key={conversation.id}
            handleApprove={approveMutation.mutateAsync}
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

const PendingConversationCard: React.FC<{
  conversation: PendingConversation
  handleApprove: (id: string) => void
  handleReject: (id: string) => void
}> = ({ conversation, handleApprove, handleReject }) => {
  return (
    <div
      key={conversation.id}
      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
            <span className="text-sm font-medium text-indigo-600">V</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Visitor Request</p>
            <p className="text-xs text-gray-500">Visitor ID: {conversation.visitor_id}</p>
            <p className="text-xs text-gray-500">Request ID: {conversation.id}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleApprove(conversation.id)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={16} />
          Approve
        </button>
        <button
          onClick={() => handleReject(conversation.id)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={16} />
          Reject
        </button>
      </div>
    </div>
  )
}
