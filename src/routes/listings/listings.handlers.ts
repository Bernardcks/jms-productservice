import type { CreateRoute, GetOneRoute, ListRoute } from "./listings.routes";
import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "@/db";
import { listings } from "@/db/schema";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const listings = await db.query.listings.findMany();
  return c.json(listings);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const listing = c.req.valid("json");
  const [inserted] = await db.insert(listings).values(listing).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const listing = await db.query.listings.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
  if (!listing) {
    return c.json({
      message: "Not found",
    }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(listing, HttpStatusCodes.OK);
};
