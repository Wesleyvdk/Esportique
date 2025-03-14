import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

// Step to create a user onboarding record
const createUserOnboardingStep = createStep(
    "create-user-onboarding",
    async ({ user_id, flow_id }, { container }) => {
        const onboardingModuleService = container.resolve("ONBOARDING_MODULE")

        const userOnboarding = await onboardingModuleService.createUserOnboardings({
            user_id,
            flow_id,
            is_completed: false,
            started_at: new Date(),
            last_activity_at: new Date(),
            current_step_index: 0
        })

        return new StepResponse(userOnboarding, userOnboarding.id)
    },
    async (userOnboardingId, { container }) => {
        // Compensation function to roll back if needed
        if (!userOnboardingId) return

        const onboardingModuleService = container.resolve("ONBOARDING_MODULE")
        await onboardingModuleService.deleteUserOnboardings([userOnboardingId])
    }
)

// Create the workflow
export const startUserOnboardingWorkflow = createWorkflow(
    "start-user-onboarding",
    function (input: { user_id: string, flow_id: string }) {
        const userOnboarding = createUserOnboardingStep(input)

        return new WorkflowResponse({
            userOnboarding
        })
    }
)