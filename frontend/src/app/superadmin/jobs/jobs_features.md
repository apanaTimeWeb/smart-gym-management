# Superadmin Jobs — Feature Map

## Module Purpose
The Superadmin Jobs module provides visibility and control over the platform's background
job queue. Jobs include scheduled tasks (invoice generation, report compilation, email
dispatch, data migrations) and one-off system tasks. Superadmins can monitor job status,
retry failed jobs, cancel pending jobs, and view execution logs. This module is the
operational control panel for async platform processes.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 10 row placeholders |
| `error.tsx` | Error boundary with retry |
| `jobs_components/SuperadminJobsClient.tsx` | Root Client Component — table + filter bar |
| `jobs_components/SuperadminJobsTable.tsx` | Paginated job table |
| `jobs_components/SuperadminJobsTableRow.tsx` | Single job row — name, type, status, started, duration, actions |
| `jobs_components/SuperadminJobsFilterBar.tsx` | Filter by status (ALL / PENDING / RUNNING / COMPLETED / FAILED) + type |
| `jobs_components/SuperadminJobsDetailDrawer.tsx` | Job detail — execution log, error trace, input payload |
| `jobs_components/SuperadminJobsRetryButton.tsx` | Retry failed job — with confirmation |
| `jobs_components/SuperadminJobsCancelButton.tsx` | Cancel pending job — with confirmation |
| `jobs_types/SuperadminJobsTypes.ts` | `Job`, `JobStatus`, `JobType`, `JobLog`, `JobsFilter` |
| `jobs_utils/SuperadminJobsConstants.ts` | `JOB_STATUS_STYLES`, `JOB_TYPE_LABELS` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Job List | `/superadmin/jobs` | All jobs, paginated | `GET /superadmin/jobs?page=&status=&type=` | ✅ Live |
| View Job Detail | `/superadmin/jobs` | Execution log + error trace | `GET /superadmin/jobs/:id` | ✅ Live |
| Retry Failed Job | `/superadmin/jobs` | Re-queue a failed job | `POST /superadmin/jobs/:id/retry` | ✅ Live |
| Cancel Pending Job | `/superadmin/jobs` | Remove job from queue | `DELETE /superadmin/jobs/:id` | ✅ Live |
| Filter by Status/Type | `/superadmin/jobs` | Scope list | — (query params) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'jobs', { page, status, type }]`, `['superadmin', 'jobs', jobId]`
- Query refetch interval: 15 seconds for job list (jobs change state frequently)
- Mutations: `useRetryJob`, `useCancelJob`
- Zustand stores: None
- Context providers: None
- Local-state: `statusFilter`, `typeFilter`, `page` — local to `SuperadminJobsClient`

## User Flows
1. Superadmin opens `/superadmin/jobs` → job list loads, auto-refreshes every 15 seconds
2. Superadmin filters by "FAILED" → list scoped to failed jobs
3. Superadmin clicks job row → `SuperadminJobsDetailDrawer` → execution log + error trace
4. Superadmin clicks "Retry" on failed job → `useConfirm()` → `POST /superadmin/jobs/:id/retry`
5. Superadmin clicks "Cancel" on pending job → `useConfirm()` → `DELETE /superadmin/jobs/:id`

## Component Responsibility Map
- `SuperadminJobsClient` — filter + pagination state. MUST NOT contain row logic.
- `SuperadminJobsTable` — renders rows. MUST NOT manage filter state.
- `SuperadminJobsDetailDrawer` — log display only. Retry/Cancel actions are in table row, not drawer.
- `SuperadminJobsRetryButton` — single action button. MUST use `useConfirm()` before firing.
- `SuperadminJobsCancelButton` — single action button. MUST use `useConfirm()` before firing.

## Permissions and Security
| Action | Required Role |
|---|---|
| View job list | `SUPERADMIN` |
| View job detail | `SUPERADMIN` |
| Retry failed job | `SUPERADMIN` |
| Cancel pending job | `SUPERADMIN` |
| ❌ Create jobs manually | System-triggered only |
| ❌ Edit job configuration | DevOps only |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 10 table row skeletons
- **Empty:** "No jobs match your filters" with clear filter link
- **Empty (no failed jobs):** "No failed jobs — queue is healthy" with green checkmark
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Auto-refetch** — job list MUST use `refetchInterval: 15000`. Never use `setInterval` in a component.
- **Retry only for FAILED** — retry button MUST only render when `job.status === 'FAILED'`.
- **Cancel only for PENDING** — cancel button MUST only render when `job.status === 'PENDING'`.
- **JOB_STATUS_STYLES** — maps `PENDING | RUNNING | COMPLETED | FAILED | CANCELLED` to badge classes; must live in constants.
- **Error trace display** — render error trace as `<pre>` with monospace font; never as raw HTML.
- **Pagination reset** — page resets to 1 when any filter changes.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminJobs*`
- [x] Rule 7: Type isolation — all types in `SuperadminJobsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 26: Retry + Cancel use `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable job IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
