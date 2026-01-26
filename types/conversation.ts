import { PendingMessage } from './message'

export interface PendingConversation {
  id: string
  visitor_id: string
}

export interface PendingConversationWithMessages extends PendingConversation {
  pending_messages: PendingMessage[]
}

export interface Conversation {
  id: string
  visitor_id: string
  user_id: string
  created_at: string
  deleted_at: string | null
}
