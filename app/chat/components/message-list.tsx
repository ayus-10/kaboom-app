import { MS_PER_MINUTE, TIMESTAMP_GAP_MINUTES } from '@/lib/constants'
import { ActiveMessage, VisitorMessage } from '@/types/message'
import { MessageBubble } from './message-bubble'
import { MessagesContainer } from './message-container'

type ActiveMessagesProps = {
  messages: ActiveMessage[]
  visitorActorId: string | null
}

type PendingMessagesProps = {
  messages: VisitorMessage[]
}

const ActiveMessages: React.FC<ActiveMessagesProps> = ({ messages, visitorActorId }) => {
  const shouldShowTimestamp = (current: ActiveMessage, prev?: ActiveMessage) => {
    if (!prev) return true
    return (
      (new Date(current.created_at).getTime() - new Date(prev.created_at).getTime()) /
        MS_PER_MINUTE >
      TIMESTAMP_GAP_MINUTES
    )
  }

  if (!visitorActorId) return null

  return (
    <MessagesContainer>
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
