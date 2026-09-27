import rateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export async function registerRateLimiter(app: FastifyInstance) {
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: "Rate limit exceeded. Maximum 100 requests per minute.",
    }),
  });
}