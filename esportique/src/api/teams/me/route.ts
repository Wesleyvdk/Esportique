import {
    AuthenticatedMedusaRequest,
    MedusaResponse
} from "@medusajs/framework"
import MarketplaceModuleService from "../../../modules/marketplace/service"
import { MARKETPLACE_MODULE } from "../../../modules/marketplace"

export const GET = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    const marketplaceModuleService: MarketplaceModuleService =
        req.scope.resolve(MARKETPLACE_MODULE)

    const teamAdmin = await marketplaceModuleService.retrieveTeamAdmin(
        req.auth_context.actor_id,
        {
            relations: ["team"]
        }
    )

    res.json({
        user: teamAdmin
    })
}