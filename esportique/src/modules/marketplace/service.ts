
import { MedusaService } from "@medusajs/framework/utils"
import team from "./models/team"
import teamAdmin from "./models/team-admin"

class MarketplaceModuleService extends MedusaService({
    team,
    teamAdmin
}) {
}

export default MarketplaceModuleService