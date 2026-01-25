'use client'

import { create } from 'zustand'

interface OnboardingStore {
  projectId: string | null
  widgetId: string | null
  setProjectId: (id: string) => void
  setWidgetId: (id: string) => void
}

export const useOnboardingStore = create<OnboardingStore>(set => ({
  projectId: null,
  widgetId: null,
  setProjectId: id => set({ projectId: id }),
  setWidgetId: id => set({ widgetId: id }),
}))
