import { ActiveMessage, VisitorMessage } from '@/types/message'
import { MessageBubble } from './message-bubble'
import { MessagesContainer } from './message-container'

type ActiveMessagesProps = {
  messages: ActiveMessage[]
  visitor_actor_id: string
}

type PendingMessagesProps = {
  messages: VisitorMessage[]
}

const ActiveMessages: React.FC<ActiveMessagesProps> = ({ messages, visitor_actor_id }) => {
  const shouldShowTimestamp = (current: string, prev?: string) => {
    if (!prev) return true
    return (new Date(current).getTime() - new Date(prev).getTime()) / 60000 > 5
  }

  return (
    <MessagesContainer>
      {messages.map((msg, idx) => {
        const isOwnMessage = msg.sender_actor_id === visitor_actor_id
        const showTimestamp = shouldShowTimestamp(msg.created_at, messages[idx - 1]?.created_at)

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
    <MessagesContainer>
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
