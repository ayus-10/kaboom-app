import { AdminPendingConversationEvent } from '@/types/admin-pc-ws-events'
import { API_BASE_URL } from './constants'

export const connectAdminPendingConversationSocket = (
  onMessage: (event: AdminPendingConversationEvent) => void
) => {
  const url = new URL('/ws/pending-conversation', API_BASE_URL)

  const socket = new WebSocket(url.toString())

  socket.onmessage = event => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)
    } catch {
      console.error('Invalid WS message', event.data)
    }
  }

  socket.onerror = err => {
    console.warn('Admin socket error', err)
  }

  return socket
}
