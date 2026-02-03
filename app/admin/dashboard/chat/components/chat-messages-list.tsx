'use client'

import { MessageBubble } from '@/app/chat/components/message-bubble'
import { useUser } from '@/hooks/queries/use-user'
import { shouldShowTimestamp } from '@/lib/utils'
import { Message } from '@/types/message'
import { useEffect, useRef } from 'react'

export const ChatMessagesList: React.FC<{
  messages: Message[]
  scrollTrigger?: number
}> = ({ messages, scrollTrigger = 0 }) => {
  const { data: userInfo } = useUser()

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [scrollTrigger])

  if (!userInfo) return null

  return (
    <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-1 bg-gray-50/50">
      {messages.map((msg, idx) => (
        <MessageBubble
          key={msg.id}
          messageStr={msg.content}
          isOwnMessage={msg.sender_actor_id === userInfo.user_actor_id}
          messageTime={shouldShowTimestamp(msg, messages[idx - 1]) ? msg.created_at : undefined}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
