'use client'

import { useSearchParams } from 'next/navigation'
import { ChatWidget } from './components/chat-widget'

export default function ChatPage() {
  const params = useSearchParams()
  const id = params.get('id')

  if (!id) return null

  return (
    <div className="h-full w-full overflow-hidden bg-transparent">
      <ChatWidget widgetId={id} />
    </div>
  )
}
