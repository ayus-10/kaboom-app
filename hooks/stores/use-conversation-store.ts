import { Conversation } from '@/types/conversation'
import { create } from 'zustand'

interface ConversationStore {
  selectedConversation: Conversation | null
  activeClients: string[]
  setSelectedConversation: (conversation: Conversation | null) => void
  addActiveClient: (clientId: string) => void
  removeActiveClient: (clientId: string) => void
}

export const useConversationStore = create<ConversationStore>(set => ({
  selectedConversation: null,
  activeClients: [],
  setSelectedConversation: conversation => set({ selectedConversation: conversation }),
  addActiveClient: clientId =>
    set(state => ({ activeClients: [...state.activeClients, clientId] })),
  removeActiveClient: clientId =>
    set(state => ({ activeClients: state.activeClients.filter(c => c !== clientId) })),
}))
