import { createRouter } from "@/lib/create-app";

import * as handlers from "./listings.handlers";
import * as routes from "./listings.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;
