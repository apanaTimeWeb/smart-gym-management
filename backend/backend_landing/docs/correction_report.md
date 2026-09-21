# Corrected Backend Release — Landing

## Applied Repairs

- Hardened anonymous tenant routing so public Landing requests can use only the configured `PUBLIC_TENANT_ID`; a different client-supplied tenant header is rejected.
- Added durable tenant PostgreSQL idempotency records and moved idempotency reservation/completion inside the same transaction as booking/contact mutations. Redis is now only a replay cache.
- Added the shared UUID identity abstraction to `CoreBaseEntity` and made Landing persistence repositories inherit `CoreBaseRepository`.
- Added a deterministic, idempotent `landing.seeder.ts` seed hook without inserting fake visitor data.
- Added isolated E2E tenant provisioning/cleanup endpoints available only in `NODE_ENV=test`, and changed Pytest fixtures to use a fresh tenant database per session.
- Added concrete Swagger success/error response schemas.
- Added mechanical Rule 88 import-order checks to the architecture verifier.
- Added Husky/lint-staged/Prettier pre-commit configuration plus CI SAST, secrets, typecheck, formatting, architecture, test, and dependency gates.
- Hardened DTO transforms so non-string JSON values are rejected by `@IsString` instead of being coerced into strings.
- Tightened the Landing phone database check to the exact 10-digit application contract through a backward-compatible migration.
- Updated Landing feature/dependency/forbidden documentation and verification notes to reflect the corrected architecture.

## Remaining Contract Dependency

The supplied frontend currently does not send `Idempotency-Key` on its booking/contact retry path. The corrected backend supports and durably processes the key when supplied, but complete duplicate-safe frontend retries still require the frontend client/form to generate and reuse the same key for a single mutation intent.

## Verification

Static TypeScript parsing, import-order/architecture checks, file ceilings, Python E2E syntax, package configuration, and release-tree cleanliness pass. Full dependency-resolved NestJS typecheck, ESLint, Jest, and live PostgreSQL/Redis E2E remain unexecuted in this environment.
