import type { ListRoute } from "./listings.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([{
    listingID: 0,
    name: "Potato Chips",
    // S3ImageURL: "https://picsum.photos/200/300",
  }]);
};
