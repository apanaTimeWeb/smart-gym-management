# Superadmin Backend V1 — Supplied Scope: Landing

This archive uses the requested filename `superadmin_backend_download_v1.zip`, but the supplied frontend archive is the `landing` module. The implementation therefore creates the backend vertical slice for **Landing** and does not invent a Superadmin business domain that was not supplied.

## Stack

- NestJS 12
- TypeScript 5.9 strict mode
- PostgreSQL 17
- TypeORM 1.1
- Redis 8
- nestjs-pino + Pino
- Swagger/OpenAPI
- Prometheus client
- OpenTelemetry Node SDK + automatic HTTP/NestJS/PG/Redis instrumentation
- Jest unit tests
- Pytest black-box E2E tests

Current package versions were selected against the September 2026 ecosystem; TypeORM 1.1.x and NestJS 12 are current stable lines at build time.

## Frontend contract covered

The supplied frontend requires:

- `POST /landing/booking`
- `POST /landing/contact`

The feature map lists `/api/landing/bookings` for booking, while the real API client and MSW handler use `/landing/booking`. The backend therefore treats `/api/v1/landing/booking` as canonical and provides a compatibility alias at `/api/landing/booking` plus the exact client path under the versioned route. The conflict is documented instead of being silently ignored.

The backend does **not** add a newsletter subscription endpoint because the frontend explicitly uses `mailto:` rather than a backend subscription API. This preserves the frontend-derived requirement baseline rather than inventing a new capability.

## Local run

1. Copy `.env.example` to `.env`.
2. Run `docker compose up -d`.
3. Run `npm install`.
4. Run `npm run bootstrap:local`.
5. Run `npm run start:dev`.
6. Open Swagger at `http://localhost:3000/docs`.
7. Health:
   - `/api/v1/health/live`
   - `/api/v1/health/ready`
   - `/api/v1/health/deep` with `x-health-deep-token`.

The local bootstrap creates the configured demo tenant database and runs tenant migrations.

## API example

Booking:
```http
POST /api/v1/landing/booking
Content-Type: application/json

{
  "name": "Member One",
  "email": "member@example.org",
  "phone": "9876543210",
  "date": "2026-09-21T00:00:00.000Z",
  "type": "trial"
}
```

Contact:
```http
POST /api/v1/landing/contact
Content-Type: application/json

{
  "name": "Member One",
  "email": "member@example.org",
  "message": "I would like to know more about memberships."
}
```

For duplicate-sensitive retries, clients should send an `Idempotency-Key` header. The backend supports Redis-backed idempotency for these mutations without changing the current frontend request body.

## Architecture

The backend uses the feature module as the AI repair unit:

`Controller → DTO → Orchestrator → Service → Repository → Mapper → Domain`

Persistence is isolated behind repositories; TypeORM entities never escape into services.

Tenant context is request-scoped through AsyncLocalStorage. The current public Landing frontend has no tenant selector/header in its contract, so anonymous Landing requests use `PUBLIC_TENANT_ID`; an explicitly supplied tenant id must resolve to an active tenant in the master database before it is used.

## Runtime verification limits

Static TypeScript syntax, Python E2E syntax, file-size ceilings, prohibited-pattern scanning, and the architecture verifier were exercised in this build environment. A full Nest/TypeORM typecheck, lint run, Jest run, and live Postgres/Redis E2E run require dependency installation and running infrastructure; dependency installation timed out in the supplied environment.
