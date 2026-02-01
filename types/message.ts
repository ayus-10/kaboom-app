export interface ActiveMessage {
  id: string
  sender_actor_id: string
  created_at: string
  conversation_id: string
  content: string
}

export interface VisitorMessage {
  id: string
  content: string
}

export interface PendingMessage {
  id: string
  content: string
  created_at: string
}

export interface Message {
  id: string
  conversation_id: string
  content: string
  sender_actor_id: string
  created_at: string
}
