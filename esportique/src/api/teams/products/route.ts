import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import {
    CreateProductWorkflowInputDTO,
    IProductModuleService,
    ISalesChannelModuleService
} from "@medusajs/framework/types"
import {
    Modules,
    ContainerRegistrationKeys
} from "@medusajs/framework/utils"
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
        fields: ["products.*"],
        filters: {
            id: [teamAdmin.team.id],
        },
    })

    res.json({
        products: team.products
    })
}

type RequestType = CreateProductWorkflowInputDTO

export const POST = async (
    req: AuthenticatedMedusaRequest<RequestType>,
    res: MedusaResponse
) => {
    const link = req.scope.resolve("link")
    const marketplaceModuleService: MarketplaceModuleService =
        req.scope.resolve(MARKETPLACE_MODULE)
    const productModuleService: IProductModuleService = req.scope
        .resolve(Modules.PRODUCT)
    const salesChannelModuleService: ISalesChannelModuleService = req.scope
        .resolve(Modules.SALES_CHANNEL)
    // Retrieve default sales channel to make the product available in.
    // Alternatively, you can link sales channels to teams and allow teams
    // to manage sales channels
    const salesChannels = await salesChannelModuleService.listSalesChannels()
    const teamAdmin = await marketplaceModuleService.retrieveTeamAdmin(
        req.auth_context.actor_id,
        {
            relations: ["team"]
        }
    )
    console.log(teamAdmin);

    const { result } = await createProductsWorkflow(req.scope)
        .run({
            input: {
                products: [{
                    ...req.body,
                    sales_channels: salesChannels
                }]
            }
        })

    // link product to team
    await link.create({
        [MARKETPLACE_MODULE]: {
            team_id: teamAdmin.team.id
        },
        [Modules.PRODUCT]: {
            product_id: result[0].id
        }
    })

    // retrieve product again
    const product = await productModuleService.retrieveProduct(
        result[0].id
    )

    res.json({
        product
    })
}