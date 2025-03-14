import { model } from "@medusajs/framework/utils"

const OnboardingFlow = model.define("onboarding-flow", {
    id: model.id().primaryKey(),
    name: model.text().unique(),
    description: model.text(),
    is_active: model.boolean().default(true),
    is_default: model.boolean().default(false),
})

export default OnboardingFlow