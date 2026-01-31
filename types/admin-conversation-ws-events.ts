export enum AdminConversationEventType {
  CONVERSATION_CREATED = 'conversation.created',
  CONVERSATION_CLOSED = 'conversation.closed',
}

export type AdminConversationEvent =
  | {
      type: AdminConversationEventType.CONVERSATION_CREATED
      payload: {
        conversation_id: string
        conversation_visitor_id: string
        conversation_visitor_display_id: string
      }
    }
  | {
      type: AdminConversationEventType.CONVERSATION_CLOSED
      payload: { conversation_id: string }
    }

export enum AdminPendingConversationEventType {
  PENDING_CONVERSATION_CREATED = 'pending_conversation.created',
  PENDING_CONVERSATION_CLOSED = 'pending_conversation.closed',
  PENDING_MESSAGE_CREATED = 'pending_message.created',
}

export type AdminPendingConversationEvent =
  | {
      type: AdminPendingConversationEventType.PENDING_CONVERSATION_CREATED
      payload: { pending_conversation_id: string; visitor_id: string; visitor_display_id: string }
    }
  | {
      type: AdminPendingConversationEventType.PENDING_CONVERSATION_CLOSED
      payload: { pending_conversation_id: string }
    }
  | {
      type: AdminPendingConversationEventType.PENDING_MESSAGE_CREATED
      payload: {
        pending_message_id: string
        pending_conversation_id: string
        pending_message_content: string
      }
    }
