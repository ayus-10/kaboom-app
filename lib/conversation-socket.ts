import { ConversationEvent } from '@/types/conversation-ws-events'
import { API_BASE_URL } from './constants'

export const connectConversationSocket = (
  conversationId: string,
  isVisitor: boolean,
  onMessage: (event: ConversationEvent) => void
) => {
  const url = new URL(`/ws/conversation/${conversationId}`, API_BASE_URL)

  if (isVisitor) {
    const visitor_id = localStorage.getItem('chat_visitor_id')

    if (visitor_id) url.searchParams.set('visitor_id', visitor_id)
  }

  const socket = new WebSocket(url.toString())

  socket.onmessage = event => {
    try {
      const data = JSON.parse(event.data) as ConversationEvent
      onMessage(data)
    } catch (err) {
      console.error('Invalid WS message', event.data, err)
    }
  }

  socket.onerror = err => {
    console.warn('Conversation socket error', err)
  }

  return socket
}
