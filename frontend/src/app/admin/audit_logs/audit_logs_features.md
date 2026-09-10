# Admin Audit Logs — Feature Map

## Module Purpose
The Audit Logs module provides gym admins with an immutable, chronological record of all
significant actions performed within their gym account — member additions, payment recordings,
staff changes, settings updates, plan modifications, and more. It is a compliance and
accountability tool. Admins can filter logs by date range, actor, action type, and entity.
Logs cannot be edited or deleted from the frontend — they are an append-only audit trail.
Admins can export the filtered log as a CSV for compliance reporting.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `audit_components/AdminAuditLogsMain/` | Root client orchestrator — renders KPIs, toolbar, table, and detail drawer | `AdminAuditLogsMain.tsx` |
| `audit_components/AdminAuditLogsKPIs/` | 4 stat cards: Total Logs, Actions Today, Unique Actors, Critical Events | `AdminAuditLogsKPIs.tsx` |
| `audit_components/AdminAuditLogsToolbar/` | Date range + actor + action type + entity filters + export button | `AdminAuditLogsToolbar.tsx` |
| `audit_components/AdminAuditLogsTable/` | Paginated read-only log table with actor, action, entity, timestamp columns | `AdminAuditLogsTable.tsx` |
| `audit_components/AdminAuditLogsDetailDrawer/` | Slide-in drawer showing full log entry detail including metadata and IP | `AdminAuditLogsDetailDrawer.tsx` |
| `audit_api/` | Mock API client — replace with real apiFetch when backend is ready | `audit_api.ts` |
| `audit_context/` | Data logic hook — fetches, filters, paginates | `useAdminAuditLogsLogic.ts` |
| `audit_store/` | Zustand store for filter/pagination/drawer UI state | `useAdminAuditLogsStore.ts` |
| `audit_types/` | TypeScript interfaces for AuditLog, AuditLogDetail, AuditKPIData, FetchState | `audit_types.ts` |
| `audit_utils/` | Constants: action type options, actor options, table headers, mock data | `AdminAuditLogsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Audit Log List | `/admin/audit_logs` | Browse paginated action history with date range, actor, action type, entity filters | `AdminAuditLogsTable`, `AdminAuditLogsToolbar` | `GET /admin/audit-logs?page&limit&actor&action&from&to` | ✅ Live |
| Log Detail | `/admin/audit_logs` | Click any row to see full log entry: metadata, IP address, user agent, before/after values | `AdminAuditLogsDetailDrawer` | `GET /admin/audit-logs/:id` | ✅ Live |
| KPI Overview | `/admin/audit_logs` | See total logs, actions today, unique actors, critical event count | `AdminAuditLogsKPIs` | `GET /admin/audit-logs/kpis` | ✅ Live |
| Export Logs | `/admin/audit_logs` | Download filtered log as CSV for compliance reporting | `AdminAuditLogsToolbar` | `GET /admin/audit-logs/export?...` | ✅ Live |

## User Flows & Interactions

### Flow 1: Investigate a Suspicious Action
1. Admin navigates to `/admin/audit_logs`
2. Sets date range to yesterday, selects actor from dropdown
3. Table filters to show only that actor's actions in the time window
4. Admin clicks a suspicious row → `AdminAuditLogsDetailDrawer` opens
5. Drawer shows: full action description, IP address, user agent, before/after field values

### Flow 2: Export Compliance Report
1. Admin sets desired date range and action type filters
2. Clicks "Export CSV" in toolbar
3. `exportLogs(filters)` called → browser triggers file download
4. Toast shows backend message on success

## Data and State Architecture

- **State pattern:** Zustand for UI filter/pagination/drawer state. Direct mock API calls (no TanStack Query yet).
- **Zustand store:** `useAdminAuditLogsStore.ts` — holds: `dateFrom`, `dateTo`, `actorFilter`, `actionFilter`, `entityFilter`, `currentPage`, `selectedLogId`, `isDrawerOpen`
- **Logic hook:** `useAdminAuditLogsLogic.ts` — fetches on filter change, applies server-side pagination
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through mock functions in `audit_api.ts`. Replace with `apiFetch` when backend is ready.
Backend path uses hyphens: `/admin/audit-logs` (not underscores). Always use `AdminAuditLogsUrlConfig`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAuditLogs(params)` | GET | `/admin/audit-logs` | `{ page, limit, actor, action, from, to, entityType, entityId }` | `AuditLog[]` + `PaginationMeta` |
| `fetchAuditLogById(id)` | GET | `/admin/audit-logs/:id` | — | `AuditLogDetail` |
| `fetchAuditKPIs()` | GET | `/admin/audit-logs/kpis` | — | `AuditKPIData` |
| `exportAuditLogs(params)` | GET | `/admin/audit-logs/export` | same as fetchAuditLogs | `Blob` (CSV) |
| `fetchActors()` | GET | `/admin/audit-logs/actors` | — | `string[]` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Immutability:** Zero write operations. No edit, delete, or archive buttons exist anywhere in this module.
- **Sensitive data:** IP addresses and user agents are shown only in the detail drawer, not in the list table.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`.

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking 4 KPI cards + toolbar + 8 table rows | N/A | `error.tsx` — module-branded error with Retry button |
| Audit table | Skeleton rows while loading | Inline empty state — shield icon + "No audit logs found for this filter" | Inline error banner with retry |
| Detail drawer | Skeleton lines for metadata fields | N/A | Inline "Failed to load log detail" with retry |

## Edge Cases and AI Warnings

- **Logs are immutable** — never add delete, edit, or archive functionality. This is a compliance record.
- **Backend path is `/admin/audit-logs`** (hyphen), but the frontend folder is `audit_logs` (underscore). Always use `AdminAuditLogsUrlConfig.BACKEND_API.BASE` — never hardcode the path string.
- **Date filtering is UTC** — display timestamps in local time using `date-fns` or `dayjs`. Never render raw ISO strings directly in JSX.
- **Server-side pagination is mandatory** — never fetch all records and filter/paginate on the client. Always pass `page`, `limit`, and filter params to the backend.
- **Actor dropdown must be populated from the API** — use `fetchActors()` to get the list of actors. Never hardcode actor names.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminAuditLogsMain.tsx` | Root orchestrator. Renders KPIs, toolbar, table, and drawer. No direct API calls. |
| `AdminAuditLogsKPIs.tsx` | 4 read-only stat cards. Reads `kpis` from logic hook. Pure display. |
| `AdminAuditLogsToolbar.tsx` | Date range + 3 filter dropdowns + export button. Writes to store. |
| `AdminAuditLogsTable.tsx` | Paginated log rows. Row click sets `selectedLogId` in store. Read-only. |
| `AdminAuditLogsDetailDrawer.tsx` | Slide-in drawer. Fetches log detail by `selectedLogId`. Shows full metadata. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, 300-line ceiling
- [x] Rule 2: Total Role Isolation — zero cross-role imports verified
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX
- [x] Rule 5: Smart State Management — Zustand for UI state
- [x] Rule 6: Logic/UI Separation — `useAdminAuditLogsLogic` extracts all fetch/filter logic
- [x] Rule 7: Type Isolation — all types in `audit_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: Loading/error/not-found — all three present
- [x] Rule 11: Centralized URL Config — `audit_logs_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `audit_logs_forbidden.md` present and specific
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured
