'use client'

import { OnboardingStage, useOnboardingStageStore } from '@/hooks/use-onboarding-stage-store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const RedirectToCorrectStage: React.FC = () => {
  const stage = useOnboardingStageStore(state => state.stage)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const stageToRoute: Record<OnboardingStage, string> = {
      [OnboardingStage.PROJECT]: '/dashboard/onboarding/project',
      [OnboardingStage.WIDGET]: '/dashboard/onboarding/widget',
      [OnboardingStage.EMBED]: '/dashboard/onboarding/embed',
    }

    const targetRoute = stageToRoute[stage]

    const normalize = (p: string) => p.replace(/\/$/, '')

    if (normalize(pathname) !== normalize(targetRoute)) {
      router.replace(targetRoute)
    }
  }, [stage, pathname, router])

  return null
}
