import { Worker } from "bullmq";
import { prisma } from "../../lib/prisma";
import { redisConnection } from "../../lib/redis";
import { notifyDispatchQueue } from "../../lib/queues";

type Window = "T_MINUS_24H" | "T_MINUS_1H";

const WINDOW_OFFSETS_MS: Record<Window, number> = {
  T_MINUS_24H: 24 * 60 * 60 * 1000,
  T_MINUS_1H: 1 * 60 * 60 * 1000,
};

export const scheduleWindowsWorker = new Worker(
  "notify-schedule",
  async (job) => {
    const { userId, eventId } = job.data;
    const event = await prisma.astronomicalEvent.findUnique({ where: { id: eventId } });
    if (!event) return;

    const eventTimeMs = event.eventUtcTime.getTime();
    const nowMs = Date.now();

    for (const window of ["T_MINUS_24H", "T_MINUS_1H"] as Window[]) {
      const targetTimeMs = eventTimeMs - WINDOW_OFFSETS_MS[window];
      const delayMs = targetTimeMs - nowMs;

      if (delayMs <= 0) continue;

      await notifyDispatchQueue.add(
        "dispatch",
        { userId, eventId, window },
        {
          jobId: `notify:${userId}:${eventId}:${window}`,
          delay: delayMs,
          attempts: 3,
        }
      );
    }
  },
  { connection: redisConnection }
);