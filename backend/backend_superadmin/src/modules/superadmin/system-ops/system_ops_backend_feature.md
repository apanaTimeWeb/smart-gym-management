# system-ops Backend Feature Map

## Module Purpose
The System Ops container groups Superadmin operational business features. Backups, infrastructure, jobs, and migrations are independent feature units nested under this container, while the container itself owns only the landing summary contract. It must not absorb child feature business logic.

## Directory Structure
| File | Responsibility |
|---|---|
| `backups/backup-schedule-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `backups/backup-schedule-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `backups/backups-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `backups/backups-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `backups/backups-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `backups/backups-health-response.dto.ts` | Validates one request or response contract at the module edge. |
| `backups/backups-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `backups/backups-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `backups/backups.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/backups.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `backups/backups.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/backups.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `backups/backups.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `backups/backups.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `backups/backups.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/backups_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/backups_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/backups_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/backups_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/dtos/backups-create.dto.ts` | Validates one request or response contract at the module edge. |
| `backups/dtos/backups-query.dto.ts` | Validates one request or response contract at the module edge. |
| `backups/dtos/backups-update.dto.ts` | Validates one request or response contract at the module edge. |
| `backups/responses/backups-response.dto.ts` | Validates one request or response contract at the module edge. |
| `backups/services/backups-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-download.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-health.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-restore.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-schedule.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-trigger.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/services/backups-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `backups/types/backups.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `backups/types/backups.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/dtos/infrastructure-create.dto.ts` | Validates one request or response contract at the module edge. |
| `infrastructure/dtos/infrastructure-query.dto.ts` | Validates one request or response contract at the module edge. |
| `infrastructure/dtos/infrastructure-update.dto.ts` | Validates one request or response contract at the module edge. |
| `infrastructure/infrastructure-api-health-response.dto.ts` | Validates one request or response contract at the module edge. |
| `infrastructure/infrastructure-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `infrastructure/infrastructure-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `infrastructure/infrastructure-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `infrastructure/infrastructure-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `infrastructure/infrastructure-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `infrastructure/infrastructure.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/infrastructure.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `infrastructure/infrastructure.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/infrastructure.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `infrastructure/infrastructure.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `infrastructure/infrastructure.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `infrastructure/infrastructure.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/infrastructure_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/infrastructure_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/infrastructure_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/infrastructure_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/responses/infrastructure-response.dto.ts` | Validates one request or response contract at the module edge. |
| `infrastructure/services/infrastructure-api-health.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-flush-global.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-flush-tenant.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-redis.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/services/infrastructure-uptime.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `infrastructure/types/infrastructure.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `infrastructure/types/infrastructure.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/dtos/jobs-create.dto.ts` | Validates one request or response contract at the module edge. |
| `jobs/dtos/jobs-query.dto.ts` | Validates one request or response contract at the module edge. |
| `jobs/dtos/jobs-update.dto.ts` | Validates one request or response contract at the module edge. |
| `jobs/jobs-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `jobs/jobs-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `jobs/jobs-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `jobs/jobs-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `jobs/jobs-queue-health-response.dto.ts` | Validates one request or response contract at the module edge. |
| `jobs/jobs-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `jobs/jobs.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/jobs.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `jobs/jobs.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/jobs.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `jobs/jobs.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `jobs/jobs.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `jobs/jobs.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/jobs_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/jobs_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/jobs_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/jobs_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/responses/jobs-response.dto.ts` | Validates one request or response contract at the module edge. |
| `jobs/services/jobs-bulk-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-bulk-retry.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-cancel.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-clear-completed.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-queue-health.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-retry-all.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-retry.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/services/jobs-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `jobs/types/jobs.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `jobs/types/jobs.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/dtos/migrations-create.dto.ts` | Validates one request or response contract at the module edge. |
| `migrations/dtos/migrations-query.dto.ts` | Validates one request or response contract at the module edge. |
| `migrations/dtos/migrations-update.dto.ts` | Validates one request or response contract at the module edge. |
| `migrations/migrations-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `migrations/migrations-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `migrations/migrations-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `migrations/migrations.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `migrations/migrations.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/migrations.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `migrations/migrations.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `migrations/migrations.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `migrations/migrations.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/migrations_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/migrations_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/migrations_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/migrations_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/responses/migrations-response.dto.ts` | Validates one request or response contract at the module edge. |
| `migrations/services/migrations-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/services/migrations-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/services/migrations-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/services/migrations-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/services/migrations-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/services/migrations-trigger.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/services/migrations-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `migrations/types/migrations.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `migrations/types/migrations.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `services/system-ops-summary.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `system-ops-container.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `system-ops-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `system-ops.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `system-ops.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `system-ops.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `system-ops.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `system-ops_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `system-ops_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `system-ops_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/system-ops.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/system-ops.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `backups/backups-command.controller.ts` / `create` | POST | `/superadmin/system-ops/backups` | Creates a resource after DTO validation and persists it through the feature repository. | `BackupsCreateDto` | `unknown` |
| `backups/backups-command.controller.ts` / `update` | PATCH | `/superadmin/system-ops/backups/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `BackupsUpdateDto` | `unknown` |
| `backups/backups-command.controller.ts` / `remove` | DELETE | `/superadmin/system-ops/backups/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `backups/backups-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/system-ops/backups/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `backups/backups-query.controller.ts` / `findAll` | GET | `/superadmin/system-ops/backups` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `backups/backups-query.controller.ts` / `findOne` | GET | `/superadmin/system-ops/backups/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `backups/backups-special.controller.ts` / `health` | GET | `/superadmin/system-ops/backups/health` | Returns backup health, tenant backup age, and restore history required by the System Ops UI. | `None` | `Record<string, unknown` |
| `backups/backups-special.controller.ts` / `schedule` | POST | `/superadmin/system-ops/backups/schedule` | Persists the requested backup schedule contract. | `Record` | `Record<string, unknown` |
| `backups/backups-special.controller.ts` / `trigger` | POST | `/superadmin/system-ops/backups/trigger` | Starts the named system operation and records its execution state. | `Record` | `Record<string, unknown` |
| `backups/backups-special.controller.ts` / `download` | GET | `/superadmin/system-ops/backups/:id/download` | Returns an authorized backup download reference. | `None` | `Record<string, unknown` |
| `backups/backups-special.controller.ts` / `restore` | POST | `/superadmin/system-ops/backups/:id/restore` | Restores a soft-deleted resource through the owning repository mutation. | `Record` | `Record<string, unknown` |
| `infrastructure/infrastructure-command.controller.ts` / `create` | POST | `/superadmin/system-ops/infrastructure` | Creates a resource after DTO validation and persists it through the feature repository. | `InfrastructureCreateDto` | `unknown` |
| `infrastructure/infrastructure-command.controller.ts` / `update` | PATCH | `/superadmin/system-ops/infrastructure/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `InfrastructureUpdateDto` | `unknown` |
| `infrastructure/infrastructure-command.controller.ts` / `remove` | DELETE | `/superadmin/system-ops/infrastructure/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `infrastructure/infrastructure-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/system-ops/infrastructure/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `infrastructure/infrastructure-query.controller.ts` / `findAll` | GET | `/superadmin/system-ops/infrastructure` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `infrastructure/infrastructure-query.controller.ts` / `findOne` | GET | `/superadmin/system-ops/infrastructure/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `infrastructure/infrastructure-special.controller.ts` / `redis` | GET | `/superadmin/system-ops/infrastructure/redis` | Returns the Superadmin data required by the ``/superadmin/system-ops/infrastructure/redis`` frontend contract, with filtering or lookup semantics defined by that feature contract. |
| `infrastructure/infrastructure-special.controller.ts` / `uptime` | GET | `/superadmin/system-ops/infrastructure/uptime` | Returns the Superadmin data required by the ``/superadmin/system-ops/infrastructure/uptime`` frontend contract, with filtering or lookup semantics defined by that feature contract. |
| `infrastructure/infrastructure-special.controller.ts` / `flushGlobal` | POST | `/superadmin/system-ops/infrastructure/redis/flush-global` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/infrastructure/redis/flush-global`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `infrastructure/infrastructure-special.controller.ts` / `flushTenant` | POST | `/superadmin/system-ops/infrastructure/redis/flush-tenant` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/infrastructure/redis/flush-tenant`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `infrastructure/infrastructure-special.controller.ts` / `apiHealth` | GET | `/superadmin/system-ops/infrastructure/api-health` | Returns platform API latency/error summary, endpoint measurements, and active incidents. | `None` | `unknown` |
| `jobs/jobs-command.controller.ts` / `create` | POST | `/superadmin/system-ops/jobs` | Creates a resource after DTO validation and persists it through the feature repository. | `JobsCreateDto` | `unknown` |
| `jobs/jobs-command.controller.ts` / `update` | PATCH | `/superadmin/system-ops/jobs/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `JobsUpdateDto` | `unknown` |
| `jobs/jobs-command.controller.ts` / `remove` | DELETE | `/superadmin/system-ops/jobs/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `jobs/jobs-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/system-ops/jobs/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `jobs/jobs-query.controller.ts` / `findAll` | GET | `/superadmin/system-ops/jobs` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `jobs/jobs-query.controller.ts` / `findOne` | GET | `/superadmin/system-ops/jobs/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `jobs/jobs-special.controller.ts` / `queueHealth` | GET | `/superadmin/system-ops/jobs/queue-health` | Returns background queue health, retry failures, and dead-letter counts. | `None` | `Record<string, unknown` |
| `jobs/jobs-special.controller.ts` / `retryAll` | POST | `/superadmin/system-ops/jobs/retry-all` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/jobs/retry-all`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `jobs/jobs-special.controller.ts` / `retry` | POST | `/superadmin/system-ops/jobs/:id/retry` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/jobs/:id/retry`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `jobs/jobs-special.controller.ts` / `cancel` | POST | `/superadmin/system-ops/jobs/:id/cancel` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/jobs/:id/cancel`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `jobs/jobs-special.controller.ts` / `clearCompleted` | POST | `/superadmin/system-ops/jobs/clear-completed` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/jobs/clear-completed`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `jobs/jobs-special.controller.ts` / `bulkRetry` | POST | `/superadmin/system-ops/jobs/bulk-retry` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/jobs/bulk-retry`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `jobs/jobs-special.controller.ts` / `bulkDelete` | POST | `/superadmin/system-ops/jobs/bulk-delete` | Creates or triggers the business operation exposed by ``/superadmin/system-ops/jobs/bulk-delete`` after DTO validation, authorization, persistence, and required side-effect handling. |
| `migrations/migrations-command.controller.ts` / `create` | POST | `/superadmin/system-ops/migrations` | Creates a resource after DTO validation and persists it through the feature repository. | `MigrationsCreateDto` | `unknown` |
| `migrations/migrations-command.controller.ts` / `update` | PATCH | `/superadmin/system-ops/migrations/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `MigrationsUpdateDto` | `unknown` |
| `migrations/migrations-command.controller.ts` / `remove` | DELETE | `/superadmin/system-ops/migrations/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `migrations/migrations-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/system-ops/migrations/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `migrations/migrations-query.controller.ts` / `findAll` | GET | `/superadmin/system-ops/migrations` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `migrations/migrations-query.controller.ts` / `findOne` | GET | `/superadmin/system-ops/migrations/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `migrations/migrations-special.controller.ts` / `trigger` | POST | `/superadmin/system-ops/migrations/trigger` | Starts the named system operation and records its execution state. | `Record` | `Record<string, unknown` |
| `system-ops-special.controller.ts` / `findSystemOpsSummary` | GET | `/superadmin/system-ops/summary` | Returns the Superadmin data required by the ``/superadmin/system-ops/summary`` frontend contract, with filtering or lookup semantics defined by that feature contract. |

