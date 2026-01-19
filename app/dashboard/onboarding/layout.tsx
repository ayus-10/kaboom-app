import { OnboardingSteps } from './components/onboarding-steps'
import { RedirectToCorrectStage } from './components/redirect-to-correct-stage'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OnboardingSteps />
      <RedirectToCorrectStage />
      {children}
    </>
  )
}
