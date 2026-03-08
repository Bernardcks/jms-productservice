import type { CreateRoute, ListRoute } from "./listings.routes";
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
