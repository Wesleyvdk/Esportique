import { model } from "@medusajs/framework/utils"
import OnboardingFlow from "./onboarding-flow"
import UserOnboardingStep from "./user-onboarding-step"

const OnboardingStep = model.define("onboarding-step", {
    id: model.id().primaryKey(),
    flow_id: model.belongsTo(() => OnboardingFlow, {
        mappedBy: "steps",
    }),
    step_key: model.text(),
    title: model.text(),
    description: model.text(),
    order: model.number(),
    is_required: model.boolean().default(true),
    is_skippable: model.boolean().default(false),
    target_element: model.text().nullable(),
    placement: model.text().nullable(),
    route: model.text(),
    userSteps: model.hasMany(() => UserOnboardingStep, {
        mappedBy: "step"
    }),
})

export default OnboardingStep