import {
    AuthenticatedMedusaRequest,
    MedusaResponse
} from "@medusajs/framework"
import { deleteTeamAdminWorkflow } from "../../../../workflows/marketplace/delete-team-admin"

export const DELETE = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    await deleteTeamAdminWorkflow(req.scope).run({
        input: {
            id: req.params.id
        }
    })

    res.json({ message: "success" })
}