import { FastifyInstance } from "fastify";
import { UsersService } from "./users.service";
import { UpdateProfileSchema } from "./users.schema";
import { authGuard, AuthenticatedRequest } from "../../middleware/authGuard";

export async function userRoutes(app: FastifyInstance) {
  app.put("/users/profile", { preHandler: [authGuard] }, async (req, reply) => {
    const authReq = req as AuthenticatedRequest;
    const body = UpdateProfileSchema.parse(req.body);

    const updatedUser = await UsersService.updateUserLocation(
      authReq.user.id,
      body.timezone,
      body.latitude,
      body.longitude
    );

    return reply.send({ user: updatedUser });
  });
}