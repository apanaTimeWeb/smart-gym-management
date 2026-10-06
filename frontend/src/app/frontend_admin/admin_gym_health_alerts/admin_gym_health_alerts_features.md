# Admin Gym Health Alerts — Feature Map

## Module Purpose
The Admin Gym Health Alerts module gives administrators a consolidated operational-health view of alerts raised across gym functions. Users can filter and search alerts, review health KPIs, inspect alert rows, and dismiss an alert through the supported mutation. The module owns its alert state, API/schema boundary, and recovery/empty presentation. It does not become a generic monitoring layer for unrelated frontend modules.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/gym-health-alerts` | ``frontend_admin/admin_gym_health_alerts/page.tsx`` | ``frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_components/admin_gym_health_alerts_main/AdminGymHealthAlertsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_gym_health_alerts/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_gym_health_alerts_api/` | Typed API transport boundary. | AdminGymHealthAlertsApi.ts |
| `admin_gym_health_alerts_components/` | Feature component root. | (empty) |
| `admin_gym_health_alerts_constants/` | Static business configuration and query-key registries. | AdminGymHealthAlertsConstants.ts, AdminGymHealthAlertsQueryKeys.ts |
| `admin_gym_health_alerts_hooks/` | Feature data-flow and interaction hooks. | useAdminGymHealthAlertsLogic.test.ts, useAdminGymHealthAlertsLogic.ts, useAdminGymHealthAlertsMutations.test.tsx, useAdminGymHealthAlertsMutations.ts |
| `admin_gym_health_alerts_locales/` | Module-owned localized resources. | admin_gym_health_alerts_en.json, admin_gym_health_alerts_hi.json |
| `admin_gym_health_alerts_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_gym_health_alerts_schemas/` | Zod validation/runtime contracts. | AdminGymHealthAlertsSchemas.ts |
| `admin_gym_health_alerts_store/` | Module-scoped UI state only. | useAdminGymHealthAlertsStore.test.ts, useAdminGymHealthAlertsStore.ts |
| `admin_gym_health_alerts_types/` | Domain, DTO, state, and prop type contracts. | AdminGymHealthAlertsErrorPropsTypes.ts, AdminGymHealthAlertsStoreTypes.ts, AdminGymHealthAlertsTypes.ts |
| `admin_gym_health_alerts_utils/` | Feature-local deterministic utilities and formatters. | AdminGymHealthAlertsFormatters.test.ts, AdminGymHealthAlertsFormatters.ts |
| `admin_gym_health_alerts_components/admin_gym_health_alerts_empty_state/` | Feature-owned implementation boundary. | AdminGymHealthAlertsEmptyState.tsx |
| `admin_gym_health_alerts_components/admin_gym_health_alerts_filters/` | Feature-owned implementation boundary. | AdminGymHealthAlertsFilters.tsx |
| `admin_gym_health_alerts_components/admin_gym_health_alerts_kpis/` | Feature-owned implementation boundary. | AdminGymHealthAlertsKPIs.tsx |
| `admin_gym_health_alerts_components/admin_gym_health_alerts_main/` | Feature-owned implementation boundary. | AdminGymHealthAlertsMain.tsx |
| `admin_gym_health_alerts_components/admin_gym_health_alerts_table/` | Feature-owned implementation boundary. | AdminGymHealthAlertsTable.module.css, AdminGymHealthAlertsTable.tsx |
| `admin_gym_health_alerts_mocks/admin_gym_health_alerts_fixtures/` | Module-owned mock API datasets. | AdminGymHealthAlertsMockFixtures.ts |
| `admin_gym_health_alerts_mocks/admin_gym_health_alerts_handlers/` | Module-owned MSW request handlers. | AdminGymHealthAlertsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminGymHealthAlertsEmptyState.tsx` | `Renders the healthy empty state for gym health alerts.` |
| `AdminGymHealthAlertsFilters.tsx` | `Renders the severity filter chips and search control for the alert feed.` |
| `AdminGymHealthAlertsKPIs.tsx` | `Renders the four interactive alert-summary KPI cards and updates the severity filter on activation.` |
| `AdminGymHealthAlertsMain.tsx` | `Main entry point for the Gym Health Alerts module.` |
| `AdminGymHealthAlertsTable.tsx` | `Renders active health alerts with severity semantics, configured action links, and confirmation-backed dismiss.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: dismissAlert
dismissAlert: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminGymHealthAlertsLogic.ts`, `useAdminGymHealthAlertsMutations.ts`
- **Stores:** `useAdminGymHealthAlertsStore.ts`
- **Query-key registry:** `admin`, `detail`, `gym-health-alerts`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminGymHealthAlertsApi.ts` | `fetchAlerts` | `GET` | `params?: AdminGymHealthAlertsQueryParams` | `ApiResponse<GymHealthAlert[]` |
| `AdminGymHealthAlertsApi.ts` | `fetchSummary` | `GET` | `—` | `ApiResponse<GymHealthKPIData` |
| `AdminGymHealthAlertsApi.ts` | `dismissAlert` | `POST` | `id: string, idempotencyKey: string` | `ApiResponse<null` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_gym_health_alerts_url_config.ts` | `dismiss: (id: string) => `/admin/gym-health-alerts/${id}/dismiss`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminGymHealthAlertsEmptyState.tsx` | Renders the healthy empty state for gym health alerts. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminGymHealthAlertsFilters.tsx` | Renders the severity filter chips and search control for the alert feed. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminGymHealthAlertsKPIs.tsx` | Renders the four interactive alert-summary KPI cards and updates the severity filter on activation. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminGymHealthAlertsMain.tsx` | Main entry point for the Gym Health Alerts module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminGymHealthAlertsTable.tsx` | Renders active health alerts with severity semantics, configured action links, and confirmation-backed dismiss. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminGymHealthAlertsEmptyState.tsx` | Renders the healthy empty state for gym health alerts. | 1 |
| `AdminGymHealthAlertsFilters.tsx` | Renders the severity filter chips and search control for the alert feed. | 3 |
| `AdminGymHealthAlertsKPIs.tsx` | Renders the four interactive alert-summary KPI cards and updates the severity filter on activation. | 1 |
| `AdminGymHealthAlertsMain.tsx` | Main entry point for the Gym Health Alerts module. | 0 |
| `AdminGymHealthAlertsTable.tsx` | Renders active health alerts with severity semantics, configured action links, and confirmation-backed dismiss. | 4 |


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

`admin_gym_health_alerts_components/`
- `admin_gym_health_alerts_empty_state/AdminGymHealthAlertsEmptyState.tsx`
- `admin_gym_health_alerts_filters/AdminGymHealthAlertsFilters.tsx`
- `admin_gym_health_alerts_kpis/AdminGymHealthAlertsKPIs.tsx`
- `admin_gym_health_alerts_main/AdminGymHealthAlertsMain.tsx`
- `admin_gym_health_alerts_table/AdminGymHealthAlertsTable.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_gym_health_alerts_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
