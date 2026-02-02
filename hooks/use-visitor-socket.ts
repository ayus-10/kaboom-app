import { connectVisitorSocket } from '@/lib/visitor-socket'
import {
  VisitorClientEvent,
  VisitorClientEventType,
  VisitorEventType,
} from '@/types/visitor-ws-events'
import { useEffect, useRef, useState } from 'react'
import { useActiveMessagesStore, useVisitorMessagesStore } from './stores/use-messages-store'

export const useVisitorSocket = () => {
  const socketRef = useRef<WebSocket | null>(null)

  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [visitorActorId, setVisitorActorId] = useState<string | null>(null)
  const [pendingConversationId, setPendingConversationId] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)

  const visitorMessages = useVisitorMessagesStore(state => state.visitorMessages)
  const setActiveMessages = useActiveMessagesStore(state => state.setActiveMessages)

  useEffect(() => {
    const socket = connectVisitorSocket(event => {
      switch (event.type) {
        case VisitorEventType.VISITOR_CREATED:
        case VisitorEventType.VISITOR_FOUND:
          setVisitorId(event.payload.visitor_id)
          setVisitorActorId(event.payload.visitor_actor_id)
          break

        case VisitorEventType.PENDING_CONVERSATION_CREATED:
          setPendingConversationId(event.payload.pending_conversation_id)
          break

        case VisitorEventType.CONVERSATION_CREATED: {
          if (!visitorActorId) break

          const convId = event.payload.conversation_id
          const now = new Date().toISOString()

          setActiveMessages(
            visitorMessages.map(v => ({
              ...v,
              conversation_id: convId,
              created_at: now,
              sender_actor_id: visitorActorId,
            }))
          )

          setConversationId(convId)
          break
        }

        case VisitorEventType.ERROR:
          console.log(event.payload.message)
          break
      }
    })

    socketRef.current = socket

    return () => {
      socket.close()
      socketRef.current = null
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
        type: conversationId
          ? VisitorClientEventType.SEND_MESSAGE
          : VisitorClientEventType.SEND_PENDING_MESSAGE,
        message,
      }),
  }
}
