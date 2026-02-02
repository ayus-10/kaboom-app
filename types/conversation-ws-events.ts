export enum ConversationEventType {
  MESSAGE_CREATED = 'conversation.message_created',
  TYPING = 'conversation.typing',
  STATUS = 'conversation.status',
  ERROR = 'error',
}

export enum ConversationClientEventType {
  TYPING = 'typing',
  SEND_MESSAGE = 'send-message',
}

export type ConversationEvent =
  | {
      type: ConversationEventType.MESSAGE_CREATED
      payload: {
        message_id: string
        message_content: string
        message_sender_actor_id: string
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

export type ConversationClientEvent =
  | {
      type: ConversationClientEventType.TYPING
      is_typing: boolean
    }
  | {
      type: ConversationClientEventType.SEND_MESSAGE
      message: string
    }
