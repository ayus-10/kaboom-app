import { Conversation } from '@/types/conversation'
import { create } from 'zustand'

interface SelectedConversationStore {
  selectedConversation: Conversation | null
  setSelectedConversation: (conversation: Conversation | null) => void
  clearSelectedConversation: () => void
}

export const useSelectedConversationStore = create<SelectedConversationStore>(set => ({
  selectedConversation: null,
  setSelectedConversation: conversation => set({ selectedConversation: conversation }),
  clearSelectedConversation: () => set({ selectedConversation: null }),
}))
