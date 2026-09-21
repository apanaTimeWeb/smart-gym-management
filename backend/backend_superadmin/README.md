# Superadmin Backend v2

Enterprise Superadmin backend built with NestJS + TypeScript + PostgreSQL + TypeORM.

## Architecture
- Frontend-mirrored `superadmin` domain hierarchy.
- `saas-billing/{coupons,invoices,plans}` and `system-ops/{backups,infrastructure,jobs,migrations}` preserved as separate business feature modules.
- Query and command controllers are separated.
- TypeORM access is repository-only.
- Canonical `ApiResponse<T>` envelope is global.
- Soft deletes and audit trail infrastructure are included.
- Redis is used for rate limiting/idempotency/cache infrastructure.
- Specialized UI contracts are persisted as deterministic PostgreSQL contract snapshots and seeded from the extracted frontend fixture set for local/test environments.
- Database migrations are explicit; `synchronize` is disabled.
- E2E tests belong under domain-mirrored `e2e/superadmin/...` paths.

## Setup
1. Copy `.env.example` to the environment-specific secret/config mechanism.
2. Provision PostgreSQL and Redis.
3. Install dependencies with `npm ci`.
4. Run `npm run migration:run`.
5. Run `npm run seed`.
6. Run `npm run architecture:check`.
7. Run `npm test` and `npm run test:e2e` against an isolated test environment.

See `VERIFICATION_REPORT.md` for the distinction between static verification and runtime verification in the build environment used to produce this archive.


# Superadmin Backend v2 Verification Addendum

This release is aligned to the supplied frontend contract inventory and the supplied Enterprise-Grade NestJS backend architecture document. The source tree uses NestJS + PostgreSQL + TypeORM, preserves the `superadmin/saas-billing/*` and `superadmin/system-ops/*` hierarchy, and embeds the matching frontend feature contract into each feature-local `_backend_feature.md` Frozen API Contract section.

Runtime verification note: this package intentionally excludes `node_modules`. The available environment did not complete dependency installation, so a live Nest bootstrap, PostgreSQL migration, Redis integration run, and pytest against a live server remain `NOT VERIFIED`; source-level scans are included separately.
