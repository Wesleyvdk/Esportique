import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { getOrdersListWorkflow } from "@medusajs/medusa/core-flows"
import MarketplaceModuleService from "../../../modules/marketplace/service";
import { MARKETPLACE_MODULE } from "../../../modules/marketplace";

export const GET = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
    const marketplaceModuleService: MarketplaceModuleService =
        req.scope.resolve(MARKETPLACE_MODULE)

    const teamAdmin = await marketplaceModuleService.retrieveTeamAdmin(
        req.auth_context.actor_id,
        {
            relations: ["team"]
        }
    )

    const { data: [team] } = await query.graph({
        entity: "team",
        fields: ["orders.*"],
        filters: {
            id: [teamAdmin.team.id]
        }
    })

    const { result: orders } = await getOrdersListWorkflow(req.scope)
        .run({
            input: {
                fields: [
                    "metadata",
                    "total",
                    "subtotal",
                    "shipping_total",
                    "tax_total",
                    "items.*",
                    "items.tax_lines",
                    "items.adjustments",
                    "items.variant",
                    "items.variant.product",
                    "items.detail",
                    "shipping_methods",
                    "payment_collections",
                    "fulfillments",
                ],
                variables: {
                    filters: {
                        id: team.orders.map((order) => order.id)
                    }
                }
            }
        })

    res.json({
        orders
    })
}