import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { selectListingsSchema } from "@/db/schema";

const tags = ["Listings"];

export const list = createRoute({
  path: "/listings",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListingsSchema),
      "The list of listings",
    ),
  },
});

export type ListRoute = typeof list;
