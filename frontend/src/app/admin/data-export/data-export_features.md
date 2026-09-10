# Admin Data Export — Feature Map

## Module Purpose
The Data Export module allows gym admins to request and download structured exports of their
gym data — members, attendance, payments, and audit logs — in CSV or Excel format. Exports
are generated server-side (asynchronously for large datasets) and downloaded when ready.
Admins can view their export request history and re-download previous exports within the
24-hour link expiry window. A data privacy notice is shown and must be acknowledged before
the first export. This module is critical for compliance, accounting, and data portability.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `data_export_components/AdminDataExportMain/` | Root client orchestrator — renders KPIs, export form, and history table | `AdminDataExportMain.tsx` |
| `data_export_components/AdminDataExportKPIs/` | Stat cards: Total Exports, Pending, Completed, Failed | `AdminDataExportKPIs.tsx` |
| `data_export_components/AdminDataExportForm/` | RHF + Zod form — data type, date range, format (CSV/Excel) | `AdminDataExportForm.tsx` |
| `data_export_components/AdminDataExportHistory/` | Paginated export request history with status badges and download links | `AdminDataExportHistory.tsx` |
| `data_export_api/` | API client — requestExport, fetchHistory, getDownloadUrl | `data_export_api.ts` |
| `data_export_context/` | Data logic hook — queries, mutations, conditional polling for async completion | `useAdminDataExportLogic.ts` |
| `data_export_store/` | Zustand store — activeDataType, dateFrom, dateTo, format, privacyAcknowledged | `useAdminDataExportStore.ts` |
| `data_export_types/` | TypeScript types: ExportRequest, ExportStatus, ExportFormat, ExportDataType | `data_export_types.ts` |
| `data_export_utils/` | Constants: data type options, format options, status styles | `AdminDataExportSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Request Export | `/admin/data-export` | Select data type + date range + format → trigger server-side export | `AdminDataExportForm` | `POST /admin/data-export/request` | ✅ Live |
| Export History | `/admin/data-export` | View past export requests with status and download links | `AdminDataExportHistory` | `GET /admin/data-export/history?page&limit` | ✅ Live |
| Download Export | `/admin/data-export` | Download a completed export file via anchor link | `AdminDataExportHistory` (row action) | `GET /admin/data-export/:id/download` | ✅ Live |
| KPI Overview | `/admin/data-export` | See total, pending, completed, failed export counts | `AdminDataExportKPIs` | Derived from history query | ✅ Live |

## User Flows & Interactions

### Flow 1: Request a New Export
1. Admin navigates to `/admin/data-export`
2. If first export: privacy notice shown — admin must acknowledge before the form renders
3. Admin selects: Data Type → Date Range → Format (CSV/Excel) → clicks "Request Export"
4. `dataExportApi.requestExport(payload)` called → export appears in history as "Pending"
5. For large datasets: history polls via `refetchInterval: 5_000` until status is "Completed"
6. Admin clicks "Download" → `<a href download>` anchor triggers file download

### Flow 2: Re-download a Previous Export
1. Admin finds a completed export in history table
2. Checks expiry time shown in the row (links expire after 24 hours)
3. Clicks "Download" → browser triggers file download
4. If link expired: button shows "Expired" badge and is disabled

## Data and State Architecture

- **State pattern:** Zustand for UI form state + TanStack Query for server state
- **Zustand store:** `useAdminDataExportStore.ts` — holds: `activeDataType`, `dateFrom`, `dateTo`, `format`, `privacyAcknowledged`
- **Query keys:** `['adminDataExportHistory', { page }]`
- **Polling:** `refetchInterval: 5_000` while any export has status `'PENDING'` — disabled when all are `'COMPLETED'` or `'FAILED'`
- **Local-storage keys:** `adminDataExport_privacyAcknowledged` — persists privacy acknowledgment across sessions
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `dataExportApi` in `data_export_api/data_export_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `requestExport(dto)` | POST | `/admin/data-export/request` | `{ dataType, dateFrom, dateTo, format }` | `ExportRequest` |
| `fetchHistory(params)` | GET | `/admin/data-export/history` | `{ page, limit }` | `ExportRequest[]` + `PaginationMeta` |
| `getDownloadUrl(id)` | GET | `/admin/data-export/:id/download` | — | `{ url: string, expiresAt: string }` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Privacy notice:** Must be acknowledged before the first export. Persisted in localStorage key `adminDataExport_privacyAcknowledged`.
- **Download uses anchor link** — never use `fetch()` to stream file bytes without Blob handling. Use `<a href={url} download>` pattern only.
- **Expired links:** Show expiry timestamp in history table. Disable download button and show "Expired" badge when `expiresAt < Date.now()`.
- **Never log download URLs** — export URLs may contain signed tokens. Never display them in toasts or console output.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton: 4 KPI cards + form panel + history table | N/A | `error.tsx` — module-branded with Retry |
| History table | Skeleton rows while loading | Inline "No exports yet — request your first export above" | Inline via TanStack Query `isError` |

## Edge Cases and AI Warnings

- **Large exports are async** — the backend queues them. Poll via `refetchInterval: 5_000` while any export is `PENDING`. Never use `setTimeout` for polling.
- **Download uses anchor link, not fetch streaming** — use `<a href={downloadUrl} download>`. Never use `fetch()` to stream file bytes without proper Blob handling.
- **Privacy notice must gate the form** — check `privacyAcknowledged` in the store before rendering `AdminDataExportForm`. If not acknowledged, show the notice overlay first.
- **Expired download links** — links expire after 24 hours. Show expiry time in the history table. Disable the download button and show "Expired" badge when expired.
- **Never log or display download URLs** — they may contain signed tokens. Keep them out of toasts, console, and error messages.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminDataExportMain.tsx` | Root orchestrator. Checks privacy acknowledgment. Renders KPIs, form, and history. |
| `AdminDataExportKPIs.tsx` | 4 stat cards derived from history query. Read-only display. |
| `AdminDataExportForm.tsx` | RHF + Zod export request form. Calls `requestExport` on submit. |
| `AdminDataExportHistory.tsx` | Paginated history. Download anchor per completed row. Expired badge for expired links. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded colors in JSX
- [x] Rule 5: Smart State Management — Zustand + TanStack Query with conditional polling
- [x] Rule 6: Logic/UI Separation — `useAdminDataExportLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `data_export_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: `data-export_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Export form uses React Hook Form + Zod
- [x] Rule 40: `data-export_forbidden.md` present
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured
