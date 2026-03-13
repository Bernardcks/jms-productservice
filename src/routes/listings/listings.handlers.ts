import type { CancelRoute, CreateRoute, GetOneRoute, ListRoute, PatchRoute, PurchaseRoute, RemoveRoute, RestockRoute } from "./listings.routes";
import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import * as listingService from "@/services/listings.service";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { status } = c.req.valid("query");
  const res = await listingService.listListings(status);

  return c.json(res, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const listing = c.req.valid("json");
  const inserted = await listingService.createListing(listing);
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const listing = await listingService.getListingById(id);

  if (!listing) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(listing, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const listing = await listingService.patchListing(id, updates);

  if (!listing) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(listing, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const removed = await listingService.removeListing(id);
  if (!removed) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

export const purchase: AppRouteHandler<PurchaseRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const { qty } = c.req.valid("json");

  try {
    const listing = await listingService.purchaseListing(id, qty);
    return c.json(listing, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof listingService.ListingNotFoundError) {
      return c.json({
        message: HttpStatusPhrases.NOT_FOUND,
      }, HttpStatusCodes.NOT_FOUND);
    }

    if (error instanceof listingService.ListingConflictError) {
      return c.json({
        message: error.message,
      }, HttpStatusCodes.CONFLICT);
    }

    throw error;
  }
};

export const restock: AppRouteHandler<RestockRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const { qty } = c.req.valid("json");

  try {
    const listing = await listingService.restockListing(id, qty);
    return c.json(listing, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof listingService.ListingNotFoundError) {
      return c.json({
        message: HttpStatusPhrases.NOT_FOUND,
      }, HttpStatusCodes.NOT_FOUND);
    }

    if (error instanceof listingService.ListingConflictError) {
      return c.json({
        message: error.message,
      }, HttpStatusCodes.CONFLICT);
    }

    throw error;
  }
};

export const cancel: AppRouteHandler<CancelRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const cancelledListing = await listingService.cancelListing(id);

  if (!cancelledListing) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(cancelledListing, HttpStatusCodes.OK);
};
