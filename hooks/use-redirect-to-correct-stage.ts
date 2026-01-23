'use client'

import { OnboardingStage, useOnboardingStageStore } from '@/hooks/use-onboarding-stage-store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useRedirectToCorrectStage = () => {
  const stage = useOnboardingStageStore(state => state.stage)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const stageToRoute: Record<OnboardingStage, string> = {
      [OnboardingStage.PROJECT]: '/admin/onboarding/project',
      [OnboardingStage.WIDGET]: '/admin/onboarding/widget',
      [OnboardingStage.EMBED]: '/admin/onboarding/embed',
    }

    const targetRoute = stageToRoute[stage]

    const normalize = (p: string) => p.replace(/\/$/, '')

    if (normalize(pathname) !== normalize(targetRoute)) {
      router.replace(targetRoute)
    }
  }, [stage, pathname, router])
}
