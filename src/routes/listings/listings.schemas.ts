import { z } from "@hono/zod-openapi";
import { listingStatusEnum, selectListingsSchema } from "@/db/schema";

const listingOptionalFieldsSchema = z.object({
  name: z.string().max(255).optional(),
  description: z.string().optional(),
  qty: z.coerce.number().int().nonnegative().optional(),
  unitPriceCents: z.coerce.number().int().nonnegative().optional(),
  bestBefore: z.coerce.date().optional(),
  status: z.enum(listingStatusEnum.enumValues).optional(),
});

export const listListingsQuerySchema = z.object({
  status: z.enum(listingStatusEnum.enumValues).optional(),
});

export const listListingsResponseSchema = z.array(selectListingsSchema);

export const insertListingBodySchema = listingOptionalFieldsSchema;

export const patchListingBodySchema = insertListingBodySchema.partial();

export const purchaseListingBodySchema = z.object({
  qty: z.coerce.number().int().positive(),
});
