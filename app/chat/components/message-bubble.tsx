import { formatTimestamp } from '@/lib/utils'

export const MessageBubble: React.FC<{
  messageStr: string
  isOwnMessage: boolean
  messageTime?: string
}> = ({ messageStr, isOwnMessage, messageTime }) => {
  return (
    <div>
      {messageTime && (
        <div className="text-center text-xs text-gray-500 my-4">{formatTimestamp(messageTime)}</div>
      )}
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-xs px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-indigo-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <p className="text-sm">{messageStr}</p>
        </div>
      </div>
    </div>
  )
}
