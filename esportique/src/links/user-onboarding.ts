import { defineLink } from "@medusajs/framework/utils"
import OnboardingModule from "../modules/onboarding"
import MarketplaceModule from "../modules/marketplace"

export const ONBOARDING_MODULE = "onboardingModuleService"

export default defineLink(OnboardingModule.linkable.userOnboarding, {
    linkable: MarketplaceModule.linkable.teamAdmin,
    isList: true,
})