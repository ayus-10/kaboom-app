export enum VisitorEventType {
  ERROR = 'error',
  PONG = 'pong',
  VISITOR_CREATED = 'visitor.created',
  PENDING_CONVERSATION_CREATED = 'pending_conversation.created',
  PENDING_CONVERSATION_EXISTS = 'pending_conversation.exists',
}

type BaseEvent =
  | { type: VisitorEventType.ERROR; payload: { message: string } }
  | { type: VisitorEventType.PONG }

export type VisitorEvent =
  | BaseEvent
  | { type: VisitorEventType.VISITOR_CREATED; payload: { visitor_id: string } }
  | {
      type: VisitorEventType.PENDING_CONVERSATION_CREATED
      payload: { pending_conversation_id: string }
    }
  | {
      type: VisitorEventType.PENDING_CONVERSATION_EXISTS
      payload: { pending_conversation_id: string }
    }
