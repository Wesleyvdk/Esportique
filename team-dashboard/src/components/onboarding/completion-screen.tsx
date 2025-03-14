"use client";

import { useEffect } from "react";

import { useOnboarding } from "@/lib/onboarding-context";

export function CompletionScreen() {
  const { isOnboarding, currentStep, totalSteps } = useOnboarding();

  useEffect(() => {
    // Add the completion element to the DOM for the onboarding tooltip to target
    if (isOnboarding && currentStep === totalSteps - 1) {
      const completeElement = document.createElement("div");
      completeElement.id = "onboarding-complete";
      completeElement.style.position = "fixed";
      completeElement.style.top = "50%";
      completeElement.style.left = "50%";
      completeElement.style.zIndex = "-1";
      document.body.appendChild(completeElement);

      return () => {
        document.body.removeChild(completeElement);
      };
    }
  }, [isOnboarding, currentStep, totalSteps]);

  return null;
}
