import { create } from 'zustand'

interface OnboardingStore {
  projectId: string | null
  widgetSlug: string | null
  setProjectId: (id: string) => void
  setWidgetSlug: (slug: string) => void
}

export const useOnboardingStore = create<OnboardingStore>(set => ({
  projectId: null,
  widgetSlug: null,
  setProjectId: id => set({ projectId: id }),
  setWidgetSlug: slug => set({ widgetSlug: slug }),
}))
