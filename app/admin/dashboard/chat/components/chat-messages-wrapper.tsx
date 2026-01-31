import { Conversation } from '@/types/conversation'
import { Message } from '@/types/message'
import { ChatMessagesList } from './chat-messages-list'
import { ChatMessagesLoading } from './chat-messages-loading'
import { ChatMessagesPlaceholder } from './chat-messages-placeholder'

export const ChatMessagesWrapper: React.FC<{
  isLoading: boolean
  isError: boolean
  selectedConversation: Conversation | null
  messages: Message[] | undefined
}> = ({ isLoading, isError, selectedConversation, messages }) => {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 bg-gray-50/50">
        <ChatMessagesLoading />
      </div>
    )
  }

  if (!selectedConversation) {
    return <ChatMessagesPlaceholder variant="no-conversation" />
  }

  if (isError) {
    return <ChatMessagesPlaceholder variant="error" />
  }

  if (!messages?.length) {
    return <ChatMessagesPlaceholder variant="empty" />
  }

  return <ChatMessagesList messages={messages} scrollTrigger={messages?.length} />
}
