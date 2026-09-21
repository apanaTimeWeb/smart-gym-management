# Release Notes — V1

## Implemented

This V1 is a NestJS + PostgreSQL + TypeORM backend vertical slice generated from the supplied `landing` frontend and the supplied backend architecture/audit specifications.

## Included

- Versioned canonical Landing command API.
- Unversioned compatibility aliases for the supplied frontend/API-contract path conflict.
- Strict DTO validation, sanitization, and canonical error envelope.
- Database-per-tenant PostgreSQL routing using a master tenant registry.
- TypeORM repositories isolated behind a tenant-aware UnitOfWork.
- Atomic booking/contact persistence with audit records.
- Redis rate limiting and idempotency replay.
- Soft-delete base entity.
- Prometheus metrics, OpenTelemetry auto-instrumentation, structured logging, health probes, Helmet, CORS, compression, graceful shutdown.
- Explicit database migrations, indexes, enum/check constraints, and tenant pool budgeting.
- Co-located Jest unit tests and black-box Pytest E2E tests.
- Module feature/dependency/forbidden documentation, source specs, CI workflow, and pre-commit gate.

## Verification state

Static TypeScript syntax, architecture/file-size/import gates, Python E2E syntax, and package metadata validation passed in this environment.

Full dependency-resolved typechecking/lint/Jest/live PostgreSQL+Redis E2E were not executable here because npm dependency installation timed out. The archive intentionally contains source and configuration only; it does not claim that runtime integration has been executed locally.
