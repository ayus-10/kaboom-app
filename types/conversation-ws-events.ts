export enum ConversationEventType {
  MESSAGE_CREATED = 'conversation.message_created',
  TYPING = 'conversation.typing',
  STATUS = 'conversation.status',
  ERROR = 'error',
}

export type ConversationEvent =
  | {
      type: ConversationEventType.MESSAGE_CREATED
      payload: {
        id: string
        content: string
        sender_actor_id: string
      }
    }
  | {
      type: ConversationEventType.TYPING
      payload: {
        client_id: string
        status: boolean
      }
    }
  | {
      type: ConversationEventType.STATUS
      payload: {
        client_id: string
        status: 'online' | 'offline'
      }
    }
  | {
      type: ConversationEventType.ERROR
      payload: {
        message: string
      }
    }
