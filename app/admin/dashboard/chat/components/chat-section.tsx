'use client'

import { useConversationMessages } from '@/hooks/queries/use-conversation-message-queries'
import { useSelectedConversationStore } from '@/hooks/stores/use-conversation-store'
import { useAdminConversationByIdSocket } from '@/hooks/use-admin-conversation-by-id-socket'
import { ChatMessagesWrapper } from './chat-messages-wrapper'
import { ChatReplyInput } from './chat-reply-input'
import { ChatSectionHeader } from './chat-section-header'

export const ChatSection: React.FC = () => {
  const selectedConversation = useSelectedConversationStore(state => state.selectedConversation)
  const { data: messages, isError, isLoading } = useConversationMessages(selectedConversation?.id)

  useAdminConversationByIdSocket(selectedConversation?.id)

  return (
    <div className="hidden lg:flex w-full lg:w-2/3 flex-col rounded-xl border border-gray-200 bg-white overflow-hidden">
      <ChatSectionHeader selectedConversation={selectedConversation} />
      <ChatMessagesWrapper
        isError={isError}
        isLoading={isLoading}
        messages={messages}
        selectedConversation={selectedConversation}
      />
      <ChatReplyInput onSend={() => {}} disabled={!selectedConversation || isError} />
    </div>
  )
}
