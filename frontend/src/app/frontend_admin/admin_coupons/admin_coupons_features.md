# Admin Coupons — Feature Map

## Module Purpose
The Admin Coupons module lets administrators maintain promotional coupon records used by the gym platform. Users can review coupon KPIs, search and filter the coupon list, create coupons, edit existing coupons, delete coupons, and toggle coupon availability. The module owns coupon validation, idempotent mutation handling, query invalidation, and localized UI. It does not manage subscription plans, payments, or member eligibility outside the coupon contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/coupons` | ``frontend_admin/admin_coupons/page.tsx`` | ``frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_main/AdminCouponsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- React Hook Form 7.x
- Zod 3.x
- @hookform/resolvers 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_coupons/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_coupons_api/` | Typed API transport boundary. | AdminCouponsApi.ts |
| `admin_coupons_components/` | Feature component root. | (empty) |
| `admin_coupons_constants/` | Static business configuration and query-key registries. | AdminCouponsConstants.ts, AdminCouponsQueryKeys.ts |
| `admin_coupons_hooks/` | Feature data-flow and interaction hooks. | useAdminCouponsLogic.test.ts, useAdminCouponsLogic.ts, useAdminCouponsMutations.test.tsx, useAdminCouponsMutations.ts, useAdminCouponsUnsavedChangesGuard.test.ts, useAdminCouponsUnsavedChangesGuard.ts |
| `admin_coupons_locales/` | Module-owned localized resources. | admin_coupons_en.json, admin_coupons_hi.json |
| `admin_coupons_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_coupons_schemas/` | Zod validation/runtime contracts. | AdminCouponsSchemas.ts |
| `admin_coupons_store/` | Module-scoped UI state only. | useAdminCouponsStore.test.ts, useAdminCouponsStore.ts |
| `admin_coupons_types/` | Domain, DTO, state, and prop type contracts. | AdminCouponsErrorPropsTypes.ts, AdminCouponsMockHandlerTypes.ts, AdminCouponsStoreTypes.ts, AdminCouponsTypes.ts |
| `admin_coupons_utils/` | Feature-local deterministic utilities and formatters. | AdminCouponsFormatCurrency.test.ts, AdminCouponsFormatCurrency.ts, AdminCouponsFormatters.test.ts, AdminCouponsFormatters.ts |
| `admin_coupons_components/admin_coupons_empty_state/` | Feature-owned implementation boundary. | AdminCouponsEmptyState.tsx |
| `admin_coupons_components/admin_coupons_kpis/` | Feature-owned implementation boundary. | AdminCouponsKPIs.tsx |
| `admin_coupons_components/admin_coupons_main/` | Feature-owned implementation boundary. | AdminCouponsMain.tsx |
| `admin_coupons_components/admin_coupons_modal/` | Feature-owned implementation boundary. | AdminCouponsModal.tsx, useAdminCouponsModalForm.test.ts, useAdminCouponsModalForm.ts |
| `admin_coupons_components/admin_coupons_table/` | Feature-owned implementation boundary. | AdminCouponsTable.tsx |
| `admin_coupons_components/admin_coupons_toolbar/` | Feature-owned implementation boundary. | AdminCouponsToolbar.tsx |
| `admin_coupons_mocks/admin_coupons_fixtures/` | Module-owned mock API datasets. | AdminCouponsMockFixtures.ts, AdminCouponsMockState.test.ts, AdminCouponsMockState.ts |
| `admin_coupons_mocks/admin_coupons_handlers/` | Module-owned MSW request handlers. | AdminCouponsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Present in supplied API client.
- **Delete:** Present in supplied API client.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
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
| `AdminCouponsEmptyState.tsx` | `Renders the empty state for the Coupons table when no coupons match filters.` |
| `AdminCouponsKPIs.tsx` | `Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data.` |
| `AdminCouponsMain.tsx` | `Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal.` |
| `AdminCouponsModal.tsx` | `Renders the create/edit coupon modal with full form validation via React Hook Form + Zod.` |
| `AdminCouponsTable.tsx` | `Renders the coupons data table with edit, delete, and toggle actions.` |
| `AdminCouponsToolbar.tsx` | `Renders the search + status filter toolbar for the Coupons module.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: createCoupon
createCoupon: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: updateCoupon
updateCoupon: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 4: deleteCoupon
deleteCoupon: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 5: toggleCoupon
toggleCoupon: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminCouponsLogic.ts`, `useAdminCouponsMutations.ts`
- **Stores:** `useAdminCouponsStore.ts`
- **Query-key registry:** `admin`, `coupons`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminCouponsApi.ts` | `fetchCoupons` | `GET` | `params?: AdminCouponsQueryParams` | `ApiResponse<Coupon[]` |
| `AdminCouponsApi.ts` | `fetchKPIs` | `GET` | `—` | `ApiResponse<CouponsKPIData` |
| `AdminCouponsApi.ts` | `createCoupon` | `POST` | `payload: CouponFormValues, idempotencyKey: string` | `ApiResponse<Coupon` |
| `AdminCouponsApi.ts` | `updateCoupon` | `PATCH` | `id: string, payload: Partial<Coupon>, idempotencyKey: string` | `ApiResponse<Coupon` |
| `AdminCouponsApi.ts` | `deleteCoupon` | `DELETE` | `id: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminCouponsApi.ts` | `toggleCoupon` | `PATCH` | `id: string, idempotencyKey: string` | `ApiResponse<Coupon` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.

| URL config | Entry |
|---|---|
| `admin_coupons_url_config.ts` | `detail: (id: string) => `/admin/coupons/${encodeURIComponent(id)}`` |
| `admin_coupons_url_config.ts` | `toggle: (id: string) => `/admin/coupons/${encodeURIComponent(id)}/toggle`` |

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminCouponsEmptyState.tsx` | Renders the empty state for the Coupons table when no coupons match filters. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCouponsKPIs.tsx` | Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCouponsMain.tsx` | Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCouponsModal.tsx` | Renders the create/edit coupon modal with full form validation via React Hook Form + Zod. | 17 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCouponsTable.tsx` | Renders the coupons data table with edit, delete, and toggle actions. | 5 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCouponsToolbar.tsx` | Renders the search + status filter toolbar for the Coupons module. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminCouponsEmptyState.tsx` | Renders the empty state for the Coupons table when no coupons match filters. | 1 |
| `AdminCouponsKPIs.tsx` | Renders the 4 KPI cards for the Coupons module — total, active, redeemed, revenue lost. Derived from live coupon data. | 0 |
| `AdminCouponsMain.tsx` | Main entry point for the Coupons module. Composes KPIs, toolbar, table, and modal. | 0 |
| `AdminCouponsModal.tsx` | Renders the create/edit coupon modal with full form validation via React Hook Form + Zod. | 17 |
| `AdminCouponsTable.tsx` | Renders the coupons data table with edit, delete, and toggle actions. | 5 |
| `AdminCouponsToolbar.tsx` | Renders the search + status filter toolbar for the Coupons module. | 4 |


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

`admin_coupons_components/`
- `admin_coupons_empty_state/AdminCouponsEmptyState.tsx`
- `admin_coupons_kpis/AdminCouponsKPIs.tsx`
- `admin_coupons_main/AdminCouponsMain.tsx`
- `admin_coupons_modal/AdminCouponsModal.tsx`
- `admin_coupons_modal/useAdminCouponsModalForm.test.ts`
- `admin_coupons_modal/useAdminCouponsModalForm.ts`
- `admin_coupons_table/AdminCouponsTable.tsx`
- `admin_coupons_toolbar/AdminCouponsToolbar.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_coupons_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
