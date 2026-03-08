import type { AppBindings } from "./types.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { pinoLoggerWrapper } from "@/middlewares/pino-logger.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  // Middlewares
  app.use(serveEmojiFavicon("📃"));
  app.use(pinoLoggerWrapper());

  // Error handling
  app.notFound(notFound);
  app.onError(onError);

  return app;
}
