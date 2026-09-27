# AET Backend

Ingestion → AI enrichment (Agent A) → PostGIS geo-matching → BullMQ-scheduled
notifications (T-24h / T-1h) with personalized delivery (Agent B).

## Setup

```bash
npm install
cp .env.example .env        # fill in ANTHROPIC_API_KEY
docker compose up -d        # starts Postgres+PostGIS and Redis
npx prisma migrate dev      # creates tables
psql "$DATABASE_URL" -f prisma/manual_migrations/001_postgis_indexes.sql
```

## Running

Each worker is a separate process (run in separate terminals, or under pm2 /
a process manager in production):

```bash
npm run dev              # API server (port 3000)
npm run worker:agentA    # enrichment worker
npm run worker:geo       # geo-matching worker
npm run worker:schedule  # notification scheduling worker
npm run worker:dispatch  # notification dispatch worker
```

## Trying it end-to-end

```bash
curl -X POST localhost:3000/internal/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "sourceId": "nasa-001",
    "name": "Perseid Meteor Shower Peak",
    "type": "METEOR_SHOWER",
    "eventUtcTime": "2026-08-12T05:00:00Z",
    "dataSource": "NASA Meteor Watch",
    "rawTelemetry": {"radiant": "Perseus", "zhr": 100},
    "visibilityPolygonGeoJSON": {
      "type": "Polygon",
      "coordinates": [[[-130,20],[-60,20],[-60,55],[-130,55],[-130,20]]]
    }
  }'

curl localhost:3000/events
```

## What's stubbed vs. production-ready

- `src/external/weather.ts`, `src/external/lightPollution.ts`, `src/delivery/pushProvider.ts`
  are stubs — swap in a real weather API, a light-pollution raster dataset, and
  FCM/APNs/web-push respectively.
- Auth/authorization on the API routes (especially `/internal/ingest`) is not
  implemented — add a service-to-service auth layer before deploying.
- The `/users/:userId/subscriptions/:eventId` upsert assumes a composite
  unique constraint on `(userId, eventId)` for `Notification`; add that to
  `schema.prisma` (`@@unique([userId, eventId])`) before relying on the upsert path.
- See `prisma/manual_migrations/` for the GiST spatial indexes — required at
  scale, not created automatically by Prisma.
