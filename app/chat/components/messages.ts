import { Message } from '@/types/message'

export const messages: Message[] = [
  {
    id: '1',
    sender_actor_id: 'user2',
    content: 'Hey! How are you?',
    created_at: new Date(Date.now() - 3600000 * 2).toUTCString(),
    conversation_id: 'x',
  },
  {
    id: '2',
    sender_actor_id: 'user1',
    content: "I'm good! Just working on some projects",
    created_at: new Date(Date.now() - 3600000 * 2 + 120000).toUTCString(),
    conversation_id: 'x',
  },
  {
    id: '3',
    sender_actor_id: 'user2',
    content: 'Nice! What are you building?',
    created_at: new Date(Date.now() - 3600000 * 2 + 240000).toUTCString(),
    conversation_id: 'x',
  },
  {
    id: '4',
    sender_actor_id: 'user1',
    content: 'A chat widget with React and Tailwind',
    created_at: new Date(Date.now() - 1800000).toUTCString(),
    conversation_id: 'x',
  },
  {
    id: '5',
    sender_actor_id: 'user2',
    content: "That sounds cool! Can't wait to see it",
    created_at: new Date(Date.now() - 300000).toUTCString(),
    conversation_id: 'x',
  },
  {
    id: '6',
    sender_actor_id: 'user1',
    content: "Thanks! It's coming together nicely",
    created_at: new Date(Date.now() - 60000).toUTCString(),
    conversation_id: 'x',
  },
]
