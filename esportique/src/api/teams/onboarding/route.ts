// src/api/vendors/onboarding/route.ts
import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { startUserOnboardingWorkflow } from "../../../workflows/onboarding/create-user-onboarding"
import { MedusaError } from "@medusajs/framework/utils"

type StartOnboardingRequestBody = {
    flow_id: string
}

export const POST = async (
    req: AuthenticatedMedusaRequest<StartOnboardingRequestBody>,
    res: MedusaResponse
) => {
    // Get the authenticated vendor admin's ID
    const user_id = req.auth_context.actor_id

    if (!user_id) {
        throw new MedusaError(
            MedusaError.Types.UNAUTHORIZED,
            "Must be authenticated as a vendor admin"
        )
    }

    const { result } = await startUserOnboardingWorkflow(req.scope)
        .run({
            input: {
                user_id,
                flow_id: req.body.flow_id
            }
        })

    res.json({
        onboarding: result.userOnboarding
    })
}