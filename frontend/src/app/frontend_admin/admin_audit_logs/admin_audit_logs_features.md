# Admin Audit Logs — Feature Map

## Module Purpose
The Admin Audit Logs module provides administrators with a searchable, filterable record of security and operational actions captured for the admin application. Users can review audit-log KPIs, filter by actor/action/entity/date, open a log-detail drawer, and export the visible audit-log dataset. The module owns audit-log rendering and its read/export contract. It does not mutate business records or replace the centralized authentication and monitoring infrastructure.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/audit_logs` | ``frontend_admin/admin_audit_logs/page.tsx`` | ``frontend_admin/admin_audit_logs/admin_audit_logs_components/admin_audit_logs_main/AdminAuditLogsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_audit_logs/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_audit_logs_api/` | Typed API transport boundary. | AdminAuditLogsApi.ts |
| `admin_audit_logs_components/` | Feature component root. | (empty) |
| `admin_audit_logs_constants/` | Static business configuration and query-key registries. | AdminAuditLogsConstants.ts, AdminAuditLogsQueryKeys.ts |
| `admin_audit_logs_hooks/` | Feature data-flow and interaction hooks. | useAdminAuditLogsLogic.test.ts, useAdminAuditLogsLogic.ts, useAdminAuditLogsMutations.test.tsx, useAdminAuditLogsMutations.ts |
| `admin_audit_logs_locales/` | Module-owned localized resources. | admin_audit_logs_en.json, admin_audit_logs_hi.json |
| `admin_audit_logs_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_audit_logs_schemas/` | Zod validation/runtime contracts. | AdminAuditLogsSchemaPrimitives.ts, AdminAuditLogsSchemas.ts |
| `admin_audit_logs_store/` | Module-scoped UI state only. | useAdminAuditLogsStore.test.ts, useAdminAuditLogsStore.ts |
| `admin_audit_logs_types/` | Domain, DTO, state, and prop type contracts. | AdminAuditLogsDetailDrawerPropsTypes.ts, AdminAuditLogsErrorPropsTypes.ts, AdminAuditLogsStoreTypes.ts, AdminAuditLogsTypes.ts |
| `admin_audit_logs_utils/` | Feature-local deterministic utilities and formatters. | AdminAuditLogsFormatters.test.ts, AdminAuditLogsFormatters.ts |
| `admin_audit_logs_components/admin_audit_logs_detail_drawer/` | Feature-owned implementation boundary. | AdminAuditLogsDetailDrawer.module.css, AdminAuditLogsDetailDrawer.tsx |
| `admin_audit_logs_components/admin_audit_logs_empty_state/` | Feature-owned implementation boundary. | AdminAuditLogsEmptyState.tsx |
| `admin_audit_logs_components/admin_audit_logs_kpis/` | Feature-owned implementation boundary. | AdminAuditLogsKPIs.tsx |
| `admin_audit_logs_components/admin_audit_logs_main/` | Feature-owned implementation boundary. | AdminAuditLogsMain.tsx |
| `admin_audit_logs_components/admin_audit_logs_table/` | Feature-owned implementation boundary. | AdminAuditLogsTable.tsx |
| `admin_audit_logs_components/admin_audit_logs_toolbar/` | Feature-owned implementation boundary. | AdminAuditLogsToolbar.tsx |
| `admin_audit_logs_mocks/admin_audit_logs_fixtures/` | Module-owned mock API datasets. | AdminAuditLogsMockFixtures.ts |
| `admin_audit_logs_mocks/admin_audit_logs_handlers/` | Module-owned MSW request handlers. | AdminAuditLogsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
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
| `AdminAuditLogsDetailDrawer.tsx` | `Fetches and presents one immutable Audit Log detail record, including sensitive metadata visible only in this drawer.` |
| `AdminAuditLogsEmptyState.tsx` | `Renders the empty state for the Admin audit log table.` |
| `AdminAuditLogsKPIs.tsx` | `KPI stat cards for the Audit Logs module.` |
| `AdminAuditLogsMain.tsx` | `Composes the Audit Logs KPI summary, documented filters, immutable table, and detail drawer flow.` |
| `AdminAuditLogsTable.tsx` | `Renders the immutable, server-paginated Audit Logs table and opens the detail drawer from row interaction.` |
| `AdminAuditLogsToolbar.tsx` | `Owns only Audit Logs filters and the compliance CSV export control.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminAuditLogsLogic.ts`, `useAdminAuditLogsMutations.ts`
- **Stores:** `useAdminAuditLogsStore.ts`
- **Query-key registry:** `admin`, `audit-logs`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.



