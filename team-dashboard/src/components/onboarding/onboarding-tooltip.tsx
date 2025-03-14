"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";

export function OnboardingTooltip() {
  const {
    isOnboarding,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    skipOnboarding,
    getCurrentStepData,
  } = useOnboarding();

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<
    "top" | "right" | "bottom" | "left"
  >("bottom");

  const stepData = getCurrentStepData();

  useEffect(() => {
    if (!isOnboarding || !stepData) return;

    const updatePosition = () => {
      const targetElement = document.getElementById(stepData.targetId);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipWidth = 320;
        const tooltipHeight = 180;
        const spacing = 12;

        // Default to the specified placement, or bottom if not specified
        const preferredPlacement = stepData.placement || "bottom";

        // Calculate available space in each direction
        const spaceTop = rect.top;
        const spaceRight = window.innerWidth - rect.right;
        const spaceBottom = window.innerHeight - rect.bottom;
        const spaceLeft = rect.left;

        // Determine the best placement based on available space
        let bestPlacement = preferredPlacement;

        if (
          preferredPlacement === "top" &&
          spaceTop < tooltipHeight + spacing
        ) {
          bestPlacement =
            spaceBottom >= tooltipHeight + spacing ? "bottom" : "right";
        } else if (
          preferredPlacement === "right" &&
          spaceRight < tooltipWidth + spacing
        ) {
          bestPlacement =
            spaceLeft >= tooltipWidth + spacing ? "left" : "bottom";
        } else if (
          preferredPlacement === "bottom" &&
          spaceBottom < tooltipHeight + spacing
        ) {
          bestPlacement = spaceTop >= tooltipHeight + spacing ? "top" : "right";
        } else if (
          preferredPlacement === "left" &&
          spaceLeft < tooltipWidth + spacing
        ) {
          bestPlacement =
            spaceRight >= tooltipWidth + spacing ? "right" : "bottom";
        }

        setPlacement(bestPlacement);

        // Calculate position based on placement
        let top = 0;
        let left = 0;

        switch (bestPlacement) {
          case "top":
            top = rect.top - tooltipHeight - spacing;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case "right":
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + spacing;
            break;
          case "bottom":
            top = rect.bottom + spacing;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case "left":
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.left - tooltipWidth - spacing;
            break;
        }

        // Ensure the tooltip stays within the viewport
        top = Math.max(
          spacing,
          Math.min(window.innerHeight - tooltipHeight - spacing, top)
        );
        left = Math.max(
          spacing,
          Math.min(window.innerWidth - tooltipWidth - spacing, left)
        );

        setPosition({ top, left });

        // Highlight the target element
        targetElement.classList.add("ring-2", "ring-primary", "ring-offset-2");

        return () => {
          targetElement.classList.remove(
            "ring-2",
            "ring-primary",
            "ring-offset-2"
          );
        };
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOnboarding, stepData]);

  if (!isOnboarding || !stepData) return null;

  // Special case for welcome and complete steps
  const isWelcomeStep = stepData.id === "welcome";
  const isCompleteStep = stepData.id === "complete";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50"
        style={{
          top: isWelcomeStep || isCompleteStep ? "50%" : position.top,
          left: isWelcomeStep || isCompleteStep ? "50%" : position.left,
          transform:
            isWelcomeStep || isCompleteStep ? "translate(-50%, -50%)" : "none",
          width: isWelcomeStep || isCompleteStep ? "400px" : "320px",
        }}
      >
        <div
          className={`relative rounded-lg border bg-card p-4 text-card-foreground shadow-lg ${
            isWelcomeStep || isCompleteStep ? "w-full" : ""
          }`}
        >
          {/* Arrow based on placement */}
          {!isWelcomeStep && !isCompleteStep && (
            <div
              className={`absolute h-3 w-3 rotate-45 border bg-card ${
                placement === "top"
                  ? "bottom-[-6px] left-1/2 -translate-x-1/2 border-b border-r"
                  : placement === "right"
                  ? "left-[-6px] top-1/2 -translate-y-1/2 border-b border-l"
                  : placement === "bottom"
                  ? "left-1/2 top-[-6px] -translate-x-1/2 border-l border-t"
                  : "right-[-6px] top-1/2 -translate-y-1/2 border-r border-t"
              }`}
            />
          )}

          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{stepData.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipOnboarding}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            {stepData.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </div>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button size="sm" onClick={nextStep}>
                {currentStep === totalSteps - 1 ? "Finish" : "Next"}
                {currentStep !== totalSteps - 1 && (
                  <ChevronRight className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay for welcome and complete steps */}
      {(isWelcomeStep || isCompleteStep) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={(e: any) => e.stopPropagation()}
        />
      )}
    </AnimatePresence>
  );
}
