AET/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── lib/
│   │   │   ├── prisma.ts
│   │   │   ├── redis.ts
│   │   │   └── queues.ts
│   │   ├── middleware/
│   │   │   ├── authGuard.ts
│   │   │   └── rateLimiter.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── events/
│   │   │   │   ├── events.routes.ts
│   │   │   │   ├── events.service.ts
│   │   │   │   └── events.schema.ts
│   │   │   ├── users/
│   │   │   │   ├── users.routes.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   └── users.schema.ts
│   │   │   └── notifications/
│   │   │       ├── schedule.worker.ts
│   │   │       └── dispatch.worker.ts
│   │   ├── agents/
│   │   │   ├── agentAWorker.ts
│   │   │   ├── agentB.ts
│   │   │   └── schemas.ts
│   │   ├── external/
│   │   │   ├── weather.ts
│   │   │   └── lightPollution.ts
│   │   ├── geo/
│   │   │   └── geoMatchWorker.ts
│   │   ├── ingestion/
│   │   │   └── ingestEvent.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   │   └── auth.test.ts
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   │   ├── EventCard.tsx
│   │   │   ├── ConciergeBox.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   └── NotifyButton.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useEvents.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── EventDetail.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── docs/
│   └── api.md
├── docker-compose.yml
└── README.md