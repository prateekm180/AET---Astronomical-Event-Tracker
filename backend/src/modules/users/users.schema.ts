import { z } from "zod";

export const UpdateProfileSchema = z.object({
  timezone: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});