import { Worker } from "bullmq";
import { prisma } from "../lib/prisma";
import { redisConnection } from "../lib/redis";
import { notifyScheduleQueue } from "../lib/queues";

interface MatchedUser {
  id: string;
}

export const geoMatchWorker = new Worker(
  "geo-match",
  async (job) => {
    const { eventId } = job.data;
    const event = await prisma.astronomicalEvent.findUnique({ where: { id: eventId } });
    if (!event) return;

    const matchedUsers = await prisma.$queryRaw<MatchedUser[]>`
      SELECT u.id
      FROM "User" u
      JOIN "AstronomicalEvent" e ON e.id = ${eventId}
      WHERE u."homeLocation" IS NOT NULL
        AND e."visibilityPolygon" IS NOT NULL
        AND ST_Contains(e."visibilityPolygon", u."homeLocation")
    `;

    for (const user of matchedUsers) {
      await prisma.notification.upsert({
        where: { userId_eventId: { userId: user.id, eventId } },
        create: {
          userId: user.id,
          eventId,
          notifyTargetTime: event.eventUtcTime,
          status: "SCHEDULED",
        },
        update: {},
      });

      await notifyScheduleQueue.add(
        "schedule-windows",
        { userId: user.id, eventId },
        { jobId: `schedule:${user.id}:${eventId}` }
      );
    }
  },
  { connection: redisConnection, concurrency: 5 }
);