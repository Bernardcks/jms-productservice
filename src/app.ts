import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { pinoLoggerWrapper } from "./middlewares/pino-logger.js";

const app = new OpenAPIHono();

app.use(pinoLoggerWrapper());
app.notFound(notFound);
app.onError(onError);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Fake error route for testing error handling
app.get("/error", (c) => {
  c.status(418);
  throw new Error("This is a test error");
});

export default app;
