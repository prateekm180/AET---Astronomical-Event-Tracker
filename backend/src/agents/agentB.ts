import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";

const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

export async function getPersonalizedInsight(userId: string, eventId: string): Promise<string | null> {
  const [user, event] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.astronomicalEvent.findUnique({ where: { id: eventId } }),
  ]);

  if (!user || !event) return null;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 200,
    system: "Generate a short 2-sentence actionable astronomy tip.",
    messages: [
      {
        role: "user",
        content: `Event: ${event.name}. Time UTC: ${event.eventUtcTime}. Timezone: ${user.timezone}`,
      },
    ],
  });

  const block = response.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text.trim() : null;
}