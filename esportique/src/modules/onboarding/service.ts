
import { MedusaService } from "@medusajs/framework/utils"
import onboardingFlow from "./models/onboarding-flow"
import onboardingStep from "./models/onboarding-step"
import userOnboarding from "./models/user-onboarding"
import userOnboardingStep from "./models/user-onboarding-step"

class OnboardingModuleService extends MedusaService({
    onboardingFlow, onboardingStep, userOnboarding, userOnboardingStep
}) {
}

export default OnboardingModuleService