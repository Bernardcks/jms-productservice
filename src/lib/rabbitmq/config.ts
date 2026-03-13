import env from "@/env";

export const rabbitConfig = {
  url: env.RABBITMQ_URL,
  exchange: env.RABBITMQ_EXCHANGE,
  exchangeType: "topic" as const,
  queue: env.RABBITMQ_QUEUE,
  routingKeys: ["listings.#"] as const,
  prefetchL: env.RABBITMQ_PREFETCH,
} as const;