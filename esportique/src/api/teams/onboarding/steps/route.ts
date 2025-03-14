// src/api/vendors/onboarding/steps/route.ts
import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeOnboardingStepWorkflow } from "../../../../workflows/onboarding/complete-onboarding-step"
import { MedusaError } from "@medusajs/framework/utils"

type CompleteStepRequestBody = {
    user_onboarding_id: string,
    step_id: string,
    is_skipped?: boolean
}

export const POST = async (
    req: AuthenticatedMedusaRequest<CompleteStepRequestBody>,
    res: MedusaResponse
) => {
    // Ensure the user is authenticated
    if (!req.auth_context.actor_id) {
        throw new MedusaError(
            MedusaError.Types.UNAUTHORIZED,
            "Must be authenticated as a vendor admin"
        )
    }

    const { result } = await completeOnboardingStepWorkflow(req.scope)
        .run({
            input: req.body
        })

    res.json({
        step: result.userOnboardingStep
    })
}