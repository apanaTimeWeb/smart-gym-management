# system-ops Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/backend_superadmin/system-ops/backups/backups-schedule-contract-snapshot.entity`
- `@/backend_superadmin/system-ops/backups/backups-schedule-contract-snapshot.repository`
- `@/backend_superadmin/system-ops/backups/backups-command.controller`
- `@/backend_superadmin/system-ops/backups/backups-contract-snapshot.entity`
- `@/backend_superadmin/system-ops/backups/backups-contract-snapshot.repository`
- `@/backend_superadmin/system-ops/backups/backups-health-response.dto.ts`
- `@/backend_superadmin/system-ops/backups/backups-query.controller`
- `@/backend_superadmin/system-ops/backups/backups-special.controller`
- `@/backend_superadmin/system-ops/backups/backups.constants`
- `@/backend_superadmin/system-ops/backups/backups.entity`
- `@/backend_superadmin/system-ops/backups/backups.mapper`
- `@/backend_superadmin/system-ops/backups/backups.module`
- `@/backend_superadmin/system-ops/backups/backups.repository`
- `@/backend_superadmin/system-ops/backups/dtos/backups-create.dto`
- `@/backend_superadmin/system-ops/backups/dtos/backups-query.dto`
- `@/backend_superadmin/system-ops/backups/dtos/backups-update.dto`
- `@/backend_superadmin/system-ops/backups/services/backups-create.service`
- `@/backend_superadmin/system-ops/backups/services/backups-delete.service`
- `@/backend_superadmin/system-ops/backups/services/backups-download.service`
- `@/backend_superadmin/system-ops/backups/services/backups-find.service`
- `@/backend_superadmin/system-ops/backups/services/backups-health.service`
- `@/backend_superadmin/system-ops/backups/services/backups-list.service`
- `@/backend_superadmin/system-ops/backups/services/backups-restore.service`
- `@/backend_superadmin/system-ops/backups/services/backups-schedule.service`
- `@/backend_superadmin/system-ops/backups/services/backups-status.service`
- `@/backend_superadmin/system-ops/backups/services/backups-trigger.service`
- `@/backend_superadmin/system-ops/backups/services/backups-update.service`
- `@/backend_superadmin/system-ops/backups/types/backups.interfaces`
- `@/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-create.dto`
- `@/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-query.dto`
- `@/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-update.dto`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure-api-health-response.dto.ts`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure-command.controller`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.repository`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure-query.controller`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure-special.controller`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure.constants`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure.entity`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure.mapper`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure.module`
- `@/backend_superadmin/system-ops/infrastructure/infrastructure.repository`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-api-health.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-create.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-delete.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-find.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-flush-global.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-flush-tenant.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-list.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-redis.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-status.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-update.service`
- `@/backend_superadmin/system-ops/infrastructure/services/infrastructure-uptime.service`
- `@/backend_superadmin/system-ops/infrastructure/types/infrastructure.interfaces`
- `@/backend_superadmin/system-ops/jobs/dtos/jobs-create.dto`
- `@/backend_superadmin/system-ops/jobs/dtos/jobs-query.dto`
- `@/backend_superadmin/system-ops/jobs/dtos/jobs-update.dto`
- `@/backend_superadmin/system-ops/jobs/jobs-command.controller`
- `@/backend_superadmin/system-ops/jobs/jobs-contract-snapshot.entity`
- `@/backend_superadmin/system-ops/jobs/jobs-contract-snapshot.repository`
- `@/backend_superadmin/system-ops/jobs/jobs-query.controller`
- `@/backend_superadmin/system-ops/jobs/jobs-queue-health-response.dto.ts`
- `@/backend_superadmin/system-ops/jobs/jobs-special.controller`
- `@/backend_superadmin/system-ops/jobs/jobs.constants`
- `@/backend_superadmin/system-ops/jobs/jobs.entity`
- `@/backend_superadmin/system-ops/jobs/jobs.mapper`
- `@/backend_superadmin/system-ops/jobs/jobs.module`
- `@/backend_superadmin/system-ops/jobs/jobs.repository`
- `@/backend_superadmin/system-ops/jobs/services/jobs-bulk-delete.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-bulk-retry.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-cancel.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-clear-completed.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-create.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-delete.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-find.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-list.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-queue-health.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-retry-all.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-retry.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-status.service`
- `@/backend_superadmin/system-ops/jobs/services/jobs-update.service`
- `@/backend_superadmin/system-ops/jobs/types/jobs.interfaces`
- `@/backend_superadmin/system-ops/migrations/dtos/migrations-create.dto`
- `@/backend_superadmin/system-ops/migrations/dtos/migrations-query.dto`
- `@/backend_superadmin/system-ops/migrations/dtos/migrations-update.dto`
- `@/backend_superadmin/system-ops/migrations/migrations-command.controller`
- `@/backend_superadmin/system-ops/migrations/migrations-query.controller`
- `@/backend_superadmin/system-ops/migrations/migrations-special.controller`
- `@/backend_superadmin/system-ops/migrations/migrations.entity`
- `@/backend_superadmin/system-ops/migrations/migrations.mapper`
- `@/backend_superadmin/system-ops/migrations/migrations.module`
- `@/backend_superadmin/system-ops/migrations/migrations.repository`
- `@/backend_superadmin/system-ops/migrations/services/migrations-create.service`
- `@/backend_superadmin/system-ops/migrations/services/migrations-delete.service`
- `@/backend_superadmin/system-ops/migrations/services/migrations-find.service`
- `@/backend_superadmin/system-ops/migrations/services/migrations-list.service`
- `@/backend_superadmin/system-ops/migrations/services/migrations-status.service`
- `@/backend_superadmin/system-ops/migrations/services/migrations-trigger.service`
- `@/backend_superadmin/system-ops/migrations/services/migrations-update.service`
- `@/backend_superadmin/system-ops/migrations/types/migrations.interfaces`
- `@/backend_superadmin/system-ops/services/system-ops-summary.service`
- `@/backend_superadmin/system-ops/system-ops-special.controller`
- `@/backend_superadmin/system-ops/system-ops.entity`
- `@/backend_superadmin/system-ops/system-ops.module`
- `@/backend_superadmin/system-ops/system-ops.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.