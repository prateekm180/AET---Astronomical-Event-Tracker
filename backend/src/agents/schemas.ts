import type { Polygon } from "geojson";
import { z } from "zod";

export const AgentAOutputSchema = z.object({
  generalSummary: z.string().min(20).max(600),
  scientificSummary: z.string().min(20).max(1200),
  viewingRecommendation: z.string().min(10).max(400),
  difficultyLevel: z.enum(["NAKED_EYE", "BINOCULARS", "TELESCOPE_SMALL", "TELESCOPE_LARGE"]),
  tags: z.array(z.string()).max(8),
}).strict();

export type AgentAOutput = z.infer<typeof AgentAOutputSchema>;

export interface RawIngestedEvent {
  sourceId: string;
  name: string;
  type: "ECLIPSE" | "METEOR_SHOWER" | "COMET" | "ROCKET_LAUNCH" | "CONJUNCTION";
  eventUtcTime: string;
  rawTelemetry: Record<string, unknown>;
  visibilityPolygonGeoJSON: Polygon | null;
  dataSource: string;
}
