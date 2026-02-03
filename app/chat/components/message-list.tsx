import { shouldShowTimestamp } from '@/lib/utils'
import { Message, VisitorMessage } from '@/types/message'
import { MessageBubble } from './message-bubble'
import { MessagesContainer } from './message-container'

type ActiveMessagesProps = {
  messages: Message[]
  visitorActorId: string | null
}

type PendingMessagesProps = {
  messages: VisitorMessage[]
}

const ActiveMessages: React.FC<ActiveMessagesProps> = ({ messages, visitorActorId }) => {
  if (!visitorActorId) return null

  return (
    <MessagesContainer scrollTrigger={messages.length}>
      {messages.map((msg, idx) => {
        const isOwnMessage = msg.sender_actor_id === visitorActorId
        const showTimestamp = shouldShowTimestamp(msg, messages[idx - 1])

        return (
          <MessageBubble
            key={msg.id}
            messageStr={msg.content}
            isOwnMessage={isOwnMessage}
            messageTime={showTimestamp ? msg.created_at : undefined}
          />
        )
      })}
    </MessagesContainer>
  )
}

const PendingMessages: React.FC<PendingMessagesProps> = ({ messages }) => {
  return (
    <MessagesContainer scrollTrigger={messages.length}>
      {messages.map(msg => (
        <MessageBubble key={msg.id} messageStr={msg.content} isOwnMessage />
      ))}
    </MessagesContainer>
  )
}

export const MessagesList: React.FC<
  ({ type: 'ACTIVE' } & ActiveMessagesProps) | ({ type: 'PENDING' } & PendingMessagesProps)
> = props => {
  if (props.type === 'ACTIVE') {
    return <ActiveMessages {...props} />
  }

  return <PendingMessages {...props} />
}
