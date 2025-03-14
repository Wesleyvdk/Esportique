import { defineLink } from "@medusajs/framework/utils"
import MarketplaceModule from "../modules/marketplace"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
    MarketplaceModule.linkable.team,
    {
        linkable: ProductModule.linkable.product,
        isList: true
    }
)