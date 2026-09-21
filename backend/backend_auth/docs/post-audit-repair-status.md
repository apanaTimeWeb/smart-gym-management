# Post-Audit Repair Status

Audit baseline: `stage_2_backend_audit.md` for the supplied Auth scope.

## Repairs applied

- Fixed the unresolved `CoreRouteRequest` type reference in the canonical logger.
- Added canonical Swagger envelope documentation for Auth success and error responses, including validation errors and the refresh `Authorization` header.
- Added centralized public rate-limit tiers for liveness, readiness and Prometheus metrics endpoints.
- Moved Auth controllers into the module `controllers/` subfolder and updated module registration/imports.
- Renamed the application bootstrap to `src/core-app-main.ts` and updated package/Docker entrypoints to satisfy module-prefix naming.
- Corrected the identified Rule 88 import-order violations.
- Changed Auth logout auditing to preserve server-derived request IP metadata.
- Changed `audit_logs.actor_role` to an explicit PostgreSQL enum backed by `CoreAuditActorRole`, with a forward migration.
- Added an Auth-to-core audit-role mapper so core infrastructure remains independent of the Auth business module.
- Updated the Auth logout unit test to prove audit IP propagation.
- Added lint-level Auth sibling-module restrictions using `no-restricted-imports` in addition to the custom isolation gate.
- Reworked the pre-commit hook so lint/format/type checks operate on staged files and Gitleaks scans the staged index; the full-repository checks remain in CI.
- Updated Auth feature documentation so it no longer claims Rule 43 is implemented inside the supplied Auth-only scope.

## Intentionally unresolved because they require supplied project-wide infrastructure

- Full DB-per-tenant provisioning and request-scoped DataSource resolution under Rule 39.
- True isolated E2E tenant/database provisioning under Rule 43.
- Production secrets-manager verification under Rule 33.
- Global privacy/erasure/retention verification under Rule 35.

These are documented as scope/runtime prerequisites rather than fabricated as implemented inside the Auth business module.

## Verification performed in this sandbox

- `node scripts/check-module-isolation.mjs` — PASS.
- `node scripts/check-architecture.mjs` — PASS.
- JavaScript syntax checks for the newly added staging helper — PASS.
- Python Auth E2E source compilation — PASS.
- Dependency-backed Nest/TypeORM/Jest runtime verification remains unavailable because npm dependency installation could not complete in this environment.
