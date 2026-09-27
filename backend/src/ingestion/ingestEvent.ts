import { prisma } from "../lib/prisma";
import { enrichmentQueue, geoMatchQueue } from "../lib/queues";
import type { RawIngestedEvent } from "../agents/schemas";

export async function ingestRawEvent(raw: RawIngestedEvent) {
  // Step 1: Create the event row with deterministic fields only
  const event = await prisma.astronomicalEvent.create({
    data: {
      name: raw.name,
      type: raw.type,
      description: "",
      scientificValue: "",
      eventUtcTime: new Date(raw.eventUtcTime),
      dataSource: raw.dataSource,
    },
  });

  // Step 2: If polygon provided, set it via raw SQL (Prisma can't handle geometry types natively)
  if (raw.visibilityPolygonGeoJSON) {
    await prisma.$executeRaw`
      UPDATE "AstronomicalEvent"
      SET "visibilityPolygon" = ST_SetSRID(
        ST_GeomFromGeoJSON(${JSON.stringify(raw.visibilityPolygonGeoJSON)}), 4326
      )
      WHERE id = ${event.id}
    `;
  }

  // Step 3: Queue enrichment (Agent A) and geo-matching independently
  await enrichmentQueue.add(
    "enrich",
    { eventId: event.id, rawTelemetry: raw.rawTelemetry, type: raw.type },
    { jobId: `enrich:${event.id}`, attempts: 3, backoff: { type: "exponential", delay: 5000 } }
  );

  await geoMatchQueue.add(
    "match",
    { eventId: event.id },
    { jobId: `geomatch:${event.id}` }
  );

  return event;
}
