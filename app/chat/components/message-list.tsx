import { formatTimestamp } from '@/lib/utils'
import { Message } from '@/types/message'
import { useEffect, useRef } from 'react'

const MessageBubble: React.FC<{ message: Message; isOwnMessage: boolean }> = ({
  message,
  isOwnMessage,
}) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isOwnMessage
            ? 'bg-indigo-500 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}

export const MessagesList: React.FC<{
  messages: Message[]
  currentUserId: string
}> = ({ messages, currentUserId }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const shouldShowTimestamp = (currentMsgTime: string, prevMsgTime: string) => {
    const current = new Date(currentMsgTime)
    const prev = new Date(prevMsgTime)
    const diffMins = Math.floor((current.getTime() - prev.getTime()) / 60000)

    return diffMins > 5
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={bottomRef}>
      {messages.map((msg, idx) => {
        const isOwnMessage = msg.sender_actor_id === currentUserId
        const showTimestamp = shouldShowTimestamp(msg.created_at, messages[idx - 1]?.created_at)

        return (
          <div key={msg.id}>
            {showTimestamp && (
              <div className="text-center text-xs text-gray-500 my-4">
                {formatTimestamp(msg.created_at)}
              </div>
            )}
            <MessageBubble message={msg} isOwnMessage={isOwnMessage} />
          </div>
        )
      })}
    </div>
  )
}
