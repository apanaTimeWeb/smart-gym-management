# Smart Gym 360 — Superadmin Backend v1

NestJS 12 + PostgreSQL + TypeORM 1.1.1 backend foundation for the supplied frontend Auth contract.

## Scope

The supplied frontend evidence establishes `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `GET /api/v1/auth/me`, and `POST /api/v1/auth/logout`. No additional Superadmin business APIs are invented until their frontend contract is supplied and frozen.

## Core safeguards

- Feature isolation and frontend/backend route mirroring.
- PostgreSQL with TypeORM repository boundaries and migrations only.
- Canonical `ApiResponse<T>` response envelope.
- Strict DTO validation with whitelist + forbid-extra.
- AsyncLocalStorage request context.
- Redis rate limiting and brute-force lockout.
- JWT access/refresh rotation; refresh token hashes only at rest.
- Soft deletes and audit logging.
- OpenAPI/Swagger and URI API versioning.
- `nestjs-pino` structured logging with sensitive-field redaction.
- Strict TypeScript and mechanical import/isolation checks.
- Jest unit tests and pytest black-box E2E structure.

## Local setup

1. Copy `.env.example` to `.env` and set strong secrets.
2. `docker compose up -d postgres redis`
3. `npm install`
4. `npm run migration:run`
5. Seed only when explicitly enabled with the documented seed password variables.
6. `npm run start:dev`

Swagger: `http://localhost:3000/api/v1/docs`.

See `docs/phases.md` and `src/modules/auth/auth_backend_feature.md`.