## Approved External Dependencies
- **Business Feature Dependencies**: None by direct business-code import. Runtime event dependencies are documented explicitly below.
- **Infrastructure Dependencies**: Core authentication/authorization, configuration, PostgreSQL/TypeORM repository infrastructure, Redis, response/error infrastructure, observability, and tenant resolution where applicable.
- **Runtime/Event Dependencies**: None unless an event appears in this module's source and dependency document.

## Data and State Architecture
- DB Entities: Every TypeORM entity registered by this module; contract snapshots are stored in explicit PostgreSQL JSONB tables when the frontend contract is snapshot-backed.
- Redis Caching Keys: Only feature-owned operational keys; Idempotency-Key reservations use the core idempotency namespace.
- Event Emitters: Only event names from the centralized registry are permitted.
- Background Jobs: Heavy exports, messaging, backups, migrations, and bulk work are queued where applicable; scheduled work is recorded in the central registry.
- Idempotency Keys: All mutations for which the frontend API exposes `idempotencyKey` are protected by `RequireIdempotencyKey`.

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security
Every Superadmin business endpoint is protected at controller level with `JwtAuthGuard`, `RolesGuard`, and the `SUPERADMIN` role. Resource-specific endpoints must additionally fail closed when the requested resource is missing, soft-deleted, outside the trusted tenant/resource scope, or otherwise unauthorized.

