# Smart Gym 360 Backend v1 — Phases

## Phase 1 — Frontend reverse engineering

Inspected the supplied Auth archive and froze the backend-facing contract before implementation. Direct backend interactions are login, refresh, `/auth/me`, and logout. The exact login credentials are `email` + `password` with a 6-character minimum; Auth roles are SUPERADMIN, ADMIN, MANAGER, TRAINER.

## Phase 2 — Backend architecture foundation

Established NestJS 12, PostgreSQL, TypeORM, strict TypeScript, URI versioning, Swagger, canonical API envelopes, centralized validation/error handling, AsyncLocalStorage request context, structured Pino logging, Redis, health probes, migration-only persistence, and automated import-isolation/security gates.

## Phase 3 — Auth implementation

Implemented credential verification, bcrypt password hashing, Redis brute-force lockout, JWT access/refresh tokens, refresh-token hashing/rotation, pessimistic refresh-session locking, authoritative `/auth/me`, session revocation, audit trail, deterministic seed support, and co-located Jest tests.

## Phase 4 — Verification

Static source/architecture checks are included in this package. Full dependency-backed verification requires package installation plus PostgreSQL and Redis; see `docs/verification-status.md` for the exact boundary and commands.

## Phase 5 — Future feature modules

Only add further Superadmin business modules after their matching frontend route/feature contract is supplied and frozen. Backend folder and route names must mirror the frontend semantic names.
