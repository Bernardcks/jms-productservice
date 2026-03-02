import { pinoLogger } from "hono-pino";

export function pinoLoggerWrapper() {
  return pinoLogger();
}
