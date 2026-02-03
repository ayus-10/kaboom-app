'use client'

import { useConversationMessages } from '@/hooks/queries/use-conversation-message-queries'
import { useConversationStore } from '@/hooks/stores/use-conversation-store'
import { useConversationByIdSocket } from '@/hooks/use-conversation-by-id-socket'
import { useMobileScreen } from '@/hooks/use-mobile-view'
import { ChatMessagesWrapper } from './chat-messages-wrapper'
import { ChatReplyInput } from './chat-reply-input'
import { ChatSectionHeader } from './chat-section-header'

export const ChatSection: React.FC = () => {
  const selectedConversation = useConversationStore(state => state.selectedConversation)
  const { data: messages, isError, isLoading } = useConversationMessages(selectedConversation?.id)

  const { sendMessage, sendTypingStatus } = useConversationByIdSocket({
    isVisitor: false,
    conversationId: selectedConversation?.id,
  })

  const isMobile = useMobileScreen(1024)

  return (
    <div
      className={`w-full flex-col rounded-xl border border-gray-200 bg-white overflow-hidden lg:w-2/3
        ${!isMobile ? 'flex' : !selectedConversation ? 'hidden' : 'flex'}
      `}
    >
      <ChatSectionHeader selectedConversation={selectedConversation} />
      <ChatMessagesWrapper
        isError={isError}
        isLoading={isLoading}
        messages={messages}
        selectedConversation={selectedConversation}
      />
      <ChatReplyInput onSend={sendMessage} disabled={!selectedConversation || isError} />
    </div>
  )
}
