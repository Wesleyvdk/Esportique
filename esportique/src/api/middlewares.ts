import { ConfigModule } from "@medusajs/framework";
import {
  defineMiddlewares,
  authenticate,
  validateAndTransformBody,
  MedusaRequest,
  MedusaNextFunction,
  MedusaResponse,
} from "@medusajs/framework/http";
import { parseCorsOrigins } from "@medusajs/framework/utils";
import { AdminCreateProduct } from "@medusajs/medusa/api/admin/products/validators";
import cors from "cors";
import { z } from "zod"

// Define validation schemas
const StartOnboardingSchema = z.object({
  flow_id: z.string().min(1)
}).strict()

const CompleteStepSchema = z.object({
  user_onboarding_id: z.string().min(1),
  step_id: z.string().min(1),
  is_skipped: z.boolean().optional()
}).strict()

export default defineMiddlewares({
  routes: [
    {
      matcher: "/teams*",
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          const configModule: ConfigModule = req.scope.resolve("configModule");

          return cors({
            origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
            credentials: true,
          })(req, res, next);
        },
      ],
    },
    {
      matcher: "/teams",
      method: "POST",
      middlewares: [
        authenticate("team", ["session", "bearer"], {
          allowUnregistered: true,
        }),
      ],
    },
    {
      matcher: "/teams/*",
      middlewares: [authenticate("team", ["session", "bearer"])],
    },
    {
      matcher: "/teams/me",
      middlewares: [
        authenticate("team", ["bearer"], {
          allowUnauthenticated: true,
        }),
      ],
    },
    {
      matcher: "/admin/teams*",
      middlewares: [authenticate("team", ["session", "bearer"])],
    },

    {
      matcher: "/teams/products",
      method: "POST",
      middlewares: [
        authenticate("team", ["session", "bearer"]),
        validateAndTransformBody(AdminCreateProduct),
      ],
    },
  ],
});
