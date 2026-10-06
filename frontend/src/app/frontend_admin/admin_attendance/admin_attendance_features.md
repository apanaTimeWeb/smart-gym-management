# Admin Attendance — Feature Map

## Module Purpose
The Admin Attendance module gives authorized administrators a date- and branch-aware view of member attendance activity. Users can search and filter attendance records, inspect attendance KPIs, and review attendance trends for the selected period. The module is read-oriented and keeps server results in TanStack Query while URL/filter state drives the requested dataset. It does not create or edit attendance records or own member, payroll, or billing workflows.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/attendance` | ``frontend_admin/admin_attendance/page.tsx`` | ``frontend_admin/admin_attendance/admin_attendance_components/admin_attendance_main/AdminAttendanceMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- react-apexcharts 1.x
- next-intl

## Directory Structure

Canonical module root: `admin_attendance/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_attendance_api/` | Typed API transport boundary. | AdminAttendanceApi.ts, AdminAttendanceBranchReferenceApi.ts |
| `admin_attendance_components/` | Feature component root. | (empty) |
| `admin_attendance_constants/` | Static business configuration and query-key registries. | AdminAttendanceConstants.ts, AdminAttendanceQueryKeys.ts |
| `admin_attendance_hooks/` | Feature data-flow and interaction hooks. | useAdminAttendanceBranchReference.test.ts, useAdminAttendanceBranchReference.ts, useAdminAttendanceDebounce.test.ts, useAdminAttendanceDebounce.ts, useAdminAttendanceLogic.test.ts, useAdminAttendanceLogic.ts |
| `admin_attendance_locales/` | Module-owned localized resources. | admin_attendance_en.json, admin_attendance_hi.json |
| `admin_attendance_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_attendance_schemas/` | Zod validation/runtime contracts. | AdminAttendanceSchemas.ts |
| `admin_attendance_store/` | Module-scoped UI state only. | useAdminAttendanceStore.test.ts, useAdminAttendanceStore.ts |
| `admin_attendance_types/` | Domain, DTO, state, and prop type contracts. | AdminAttendanceBranchReferenceTypes.ts, AdminAttendanceEmptyStatePropsTypes.ts, AdminAttendanceErrorPropsTypes.ts, AdminAttendanceMockHandlerTypes.ts, AdminAttendanceQueryTypes.ts, AdminAttendanceStoreStateTypes.ts, AdminAttendanceTypes.ts |
| `admin_attendance_utils/` | Feature-local deterministic utilities and formatters. | AdminAttendanceFormatters.test.ts, AdminAttendanceFormatters.ts |
| `admin_attendance_components/admin_attendance_empty_state/` | Feature-owned implementation boundary. | AdminAttendanceEmptyState.tsx |
| `admin_attendance_components/admin_attendance_kpis/` | Feature-owned implementation boundary. | AdminAttendanceKPIs.tsx |
| `admin_attendance_components/admin_attendance_main/` | Feature-owned implementation boundary. | AdminAttendanceMain.tsx |
| `admin_attendance_components/admin_attendance_table/` | Feature-owned implementation boundary. | AdminAttendanceTable.tsx |
| `admin_attendance_components/admin_attendance_toolbar/` | Feature-owned implementation boundary. | AdminAttendanceToolbar.tsx |
| `admin_attendance_components/admin_attendance_trend_chart/` | Feature-owned implementation boundary. | AdminAttendanceTrendChart.tsx |
| `admin_attendance_mocks/admin_attendance_fixtures/` | Module-owned mock API datasets. | AdminAttendanceBranchReferenceMockFixtures.ts, AdminAttendanceMockFixtures.ts |
| `admin_attendance_mocks/admin_attendance_handlers/` | Module-owned MSW request handlers. | AdminAttendanceBranchReferenceMockHandlers.ts, AdminAttendanceMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMaskSensitiveData`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminAttendanceEmptyState.tsx` | `Empty state shown when attendance table has zero rows matching current filters.` |
| `AdminAttendanceKPIs.tsx` | `Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg.` |
| `AdminAttendanceMain.tsx` | `Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table.` |
| `AdminAttendanceTable.tsx` | `Renders the read-only paginated attendance records table with status badges and duration.` |
| `AdminAttendanceToolbar.tsx` | `Renders search input, status filter, branch filter, and date range filter for Admin Attendance.` |
| `AdminAttendanceTrendChart.tsx` | `Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations.` |


## User Flows
### Flow 1: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminAttendanceBranchReference.ts`, `useAdminAttendanceLogic.ts`
- **Stores:** `useAdminAttendanceStore.ts`
- **Query-key registry:** `admin`, `attendance`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
- **Evidenced module API operations:** `fetchAttendanceRecords`, `fetchAttendanceSummary`, and `fetchAttendanceTrend` are implemented in `AdminAttendanceApi.ts` and consumed by `useAdminAttendanceLogic.ts`. Their real backend implementation remains **BLOCKED BY SUPPLIED SCOPE** because no backend/OpenAPI contract is included.

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminAttendanceEmptyState.tsx` | Empty state shown when attendance table has zero rows matching current filters. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceKPIs.tsx` | Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceMain.tsx` | Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceTable.tsx` | Renders the read-only paginated attendance records table with status badges and duration. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceToolbar.tsx` | Renders search input, status filter, branch filter, and date range filter for Admin Attendance. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAttendanceTrendChart.tsx` | Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.


## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.


## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminAttendanceEmptyState.tsx` | Empty state shown when attendance table has zero rows matching current filters. | 1 |
| `AdminAttendanceKPIs.tsx` | Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg. | 0 |
| `AdminAttendanceMain.tsx` | Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table. | 1 |
| `AdminAttendanceTable.tsx` | Renders the read-only paginated attendance records table with status badges and duration. | 1 |
| `AdminAttendanceToolbar.tsx` | Renders search input, status filter, branch filter, and date range filter for Admin Attendance. | 4 |
| `AdminAttendanceTrendChart.tsx` | Renders the 7-day attendance trend bar chart using ApexCharts. Read-only, no mutations. | 0 |


## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.


## Component Tree

`admin_attendance_components/`
- `admin_attendance_empty_state/AdminAttendanceEmptyState.tsx`
- `admin_attendance_kpis/AdminAttendanceKPIs.tsx`
- `admin_attendance_main/AdminAttendanceMain.tsx`
- `admin_attendance_table/AdminAttendanceTable.tsx`
- `admin_attendance_toolbar/AdminAttendanceToolbar.tsx`
- `admin_attendance_trend_chart/AdminAttendanceTrendChart.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_attendance_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