CODEOWNERS path: `src/modules/superadmin/system-ops/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend system-ops/superadmin_system_ops_features.md -->

# Superadmin System Ops — Feature Map

## Module Purpose
The System Ops container groups Superadmin operational business features. Backups, infrastructure, jobs, and migrations are independent feature units nested under this container, while the container itself owns only the landing summary contract. It must not absorb child feature business logic.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `system-ops_components/` | Renders the route UI, skeleton, and interactive links to operational detail modules. | `SuperadminSystemOpsDashboardClient.tsx`, `SuperadminSystemOpsDashboardSkeleton.tsx` |
| `system-ops_api/` | Performs the System Ops summary request through the global API transport. | `SuperadminSystemOpsApi.ts` |
| `system-ops_types/` | Runtime-validated summary schema and inferred types. | `SuperadminSystemOpsTypes.ts` |
| `system-ops_constants/` and `system-ops_utils/` | TanStack Query hook and presentation-only card definitions. | `SuperadminSystemOpsDashboardConstants.ts`, `useSuperadminSystemOpsSummary.ts` |
| `system-ops_mocks/fixtures/` | Holds realistic server data for the summary. | `SuperadminSystemOpsMockFixtures.ts` |
| `system-ops_mocks/handlers/` | Provides MSW response behavior and resettable state. | `SuperadminSystemOpsMockHandlers.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global API transport only.
- `@/lib/formatters` — global formatting infrastructure only.
- `@/app/superadmin/system-ops/*_url_config.ts` — owning detail-module navigation contracts only.
### Business Feature Dependencies
- None.
### Role-Level Business Dependencies
- None.

