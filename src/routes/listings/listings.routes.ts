import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { insertListingsSchema, selectListingsSchema } from "@/db/schema";

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

export const create = createRoute({
  path: "/listings",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertListingsSchema,
      "The listing to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectListingsSchema,
      "The created listing",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
