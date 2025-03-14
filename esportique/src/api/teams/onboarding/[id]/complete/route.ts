// src/api/vendors/onboarding/[id]/complete/route.ts
import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeUserOnboardingWorkflow } from "../../../../../workflows/onboarding/complete-user-onboarding"
import { MedusaError } from "@medusajs/framework/utils"

export const POST = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    // Ensure the user is authenticated
    if (!req.auth_context.actor_id) {
        throw new MedusaError(
            MedusaError.Types.UNAUTHORIZED,
            "Must be authenticated as a vendor admin"
        )
    }

    const { id } = req.params

    const { result } = await completeUserOnboardingWorkflow(req.scope)
        .run({
            input: {
                user_onboarding_id: id
            }
        })

    res.json({
        onboarding: result.userOnboarding
    })
}