## Feature Inventory
| Feature | Route | What the User Can Do | API | Status |
|---|---|---|---|---|
| System Ops Summary | `/superadmin/system-ops` | Review summary state and open Infrastructure, Jobs, Backups, or Migrations | `GET /api/superadmin/system-ops/summary` | Implemented with MSW |

## Rule Compliance Checklist
- [x] No fake operational status literals remain in the component.
- [x] Server state uses TanStack Query.
- [x] API boundary validates response data with Zod.
- [x] Module-owned MSW fixture/handler exists.
- [x] Route loading and error boundaries exist.
- [x] No sibling business imports.

## User Flows & Interactions
### Flow 1: Review System Status
1. User opens `/superadmin/system-ops`.
2. `SuperadminSystemOpsDashboardClient` loads the TanStack Query summary.
3. Loading renders the route skeleton; success renders API-provided operational cards.
4. User selects Infrastructure, Jobs, Backups, or Migrations.
5. Navigation uses the corresponding module URL contract.

### Flow 2: Recover From Summary Failure
1. Summary request fails.
2. `error.tsx` presents module-specific recovery UI.
3. User activates Retry.
4. The route retries the query and either renders fresh summary data or presents the failure state again.

## Edge Cases and AI Warnings
1. Never hardcode operational health values in JSX; all operational status values must come from the module API/mock contract.
2. Do not import infrastructure/jobs/backups business logic into the summary module; link to the owning feature routes instead.
3. A failed detail feature is a downstream dependency issue; do not redesign that module while repairing the summary page.
4. Keep query keys stable and namespaced; do not move server summary data into Zustand or Context.
5. Retry must actually rerun the failed request and restore the summary UI when the mock/backend succeeds.
6. Do not expose raw backend stack traces, request payloads, tokens, or internal error objects in the summary UI.

## Data and State Architecture

- **Actual feature root:** `system-ops`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `system-ops_utils/useSuperadminSystemOpsSummary.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureUptime.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureData.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureTenants.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureV1.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureActions.ts`, `jobs/jobs_utils/useSuperadminJobsSelection.ts`, `jobs/jobs_utils/useSuperadminJobsPage.ts`, `jobs/jobs_utils/useSuperadminJobsMutations.ts`, `jobs/jobs_utils/useSuperadminJobsV1.ts`, `backups/backups_utils/useSuperadminBackupsSchedule.ts`, `backups/backups_utils/useSuperadminBackupsActions.ts`, `backups/backups_utils/useSuperadminBackupsData.ts`, `backups/backups_utils/useSuperadminBackupsV1.ts`, `migrations/migrations_utils/useSuperadminMigrationsPage.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'infrastructure', 'uptime-history']`, `['superadmin', 'infrastructure', 'nodes', normalizedParams]`, `['superadmin', 'infrastructure', 'redis']`, `['superadmin', 'infrastructure', 'tenants']`, `['superadmin', 'infrastructure_api_health']`, `['superadmin', 'infrastructure']`, `['superadmin', 'jobs', queryParams]`, `['superadmin', 'jobs']`, `['superadmin', 'jobs_queue_health']`, `['superadmin', 'backups']`, `['superadmin', 'backups', params]`, `['superadmin', 'backups_health']`

## API Contract

