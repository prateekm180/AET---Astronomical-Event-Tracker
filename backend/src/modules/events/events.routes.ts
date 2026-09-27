import { FastifyInstance } from "fastify";
import { EventsService } from "./events.service";
import { EventQuerySchema } from "./events.schema";
import { getPersonalizedInsight } from "../../agents/agentB";
import { authGuard, AuthenticatedRequest } from "../../middleware/authGuard";

export async function eventRoutes(app: FastifyInstance) {
  app.get("/events", async (req, reply) => {
    const query = EventQuerySchema.parse(req.query);
    const result = await EventsService.getEvents(query.limit, query.offset, query.type);
    return reply.send(result);
  });

  app.get("/events/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const event = await EventsService.getEventById(id);
    if (!event) return reply.status(404).send({ error: "Event not found" });
    return reply.send(event);
  });

  app.get("/events/:id/concierge", { preHandler: [authGuard] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    const authReq = req as AuthenticatedRequest;
    const insight = await getPersonalizedInsight(authReq.user.id, id);
    return reply.send({ insight: insight ?? "Clear skies! Observe with naked eye or binoculars." });
  });
}