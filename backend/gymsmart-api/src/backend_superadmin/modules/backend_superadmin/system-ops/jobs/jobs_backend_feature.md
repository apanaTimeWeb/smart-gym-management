# jobs Backend Feature Map

## Module Purpose
This feature owns the Superadmin backend capability represented by the matching frontend route slice.
This child feature is nested under the frontend-mirrored `system-ops` container and is an independent AI repair unit. It must not absorb `backups`, `infrastructure`, `jobs`, or `migrations` sibling behavior. All persistence stays behind its TypeORM repositories.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `jobs-command.controller.ts` | POST | `/superadmin/system-ops/jobs` | Implements the POST /superadmin/system-ops/jobs contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-command.controller.ts` | PATCH | `/superadmin/system-ops/jobs:id` | Implements the PATCH /superadmin/system-ops/jobs:id contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-command.controller.ts` | DELETE | `/superadmin/system-ops/jobs:id` | Implements the DELETE /superadmin/system-ops/jobs:id contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-command.controller.ts` | PATCH | `/superadmin/system-ops/jobs:id/status` | Implements the PATCH /superadmin/system-ops/jobs:id/status contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-query.controller.ts` | GET | `/superadmin/system-ops/jobs` | Implements the GET /superadmin/system-ops/jobs contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-query.controller.ts` | GET | `/superadmin/system-ops/jobs:id` | Implements the GET /superadmin/system-ops/jobs:id contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | GET | `superadmin/system-ops/jobs/queue-health` | Implements the GET superadmin/system-ops/jobs/queue-health contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/retry-all` | Implements the POST superadmin/system-ops/jobs/retry-all contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/:id/retry` | Implements the POST superadmin/system-ops/jobs/:id/retry contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/:id/cancel` | Implements the POST superadmin/system-ops/jobs/:id/cancel contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/clear-completed` | Implements the POST superadmin/system-ops/jobs/clear-completed contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/bulk-retry` | Implements the POST superadmin/system-ops/jobs/bulk-retry contract and preserves the child feature boundary. | DTO | Contract DTO |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/bulk-delete` | Implements the POST superadmin/system-ops/jobs/bulk-delete contract and preserves the child feature boundary. | DTO | Contract DTO |

## Approved External Dependencies
- **Business Feature Dependencies**: None by direct import.
- **Infrastructure Dependencies**: Authentication, configuration, TypeORM/PostgreSQL; Redis/queue adapters only where this child requires them.
- **Runtime/Event Dependencies**: Only declared registry events.

## Data and State Architecture
- DB Entities: Exact entities registered by `jobs.module.ts`.
- Redis Caching Keys: Only feature-prefixed keys.
- Event Emitters: Only centralized registry events.
- Background Jobs: Queue work described by the feature implementation and job registry.
- Idempotency Keys: Required on applicable critical mutations.

## Business Flow / Key Sequences
Controller -> DTO validation -> use-case service -> named repository method -> PostgreSQL -> mapper/contract response. Heavy work is asynchronous where required.

## File Responsibility Map
Every source file is feature-scoped and has one reason to change. Controllers do not contain business rules; repositories do not call sibling repositories.

## Permissions and Security
Superadmin role is enforced in the controller layer. Resource-level checks apply to IDs and tenant-scoped resources before repository mutation.

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

| Folder | Responsibility | Key Files |
|---|---|---|
| `jobs_api/` | Feature-owned responsibility for jobs api. | `SuperadminJobsApi.ts`, `SuperadminJobsQueueHealthApi.ts` |
| `jobs_mocks/` | Feature-owned responsibility for jobs mocks. | `(directory present; no direct files)` |
| `jobs_tests/` | Feature-owned responsibility for jobs tests. | `SuperadminJobsBasic.test.tsx`, `SuperadminJobsQueueHealth.test.ts` |
| `jobs_types/` | Feature-owned responsibility for jobs types. | `SuperadminJobInspectModalTypes.ts`, `SuperadminJobsEmptyStateTypes.ts`, `SuperadminJobsHeaderTypes.ts`, `SuperadminJobsMutationTypes.ts`, `SuperadminJobsPageTypes.ts`, `SuperadminJobsStatsBarTypes.ts`, `SuperadminJobsTableTypes.ts`, `SuperadminJobsTypes.ts`, `SuperadminJobsV1Types.ts` |
| `jobs_utils/` | Feature-owned responsibility for jobs utils. | `useSuperadminJobsMutations.ts`, `useSuperadminJobsPage.test.ts`, `useSuperadminJobsPage.ts`, `useSuperadminJobsSelection.ts`, `useSuperadminJobsV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

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

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [ ] Rules 7, 19, 23, 28, 29, 31, 34, 36, 41, 48, 62, 76, 79, 80, 82A, 83, 86, 87, 89, 92, 93.

