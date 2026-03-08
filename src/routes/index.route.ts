import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "@/lib/create-app.js";

// Flow for implementing routes
// 1. Define contract
// 2. Define implementation

const router = createRouter()
  .openapi(
    createRoute({
      method: "get",
      path: "/",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: z.object({
                message: z.string(),
              }),
            },
          },
          description: "Listing API Index",
        },
      },
    }),
    (c) => {
      return c.json({
        message: "Listings API",
      });
    },
  );

export default router;
