# backups Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/system-ops/backups feature. It exposes 15 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-system-ops-backups-command.controller.ts::create` | POST | `/superadmin/system-ops/backups` | This endpoint invokes `create` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::update` | PATCH | `/superadmin/system-ops/backups/:id` | This endpoint invokes `update` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/backups/:id` | This endpoint invokes `remove` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/backups/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-backups-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-command.controller.ts::patchSchedule` | PATCH | `/superadmin/system-ops/backups/schedule` | This endpoint invokes `patchSchedule` on `superadmin-system-ops-backups-operations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-command.controller.ts::trigger` | POST | `/superadmin/system-ops/backups/trigger` | This endpoint invokes `trigger` on `superadmin-system-ops-backups-operations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-command.controller.ts::restore` | POST | `/superadmin/system-ops/backups/:id/restore` | This endpoint invokes `restore` on `superadmin-system-ops-backups-operations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::schedule` | GET | `/superadmin/system-ops/backups/schedule` | This endpoint invokes `schedule` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::health` | GET | `/superadmin/system-ops/backups/health` | This endpoint invokes `health` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::health` | GET | `/api/superadmin/system-ops/backups/health` | This endpoint invokes `health` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::jobStatus` | GET | `/superadmin/system-ops/backups/jobs/:jobId` | This endpoint invokes `jobStatus` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::download` | GET | `/superadmin/system-ops/backups/:id/download` | This endpoint invokes `download` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-operations-query.controller.ts::downloadFile` | GET | `/superadmin/system-ops/backups/:id/download/file` | This endpoint invokes `downloadFile` on `superadmin-system-ops-backups-operations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-query.controller.ts::findAll` | GET | `/superadmin/system-ops/backups` | This endpoint invokes `findAll` on `superadmin-system-ops-backups-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-backups-query.controller.ts::findOne` | GET | `/superadmin/system-ops/backups/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-backups-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: system-ops
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_jobs, superadmin_core_observability, superadmin_core_pagination, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-system-ops-backup-job.entity → `superadmin_backup_jobs`, superadmin-system-ops-backups-contract-snapshot.entity → `superadmin_backups_contract_snapshots`, superadmin-system-ops-backups-schedule-contract-snapshot.entity → `superadmin_backup_schedule_contract_snapshots`, superadmin-system-ops-backups.entity → `superadmin_backup_records`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: superadmin-system-ops-backup-job.entity.ts, backups_repositories/superadmin-system-ops-backup-job.repository.ts, backups_responses/superadmin-system-ops-backups-job-status-response.dto.ts
- Idempotency Keys: `/superadmin/system-ops/backups`, `/superadmin/system-ops/backups/:id`, `/superadmin/system-ops/backups/:id/restore`, `/superadmin/system-ops/backups/:id/status`, `/superadmin/system-ops/backups/schedule`, `/superadmin/system-ops/backups/trigger`

## Business Flow / Key Sequences
Controller -> DTO validation -> use-case service -> named repository method -> PostgreSQL -> mapper/contract response. Heavy work is asynchronous where required.

## File Responsibility Map
Every source file is feature-scoped and has one reason to change. Controllers do not contain business rules; repositories do not call sibling repositories.

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

## Edge Cases / AI Warnings
- Never directly import sibling system-ops business logic — Rule 0C/49.
- Never hard-delete operational data — Rule 29.
- Required concurrent mutations must use locking/idempotency — Rules 31 and 41.
- Heavy operations must have job lifecycle/DLQ protection — Rules 23/61.

## Frozen API Contract

<!-- Exact source: frontend system-ops/backups/superadmin_backups_features.md -->

﻿# Superadmin Backups â€” Feature Map

## Module Purpose
The backups module is responsible for the Superadmin business workflow managing Backups. It enables superadmins to view, monitor, and control the lifecycle and configurations of Backups across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure


