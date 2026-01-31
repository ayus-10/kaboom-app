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
        conversation_created_at: string
      }
    }
  | {
      type: AdminConversationEventType.CONVERSATION_CLOSED
      payload: { conversation_id: string }
    }
