import { Worker } from "bullmq";
import { prisma } from "../../lib/prisma";
import { redisConnection } from "../../lib/redis";

export const dispatchWorker = new Worker(
  "notify-dispatch",
  async (job) => {
    const { userId, eventId, window } = job.data;
    console.log(`[PUSH DISPATCH] User: ${userId}, Event: ${eventId}, Window: ${window}`);

    await prisma.notification.updateMany({
      where: { userId, eventId },
      data: { status: "SENT" },
    });
  },
  { connection: redisConnection }
);