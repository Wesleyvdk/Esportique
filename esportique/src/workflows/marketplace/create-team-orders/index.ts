import {
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import {
    useQueryGraphStep,
    createRemoteLinkStep,
    completeCartWorkflow,
    getOrderDetailWorkflow
} from "@medusajs/medusa/core-flows"
import groupTeamItemsStep from "./steps/group-team-items"
import createTeamOrdersStep from "./steps/create-team-orders"

type WorkflowInput = {
    cart_id: string
}

const createTeamOrdersWorkflow = createWorkflow(
    "create-team-order",
    (input: WorkflowInput) => {
        const { data: carts } = useQueryGraphStep({
            entity: "cart",
            fields: ["id", "items.*"],
            filters: { id: input.cart_id },
            options: {
                throwIfKeyNotFound: true
            }
        })

        const { id: orderId } = completeCartWorkflow.runAsStep({
            input: {
                id: carts[0].id
            }
        })

        const { teamsItems } = groupTeamItemsStep({
            cart: carts[0]
        })

        const order = getOrderDetailWorkflow.runAsStep({
            input: {
                order_id: orderId,
                fields: [
                    "region_id",
                    "customer_id",
                    "sales_channel_id",
                    "email",
                    "currency_code",
                    "shipping_address.*",
                    "billing_address.*",
                    "shipping_methods.*",
                ]
            }
        })

        const {
            orders: teamOrders,
            linkDefs
        } = createTeamOrdersStep({
            parentOrder: order,
            teamsItems
        })

        createRemoteLinkStep(linkDefs)

        return new WorkflowResponse({
            parent_order: order,
            team_orders: teamOrders
        })
    }
)

export default createTeamOrdersWorkflow