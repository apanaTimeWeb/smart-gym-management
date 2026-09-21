# Buildronix Admin Backend — NestJS + PostgreSQL + TypeORM

This backend is generated from the supplied Admin frontend archive and the supplied enterprise backend architecture standard.

## Stack

- NestJS 11
- TypeScript 5.9 with `strict: true`
- PostgreSQL 17
- TypeORM 0.3
- Redis
- `nestjs-pino`
- Swagger/OpenAPI
- Python pytest black-box E2E

## Canonical API prefix

`/api/v1/admin/...`

The Admin Campaigns frontend currently publishes `/api/admin/campaigns/...`. Campaigns compatibility routes are normalized through the legacy-path middleware while the canonical public route remains `/api/v1/admin/campaigns/...`.

## Architecture

`APPLICATION → DOMAIN → FEATURE → USE CASE`

All Admin business modules live under:

`src/modules/admin/<frontend-feature-name>/`

Each feature contains its own controllers, DTOs, repository, service, entity/domain mapper, docs, dependencies, forbidden rules, seeder and collection.

Business logic is never placed in `src/core`. `src/core` contains only structural infrastructure.

## PostgreSQL multi-tenancy

The architecture uses a master database plus database-per-tenant on the same PostgreSQL server.

1. Run PostgreSQL and Redis.
2. Copy `.env.example` to `.env`.
3. Run master migrations.
4. Run `npm run tenant:provision` to provision the seeded tenant database.
5. Run tenant migrations.
6. Seed master + tenant data.

## Commands

```bash
npm install
npm run db:master:migrate
npm run tenant:provision
npm run db:tenant:migrate
npm run seed
npm run start:dev
```

Swagger is exposed at `/api/v1/docs`.

Health:
- `/api/v1/health/live`
- `/api/v1/health/ready`
- `/api/v1/health/deep`

Metrics:
- `/api/v1/metrics`

## Test policy

Unit tests live beside the micro-feature files.
Pytest E2E lives under `e2e/admin/<feature>/` and is written as a real HTTP client.

The archive contains an explicit phase report documenting what was created from the supplied frontend contract.

## Corrected package notes
See `CORRECTION_REPORT.md` for the concrete changes in the corrected archive. The package intentionally does not claim live runtime verification without installed dependencies and a running PostgreSQL/Redis environment.
