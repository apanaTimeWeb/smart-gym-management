# jobs Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/system-ops/jobs feature. It exposes 14 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-system-ops-jobs-bulk-command.controller.ts::retryAll` | POST | `/superadmin/system-ops/jobs/retry-all` | This endpoint invokes `retryAll` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::retry` | POST | `/superadmin/system-ops/jobs/:id/retry` | This endpoint invokes `retry` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::cancel` | POST | `/superadmin/system-ops/jobs/:id/cancel` | This endpoint invokes `cancel` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::clearCompleted` | POST | `/superadmin/system-ops/jobs/clear-completed` | This endpoint invokes `clearCompleted` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::bulkRetry` | POST | `/superadmin/system-ops/jobs/bulk-retry` | This endpoint invokes `bulkRetry` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-bulk-command.controller.ts::bulkDelete` | POST | `/superadmin/system-ops/jobs/bulk-delete` | This endpoint invokes `bulkDelete` on `superadmin-system-ops-jobs-bulk-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::create` | POST | `/superadmin/system-ops/jobs` | This endpoint invokes `create` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::update` | PATCH | `/superadmin/system-ops/jobs/:id` | This endpoint invokes `update` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/jobs/:id` | This endpoint invokes `remove` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/jobs/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-jobs-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-query.controller.ts::findAll` | GET | `/superadmin/system-ops/jobs` | This endpoint invokes `findAll` on `superadmin-system-ops-jobs-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-query.controller.ts::findOne` | GET | `/superadmin/system-ops/jobs/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-jobs-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts::queueHealth` | GET | `/superadmin/system-ops/jobs/queue-health` | This endpoint invokes `queueHealth` on `superadmin-system-ops-jobs-queue-health-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts::queueHealth` | GET | `/api/superadmin/system-ops/jobs/queue-health` | This endpoint invokes `queueHealth` on `superadmin-system-ops-jobs-queue-health-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: system-ops
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-system-ops-jobs-contract-snapshot.entity → `superadmin_jobs_contract_snapshots`, superadmin-system-ops-jobs.entity → `superadmin_background_jobs`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: superadmin-system-ops-jobs-query.controller.ts, superadmin-system-ops-jobs.constants.ts, superadmin-system-ops-jobs.repository.ts, superadmin-system-ops-jobs-command.controller.ts, superadmin-system-ops-jobs.module.ts, superadmin-system-ops-jobs-bulk-command.controller.ts, superadmin-system-ops-jobs-queue-health-response.dto.ts, superadmin-system-ops-jobs.seeder.ts, superadmin-system-ops-jobs-queue-health-query.controller.ts, superadmin-system-ops-jobs-contract-snapshot.repository.ts, superadmin-system-ops-jobs.entity.ts, superadmin-system-ops-jobs-contract-snapshot.entity.ts, superadmin-system-ops-jobs.mapper.ts, superadmin-system-ops-jobs.exceptions.ts, jobs_types/superadmin-system-ops-jobs.interfaces.ts, jobs_types/superadmin-system-ops-jobs.enums.ts, jobs_responses/superadmin-system-ops-jobs-response.dto.ts, jobs_services/superadmin-system-ops-jobs-bulk-retry.service.ts, jobs_services/superadmin-system-ops-jobs-bulk-delete.service.ts, jobs_services/superadmin-system-ops-jobs-find.service.ts, jobs_services/superadmin-system-ops-jobs-update.service.ts, jobs_services/superadmin-system-ops-jobs-retry.service.ts, jobs_services/superadmin-system-ops-jobs-create.service.ts, jobs_services/superadmin-system-ops-jobs-queue-health.service.ts, jobs_services/superadmin-system-ops-jobs-status.service.ts, jobs_services/superadmin-system-ops-jobs-retry-all.service.ts, jobs_services/superadmin-system-ops-jobs-cancel.service.ts, jobs_services/superadmin-system-ops-jobs-clear-completed.service.ts, jobs_services/superadmin-system-ops-jobs-delete.service.ts, jobs_services/superadmin-system-ops-jobs-list.service.ts, jobs_dtos/superadmin-system-ops-jobs-status.dto.ts, jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto.ts, jobs_dtos/superadmin-system-ops-jobs-query.dto.ts, jobs_dtos/superadmin-system-ops-jobs-create.dto.ts, jobs_dtos/superadmin-system-ops-jobs-update.dto.ts
- Idempotency Keys: `/superadmin/system-ops/jobs`, `/superadmin/system-ops/jobs/:id`, `/superadmin/system-ops/jobs/:id/cancel`, `/superadmin/system-ops/jobs/:id/retry`, `/superadmin/system-ops/jobs/:id/status`, `/superadmin/system-ops/jobs/bulk-delete`, `/superadmin/system-ops/jobs/bulk-retry`, `/superadmin/system-ops/jobs/clear-completed`, `/superadmin/system-ops/jobs/retry-all`

