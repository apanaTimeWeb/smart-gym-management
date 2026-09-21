# system-ops Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling business modules directly.

## Local Feature Imports
- `@/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.entity`
- `@/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.repository`
- `@/modules/superadmin/system-ops/backups/backups-command.controller`
- `@/modules/superadmin/system-ops/backups/backups-contract-snapshot.entity`
- `@/modules/superadmin/system-ops/backups/backups-contract-snapshot.repository`
- `@/modules/superadmin/system-ops/backups/backups-health-response.dto.ts`
- `@/modules/superadmin/system-ops/backups/backups-query.controller`
- `@/modules/superadmin/system-ops/backups/backups-special.controller`
- `@/modules/superadmin/system-ops/backups/backups.constants`
- `@/modules/superadmin/system-ops/backups/backups.entity`
- `@/modules/superadmin/system-ops/backups/backups.mapper`
- `@/modules/superadmin/system-ops/backups/backups.module`
- `@/modules/superadmin/system-ops/backups/backups.repository`
- `@/modules/superadmin/system-ops/backups/dtos/backups-create.dto`
- `@/modules/superadmin/system-ops/backups/dtos/backups-query.dto`
- `@/modules/superadmin/system-ops/backups/dtos/backups-update.dto`
- `@/modules/superadmin/system-ops/backups/services/backups-create.service`
- `@/modules/superadmin/system-ops/backups/services/backups-delete.service`
- `@/modules/superadmin/system-ops/backups/services/backups-download.service`
- `@/modules/superadmin/system-ops/backups/services/backups-find.service`
- `@/modules/superadmin/system-ops/backups/services/backups-health.service`
- `@/modules/superadmin/system-ops/backups/services/backups-list.service`
- `@/modules/superadmin/system-ops/backups/services/backups-restore.service`
- `@/modules/superadmin/system-ops/backups/services/backups-schedule.service`
- `@/modules/superadmin/system-ops/backups/services/backups-status.service`
- `@/modules/superadmin/system-ops/backups/services/backups-trigger.service`
- `@/modules/superadmin/system-ops/backups/services/backups-update.service`
- `@/modules/superadmin/system-ops/backups/types/backups.interfaces`
- `@/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-create.dto`
- `@/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-query.dto`
- `@/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-update.dto`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure-api-health-response.dto.ts`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure-command.controller`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.repository`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure-query.controller`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure-special.controller`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure.constants`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure.entity`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure.mapper`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure.module`
- `@/modules/superadmin/system-ops/infrastructure/infrastructure.repository`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-api-health.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-create.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-delete.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-find.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-flush-global.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-flush-tenant.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-list.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-redis.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-status.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-update.service`
- `@/modules/superadmin/system-ops/infrastructure/services/infrastructure-uptime.service`
- `@/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces`
- `@/modules/superadmin/system-ops/jobs/dtos/jobs-create.dto`
- `@/modules/superadmin/system-ops/jobs/dtos/jobs-query.dto`
- `@/modules/superadmin/system-ops/jobs/dtos/jobs-update.dto`
- `@/modules/superadmin/system-ops/jobs/jobs-command.controller`
- `@/modules/superadmin/system-ops/jobs/jobs-contract-snapshot.entity`
- `@/modules/superadmin/system-ops/jobs/jobs-contract-snapshot.repository`
- `@/modules/superadmin/system-ops/jobs/jobs-query.controller`
- `@/modules/superadmin/system-ops/jobs/jobs-queue-health-response.dto.ts`
- `@/modules/superadmin/system-ops/jobs/jobs-special.controller`
- `@/modules/superadmin/system-ops/jobs/jobs.constants`
- `@/modules/superadmin/system-ops/jobs/jobs.entity`
- `@/modules/superadmin/system-ops/jobs/jobs.mapper`
- `@/modules/superadmin/system-ops/jobs/jobs.module`
- `@/modules/superadmin/system-ops/jobs/jobs.repository`
- `@/modules/superadmin/system-ops/jobs/services/jobs-bulk-delete.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-bulk-retry.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-cancel.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-clear-completed.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-create.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-delete.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-find.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-list.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-queue-health.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-retry-all.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-retry.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-status.service`
- `@/modules/superadmin/system-ops/jobs/services/jobs-update.service`
- `@/modules/superadmin/system-ops/jobs/types/jobs.interfaces`
- `@/modules/superadmin/system-ops/migrations/dtos/migrations-create.dto`
- `@/modules/superadmin/system-ops/migrations/dtos/migrations-query.dto`
- `@/modules/superadmin/system-ops/migrations/dtos/migrations-update.dto`
- `@/modules/superadmin/system-ops/migrations/migrations-command.controller`
- `@/modules/superadmin/system-ops/migrations/migrations-query.controller`
- `@/modules/superadmin/system-ops/migrations/migrations-special.controller`
- `@/modules/superadmin/system-ops/migrations/migrations.entity`
- `@/modules/superadmin/system-ops/migrations/migrations.mapper`
- `@/modules/superadmin/system-ops/migrations/migrations.module`
- `@/modules/superadmin/system-ops/migrations/migrations.repository`
- `@/modules/superadmin/system-ops/migrations/services/migrations-create.service`
- `@/modules/superadmin/system-ops/migrations/services/migrations-delete.service`
- `@/modules/superadmin/system-ops/migrations/services/migrations-find.service`
- `@/modules/superadmin/system-ops/migrations/services/migrations-list.service`
- `@/modules/superadmin/system-ops/migrations/services/migrations-status.service`
- `@/modules/superadmin/system-ops/migrations/services/migrations-trigger.service`
- `@/modules/superadmin/system-ops/migrations/services/migrations-update.service`
- `@/modules/superadmin/system-ops/migrations/types/migrations.interfaces`
- `@/modules/superadmin/system-ops/services/system-ops-summary.service`
- `@/modules/superadmin/system-ops/system-ops-special.controller`
- `@/modules/superadmin/system-ops/system-ops.entity`
- `@/modules/superadmin/system-ops/system-ops.module`
- `@/modules/superadmin/system-ops/system-ops.repository`

## Infrastructure Imports


## Runtime Event Dependencies
Any event emitted or consumed by this feature must appear here by exact `DOMAIN.ENTITY.ACTION` name and be registered in `event-registry.constants.ts`. Undeclared subscriptions are forbidden.

## Dependency Direction
Controller -> DTO -> service/use case -> repository/adapter -> infrastructure. Parent role/domain containers may compose child feature modules but must not absorb their business logic.