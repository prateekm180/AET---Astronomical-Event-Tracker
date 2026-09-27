import { z } from "zod";

export const EventQuerySchema = z.object({
  limit: z.coerce.number().default(20),
  offset: z.coerce.number().default(0),
  type: z.enum(["ECLIPSE", "METEOR_SHOWER", "COMET", "ROCKET_LAUNCH", "CONJUNCTION"]).optional(),
});