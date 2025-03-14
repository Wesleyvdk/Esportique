import { MedusaError } from "@medusajs/framework/utils"
import {
    WorkflowData,
    WorkflowResponse,
    createWorkflow,
    transform,
} from "@medusajs/framework/workflows-sdk"
import {
    setAuthAppMetadataStep,
    useQueryGraphStep
} from "@medusajs/medusa/core-flows"
import deleteTeamAdminStep from "./steps/delete-team-admin"

export type DeleteTeamAdminWorkflow = {
    id: string
}

export const deleteTeamAdminWorkflow = createWorkflow(
    "delete-team-admin",
    (
        input: WorkflowData<DeleteTeamAdminWorkflow>
    ): WorkflowResponse<string> => {
        deleteTeamAdminStep(input)

        const { data: authIdentities } = useQueryGraphStep({
            entity: "auth_identity",
            fields: ["id"],
            filters: {
                app_metadata: {
                    team_id: input.id,
                },
            },
        })

        const authIdentity = transform(
            { authIdentities },
            ({ authIdentities }) => {
                const authIdentity = authIdentities[0]

                if (!authIdentity) {
                    throw new MedusaError(
                        MedusaError.Types.NOT_FOUND,
                        "Auth identity not found"
                    )
                }

                return authIdentity
            }
        )

        setAuthAppMetadataStep({
            authIdentityId: authIdentity.id,
            actorType: "team",
            value: null,
        })

        return new WorkflowResponse(input.id)
    }
)