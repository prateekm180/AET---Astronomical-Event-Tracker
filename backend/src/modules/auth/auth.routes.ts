import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { authGuard, AuthenticatedRequest } from "../../middleware/authGuard";
import { prisma } from "../../lib/prisma";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", async (req, reply) => {
    const body = RegisterSchema.parse(req.body);
    const user = await AuthService.registerUser(body.email, body.password, body.username);
    const token = app.jwt.sign({ id: user.id, email: user.email });
    return reply.status(201).send({ token, user });
  });

  app.post("/auth/login", async (req, reply) => {
    const body = LoginSchema.parse(req.body);
    const user = await AuthService.validateUser(body.email, body.password);
    if (!user) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
    const token = app.jwt.sign({ id: user.id, email: user.email });
    return reply.send({ token, user });
  });

  app.get("/auth/me", { preHandler: [authGuard] }, async (req: FastifyRequest, reply) => {
    const authReq = req as AuthenticatedRequest;
    const user = await prisma.user.findUnique({
      where: { id: authReq.user.id },
      select: { id: true, email: true, username: true, timezone: true, createdAt: true },
    });
    return reply.send({ user });
  });

  app.post("/auth/logout", async (_, reply) => {
    return reply.send({ message: "Successfully logged out" });
  });
}