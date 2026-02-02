import { ConversationEvent } from '@/types/conversation-ws-events'
import { API_BASE_URL } from './constants'

export const connectConversationSocket = (
  conversationId: string,
  onMessage: (event: ConversationEvent) => void
) => {
  const url = new URL(`/ws/conversation/${conversationId}`, API_BASE_URL)

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
