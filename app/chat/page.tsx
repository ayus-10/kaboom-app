'use client'

import { useVisitorSocket } from '@/hooks/use-visitor-socket'
import { useSearchParams } from 'next/navigation'
import { ChatWidget } from './components/chat-widget'

export default function ChatPage() {
  const params = useSearchParams()
  const id = params.get('id')

  const { visitorActorId, sendPendingMessage, conversationId } = useVisitorSocket(id)

  return (
    <div className="h-full w-full overflow-hidden bg-transparent">
      <ChatWidget
        conversationId={conversationId}
        sendPendingMessage={sendPendingMessage}
        visitorActorId={visitorActorId}
      />
    </div>
  )
}