| File | Responsibility |
|---|---|
| `backups_dtos/superadmin-system-ops-backups-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_dtos/superadmin-system-ops-backups-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_dtos/superadmin-system-ops-backups-schedule.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_dtos/superadmin-system-ops-backups-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_dtos/superadmin-system-ops-backups-trigger.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_dtos/superadmin-system-ops-backups-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_repositories/superadmin-system-ops-backup-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `backups_responses/superadmin-system-ops-backups-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_responses/superadmin-system-ops-backups-queued-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_responses/superadmin-system-ops-backups-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `backups_services/superadmin-system-ops-backups-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-download.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-restore.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-schedule.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-trigger.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_services/superadmin-system-ops-backups-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `backups_types/superadmin-system-ops-backups.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `backups_types/superadmin-system-ops-backups.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `backups_workers/superadmin-system-ops-backups-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `superadmin-system-ops-backup-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-backups-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-backups-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-backups-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-backups-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-system-ops-backups-operations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-backups-operations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-backups-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-backups-schedule-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-backups-schedule-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-backups.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-backups.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-backups.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-system-ops-backups.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-system-ops-backups.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-system-ops-backups.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-backups.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Backups | `/superadmin/system-ops/backups` | create backup; download; restore click; save; submit | `SuperadminBackupsHealthApi.ts`, `SuperadminBackupsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/backups route to load the Backups data context securely via TanStack Query.
2. Interact with the Backups dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Backups status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/backups`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `backups_utils/useSuperadminBackupsSchedule.ts`, `backups_utils/useSuperadminBackupsActions.ts`, `backups_utils/useSuperadminBackupsData.ts`, `backups_utils/useSuperadminBackupsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'backups']`, `['superadmin', 'backups', params]`, `['superadmin', 'backups_health']`

## API Contract

- **API files:** `backups_api/SuperadminBackupsHealthApi.ts`, `backups_api/SuperadminBackupsApi.ts`
- **Detected API symbols:** `fetchBackupsHealth` — `backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups_api/SuperadminBackupsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `backups_components/SuperadminBackupsTriggerModal.tsx`, `backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups_components/SuperadminBackupsTable.tsx`, `backups_components/SuperadminBackupsScheduleModal.tsx`, `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups_components/SuperadminBackupsClient.tsx`, `backups_components/SuperadminBackupsRestoreModal.tsx`, `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the backups page. Renders the interactive client component. |
| `backups_components/SuperadminBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `backups_components/SuperadminBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `backups_components/SuperadminBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `backups_components/SuperadminBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminBackupsSchedule. |
| `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `backups_components/SuperadminBackupsClient.tsx` | SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminBackupsData and rendered from query state. |
| `backups_components/SuperadminBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into backups.
- **Destructive Actions**: Any deletion or modification of backups records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for backups do not expose cross-tenant sensitive data.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `backups_components/SuperadminBackupsTriggerModal.tsx`, `backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups_components/SuperadminBackupsTable.tsx`, `backups_components/SuperadminBackupsScheduleModal.tsx`, `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups_components/SuperadminBackupsClient.tsx`, `backups_components/SuperadminBackupsRestoreModal.tsx`, `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `backups_components/SuperadminBackupsTriggerModal.tsx`, `backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups_components/SuperadminBackupsTable.tsx`, `backups_components/SuperadminBackupsScheduleModal.tsx`, `backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups_components/SuperadminBackupsClient.tsx`, `backups_components/SuperadminBackupsRestoreModal.tsx`, `backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [ ] Rules 7, 19, 23, 28, 29, 31, 34, 36, 41, 48, 62, 76, 79, 80, 82A, 83, 86, 87, 89, 92, 93.



### Repair Contract Notes
- Backup trigger is asynchronous and returns durable job IDs with `202 Accepted`; the worker executes real `pg_dump`.
- Restore is asynchronous and enters a Redis-backed tenant maintenance window before real `pg_restore`; in-flight tenant leases are drained before restore.
- Completed artifacts are stored under the protected backup storage path and downloaded through an authenticated same-origin route.

## Repair Addendum — Durable Backup/Restore Lifecycle

Backup snapshots and restores are queue-backed operations. Trigger and restore commands return durable job identifiers with `202 Accepted`; workers perform `pg_dump`/`pg_restore`, persist terminal state, retry transient failures up to three attempts, and route terminal failures to queue-specific DLQs.

| Endpoint | HTTP | Purpose | Response |
|---|---|---|---|
| `/superadmin/system-ops/backups/trigger` | POST | Enqueues snapshot work for one tenant or all active tenants without blocking the request. | `SuperadminSystemOpsBackupsQueuedResponseDto` |
| `/superadmin/system-ops/backups/:id/restore` | POST | Enqueues a destructive restore after validating a completed artifact. | `SuperadminSystemOpsBackupsRestoreQueuedResponseDto` |
| `/superadmin/system-ops/backups/jobs/:jobId` | GET | Returns durable job lifecycle state for polling. | `SuperadminSystemOpsBackupsJobStatusResponseDto` |
| `/superadmin/system-ops/backups/:id/download/file` | GET | Streams a completed backup artifact after controller authorization. | binary dump |

- Queues: `superadmin:backups`, `superadmin:backups-restore`; DLQs use the `:dlq` suffix.
- Restore sets a tenant maintenance key, prevents new tenant requests through the auth guard, waits for in-flight leases to drain, performs `pg_restore`, and only then releases the tenant DataSource.
- Backup artifacts are stored in the protected backup storage path with restrictive filesystem permissions.
