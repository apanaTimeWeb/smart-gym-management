# system-ops Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/system-ops feature. It exposes 51 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `backups/backups_dtos/superadmin-system-ops-backups-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_dtos/superadmin-system-ops-backups-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_dtos/superadmin-system-ops-backups-schedule.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_dtos/superadmin-system-ops-backups-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_dtos/superadmin-system-ops-backups-trigger.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_dtos/superadmin-system-ops-backups-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_repositories/superadmin-system-ops-backup-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `backups/backups_responses/superadmin-system-ops-backups-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_responses/superadmin-system-ops-backups-queued-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_responses/superadmin-system-ops-backups-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/backups_services/superadmin-system-ops-backups-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-download.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-restore.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-schedule.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-trigger.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_services/superadmin-system-ops-backups-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/backups_types/superadmin-system-ops-backups.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `backups/backups_types/superadmin-system-ops-backups.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `backups/backups_workers/superadmin-system-ops-backups-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups/superadmin-system-ops-backup-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `backups/superadmin-system-ops-backups-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `backups/superadmin-system-ops-backups-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `backups/superadmin-system-ops-backups-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `backups/superadmin-system-ops-backups-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups/superadmin-system-ops-backups-operations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `backups/superadmin-system-ops-backups-operations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `backups/superadmin-system-ops-backups-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `backups/superadmin-system-ops-backups-schedule-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `backups/superadmin-system-ops-backups.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `backups/superadmin-system-ops-backups.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `backups/superadmin-system-ops-backups.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `backups/superadmin-system-ops-backups.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `backups/superadmin-system-ops-backups.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `backups/superadmin-system-ops-backups.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `backups/superadmin-system-ops-backups.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-flush-tenant.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/infrastructure_dtos/superadmin-system-ops-infrastructure-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/infrastructure_responses/superadmin-system-ops-infrastructure-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-api-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-global.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-tenant.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-redis.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-uptime.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure/infrastructure_types/superadmin-system-ops-infrastructure.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `infrastructure/infrastructure_types/superadmin-system-ops-infrastructure.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `infrastructure/superadmin-system-ops-infrastructure-api-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure/superadmin-system-ops-infrastructure-cache-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `infrastructure/superadmin-system-ops-infrastructure-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `infrastructure/superadmin-system-ops-infrastructure-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `infrastructure/superadmin-system-ops-infrastructure-telemetry-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `infrastructure/superadmin-system-ops-infrastructure.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `infrastructure/superadmin-system-ops-infrastructure.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `infrastructure/superadmin-system-ops-infrastructure.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `infrastructure/superadmin-system-ops-infrastructure.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `infrastructure/superadmin-system-ops-infrastructure.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `infrastructure/superadmin-system-ops-infrastructure.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `infrastructure/superadmin-system-ops-infrastructure.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `jobs/jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/jobs_dtos/superadmin-system-ops-jobs-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/jobs_dtos/superadmin-system-ops-jobs-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/jobs_dtos/superadmin-system-ops-jobs-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/jobs_dtos/superadmin-system-ops-jobs-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/jobs_responses/superadmin-system-ops-jobs-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/jobs_services/superadmin-system-ops-jobs-bulk-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-bulk-retry.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-cancel.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-clear-completed.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-queue-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-retry-all.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-retry.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_services/superadmin-system-ops-jobs-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs/jobs_types/superadmin-system-ops-jobs.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `jobs/jobs_types/superadmin-system-ops-jobs.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `jobs/superadmin-system-ops-jobs-bulk-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `jobs/superadmin-system-ops-jobs-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `jobs/superadmin-system-ops-jobs-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `jobs/superadmin-system-ops-jobs-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `jobs/superadmin-system-ops-jobs-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `jobs/superadmin-system-ops-jobs-queue-health-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `jobs/superadmin-system-ops-jobs-queue-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs/superadmin-system-ops-jobs.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `jobs/superadmin-system-ops-jobs.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `jobs/superadmin-system-ops-jobs.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `jobs/superadmin-system-ops-jobs.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `jobs/superadmin-system-ops-jobs.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `jobs/superadmin-system-ops-jobs.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `jobs/superadmin-system-ops-jobs.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `migrations/migrations_dtos/superadmin-system-ops-migrations-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations/migrations_dtos/superadmin-system-ops-migrations-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations/migrations_dtos/superadmin-system-ops-migrations-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations/migrations_dtos/superadmin-system-ops-migrations-trigger.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations/migrations_dtos/superadmin-system-ops-migrations-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations/migrations_responses/superadmin-system-ops-migrations-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations/migrations_services/superadmin-system-ops-migrations-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_services/superadmin-system-ops-migrations-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_services/superadmin-system-ops-migrations-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_services/superadmin-system-ops-migrations-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_services/superadmin-system-ops-migrations-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_services/superadmin-system-ops-migrations-trigger.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_services/superadmin-system-ops-migrations-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations/migrations_types/superadmin-system-ops-migrations.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `migrations/migrations_types/superadmin-system-ops-migrations.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `migrations/superadmin-system-ops-migrations-advanced-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `migrations/superadmin-system-ops-migrations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `migrations/superadmin-system-ops-migrations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `migrations/superadmin-system-ops-migrations.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `migrations/superadmin-system-ops-migrations.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `migrations/superadmin-system-ops-migrations.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `migrations/superadmin-system-ops-migrations.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `migrations/superadmin-system-ops-migrations.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `migrations/superadmin-system-ops-migrations.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `migrations/superadmin-system-ops-migrations.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-system-ops-container.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-system-ops-summary-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-system-ops.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `system-ops_services/superadmin-system-ops-summary.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `system-ops_types/superadmin-system-ops.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `system-ops_types/superadmin-system-ops.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-system-ops-backups-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the create operation. | `SuperadminSystemOpsBackupsCreateDto` | `See controller contract` |
| `superadmin-system-ops-backups-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the update operation. | `SuperadminSystemOpsBackupsUpdateDto` | `See controller contract` |
| `superadmin-system-ops-backups-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-system-ops-backups-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the changeStatus operation. | `SuperadminSystemOpsBackupsStatusDto` | `See controller contract` |
| `superadmin-system-ops-backups-operations-command.controller.ts::patchSchedule` | PATCH | `superadmin/system-ops/backups/schedule` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the patchSchedule operation. | `SuperadminSystemOpsBackupsScheduleDto` | `See controller contract` |
| `superadmin-system-ops-backups-operations-command.controller.ts::trigger` | POST | `superadmin/system-ops/backups/trigger` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the trigger operation. | `SuperadminSystemOpsBackupsTriggerDto` | `null` |
| `superadmin-system-ops-backups-operations-command.controller.ts::restore` | POST | `superadmin/system-ops/backups/:id/restore` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the restore operation. | `—` | `null` |
| `superadmin-system-ops-backups-operations-query.controller.ts::schedule` | GET | `superadmin/system-ops/backups/schedule` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the schedule operation. | `—` | `SuperadminSystemOpsBackupsJobStatusResponseDto` |
| `superadmin-system-ops-backups-operations-query.controller.ts::health` | GET | `superadmin/system-ops/backups/health` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the health operation. | `Record` | `SuperadminSystemOpsBackupsJobStatusResponseDto` |
| `superadmin-system-ops-backups-operations-query.controller.ts::health` | GET | `api/superadmin/system-ops/backups/health` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the health operation. | `Record` | `SuperadminSystemOpsBackupsJobStatusResponseDto` |
| `superadmin-system-ops-backups-operations-query.controller.ts::jobStatus` | GET | `superadmin/system-ops/backups/jobs/:jobId` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the jobStatus operation. | `—` | `SuperadminSystemOpsBackupsJobStatusResponseDto` |
| `superadmin-system-ops-backups-operations-query.controller.ts::download` | GET | `superadmin/system-ops/backups/:id/download` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the download operation. | `—` | `SuperadminSystemOpsBackupsJobStatusResponseDto` |
| `superadmin-system-ops-backups-operations-query.controller.ts::downloadFile` | GET | `superadmin/system-ops/backups/:id/download/file` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the downloadFile operation. | `—` | `void` |
| `superadmin-system-ops-backups-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findAll operation. | `SuperadminSystemOpsBackupsQueryDto` | `See controller contract` |
| `superadmin-system-ops-backups-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |
| `superadmin-system-ops-infrastructure-cache-command.controller.ts::flushGlobal` | POST | `superadmin/system-ops/infrastructure/redis/flush-global` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the flushGlobal operation. | `—` | `See controller contract` |
| `superadmin-system-ops-infrastructure-cache-command.controller.ts::flushTenant` | POST | `superadmin/system-ops/infrastructure/redis/flush-tenant` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the flushTenant operation. | `SuperadminSystemOpsInfrastructureFlushTenantDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the create operation. | `SuperadminSystemOpsInfrastructureCreateDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the update operation. | `SuperadminSystemOpsInfrastructureUpdateDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-system-ops-infrastructure-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the changeStatus operation. | `SuperadminSystemOpsInfrastructureStatusDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findAll operation. | `SuperadminSystemOpsInfrastructureQueryDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::redis` | GET | `superadmin/system-ops/infrastructure/redis` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the redis operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::uptime` | GET | `superadmin/system-ops/infrastructure/uptime` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the uptime operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::uptime` | GET | `superadmin/system-ops/infrastructure/uptime-history` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the uptime operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::apiHealth` | GET | `superadmin/system-ops/infrastructure/api-health` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the apiHealth operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::apiHealth` | GET | `api/superadmin/system-ops/infrastructure/api-health` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the apiHealth operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::retryAll` | POST | `superadmin/system-ops/jobs/retry-all` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the retryAll operation. | `—` | `See controller contract` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::retry` | POST | `superadmin/system-ops/jobs/:id/retry` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the retry operation. | `—` | `See controller contract` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::cancel` | POST | `superadmin/system-ops/jobs/:id/cancel` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the cancel operation. | `—` | `See controller contract` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::clearCompleted` | POST | `superadmin/system-ops/jobs/clear-completed` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the clearCompleted operation. | `—` | `See controller contract` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::bulkRetry` | POST | `superadmin/system-ops/jobs/bulk-retry` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the bulkRetry operation. | `SuperadminSystemOpsJobsBulkActionDto` | `See controller contract` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::bulkDelete` | POST | `superadmin/system-ops/jobs/bulk-delete` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the bulkDelete operation. | `SuperadminSystemOpsJobsBulkActionDto` | `See controller contract` |
| `superadmin-system-ops-jobs-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the create operation. | `SuperadminSystemOpsJobsCreateDto` | `See controller contract` |
| `superadmin-system-ops-jobs-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the update operation. | `SuperadminSystemOpsJobsUpdateDto` | `See controller contract` |
| `superadmin-system-ops-jobs-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-system-ops-jobs-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the changeStatus operation. | `SuperadminSystemOpsJobsStatusDto` | `See controller contract` |
| `superadmin-system-ops-jobs-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findAll operation. | `SuperadminSystemOpsJobsQueryDto` | `See controller contract` |
| `superadmin-system-ops-jobs-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts::queueHealth` | GET | `superadmin/system-ops/jobs/queue-health` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the queueHealth operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts::queueHealth` | GET | `api/superadmin/system-ops/jobs/queue-health` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the queueHealth operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-system-ops-migrations-advanced-command.controller.ts::trigger` | POST | `superadmin/system-ops/migrations/trigger` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the trigger operation. | `SuperadminSystemOpsMigrationsTriggerDto` | `See controller contract` |
| `superadmin-system-ops-migrations-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the create operation. | `SuperadminSystemOpsMigrationsCreateDto` | `See controller contract` |
| `superadmin-system-ops-migrations-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the update operation. | `SuperadminSystemOpsMigrationsUpdateDto` | `See controller contract` |
| `superadmin-system-ops-migrations-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-system-ops-migrations-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the changeStatus operation. | `SuperadminSystemOpsMigrationsStatusDto` | `See controller contract` |
| `superadmin-system-ops-migrations-query.controller.ts::findAll` | GET | `superadmin/system-ops/migrations` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findAll operation. | `SuperadminSystemOpsMigrationsQueryDto` | `See controller contract` |
| `superadmin-system-ops-migrations-query.controller.ts::findOne` | GET | `superadmin/system-ops/migrations/:id` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |
| `superadmin-system-ops-summary-query.controller.ts::findSystemOpsSummary` | GET | `superadmin/system-ops/summary` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findSystemOpsSummary operation. | `—` | `See controller contract` |
| `superadmin-system-ops-summary-query.controller.ts::findSystemOpsSummary` | GET | `api/superadmin/system-ops/summary` | This endpoint validates transport input, invokes the owning system-ops use case, and returns the declared contract for the findSystemOpsSummary operation. | `—` | `See controller contract` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_jobs, superadmin_core_observability, superadmin_core_pagination, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-system-ops-backup-job.entity → `superadmin_backup_jobs`, superadmin-system-ops-backups-contract-snapshot.entity → `superadmin_backups_contract_snapshots`, superadmin-system-ops-backups-schedule-contract-snapshot.entity → `superadmin_backup_schedule_contract_snapshots`, superadmin-system-ops-backups.entity → `superadmin_backup_records`, superadmin-system-ops-infrastructure-contract-snapshot.entity → `superadmin_infrastructure_contract_snapshots`, superadmin-system-ops-infrastructure.entity → `superadmin_infrastructure_nodes`, superadmin-system-ops-jobs-contract-snapshot.entity → `superadmin_jobs_contract_snapshots`, superadmin-system-ops-jobs.entity → `superadmin_background_jobs`, superadmin-system-ops-migrations.entity → `superadmin_migration_logs`, superadmin-system-ops.entity → `superadmin_system_ops_snapshots`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: backups/superadmin-system-ops-backup-job.entity.ts, jobs/superadmin-system-ops-jobs-query.controller.ts, jobs/superadmin-system-ops-jobs.constants.ts, jobs/superadmin-system-ops-jobs.repository.ts, jobs/superadmin-system-ops-jobs-command.controller.ts, jobs/superadmin-system-ops-jobs.module.ts, jobs/superadmin-system-ops-jobs-bulk-command.controller.ts, jobs/superadmin-system-ops-jobs-queue-health-response.dto.ts, jobs/superadmin-system-ops-jobs.seeder.ts, jobs/superadmin-system-ops-jobs-queue-health-query.controller.ts, jobs/superadmin-system-ops-jobs-contract-snapshot.repository.ts, jobs/superadmin-system-ops-jobs.entity.ts, jobs/superadmin-system-ops-jobs-contract-snapshot.entity.ts, jobs/superadmin-system-ops-jobs.mapper.ts, jobs/superadmin-system-ops-jobs.exceptions.ts, jobs/jobs_types/superadmin-system-ops-jobs.interfaces.ts, jobs/jobs_types/superadmin-system-ops-jobs.enums.ts, jobs/jobs_responses/superadmin-system-ops-jobs-response.dto.ts, jobs/jobs_services/superadmin-system-ops-jobs-bulk-retry.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-bulk-delete.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-find.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-update.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-retry.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-create.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-queue-health.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-status.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-retry-all.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-cancel.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-clear-completed.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-delete.service.ts, jobs/jobs_services/superadmin-system-ops-jobs-list.service.ts, jobs/jobs_dtos/superadmin-system-ops-jobs-status.dto.ts, jobs/jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto.ts, jobs/jobs_dtos/superadmin-system-ops-jobs-query.dto.ts, jobs/jobs_dtos/superadmin-system-ops-jobs-create.dto.ts, jobs/jobs_dtos/superadmin-system-ops-jobs-update.dto.ts, backups/backups_repositories/superadmin-system-ops-backup-job.repository.ts, backups/backups_responses/superadmin-system-ops-backups-job-status-response.dto.ts
- Idempotency Keys: `/superadmin/system-ops/backups`, `/superadmin/system-ops/backups/:id`, `/superadmin/system-ops/backups/:id/restore`, `/superadmin/system-ops/backups/:id/status`, `/superadmin/system-ops/backups/schedule`, `/superadmin/system-ops/backups/trigger`, `/superadmin/system-ops/infrastructure`, `/superadmin/system-ops/infrastructure/:id`, `/superadmin/system-ops/infrastructure/:id/status`, `/superadmin/system-ops/infrastructure/redis/flush-global`, `/superadmin/system-ops/infrastructure/redis/flush-tenant`, `/superadmin/system-ops/jobs`, `/superadmin/system-ops/jobs/:id`, `/superadmin/system-ops/jobs/:id/cancel`, `/superadmin/system-ops/jobs/:id/retry`, `/superadmin/system-ops/jobs/:id/status`, `/superadmin/system-ops/jobs/bulk-delete`, `/superadmin/system-ops/jobs/bulk-retry`, `/superadmin/system-ops/jobs/clear-completed`, `/superadmin/system-ops/jobs/retry-all`, `/superadmin/system-ops/migrations`, `/superadmin/system-ops/migrations/:id`, `/superadmin/system-ops/migrations/:id/status`, `/superadmin/system-ops/migrations/trigger`

## Business Flow / Key Sequences
For each mutation, the controller validates the request, the use-case service applies business rules, the repository owns PostgreSQL mutation/query details, and the mapper/response DTO exposes only contract-approved fields. Heavy work is queued rather than performed in the HTTP request.

## File Responsibility Map
Every file has one responsibility. Controllers own HTTP wiring only; DTOs own edge validation; services own use-case decisions; repositories own ORM access; mappers own domain/response translation; adapters own external APIs.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/system-ops/backups` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/backups/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/backups/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/backups/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/backups/schedule` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/backups/trigger` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/backups/:id/restore` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/schedule` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/backups/health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/jobs/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/:id/download` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/:id/download/file` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/backups/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure/redis/flush-global` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure/redis/flush-tenant` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/infrastructure/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/redis` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/uptime` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/uptime-history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/api-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/infrastructure/api-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/retry-all` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/:id/retry` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/:id/cancel` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/clear-completed` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/bulk-retry` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs/bulk-delete` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/jobs` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/jobs/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/jobs/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/jobs/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/jobs` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/jobs/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/jobs/queue-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/jobs/queue-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/migrations/trigger` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/migrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/migrations/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/migrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/summary` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/summary` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Cross-feature direct business imports violate the feature write boundary and can introduce hidden coupling — see Rules 0B/0C and Rule 49.
- DTO acceptance does not prove behavior; every accepted field must reach the intended use case and persistence/query path — see Rule 82A.
- Soft-deleted records must never silently reappear in standard reads — see Rule 29.
- User-controlled sorting/filtering must resolve only through allowlists — see Rule 92.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `system-ops/backups/superadmin_backups_features.md`

- **API files:** `backups_api/SuperadminBackupsHealthApi.ts`, `backups_api/SuperadminBackupsApi.ts`
- **Detected API symbols:** `fetchBackupsHealth` — `backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/backups/superadmin_backups_health_features.md`

- **API files:** `backups_api/SuperadminBackupsHealthApi.ts`, `backups_api/SuperadminBackupsApi.ts`
- **Detected API symbols:** `fetchBackupsHealth` — `backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/infrastructure/superadmin_infrastructure_api_health_features.md`

- **API files:** `infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`
- **Detected API symbols:** `fetchInfrastructureNodes` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/infrastructure/superadmin_infrastructure_features.md`