- **API files:** `system-ops_api/SuperadminSystemOpsApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`, `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs/jobs_api/SuperadminJobsApi.ts`, `backups/backups_api/SuperadminBackupsHealthApi.ts`, `backups/backups_api/SuperadminBackupsApi.ts`, `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchSuperadminSystemOpsSummary` — `system-ops_api/SuperadminSystemOpsApi.ts`; `fetchInfrastructureNodes` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`; `fetchJobsQueueHealth` — `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `fetchBackupsHealth` — `backups/backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups/backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchMigrations` — `migrations/migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `migrations/page.tsx`, `backups/page.tsx`, `jobs/page.tsx`, `infrastructure/page.tsx`, `system-ops_components/SuperadminSystemOpsDashboardClient.tsx`, `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs/jobs_components/SuperadminJobsView.tsx`, `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsTriggerModal.tsx`, `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups/backups_components/SuperadminBackupsTable.tsx`, `backups/backups_components/SuperadminBackupsScheduleModal.tsx`, `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups/backups_components/SuperadminBackupsClient.tsx`, `backups/backups_components/SuperadminBackupsRestoreModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`, `migrations/loading.tsx`, `backups/loading.tsx`, `jobs/loading.tsx`, `infrastructure/loading.tsx`
- **`error.tsx`:** `error.tsx`, `migrations/error.tsx`, `backups/error.tsx`, `jobs/error.tsx`, `infrastructure/error.tsx`
- **Empty-state components:** `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`, `migrations/migrations_components/SuperadminMigrationsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for system-ops. |
| `migrations/page.tsx` | Server component entry point for the Superadmin Migrations module. |
| `backups/page.tsx` | Pure Server Component for the backups page. Renders the interactive client component. |
| `jobs/page.tsx` | page.tsx acts as a Server Component entry point. |
| `infrastructure/page.tsx` | Pure Server Component for the infrastructure page. Renders the interactive client component. |
| `system-ops_components/SuperadminSystemOpsDashboardClient.tsx` | Renders System Ops summary cards from TanStack Query server data and links to the owning detail features. No API calls. |
| `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx` | Renders the route-level structural skeleton for the System Operations dashboard. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx` | Renders the Superadmin infrastructure V1 Recent incidents view. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx` | Renders the Superadmin infrastructure V1 Service endpoint health view. |
| `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx` | Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx` | Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx` | Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards. |
| `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx` | Renders the historical uptime chart from Infrastructure API data; no generated business values are created in the component. |
| `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx` | Renders the Superadmin jobs V1 JobsQueueSummary summary cards. |
| `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx` | Renders the Superadmin jobs V1 Queue health view. |
| `jobs/jobs_components/SuperadminJobsView.tsx` | SuperadminJobsView.tsx — orchestrator for the Background Jobs page. |
| `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx` | Renders the Superadmin jobs V1 Recent job failures view. |
| `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx` | Renders the empty state for the jobs table. |
| `backups/backups_components/SuperadminBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `backups/backups_components/SuperadminBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `backups/backups_components/SuperadminBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminBackupsSchedule. |
| `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `backups/backups_components/SuperadminBackupsClient.tsx` | SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminBackupsData and rendered from query state. |
| `backups/backups_components/SuperadminBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |
| `migrations/migrations_components/SuperadminMigrationStatusBadge.tsx` | Renders one semantic migration status badge with its status-specific icon. |
| `migrations/migrations_components/SuperadminMigrationsEmptyState.tsx` | Renders the empty state for the Superadmin migration history table. |
| `migrations/migrations_components/SuperadminMigrationsClient.tsx` | Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Rule Compliance Checklist


- [x] Rule 7: TypeORM is the only approved ORM in this backend.
- [x] Rule 19: This feature document contains concrete endpoints, state, flows, permissions, edge cases, and contract evidence.
- [x] Rule 28: Successful responses are wrapped by the global response interceptor.
- [x] Rule 29: Delete paths use soft-delete semantics.
- [x] Rule 31: Frontend-exposed critical mutations use `RequireIdempotencyKey`.
- [x] Rule 48: Query and command controllers are physically separated where CRUD endpoints exist.
- [x] Rule 62: Service/repository return types are explicit.
- [x] Rule 76/79: Responsibility/Flow headers exist on authored source files.
- [x] Rule 82A: V1 response classes preserve the complete frontend contract.
- [x] Rule 83: RBAC is enforced at the controller boundary.
- [x] Rule 89: ORM access stays behind repositories.
- [x] Rule 92: Dynamic filtering/sorting uses server-defined allowlists.
- [x] Rule 101: Tests must assert observable behavior; placeholder tests are not accepted.

