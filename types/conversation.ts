import { PendingMessage } from './message'

export interface PendingConversation {
  id: string
  visitor_id: string
  created_at: string
}

export interface PendingConversationWithMessages extends Omit<PendingConversation, 'visitor_id'> {
  pending_messages: PendingMessage[]
  visitor: {
    id: string
    display_id: string
  }
}

export interface Visitor {
  id: string
  display_id: string
}

export interface Conversation {
  id: string
  visitor: Visitor
  created_at: string
}

export interface ConversationMessage {
  id: string
  sender_actor_id: string
  content: string
  created_at: string
}

export interface ConversationReadWithLatestMessage extends Conversation {
  latest_message?: ConversationMessage | null
}
