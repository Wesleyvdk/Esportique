import {
    createWorkflow,
    WorkflowResponse,
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import {
    useQueryGraphStep
} from "@medusajs/medusa/core-flows"
import OnboardingModuleService from "../../../modules/onboarding/service"
type WorkflowInput = {
    user_onboarding_id: string;
    step_id: string;
    is_skipped?: boolean;
}
// Step to mark a user onboarding step as completed
const completeUserOnboardingStepStep = createStep(
    "complete-user-onboarding-step",
    async ({ user_onboarding_id, step_id, is_skipped = false }: WorkflowInput, { container }) => {
        const onboardingModuleService: OnboardingModuleService = container.resolve("ONBOARDING_MODULE")

        // Get or create the user onboarding step
        const { data: existingSteps } = useQueryGraphStep({
            entity: "user_onboarding_step",
            filters: {
                user_onboarding_id,
                step_id
            },
            fields: []
        })

        let userOnboardingStep

        if (existingSteps.length > 0) {
            // Update existing step
            userOnboardingStep = await onboardingModuleService.updateUserOnboardingSteps({
                id: existingSteps[0].id,
                is_completed: true,
                is_skipped,
                completed_at: new Date(),
                time_spent_seconds: calculateTimeSpent(existingSteps[0])
            })
        } else {
            const id = user_onboarding_id
            // Create new step
            userOnboardingStep = await onboardingModuleService.createUserOnboardingSteps({
                id,
                step_id,
                is_completed: true,
                is_skipped,
                viewed_at: new Date(),
                completed_at: new Date()
            })
        }

        // Update the user onboarding's last activity
        await onboardingModuleService.updateUserOnboardings({
            id: user_onboarding_id,
            last_activity_at: new Date()
        })

        return new StepResponse(userOnboardingStep, {
            id: userOnboardingStep.id,
            previousState: existingSteps[0] || null
        })
    },
    async (context, { container }) => {
        // Compensation function
        if (!context) return

        const onboardingModuleService: OnboardingModuleService = container.resolve("ONBOARDING_MODULE")

        if (context.previousState) {
            // Revert to previous state
            await onboardingModuleService.updateUserOnboardingSteps(context.previousState)
        } else {
            // Delete if it was newly created
            await onboardingModuleService.deleteUserOnboardingSteps([context.id])
        }
    }
)

// Helper function to calculate time spent
function calculateTimeSpent(step) {
    if (!step.viewed_at) return 0

    const now = new Date()
    const viewed = new Date(step.viewed_at)
    return Math.floor((now.getTime() - viewed.getTime()) / 1000)
}

// Create the workflow
export const completeOnboardingStepWorkflow = createWorkflow(
    "complete-onboarding-step",
    function (input: {
        user_onboarding_id: string,
        step_id: string,
        is_skipped?: boolean
    }) {
        const userOnboardingStep = completeUserOnboardingStepStep(input)

        return new WorkflowResponse({
            userOnboardingStep
        })
    }
)