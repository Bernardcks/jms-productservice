import type { AppBindings } from "./types.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { pinoLoggerWrapper } from "@/middlewares/pino-logger.js";

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>();

  // Middlewares
  app.use(serveEmojiFavicon("📃"));
  app.use(pinoLoggerWrapper());

  // Error handling
  app.notFound(notFound);
  app.onError(onError);

  return app;
}
