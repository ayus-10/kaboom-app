import { OnboardingSteps } from './components/onboarding-steps'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OnboardingSteps />
      {children}
    </>
  )
}