**Binary export transport exception:** The supplied role-only archive does not include the host `apiFetch` implementation or a documented Blob response mode. The existing binary export behavior is therefore preserved rather than replaced with an invented transport contract; host integration must keep this exception documented until the global transport exposes an approved Blob-capable API.

## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminAuditLogsApi.ts` | `fetchAuditLogs` | `GET` | `params: AdminAuditLogsQueryParams` | `ApiResponse<AuditLog[]` |
| `AdminAuditLogsApi.ts` | `fetchAuditLogById` | `GET` | `id: string` | `ApiResponse<AuditLogDetail` |
| `AdminAuditLogsApi.ts` | `fetchAuditKPIs` | `GET` | `—` | `ApiResponse<AuditKPIData` |
| `AdminAuditLogsApi.ts` | `fetchActors` | `GET` | `—` | `ApiResponse<AuditActorsResponse` |
| `AdminAuditLogsApi.ts` | `exportAuditLogs` | `GET` | `params: AuditLogExportFilters` | `not directly visible` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_audit_logs_url_config.ts` | `detail: (id: string) => `/admin/audit-logs/${encodeURIComponent(id)}`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminAuditLogsDetailDrawer.tsx` | Fetches and presents one immutable Audit Log detail record, including sensitive metadata visible only in this drawer. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAuditLogsEmptyState.tsx` | Renders the empty state for the Admin audit log table. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAuditLogsKPIs.tsx` | KPI stat cards for the Audit Logs module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAuditLogsMain.tsx` | Composes the Audit Logs KPI summary, documented filters, immutable table, and detail drawer flow. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAuditLogsTable.tsx` | Renders the immutable, server-paginated Audit Logs table and opens the detail drawer from row interaction. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminAuditLogsToolbar.tsx` | Owns only Audit Logs filters and the compliance CSV export control. | 8 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminAuditLogsDetailDrawer.tsx` | Fetches and presents one immutable Audit Log detail record, including sensitive metadata visible only in this drawer. | 4 |
| `AdminAuditLogsEmptyState.tsx` | Renders the empty state for the Admin audit log table. | 1 |
| `AdminAuditLogsKPIs.tsx` | KPI stat cards for the Audit Logs module. | 0 |
| `AdminAuditLogsMain.tsx` | Composes the Audit Logs KPI summary, documented filters, immutable table, and detail drawer flow. | 0 |
| `AdminAuditLogsTable.tsx` | Renders the immutable, server-paginated Audit Logs table and opens the detail drawer from row interaction. | 1 |
| `AdminAuditLogsToolbar.tsx` | Owns only Audit Logs filters and the compliance CSV export control. | 8 |


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

`admin_audit_logs_components/`
- `admin_audit_logs_detail_drawer/AdminAuditLogsDetailDrawer.tsx`
- `admin_audit_logs_empty_state/AdminAuditLogsEmptyState.tsx`
- `admin_audit_logs_kpis/AdminAuditLogsKPIs.tsx`
- `admin_audit_logs_main/AdminAuditLogsMain.tsx`
- `admin_audit_logs_table/AdminAuditLogsTable.tsx`
- `admin_audit_logs_toolbar/AdminAuditLogsToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_audit_logs_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
