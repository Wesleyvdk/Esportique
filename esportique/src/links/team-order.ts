import { defineLink } from "@medusajs/framework/utils"
import MarketplaceModule from "../modules/marketplace"
import OrderModule from "@medusajs/medusa/order"

export default defineLink(
    MarketplaceModule.linkable.team,
    {
        linkable: OrderModule.linkable.order,
        isList: true
    }
)