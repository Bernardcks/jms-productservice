import { createRouter } from "@/lib/create-app.js";

import * as handlers from "./listings.handlers.js";
import * as routes from "./listings.routes.js";

const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;
