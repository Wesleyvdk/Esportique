import { model } from "@medusajs/framework/utils"
import OnboardingFlow from "./onboarding-flow"
import teamAdmin from "../../marketplace/models/team-admin"

const UserOnboarding = model.define("user_onboarding", {
    id: model.id().primaryKey(),
    user_id: model.id(),
    flow: model.belongsTo(() => OnboardingFlow, {
        mappedBy: "userOnboardings",
    }),
    is_completed: model.boolean().default(false),
    started_at: model.dateTime(),
    completed_at: model.dateTime().nullable(),
    last_activity_at: model.dateTime(),
    current_step_index: model.number().default(0),
    steps: model.hasMany(() => UserOnboarding),
})

export default UserOnboarding