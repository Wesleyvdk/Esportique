import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { CartDTO, CartLineItemDTO } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

type StepInput = {
    cart: CartDTO
}

const groupTeamItemsStep = createStep(
    "group-team-items",
    async ({ cart }: StepInput, { container }) => {
        const query = container.resolve(ContainerRegistrationKeys.QUERY)

        const teamsItems: Record<string, CartLineItemDTO[]> = {}

        await Promise.all(cart.items?.map(async (item) => {
            const { data: [product] } = await query.graph({
                entity: "product",
                fields: ["team.*"],
                filters: {
                    id: [item.product_id]
                }
            })

            const teamId = product.team?.id

            if (!teamId) {
                return
            }
            teamsItems[teamId] = [
                ...(teamsItems[teamId] || []),
                item
            ]
        }))

        return new StepResponse({
            teamsItems
        })
    }
)

export default groupTeamItemsStep