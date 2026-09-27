import { ConnectionOptions } from "bullmq";
import { env } from "../config/env";

export const redisConnection: ConnectionOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  // Upstash requires TLS in production
  tls: env.NODE_ENV === "production" ? {} : undefined,
  maxRetriesPerRequest: null,
};
