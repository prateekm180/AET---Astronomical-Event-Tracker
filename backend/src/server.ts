import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { env } from "./config/env";
import { registerRateLimiter } from "./middleware/rateLimiter";
import { authRoutes } from "./modules/auth/auth.routes";
import { eventRoutes } from "./modules/events/events.routes";
import { userRoutes } from "./modules/users/users.routes";

const app = Fastify({ logger: true });

async function bootstrap() {
  await app.register(cors, { origin: true });
  await app.register(jwt, { secret: env.JWT_SECRET });
  await registerRateLimiter(app);

  // Root & Health Routes
  app.get("/", async () => ({
    status: "online",
    system: "AET Scientific API Engine v2.0",
    message: "Welcome to Astronomical Event Tracker API Hub",
    timestamp: new Date().toISOString()
  }));

  app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

  // Favicon 404 noise reducer (Browser automatic request handle karne ke liye)
  app.get("/favicon.ico", async (req, reply) => reply.status(204).send());

  // Module Route Registration
  await app.register(authRoutes);
  await app.register(eventRoutes);
  await app.register(userRoutes);

  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`🚀 AET Server ready at http://localhost:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();