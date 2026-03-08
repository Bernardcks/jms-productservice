import type { ListRoute } from "./listings.routes";
import type { AppRouteHandler } from "@/lib/types";
import db from "@/db";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const listings = await db.query.listings.findMany();
  return c.json(listings);
};
