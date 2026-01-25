import { ActiveMessage, VisitorMessage } from '@/types/message'
import { create } from 'zustand'

interface ActiveMessagesStore {
  activeMessages: ActiveMessage[]
  setActiveMessages: (messages: ActiveMessage[]) => void
  addActiveMessage: (message: ActiveMessage) => void
  clearActiveMessages: () => void
}

export const useActiveMessagesStore = create<ActiveMessagesStore>(set => ({
  activeMessages: [],
  setActiveMessages: messages => set({ activeMessages: messages }),
  addActiveMessage: message =>
    set(state => ({ activeMessages: [...state.activeMessages, message] })),
  clearActiveMessages: () => set({ activeMessages: [] }),
}))

interface VisitorMessagesStore {
  visitorMessages: VisitorMessage[]
  setVisitorMessages: (messages: VisitorMessage[]) => void
  addVisitorMessage: (message: VisitorMessage) => void
  clearVisitorMessages: () => void
}

export const useVisitorMessagesStore = create<VisitorMessagesStore>(set => ({
  visitorMessages: [],
  setVisitorMessages: messages => set({ visitorMessages: messages }),
  addVisitorMessage: message =>
    set(state => ({ visitorMessages: [...state.visitorMessages, message] })),
  clearVisitorMessages: () => set({ visitorMessages: [] }),
}))
