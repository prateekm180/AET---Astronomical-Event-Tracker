import { prisma } from "../../lib/prisma";

export class UsersService {
  static async updateUserLocation(userId: string, timezone?: string, lat?: number, lng?: number) {
    if (lat !== undefined && lng !== undefined) {
      await prisma.$executeRaw`
        UPDATE "User"
        SET "homeLocation" = ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
            "timezone" = COALESCE(${timezone}, "timezone")
        WHERE id = ${userId}
      `;
    } else if (timezone) {
      await prisma.user.update({
        where: { id: userId },
        data: { timezone },
      });
    }

    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, username: true, timezone: true },
    });
  }
}