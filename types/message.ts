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
