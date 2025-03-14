// User model (simplified, you likely have your own)
interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

// Onboarding flow definition
interface OnboardingFlow {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    steps?: OnboardingStep[];
}

// Individual step definition
interface OnboardingStep {
    id: string;
    flowId: string;
    stepKey: string;
    title: string;
    description: string;
    order: number;
    isRequired: boolean;
    isSkippable: boolean;
    targetElement: string;
    placement: 'top' | 'right' | 'bottom' | 'left';
    route?: string;
    createdAt: Date;
    updatedAt: Date;
}

// User's overall onboarding progress
interface UserOnboarding {
    id: string;
    userId: string;
    flowId: string;
    isCompleted: boolean;
    startedAt: Date;
    completedAt?: Date;
    lastActivityAt: Date;
    currentStepIndex: number;
    createdAt: Date;
    updatedAt: Date;
    steps?: UserOnboardingStep[];
}

// User's progress on individual steps
interface UserOnboardingStep {
    id: string;
    userOnboardingId: string;
    stepId: string;
    isCompleted: boolean;
    isSkipped: boolean;
    timeSpentSeconds: number;
    viewedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}