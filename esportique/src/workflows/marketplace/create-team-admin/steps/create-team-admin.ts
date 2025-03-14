import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { CreateTeamAdminWorkflowInput } from ".."
import MarketplaceModuleService from "../../../../modules/marketplace/service"
import { MARKETPLACE_MODULE } from "../../../../modules/marketplace"

const createTeamAdminStep = createStep(
    "create-team-admin-step",
    async ({
        admin: adminData,
    }: Pick<CreateTeamAdminWorkflowInput, "admin">,
        { container }) => {
        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        const teamAdmin = await marketplaceModuleService.createTeamAdmins(
            adminData
        )

        return new StepResponse(
            teamAdmin,
            teamAdmin
        )
    },
    async (teamAdmin, { container }) => {
        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        marketplaceModuleService.deleteTeamAdmins(teamAdmin!.id)
    }
)

export default createTeamAdminStep