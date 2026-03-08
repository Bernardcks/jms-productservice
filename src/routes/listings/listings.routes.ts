import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Listings"];

export const list = createRoute({
  path: "/listings",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({
        listingID: z.int(),
        name: z.string(),
        // S3ImageURL: z.url,
      })),
      "The list of listings",
    ),
  },
});

export type ListRoute = typeof list;
