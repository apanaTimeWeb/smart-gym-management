# Integration Guide — backend_landing v4

## 1. Framework-Specific Application Registration

### NestJS
The supplied role container already includes the required local registration in `backend_landing/app.module.ts`. When integrating into the global monolith, preserve the modular-monolith boundary and merge the following imports/providers into the existing root application as appropriate:
- `LandingCoreModule` from `backend_landing/landing_core/landing-core.module.ts`.
- `LandingLandingModule` from `backend_landing/landing_modules/landing/landing-landing.module.ts`.
- The supplied AppModule wires the global `LandingValidationExceptionFilter`, `LandingResponseInterceptor`, request-context middleware, tenant-resolution middleware, and metrics middleware.
Do not add a second root database/Redis bootstrap inside the feature module.

## 2. Environment Variables (.env)
Add the variables documented in `backend_landing/.env.example` to the monolith environment, with real secrets supplied through the deployment secret mechanism:
- HTTP: `PORT`, `API_PREFIX`, `API_VERSION`, `CORS_ORIGINS`, `NODE_ENV`.
- Master DB: `MASTER_DB_HOST`, `MASTER_DB_PORT`, `MASTER_DB_NAME`, `MASTER_DB_USER`, `MASTER_DB_PASSWORD`.
- Pool: `DB_POOL_MAX`, `DB_TENANT_POOL_MAX`, `DB_ACQUIRE_TIMEOUT_MS`, `DB_TENANT_ACQUIRE_TIMEOUT_MS`, `DB_IDLE_TIMEOUT_MS`, `DB_TENANT_IDLE_TIMEOUT_MS`, `DB_TOTAL_TENANT_POOL_MAX`.
- Redis: `REDIS_URL`, `REDIS_CONNECT_TIMEOUT_MS`.
- Public tenant: `PUBLIC_TENANT_ID`, `PUBLIC_TENANT_SLUG`, `PUBLIC_TENANT_NAME`.
- Deep health: `HEALTH_DEEP_TOKEN`.
- Test lifecycle: `E2E_BOOTSTRAP_TOKEN` only for isolated test infrastructure.
- Browser verification: `LANDING_FRONTEND_BASE_URL`.

## 3. Database Migrations
The supplied TypeORM migration files MUST be executed in this chronological order by the monolith's existing TypeORM migration runner:
1. `landing_migrations_master/20260921100000-create-tenants.ts`
2. `landing_migrations_tenant/20260921100500-create-landing-tables.ts`
3. `landing_migrations_tenant/20260921101500-harden-idempotency-and-phone.ts`
4. `landing_migrations_master/20260928221000-align-master-tenant-status.ts`
5. `landing_migrations_tenant/20260928221500-harden-landing-checks.ts`

The exact root CLI/data-source command is `BLOCKED_BY_SUPPLIED_SCOPE` because the global monolith's package.json/data-source runner is not included in the supplied archive. Do not invent a replacement runner.

## 4. Seeds
`LandingLandingSeeder.seed()` is intentionally a deterministic no-op because Landing contains no required static reference dataset. Run it only through the monolith's existing seed orchestration if that orchestration exists.

## 5. New Runtime Dependencies
**v4 introduces no new runtime dependencies.** Do not add packages to avoid the supplied scope boundary.

The frontend-facing route required by the supplied archive is `POST /api/landing/bookings`; contact is `POST /api/landing/contact`. Both require `Idempotency-Key`.

## 6. Verification Steps
1. Apply the migrations to the master DB and each isolated tenant DB through the monolith's approved TypeORM runner.
2. Start the existing NestJS monolith with validated configuration.
3. Verify `GET /health/live`, `GET /health/ready`, and protected `GET /health/deep`.
4. Create or provision the configured public tenant through the project's existing tenant setup.
5. POST the frontend booking contract to `/api/landing/bookings` with a unique `Idempotency-Key`; verify `success=true`, a backend message, and `data=null`.
6. Repeat the same request with the same key and payload; verify replay without a second booking row.
7. Reuse the same key with a different payload; verify a conflict and no second mutation.
8. POST the contact contract to `/api/landing/contact` with a unique `Idempotency-Key`; verify the same canonical success envelope.
9. Run the isolated API E2E suite `backend_e2e/backend_landing_e2e/landing/test_landing_api.py`.
10. Run Selenium with `LANDING_FRONTEND_BASE_URL` pointing to the real frontend; verify booking/contact success and the documented field-validation states.

Runtime execution was not performed during this static repair audit, so these are integration-time verification instructions rather than claimed runtime results.
