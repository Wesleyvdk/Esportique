import {
    AuthenticatedMedusaRequest,
    MedusaResponse
} from "@medusajs/framework";
import createTeamOrdersWorkflow from "../../../../../workflows/marketplace/create-team-orders";

export const POST = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    const cartId = req.params.id

    const { result } = await createTeamOrdersWorkflow(req.scope)
        .run({
            input: {
                cart_id: cartId
            }
        })

    res.json({
        type: "order",
        order: result.parent_order
    })
}