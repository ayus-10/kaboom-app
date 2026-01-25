import {
  VisitorClientEvent,
  VisitorClientEventType,
  VisitorEvent,
  VisitorEventType,
} from '@/types/visitor-ws-events'
import { API_BASE_URL } from './constants'

export const connectVisitorSocket = (onMessage: (event: VisitorEvent) => void) => {
  const visitorId = localStorage.getItem('chat_visitor_id')

  const url = new URL('/ws/visitor', API_BASE_URL)
  if (visitorId) {
    url.searchParams.set('visitor_id', visitorId)
  }

  const socket = new WebSocket(url.toString())

  socket.onopen = () => {
    const event: VisitorClientEvent = {
      type: VisitorClientEventType.CREATE,
    }
    socket.send(JSON.stringify(event))
  }

  socket.onmessage = event => {
    try {
      const data = JSON.parse(event.data) as VisitorEvent
      onMessage(data)

      if (data.type === VisitorEventType.VISITOR_CREATED) {
        localStorage.setItem('chat_visitor_id', data.payload.visitor_id)
        localStorage.setItem('chat_visitor_actor_id', data.payload.visitor_actor_id)
      }
    } catch (err) {
      console.error('Invalid WS message', event.data, err)
    }
  }

  socket.onerror = err => {
    console.log('Visitor socket error', err)
    socket.close()
  }

  return socket
}
