'use client'

export type ChatMessagesPlaceholderVariant = 'no-conversation' | 'empty' | 'error'

export const ChatMessagesPlaceholder: React.FC<{
  variant: ChatMessagesPlaceholderVariant
  message?: string
}> = ({ variant, message }) => {
  const defaultMessage =
    variant === 'no-conversation'
      ? 'Select a conversation to view messages'
      : variant === 'empty'
        ? 'No messages yet. Start the conversation.'
        : 'Failed to load messages'

  const text = message ?? defaultMessage
  const isError = variant === 'error'

  return (
    <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 bg-gray-50/50">
      <div
        className={`flex h-full min-h-[200px] items-center justify-center text-sm ${
          isError ? 'rounded-lg bg-red-50 p-4 text-red-700' : 'text-gray-500'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
