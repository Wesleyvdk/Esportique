"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  targetId: string;
  placement?: "top" | "right" | "bottom" | "left";
  route?: string;
  action?: () => void;
};

type OnboardingContextType = {
  isOnboarding: boolean;
  startOnboarding: () => void;
  endOnboarding: () => void;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  getCurrentStepData: () => OnboardingStep | null;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

// Define the onboarding steps
const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Your Team Dashboard",
    description:
      "Let's take a quick tour to help you get started with your team dashboard.",
    targetId: "onboarding-welcome",
    placement: "bottom",
  },
  {
    id: "dashboard-overview",
    title: "Dashboard Overview",
    description:
      "This is your main dashboard where you can see key metrics and recent activity.",
    targetId: "dashboard-overview",
    placement: "bottom",
    route: "/dashboard",
  },
  {
    id: "sidebar-navigation",
    title: "Navigation",
    description:
      "Use the sidebar to navigate between different sections of your dashboard.",
    targetId: "sidebar-navigation",
    placement: "right",
  },
  {
    id: "products-section",
    title: "Products",
    description:
      "Manage your team's products, view sales, and request new products here.",
    targetId: "products-link",
    placement: "right",
  },
  {
    id: "requests-section",
    title: "Requests",
    description:
      "Submit and track requests for new products, price changes, and more.",
    targetId: "requests-link",
    placement: "right",
  },
  {
    id: "revenue-section",
    title: "Revenue & Payouts",
    description: "Track your team's revenue and view upcoming payouts.",
    targetId: "revenue-link",
    placement: "right",
  },
  {
    id: "analytics-section",
    title: "Analytics",
    description:
      "Get insights into your team's performance with detailed analytics.",
    targetId: "analytics-link",
    placement: "right",
  },
  {
    id: "support-section",
    title: "Support",
    description:
      "Need help? Create support tickets and get assistance from our team.",
    targetId: "support-link",
    placement: "right",
  },
  {
    id: "profile-settings",
    title: "Profile & Settings",
    description:
      "Manage your team profile and customize your dashboard settings.",
    targetId: "profile-dropdown",
    placement: "bottom",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description:
      "You've completed the tour. You can always restart it from the help menu if needed.",
    targetId: "onboarding-complete",
    placement: "bottom",
  },
];

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is a first-time user
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(
      "hasCompletedOnboarding"
    );
    if (hasCompletedOnboarding !== "true") {
      setIsFirstTimeUser(true);
    }
  }, []);

  // Navigate to the correct route for the current step if needed
  useEffect(() => {
    if (isOnboarding) {
      const step = onboardingSteps[currentStep];
      if (step.route && pathname !== step.route) {
        router.push(step.route);
      }

      // Execute any actions for the current step
      if (step.action) {
        step.action();
      }

      // Scroll to the target element if it exists
      const targetElement = document.getElementById(step.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isOnboarding, currentStep, pathname, router]);

  const startOnboarding = () => {
    setCurrentStep(0);
    setIsOnboarding(true);
  };

  const endOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem("hasCompletedOnboarding", "true");
    setIsFirstTimeUser(false);
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    endOnboarding();
  };

  const getCurrentStepData = () => {
    return onboardingSteps[currentStep] || null;
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        startOnboarding,
        endOnboarding,
        currentStep,
        totalSteps: onboardingSteps.length,
        nextStep,
        prevStep,
        skipOnboarding,
        getCurrentStepData,
        isFirstTimeUser,
        setIsFirstTimeUser,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
