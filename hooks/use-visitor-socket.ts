import { connectVisitorSocket } from '@/lib/visitor-socket'
import { VisitorEventType } from '@/types/ws-events'
import { useEffect, useRef, useState } from 'react'

export function useVisitorSocket() {
  const socketRef = useRef<WebSocket | null>(null)

  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    socketRef.current = connectVisitorSocket(event => {
      switch (event.type) {
        case VisitorEventType.VISITOR_CREATED:
          setVisitorId(event.payload.visitor_id)
          break

        case VisitorEventType.PENDING_CONVERSATION_CREATED:
        case VisitorEventType.PENDING_CONVERSATION_EXISTS:
          setConversationId(event.payload.pending_conversation_id)
          break

        case VisitorEventType.PONG:
          break

        case VisitorEventType.ERROR:
          console.log(event.payload.message)
          break
      }
    })

    setConnected(true)

    return () => {
      socketRef.current?.close()
    }
  }, [])

  return {
    socket: socketRef.current,
    visitorId,
    conversationId,
    connected,
  }
}
