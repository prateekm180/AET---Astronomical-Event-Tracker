import { prisma } from "../../lib/prisma";

export class EventsService {
  static async getEvents(limit: number, offset: number, type?: string) {
    const where = type ? { type: type as any } : {};
    const [total, events] = await Promise.all([
      prisma.astronomicalEvent.count({ where }),
      prisma.astronomicalEvent.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { eventUtcTime: "asc" },
      }),
    ]);

    return { total, events };
  }

  static async getEventById(id: string) {
    return prisma.astronomicalEvent.findUnique({ where: { id } });
  }
}