- **API files:** `infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`
- **Detected API symbols:** `fetchInfrastructureNodes` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/jobs/superadmin_jobs_features.md`

- **API files:** `jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs_api/SuperadminJobsApi.ts`
- **Detected API symbols:** `fetchJobsQueueHealth` — `jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs_api/SuperadminJobsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/jobs/superadmin_jobs_queue_health_features.md`

- **API files:** `jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs_api/SuperadminJobsApi.ts`
- **Detected API symbols:** `fetchJobsQueueHealth` — `jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs_api/SuperadminJobsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/migrations/superadmin_migrations_features.md`

- **API files:** `migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchMigrations` — `migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `system-ops/superadmin_system_ops_features.md`

- **API files:** `system-ops_api/SuperadminSystemOpsApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`, `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs/jobs_api/SuperadminJobsApi.ts`, `backups/backups_api/SuperadminBackupsHealthApi.ts`, `backups/backups_api/SuperadminBackupsApi.ts`, `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchSuperadminSystemOpsSummary` — `system-ops_api/SuperadminSystemOpsApi.ts`; `fetchInfrastructureNodes` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`; `fetchJobsQueueHealth` — `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `fetchBackupsHealth` — `backups/backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups/backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchMigrations` — `migrations/migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `system-ops/backups/superadmin_backups_features.md`

- **Data-bearing components:** `page.tsx`, `backups_components/SuperadminBackupsTriggerModal.tsx`, `backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups_components/SuperadminBackupsTable.tsx`, `backups_components/SuperadminBackupsScheduleModal.tsx`, `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups_components/SuperadminBackupsClient.tsx`, `backups_components/SuperadminBackupsRestoreModal.tsx`, `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/backups/superadmin_backups_health_features.md`

- **Data-bearing components:** `page.tsx`, `backups_components/SuperadminBackupsTriggerModal.tsx`, `backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups_components/SuperadminBackupsTable.tsx`, `backups_components/SuperadminBackupsScheduleModal.tsx`, `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups_components/SuperadminBackupsClient.tsx`, `backups_components/SuperadminBackupsRestoreModal.tsx`, `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/infrastructure/superadmin_infrastructure_api_health_features.md`

- **Data-bearing components:** `page.tsx`, `infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/infrastructure/superadmin_infrastructure_features.md`

- **Data-bearing components:** `page.tsx`, `infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/jobs/superadmin_jobs_features.md`

- **Data-bearing components:** `page.tsx`, `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs_components/SuperadminJobsView.tsx`, `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/jobs/superadmin_jobs_queue_health_features.md`

- **Data-bearing components:** `page.tsx`, `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs_components/SuperadminJobsView.tsx`, `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/migrations/superadmin_migrations_features.md`

- **Data-bearing components:** `page.tsx`, `migrations_components/SuperadminMigrationStatusBadge.tsx`, `migrations_components/SuperadminMigrationsEmptyState.tsx`, `migrations_components/SuperadminMigrationsClient.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `system-ops/superadmin_system_ops_features.md`

