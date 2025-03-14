import {
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import {
    setAuthAppMetadataStep,
} from "@medusajs/medusa/core-flows"
import createTeamAdminStep from "./steps/create-team-admin"

export type CreateTeamAdminWorkflowInput = {
    admin: {
        email: string
        first_name?: string
        last_name?: string
        team_id: string
    }
    authIdentityId: string
}

type CreateTeamAdminWorkflowOutput = {
    id: string
    first_name: string
    last_name: string
    email: string
}

const createteamAdminWorkflow = createWorkflow(
    "create-team-admin",
    function (input: CreateTeamAdminWorkflowInput) {
        const teamAdmin = createTeamAdminStep({
            admin: input.admin,
        })

        setAuthAppMetadataStep({
            authIdentityId: input.authIdentityId,
            actorType: "team",
            value: teamAdmin.id,
        })

        return new WorkflowResponse(teamAdmin)
    }
)

export default createteamAdminWorkflow