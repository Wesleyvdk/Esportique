import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
    useQueryGraphStep
} from "@medusajs/framework/workflows-sdk"

// Step to mark the entire onboarding as completed
const completeUserOnboardingStep = createStep(
    "complete-user-onboarding",
    async ({ user_onboarding_id }, { container }) => {
        const onboardingModuleService = container.resolve("ONBOARDING_MODULE")

        // Get the current state for compensation
        const { data: userOnboardings } = useQueryGraphStep({
            entity: "user_onboarding",
            filters: {
                id: user_onboarding_id
            }
        })

        if (userOnboardings.length === 0) {
            throw new Error("User onboarding not found")
        }

        const previousState = userOnboardings[0]

        // Update the user onboarding
        const userOnboarding = await onboardingModuleService.updateUserOnboardings({
            id: user_onboarding_id,
            is_completed: true,
            completed_at: new Date(),
            last_activity_at: new Date()
        })

        return new StepResponse(userOnboarding, previousState)
    },
    async (previousState, { container }) => {
        // Compensation function
        if (!previousState) return

        const onboardingModuleService = container.resolve("ONBOARDING_MODULE")
        await onboardingModuleService.updateUserOnboardings(previousState)
    }
)

// Create the workflow
export const completeUserOnboardingWorkflow = createWorkflow(
    "complete-user-onboarding",
    function (input: { user_onboarding_id: string }) {
        const userOnboarding = completeUserOnboardingStep(input)

        return new WorkflowResponse({
            userOnboarding
        })
    }
)