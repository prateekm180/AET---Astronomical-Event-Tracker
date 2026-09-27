import { Worker } from "bullmq";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "../lib/prisma";
import { redisConnection } from "../lib/redis";
import { env } from "../config/env";
import { AgentAOutputSchema } from "./schemas";

const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

const AGENT_A_SYSTEM_PROMPT = `
You are an astronomical data enrichment assistant. You will be given raw telemetry for a single astronomical event.
Output ONLY a JSON object matching this exact shape, with no markdown fences:
{
  "generalSummary": string,
  "scientificSummary": string,
  "viewingRecommendation": string,
  "difficultyLevel": "NAKED_EYE" | "BINOCULARS" | "TELESCOPE_SMALL" | "TELESCOPE_LARGE",
  "tags": string[]
}
`;

export const agentAWorker = new Worker(
  "enrichment",
  async (job) => {
    const { eventId, rawTelemetry, type } = job.data;

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1200,
        system: AGENT_A_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Event type: ${type}\nRaw telemetry:\n${JSON.stringify(rawTelemetry, null, 2)}`,
          },
        ],
      });

      const textBlock = response.content.find((b) => b.type === "text");
      if (!textBlock || textBlock.type !== "text") throw new Error("Agent A returned no text");

      const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
      const safeOutput = AgentAOutputSchema.parse(JSON.parse(cleaned));

      await prisma.astronomicalEvent.update({
        where: { id: eventId },
        data: {
          description: safeOutput.generalSummary,
          scientificValue: safeOutput.scientificSummary,
          metadata: {
            viewingRecommendation: safeOutput.viewingRecommendation,
            difficultyLevel: safeOutput.difficultyLevel,
            tags: safeOutput.tags,
          },
        },
      });
    } catch (err) {
      console.error(`Agent A enrichment error for event ${eventId}:`, err);
      throw err;
    }
  },
  { connection: redisConnection, concurrency: 5 }
);