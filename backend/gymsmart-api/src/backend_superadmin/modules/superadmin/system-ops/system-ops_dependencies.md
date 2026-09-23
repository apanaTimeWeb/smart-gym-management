# system-ops Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/backend_superadmin/system-ops/backups/backups-schedule-contract-snapshot.entity`
- `@/modules/backend_superadmin/system-ops/backups/backups-schedule-contract-snapshot.repository`
- `@/modules/backend_superadmin/system-ops/backups/backups-command.controller`
- `@/modules/backend_superadmin/system-ops/backups/backups-contract-snapshot.entity`
- `@/modules/backend_superadmin/system-ops/backups/backups-contract-snapshot.repository`
- `@/modules/backend_superadmin/system-ops/backups/backups-health-response.dto.ts`
- `@/modules/backend_superadmin/system-ops/backups/backups-query.controller`
- `@/modules/backend_superadmin/system-ops/backups/backups-special.controller`
- `@/modules/backend_superadmin/system-ops/backups/backups.constants`
- `@/modules/backend_superadmin/system-ops/backups/backups.entity`
- `@/modules/backend_superadmin/system-ops/backups/backups.mapper`
- `@/modules/backend_superadmin/system-ops/backups/backups.module`
- `@/modules/backend_superadmin/system-ops/backups/backups.repository`
- `@/modules/backend_superadmin/system-ops/backups/dtos/backups-create.dto`
- `@/modules/backend_superadmin/system-ops/backups/dtos/backups-query.dto`
- `@/modules/backend_superadmin/system-ops/backups/dtos/backups-update.dto`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-create.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-delete.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-download.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-find.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-health.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-list.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-restore.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-schedule.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-status.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-trigger.service`
- `@/modules/backend_superadmin/system-ops/backups/services/backups-update.service`
- `@/modules/backend_superadmin/system-ops/backups/types/backups.interfaces`
- `@/modules/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-create.dto`
- `@/modules/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-query.dto`
- `@/modules/backend_superadmin/system-ops/infrastructure/dtos/infrastructure-update.dto`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure-api-health-response.dto.ts`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure-command.controller`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.repository`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure-query.controller`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure-special.controller`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure.constants`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure.entity`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure.mapper`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure.module`
- `@/modules/backend_superadmin/system-ops/infrastructure/infrastructure.repository`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-api-health.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-create.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-delete.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-find.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-flush-global.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-flush-tenant.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-list.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-redis.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-status.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-update.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/services/infrastructure-uptime.service`
- `@/modules/backend_superadmin/system-ops/infrastructure/types/infrastructure.interfaces`
- `@/modules/backend_superadmin/system-ops/jobs/dtos/jobs-create.dto`
- `@/modules/backend_superadmin/system-ops/jobs/dtos/jobs-query.dto`
- `@/modules/backend_superadmin/system-ops/jobs/dtos/jobs-update.dto`
- `@/modules/backend_superadmin/system-ops/jobs/jobs-command.controller`
- `@/modules/backend_superadmin/system-ops/jobs/jobs-contract-snapshot.entity`
- `@/modules/backend_superadmin/system-ops/jobs/jobs-contract-snapshot.repository`
- `@/modules/backend_superadmin/system-ops/jobs/jobs-query.controller`
- `@/modules/backend_superadmin/system-ops/jobs/jobs-queue-health-response.dto.ts`
- `@/modules/backend_superadmin/system-ops/jobs/jobs-special.controller`
- `@/modules/backend_superadmin/system-ops/jobs/jobs.constants`
- `@/modules/backend_superadmin/system-ops/jobs/jobs.entity`
- `@/modules/backend_superadmin/system-ops/jobs/jobs.mapper`
- `@/modules/backend_superadmin/system-ops/jobs/jobs.module`
- `@/modules/backend_superadmin/system-ops/jobs/jobs.repository`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-bulk-delete.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-bulk-retry.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-cancel.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-clear-completed.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-create.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-delete.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-find.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-list.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-queue-health.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-retry-all.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-retry.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-status.service`
- `@/modules/backend_superadmin/system-ops/jobs/services/jobs-update.service`
- `@/modules/backend_superadmin/system-ops/jobs/types/jobs.interfaces`
- `@/modules/backend_superadmin/system-ops/migrations/dtos/migrations-create.dto`
- `@/modules/backend_superadmin/system-ops/migrations/dtos/migrations-query.dto`
- `@/modules/backend_superadmin/system-ops/migrations/dtos/migrations-update.dto`
- `@/modules/backend_superadmin/system-ops/migrations/migrations-command.controller`
- `@/modules/backend_superadmin/system-ops/migrations/migrations-query.controller`
- `@/modules/backend_superadmin/system-ops/migrations/migrations-special.controller`
- `@/modules/backend_superadmin/system-ops/migrations/migrations.entity`
- `@/modules/backend_superadmin/system-ops/migrations/migrations.mapper`
- `@/modules/backend_superadmin/system-ops/migrations/migrations.module`
- `@/modules/backend_superadmin/system-ops/migrations/migrations.repository`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-create.service`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-delete.service`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-find.service`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-list.service`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-status.service`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-trigger.service`
- `@/modules/backend_superadmin/system-ops/migrations/services/migrations-update.service`
- `@/modules/backend_superadmin/system-ops/migrations/types/migrations.interfaces`
- `@/modules/backend_superadmin/system-ops/services/system-ops-summary.service`
- `@/modules/backend_superadmin/system-ops/system-ops-special.controller`
- `@/modules/backend_superadmin/system-ops/system-ops.entity`
- `@/modules/backend_superadmin/system-ops/system-ops.module`
- `@/modules/backend_superadmin/system-ops/system-ops.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.