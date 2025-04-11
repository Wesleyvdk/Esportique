import { model } from "@medusajs/framework/utils"
import team from "./team"

const TeamAdmin = model.define("team_admin", {
    id: model.id().primaryKey(),
    first_name: model.text().nullable(),
    last_name: model.text().nullable(),
    email: model.text().unique(),
    team: model.belongsTo(() => team, {
        mappedBy: "admins"
    }),
    onboarding_flow_ids: model.json()
})

export default TeamAdmin