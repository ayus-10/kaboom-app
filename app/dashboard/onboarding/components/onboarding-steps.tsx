'use client'

import { OnboardingStage, useOnboardingStageStore } from '@/hooks/use-onboarding-stage-store'

export const OnboardingSteps: React.FC = () => {
  const onboardingStage = useOnboardingStageStore(state => state.stage)

  return (
    <div>
      <h2 className="sr-only">Steps</h2>
      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-200">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-600">
          <li className="flex items-center gap-2 bg-white p-2">
            <span
              className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${onboardingStage === OnboardingStage.PROJECT ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
            >
              1
            </span>
            <span className="hidden sm:block">Project</span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span
              className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${onboardingStage === OnboardingStage.WIDGET ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
            >
              2
            </span>
            <span className="hidden sm:block">Widget</span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span
              className={`size-6 rounded-full text-center text-[10px]/6 font-bold ${onboardingStage === OnboardingStage.EMBED ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
            >
              3
            </span>
            <span className="hidden sm:block">Embed</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