## Business Flow / Key Sequences
Controller -> DTO validation -> use-case service -> named repository method -> PostgreSQL -> mapper/contract response. Heavy work is asynchronous where required.

## File Responsibility Map
Every source file is feature-scoped and has one reason to change. Controllers do not contain business rules; repositories do not call sibling repositories.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
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

## Edge Cases / AI Warnings
- Never directly import sibling system-ops business logic — Rule 0C/49.
- Never hard-delete operational data — Rule 29.
- Required concurrent mutations must use locking/idempotency — Rules 31 and 41.
- Heavy operations must have job lifecycle/DLQ protection — Rules 23/61.

## Frozen API Contract

<!-- Exact source: frontend system-ops/jobs/superadmin_jobs_features.md -->

﻿# Superadmin Jobs â€” Feature Map

## Module Purpose
The jobs module is responsible for the Superadmin business workflow managing Jobs. It enables superadmins to view, monitor, and control the lifecycle and configurations of Jobs across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure


| File | Responsibility |
|---|---|
| `jobs_dtos/superadmin-system-ops-jobs-bulk-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs_dtos/superadmin-system-ops-jobs-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs_dtos/superadmin-system-ops-jobs-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs_dtos/superadmin-system-ops-jobs-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs_dtos/superadmin-system-ops-jobs-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs_responses/superadmin-system-ops-jobs-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `jobs_services/superadmin-system-ops-jobs-bulk-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-bulk-retry.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-cancel.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-clear-completed.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-queue-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-retry-all.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-retry.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_services/superadmin-system-ops-jobs-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `jobs_types/superadmin-system-ops-jobs.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `jobs_types/superadmin-system-ops-jobs.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-jobs-bulk-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-jobs-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-jobs-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-jobs-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-jobs-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-jobs-queue-health-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-jobs-queue-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-system-ops-jobs.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-jobs.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-jobs.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-system-ops-jobs.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-system-ops-jobs.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-system-ops-jobs.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-jobs.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Jobs | `/superadmin/system-ops/jobs` | bulk delete; bulk retry; cancel job; clear completed; delete job; retry all; retry job | `SuperadminJobsApi.ts`, `SuperadminJobsQueueHealthApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/jobs route to load the Jobs data context securely via TanStack Query.
2. Interact with the Jobs dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Jobs status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/jobs`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `jobs_utils/useSuperadminJobsSelection.ts`, `jobs_utils/useSuperadminJobsPage.ts`, `jobs_utils/useSuperadminJobsMutations.ts`, `jobs_utils/useSuperadminJobsV1.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'jobs', queryParams]`, `['superadmin', 'jobs']`, `['superadmin', 'jobs_queue_health']`

## API Contract

- **API files:** `jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs_api/SuperadminJobsApi.ts`
- **Detected API symbols:** `fetchJobsQueueHealth` — `jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs_api/SuperadminJobsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs_components/SuperadminJobsView.tsx`, `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | page.tsx acts as a Server Component entry point. |
| `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx` | Renders the Superadmin jobs V1 JobsQueueSummary summary cards. |
| `jobs_components/SuperadminJobsV1QueueHealthTable.tsx` | Renders the Superadmin jobs V1 Queue health view. |
| `jobs_components/SuperadminJobsView.tsx` | SuperadminJobsView.tsx — orchestrator for the Background Jobs page. |
| `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx` | Renders the Superadmin jobs V1 Recent job failures view. |
| `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx` | Renders the empty state for the jobs table. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into jobs.
- **Destructive Actions**: Any deletion or modification of jobs records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for jobs do not expose cross-tenant sensitive data.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs_components/SuperadminJobsView.tsx`, `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs_components/SuperadminJobsView.tsx`, `jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

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

