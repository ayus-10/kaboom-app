export enum VisitorEventType {
  ERROR = 'error',
  VISITOR_CREATED = 'visitor.created',
  VISITOR_FOUND = 'visitor.found',
  PENDING_CONVERSATION_CREATED = 'pending_conversation.created',
  PENDING_CONVERSATION_EXISTS = 'pending_conversation.exists',
  PENDING_MESSAGE_CREATED = 'pending_message.created',
}

export enum VisitorClientEventType {
  CREATE = 'create',
  SEND_MESSAGE = 'send-message',
}

export type VisitorEvent =
  | { type: VisitorEventType.ERROR; payload: { message: string } }
  | {
      type: VisitorEventType.VISITOR_CREATED
      payload: { visitor_id: string; visitor_actor_id: string }
    }
  | {
      type: VisitorEventType.VISITOR_FOUND
      payload: { visitor_id: string; visitor_actor_id: string }
    }
  | {
      type: VisitorEventType.PENDING_CONVERSATION_CREATED
      payload: { pending_conversation_id: string }
    }
  | {
      type: VisitorEventType.PENDING_CONVERSATION_EXISTS
      payload: { pending_conversation_id: string }
    }
  | {
      type: VisitorEventType.PENDING_MESSAGE_CREATED
      payload: { pending_message_id: string }
    }

export type VisitorClientEvent =
  | {
      type: VisitorClientEventType.CREATE
    }
  | {
      type: VisitorClientEventType.SEND_MESSAGE
      message: string
    }
