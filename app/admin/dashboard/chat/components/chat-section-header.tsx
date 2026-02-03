'use client'

import { useConversationStore } from '@/hooks/stores/use-conversation-store'
import { Conversation } from '@/types/conversation'
import { StatusBadge } from './status-badge'

export const ChatSectionHeader: React.FC<{
  selectedConversation: Conversation | null
}> = ({ selectedConversation }) => {
  const activeClients = useConversationStore(state => state.activeClients)

  return (
    <div className="shrink-0 border-b border-gray-200 bg-gray-50/80 px-4 py-3">
      {selectedConversation ? (
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-gray-900">
              Visitor {selectedConversation.visitor.display_id}
            </p>
            <StatusBadge
              status={
                activeClients.includes(selectedConversation.visitor.id) ? 'online' : 'offline'
              }
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm font-semibold text-gray-900">No conversation selected</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      )}
    </div>
  )
}
