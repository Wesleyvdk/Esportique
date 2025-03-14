"use client";

import { useOnboarding } from "@/lib/onboarding-context";
import { Progress } from "@/components/ui/progress";

export function OnboardingProgress() {
  const { isOnboarding, currentStep, totalSteps } = useOnboarding();

  if (!isOnboarding) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full bg-background p-2 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <span className="text-xs text-muted-foreground">
          Onboarding Progress: {currentStep + 1} of {totalSteps}
        </span>
        <div className="w-64">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
}
