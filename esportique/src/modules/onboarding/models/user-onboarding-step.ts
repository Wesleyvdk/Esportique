import { model } from "@medusajs/framework/utils"
import OnboardingStep from "./onboarding-step"
import UserOnboarding from "./user-onboarding"


const UserOnboardingStep = model.define("user_onboarding_step", {
    id: model.id().primaryKey(),
    userOnboarding: model.belongsTo(() => UserOnboarding, {
        mappedBy: "steps",
    }),
    step: model.belongsTo(() => OnboardingStep, {
        mappedBy: "userSteps",
    }),
    is_completed: model.boolean().default(false),
    is_skipped: model.boolean().default(false),
    time_spent_seconds: model.number().default(0),
    viewed_at: model.dateTime().nullable(),
    completed_at: model.dateTime().nullable(),
})

export default UserOnboardingStep