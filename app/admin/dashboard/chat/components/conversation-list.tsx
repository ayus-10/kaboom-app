'use client'

import { useUser } from '@/hooks/queries/use-user'
import { ConversationReadWithLatestMessage } from '@/types/conversation'
import { ConversationListItem } from './conversation-list-item'

export const ConversationList: React.FC<{
  conversations?: ConversationReadWithLatestMessage[]
  selectedConversationId: string | null
  setSelectedConversationId: React.Dispatch<React.SetStateAction<string | null>>
}> = ({ conversations, selectedConversationId, setSelectedConversationId }) => {
  const { data: userInfo } = useUser()

  const showConversations = Array.isArray(conversations) && conversations.length > 0 && !!userInfo

  return (
    <div className="flex w-full lg:w-1/3 flex-col rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Conversations</h2>
        <p className="mt-1 text-xs text-gray-500">Select a conversation to view and reply</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {showConversations ? (
          <ul className="divide-y divide-gray-100">
            {conversations.map(conversation => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isSelected={conversation.id === selectedConversationId}
                onSelect={() => setSelectedConversationId(conversation.id)}
                currentUserActorId={userInfo.user_actor_id}
              />
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center px-4 py-8">
            <p className="text-sm text-gray-500">No active conversations yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
