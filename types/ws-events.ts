export enum VisitorEventType {
  ERROR = 'error',
  VISITOR_CREATED = 'visitor.created',
  PENDING_CONVERSATION_CREATED = 'pending_conversation.created',
  PENDING_CONVERSATION_EXISTS = 'pending_conversation.exists',
}

export enum AdminPendingConversationEventType {
  PENDING_CONVERSATION_CREATED = 'pending_conversation.created',
  PENDING_CONVERSATION_CLOSED = 'pending_conversation.closed',
}

export type VisitorEvent =
  | { type: VisitorEventType.ERROR; payload: { message: string } }
  | { type: VisitorEventType.VISITOR_CREATED; payload: { visitor_id: string } }
  | {
      type: VisitorEventType.PENDING_CONVERSATION_CREATED
      payload: { pending_conversation_id: string }
    }
  | {
      type: VisitorEventType.PENDING_CONVERSATION_EXISTS
      payload: { pending_conversation_id: string }
    }

export type AdminPendingConversationEvent =
  | {
      type: AdminPendingConversationEventType.PENDING_CONVERSATION_CREATED
      payload: { pending_conversation_id: string; visitor_id: string }
    }
  | {
      type: AdminPendingConversationEventType.PENDING_CONVERSATION_CLOSED
      payload: { pending_conversation_id: string }
    }
