import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { insertListingsSchema, selectListingsSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

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
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertListingsSchema),
      "Validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/listings/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectListingsSchema,
      "The requested listing",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Listing not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
