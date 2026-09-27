# AET API Documentation

## Auth Endpoints
- `POST /auth/register` — Register a new user (`email`, `username`, `password`)
- `POST /auth/login` — Authenticate and receive JWT (`email`, `password`)
- `GET /auth/me` — Get current user details (Header: `Authorization: Bearer <jwt>`)

## Event Endpoints
- `GET /events` — List astronomical events (`type`, `limit`, `offset`)
- `GET /events/:id` — Get detailed event
- `GET /events/:id/concierge` — Request Agent B personalized recommendations

## User Endpoints
- `PUT /users/profile` — Update user timezone and geospatial home location