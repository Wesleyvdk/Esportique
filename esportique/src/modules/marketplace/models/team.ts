import { model } from "@medusajs/framework/utils"
import teamAdmin from "./team-admin"

const Team = model.define("team", {
    id: model.id().primaryKey(),
    handle: model.text().unique(),
    name: model.text(),
    logo: model.text().nullable(),
    admins: model.hasMany(() => teamAdmin)
})

export default Team