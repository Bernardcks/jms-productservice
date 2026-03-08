import createApp from "./lib/create-app.js";

const app = createApp();

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
