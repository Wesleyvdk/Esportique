import { model } from "@medusajs/framework/utils"
import UserOnboarding from "./user-onboarding"

const OnboardingFlow = model.define("onboarding-flow", {
    id: model.id().primaryKey(),
    name: model.text().unique(),
    description: model.text(),
    is_active: model.boolean().default(true),
    is_default: model.boolean().default(false),
    userOnboardings: model.hasMany(() => UserOnboarding, {
        mappedBy: "flow"
    })
})

export default OnboardingFlow