import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Normal status flow
// created -> processed -> active -> sold_out/cancelled
export const listingStatusEnum = pgEnum("listing_status", [
  "created", // Default
  "processed", // AI processed
  "active", // Customers can see
  "cancelled", // Company cancels listing
  "sold_out", // Qty reaches 0
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const listings = pgTable("listings", {
  id: integer("id")
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  s3ImageUrl: text("s3_image_url"),
  name: varchar("name", { length: 255 })
    .notNull(),
  qty: integer("qty")
    .notNull()
    .default(0),
  unitPriceCents: integer("unit_price_cents")
    .notNull(),
  status: listingStatusEnum("status")
    .notNull()
    .default("created"),
  ...timestamps,
});
