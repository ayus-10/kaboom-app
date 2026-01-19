import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum OnboardingStage {
  PROJECT = 'project',
  WIDGET = 'widget',
  EMBED = 'embed',
}

interface OnboardingStageState {
  stage: OnboardingStage
  setStage: (stage: OnboardingStage) => void
  resetStage: () => void
}

export const useOnboardingStageStore = create<OnboardingStageState>()(
  persist(
    set => ({
      stage: OnboardingStage.PROJECT,
      setStage: stage => set({ stage }),
      resetStage: () => set({ stage: OnboardingStage.PROJECT }),
    }),
    {
      name: 'onboarding-stage-store',
    }
  )
)