- **Data-bearing components:** `page.tsx`, `migrations/page.tsx`, `backups/page.tsx`, `jobs/page.tsx`, `infrastructure/page.tsx`, `system-ops_components/SuperadminSystemOpsDashboardClient.tsx`, `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs/jobs_components/SuperadminJobsView.tsx`, `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsTriggerModal.tsx`, `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups/backups_components/SuperadminBackupsTable.tsx`, `backups/backups_components/SuperadminBackupsScheduleModal.tsx`, `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups/backups_components/SuperadminBackupsClient.tsx`, `backups/backups_components/SuperadminBackupsRestoreModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``{superadmin}{query}`` | ``ApiResponse<BackupRecord[]>`` | `REQ-096` / ``fetchBackups`` |
| ``/superadmin/system-ops/backups/trigger`` | ``ApiResponse<null>`` | `REQ-097` / ``createBackupSnapshot`` |
| ``/superadmin/system-ops/backups/{encodeURIComponent}/restore(id)`` | ``ApiResponse<null>`` | `REQ-098` / ``restoreBackupSnapshot`` |
| ``/superadmin/system-ops/backups/{encodeURIComponent}/download(id)`` | ``ApiResponse<{ downloadUrl: string }>`` | `REQ-099` / ``fetchBackupDownloadUrl`` |
| ``/superadmin/system-ops/backups/schedule`` | ``ApiResponse<SuperadminBackupsSchedule>`` | `REQ-100` / ``fetchBackupSchedule`` |
| ``/superadmin/system-ops/backups/schedule`` | ``ApiResponse<SuperadminBackupsSchedule>`` | `REQ-101` / ``updateBackupSchedule`` |
| ``/api/superadmin/system-ops/backups/health`` | ``ApiResponse<SuperadminBackupsV1Data>`` | `REQ-102` / ``fetchBackupsHealth`` |
| ``{superadmin}{q}`` | ``ApiResponse<InfrastructureNode[]>`` | `REQ-103` / ``fetchInfrastructureNodes`` |
| ``/superadmin/system-ops/infrastructure/redis`` | ``ApiResponse<RedisTelemetry>`` | `REQ-104` / ``fetchRedisTelemetry`` |
| ``{superadmin}/uptime-history`` | ``ApiResponse<SuperadminInfrastructureUptimePoint[]>`` | `REQ-105` / ``fetchUptimeHistory`` |
| ``/superadmin/system-ops/infrastructure/redis/flush-global`` | ``ApiResponse<void>`` | `REQ-106` / ``flushGlobalCache`` |
| ``/superadmin/system-ops/infrastructure/redis/flush-tenant`` | ``ApiResponse<void>`` | `REQ-107` / ``flushTenantCache`` |
| ``/api/gyms`` | ``ApiResponse<SuperadminInfrastructureTenant[]>`` | `REQ-108` / ``fetchTenants`` |
| ``/api/superadmin/system-ops/infrastructure/api-health`` | ``ApiResponse<SuperadminInfrastructureV1Data>`` | `REQ-109` / ``fetchInfrastructureApiHealth`` |
| ``{superadmin}{query}`` | ``ApiResponse<BackgroundJob[]>`` | `REQ-110` / ``fetchJobs`` |
| ``{superadmin}/retry-all`` | ``ApiResponse<{ queuedCount: number }>`` | `REQ-111` / ``retryAllJobs`` |
| ``{superadmin}/{id}/retry`` | ``ApiResponse<BackgroundJob>`` | `REQ-112` / ``retryJob`` |
| ``{superadmin}/{id}/cancel`` | ``ApiResponse<BackgroundJob>`` | `REQ-113` / ``cancelJob`` |
| ``{superadmin}/{id}`` | ``ApiResponse<null>`` | `REQ-114` / ``deleteJob`` |
| ``{superadmin}/clear-completed`` | ``ApiResponse<CountResponse>`` | `REQ-115` / ``clearCompletedJobs`` |
| ``{superadmin}/bulk-retry`` | ``ApiResponse<CountResponse>`` | `REQ-116` / ``bulkRetryJobs`` |
| ``{superadmin}/bulk-delete`` | ``ApiResponse<CountResponse>`` | `REQ-117` / ``bulkDeleteJobs`` |
| ``/api/superadmin/system-ops/jobs/queue-health`` | ``ApiResponse<SuperadminJobsV1Data>`` | `REQ-118` / ``fetchJobsQueueHealth`` |
| ``{superadmin}{search}`` | ``ApiResponse<MigrationLog[]>`` | `REQ-119` / ``fetchMigrations`` |
| ``/superadmin/system-ops/migrations/trigger`` | ``ApiResponse<z.infer<typeof MigrationTriggerResponseSchema>>`` | `REQ-120` / ``startMigration`` |
| ``/api/superadmin/system-ops/summary`` | ``ApiResponse<SuperadminSystemOpsSummary>`` | `REQ-121` / ``fetchSuperadminSystemOpsSummary`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `migrations/page.tsx`, `backups/page.tsx`, `jobs/page.tsx`, `infrastructure/page.tsx`, `system-ops_components/SuperadminSystemOpsDashboardClient.tsx`, `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs/jobs_components/SuperadminJobsView.tsx`, `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsTriggerModal.tsx`, `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups/backups_components/SuperadminBackupsTable.tsx`, `backups/backups_components/SuperadminBackupsScheduleModal.tsx`, `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups/backups_components/SuperadminBackupsClient.tsx`, `backups/backups_components/SuperadminBackupsRestoreModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


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


- [ ] Rule 7: TypeORM is the sole approved ORM.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is global and automatic.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency for applicable critical mutations.
- [ ] Rule 34: N+1/index review for required relations and filters.
- [ ] Rule 36: Fail-fast null/constraint checks.
- [ ] Rule 41: Concurrency protection where state is contested.
- [ ] Rule 48: Query/command controller separation.
- [ ] Rule 62: Explicit return types.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc.
- [ ] Rule 82A: Complete frontend UI data contract.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 86/87: Intention-revealing names and small single-responsibility methods.
- [ ] Rule 89: ORM entities stay behind repositories.
- [ ] Rule 92: Query allowlists.

