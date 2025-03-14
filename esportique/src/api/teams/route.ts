import {
    AuthenticatedMedusaRequest,
    MedusaResponse
} from "@medusajs/framework"
import { MedusaError } from "@medusajs/framework/utils"
import { z } from "zod"
import MarketplaceModuleService from "../../modules/marketplace/service";
import createTeamAdminWorkflow from "../../workflows/marketplace/create-team-admin";

const schema = z.object({
    name: z.string(),
    handle: z.string().optional(),
    logo: z.string().optional(),
    admin: z.object({
        email: z.string(),
        first_name: z.string().optional(),
        last_name: z.string().optional()
    }).strict()
}).strict()

type RequestBody = {
    name: string,
    handle?: string,
    logo?: string,
    admin: {
        email: string,
        first_name?: string,
        last_name?: string
    }
}

export const POST = async (
    req: AuthenticatedMedusaRequest<RequestBody>,
    res: MedusaResponse
) => {
    // If `actor_id` is present, the request carries 
    // authentication for an existing Team admin
    if (req.auth_context?.actor_id) {
        throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Request already authenticated as a team."
        )
    }

    const { admin, ...teamData } = schema.parse(req.body) as RequestBody

    const marketplaceModuleService: MarketplaceModuleService = req.scope
        .resolve("marketplaceModuleService")

    // create team
    let team = await marketplaceModuleService.createTeams(teamData)

    // create team admin
    await createTeamAdminWorkflow(req.scope)
        .run({
            input: {
                admin: {
                    ...admin,
                    team_id: team.id
                },
                authIdentityId: req.auth_context.auth_identity_id,
            }
        })

    // retrieve team again with admins
    team = await marketplaceModuleService.retrieveTeam(team.id, {
        relations: ["admins"]
    })

    res.json({
        team,
    })
}