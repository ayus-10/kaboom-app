import { VisitorEvent, VisitorEventType } from '@/types/ws-events'
import { API_BASE_URL } from './constants'

export const connectVisitorSocket = (onMessage: (event: VisitorEvent) => void) => {
  const visitorId = localStorage.getItem('chat_visitor_id')
  const url = new URL('/ws/visitor', API_BASE_URL)
  if (visitorId) {
    url.searchParams.set('visitor_id', visitorId)
  }

  const socket = new WebSocket(url.toString())

  socket.onopen = () => {
    // ask server to create Pending Conversation
    socket.send(JSON.stringify({ type: 'create' }))
  }

  socket.onmessage = event => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)

      if (data.type === VisitorEventType.VISITOR_CREATED) {
        localStorage.setItem('chat_visitor_id', data.payload.visitor_id)
      }
    } catch {
      console.error('Invalid WS message', event.data)
    }
  }

  // reconnect
  socket.onclose = () => {
    window.setTimeout(() => {
      connectVisitorSocket(onMessage)
    }, 1500)
  }

  socket.onerror = () => {
    socket.close()
  }

  return socket
}
