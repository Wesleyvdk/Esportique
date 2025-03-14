import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import MarketplaceModuleService from "../../../../modules/marketplace/service"
import { MARKETPLACE_MODULE } from "../../../../modules/marketplace"
import { DeleteTeamAdminWorkflow } from ".."

const deleteTeamAdminStep = createStep(
    "delete-team-admin-step",
    async ({ id }: DeleteTeanmdminWorkflow, { container }) => {
        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        const teamAdmin = await marketplaceModuleService.retrieveTeamAdmin(id)

        await marketplaceModuleService.deleteTeamAdmins(id)

        return new StepResponse(
            undefined,
            teamAdmin
        )
    },
    async (teamAdmin, { container }) => {
        const marketplaceModuleService: MarketplaceModuleService =
            container.resolve(MARKETPLACE_MODULE)

        const { team: _, ...teamAdminData } = teamAdmin

        marketplaceModuleService.createTeamAdmins(teamAdminData)
    }
)

export default deleteTeamAdminStep