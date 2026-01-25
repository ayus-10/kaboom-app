import { connectVisitorSocket } from '@/lib/visitor-socket'
import {
  VisitorClientEvent,
  VisitorClientEventType,
  VisitorEventType,
} from '@/types/visitor-ws-events'
import { useEffect, useRef, useState } from 'react'

export const useVisitorSocket = () => {
  const socketRef = useRef<WebSocket | null>(null)

  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [visitorActorId, setVisitorActorId] = useState<string | null>(null)
  const [pendingConversationId, setPendingConversationId] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null) // TODO: set when admin accepts a pending conversation

  useEffect(() => {
    socketRef.current = connectVisitorSocket(event => {
      switch (event.type) {
        case VisitorEventType.VISITOR_CREATED:
        case VisitorEventType.VISITOR_FOUND:
          setVisitorId(event.payload.visitor_id)
          setVisitorActorId(event.payload.visitor_actor_id)
          break

        case VisitorEventType.PENDING_CONVERSATION_CREATED:
          setPendingConversationId(event.payload.pending_conversation_id)
          break

        case VisitorEventType.ERROR:
          console.log(event.payload.message)
          break
      }
    })

    return () => {
      socketRef.current?.close()
    }
  }, [])

  const send = (event: VisitorClientEvent) => {
    const socket = socketRef.current
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(event))
  }

  return {
    visitorId,
    visitorActorId,
    pendingConversationId,
    conversationId,

    sendMessage: (message: string) =>
      send({
        type: VisitorClientEventType.SEND_MESSAGE,
        message,
      }),
  }
}
