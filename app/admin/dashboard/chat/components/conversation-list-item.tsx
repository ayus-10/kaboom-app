'use client'

import { formatTimestamp } from '@/lib/utils'
import { ConversationReadWithLatestMessage } from '@/types/conversation'

export const ConversationListItem: React.FC<{
  conversation: ConversationReadWithLatestMessage
  isSelected: boolean
  onSelect: () => void
  currentUserActorId: string
}> = ({ conversation, isSelected, onSelect, currentUserActorId }) => {
  const latest = conversation.latest_message

  const sentTime = latest ? formatTimestamp(latest.created_at) : null

  const preview = latest
    ? `${latest.sender_actor_id === currentUserActorId ? 'You: ' : 'Visitor: '}${
        latest.content.length > 80 ? `${latest.content.slice(0, 77)}...` : latest.content
      }`
    : 'No messages yet'

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
      >
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700">
          V
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-gray-900">
              VISITOR-{conversation.visitor.display_id}
            </p>
            <span className="text-xs text-gray-400">{sentTime}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">{preview}</p>
        </div>
      </button>
    </li>
  )
}
