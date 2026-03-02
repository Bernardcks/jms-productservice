import type { PinoLogger } from "hono-pino";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { pinoLoggerWrapper } from "./middlewares/pino-logger.js";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

const app = new OpenAPIHono<AppBindings>();

app.use(pinoLoggerWrapper());
app.notFound(notFound);
app.onError(onError);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Fake error route for testing error handling
app.get("/error", (c) => {
  c.status(418);
  c.var.logger.info("I AM A TEAPOT");
  throw new Error("This is a test error");
});

export default app;
