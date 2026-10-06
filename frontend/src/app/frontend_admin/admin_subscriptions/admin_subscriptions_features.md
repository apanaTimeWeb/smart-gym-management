# Admin Subscriptions — Feature Map

## Module Purpose
The Admin Subscriptions module manages the authenticated gym's SaaS subscription workspace and related billing-view controls. Users can review the current subscription, inspect available plans and invoices, inspect payment methods, upgrade a plan, toggle auto-renew, set a default payment method, and remove a payment method through the supplied mutation contract. The module owns the UI state, idempotency behavior, query invalidation, and currency presentation. It does not redefine backend billing rules or global payment transport.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/subscriptions` | ``frontend_admin/admin_subscriptions/page.tsx`` | ``frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_main/AdminSubscriptionsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zustand 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_subscriptions/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_subscriptions_api/` | Typed API transport boundary. | AdminSubscriptionsApi.test.ts, AdminSubscriptionsApi.ts |
| `admin_subscriptions_components/` | Feature component root. | (empty) |
| `admin_subscriptions_constants/` | Static business configuration and query-key registries. | AdminSubscriptionsConstants.ts, AdminSubscriptionsExternalUrlConstants.ts, AdminSubscriptionsQueryKeys.ts |
| `admin_subscriptions_hooks/` | Feature data-flow and interaction hooks. | useAdminSubscriptionsLogic.test.ts, useAdminSubscriptionsLogic.ts, useAdminSubscriptionsMutations.test.tsx, useAdminSubscriptionsMutations.ts, useAdminSubscriptionsQueries.test.ts, useAdminSubscriptionsQueries.ts |
| `admin_subscriptions_locales/` | Module-owned localized resources. | admin_subscriptions_en.json, admin_subscriptions_hi.json |
| `admin_subscriptions_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_subscriptions_schemas/` | Zod validation/runtime contracts. | AdminSubscriptionsSchemas.ts |
| `admin_subscriptions_store/` | Module-scoped UI state only. | useAdminSubscriptionsStore.test.ts, useAdminSubscriptionsStore.ts |
| `admin_subscriptions_types/` | Domain, DTO, state, and prop type contracts. | AdminSubscriptionsEmptyStatePropsTypes.ts, AdminSubscriptionsErrorPropsTypes.ts, AdminSubscriptionsInvoicePaginationTypes.ts, AdminSubscriptionsPaymentMethodIconPropsTypes.ts, AdminSubscriptionsPaymentMethodLabelPropsTypes.ts, AdminSubscriptionsPlanCardPropsTypes.ts, AdminSubscriptionsStoreTypes.ts, AdminSubscriptionsTypes.ts, AdminSubscriptionsUiTypes.ts |
| `admin_subscriptions_utils/` | Feature-local deterministic utilities and formatters. | AdminSubscriptionsFormatCurrency.test.ts, AdminSubscriptionsFormatCurrency.ts, AdminSubscriptionsFormatters.test.ts, AdminSubscriptionsFormatters.ts, AdminSubscriptionsPaginateInvoices.test.ts, AdminSubscriptionsPaginateInvoices.ts |
| `admin_subscriptions_components/admin_subscriptions_empty_state/` | Feature-owned implementation boundary. | AdminSubscriptionsEmptyState.tsx |
| `admin_subscriptions_components/admin_subscriptions_invoices/` | Feature-owned implementation boundary. | AdminSubscriptionsInvoices.tsx |
| `admin_subscriptions_components/admin_subscriptions_kpis/` | Feature-owned implementation boundary. | AdminSubscriptionsKPIs.tsx |
| `admin_subscriptions_components/admin_subscriptions_main/` | Feature-owned implementation boundary. | AdminSubscriptionsMain.tsx |
| `admin_subscriptions_components/admin_subscriptions_payment_method/` | Feature-owned implementation boundary. | AdminSubscriptionsPaymentMethod.tsx, AdminSubscriptionsPaymentMethodIcon.tsx, AdminSubscriptionsPaymentMethodLabel.tsx |
| `admin_subscriptions_components/admin_subscriptions_plan_cards/` | Feature-owned implementation boundary. | AdminSubscriptionsPlanCard.tsx, AdminSubscriptionsPlanCards.tsx |
| `admin_subscriptions_mocks/admin_subscriptions_fixtures/` | Module-owned mock API datasets. | AdminSubscriptionsMockFixtures.ts |
| `admin_subscriptions_mocks/admin_subscriptions_handlers/` | Module-owned MSW request handlers. | AdminSubscriptionsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Present in supplied API client.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutStatCard`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminSubscriptionsEmptyState.tsx` | `Renders the empty state for an Admin subscriptions data section.` |
| `AdminSubscriptionsInvoices.tsx` | `Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions.` |
| `AdminSubscriptionsKPIs.tsx` | `KPI cards for the Subscriptions module.` |
| `AdminSubscriptionsMain.tsx` | `Main orchestrator for the Subscriptions / Billing module — tabs for overview, plans, invoices, payment.` |
| `AdminSubscriptionsPaymentMethod.tsx` | `Payment method management — list, set default, remove.` |
| `AdminSubscriptionsPaymentMethodIcon.tsx` | `Renders the semantic icon for one supported subscription payment method type.` |
| `AdminSubscriptionsPaymentMethodLabel.tsx` | `Renders the human-readable masked label for one subscription payment method.` |
| `AdminSubscriptionsPlanCard.tsx` | `Renders one SaaS subscription plan comparison card and its upgrade action.` |
| `AdminSubscriptionsPlanCards.tsx` | `SaaS plan comparison cards with upgrade CTA.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: upgradePlan
upgradePlan: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 3: toggleAutoRenew
toggleAutoRenew: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 4: setDefaultPaymentMethod
setDefaultPaymentMethod: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.

### Flow 5: removePaymentMethod
removePaymentMethod: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminSubscriptionsLogic.ts`, `useAdminSubscriptionsMutations.ts`, `useAdminSubscriptionsQueries.ts`
- **Stores:** `useAdminSubscriptionsStore.ts`
- **Query-key registry:** `admin`, `detail`, `list`, `subscriptions`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminSubscriptionsApi.ts` | `fetchSubscription` | `GET` | `—` | `ApiResponse<CurrentSubscription` |
| `AdminSubscriptionsApi.ts` | `fetchPlans` | `GET` | `—` | `ApiResponse<SaaSPlan[]` |
| `AdminSubscriptionsApi.ts` | `fetchInvoices` | `GET` | `params: { page: number; limit: number }` | `ApiResponse<Invoice[]` |
| `AdminSubscriptionsApi.ts` | `fetchPaymentMethods` | `GET` | `—` | `ApiResponse<PaymentMethod[]` |
| `AdminSubscriptionsApi.ts` | `fetchKPIs` | `GET` | `—` | `ApiResponse<SubscriptionKPIData` |
| `AdminSubscriptionsApi.ts` | `upgradePlan` | `POST` | `planId: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminSubscriptionsApi.ts` | `toggleAutoRenew` | `POST` | `idempotencyKey: string` | `ApiResponse<null` |
| `AdminSubscriptionsApi.ts` | `setDefaultPaymentMethod` | `POST` | `id: string, idempotencyKey: string` | `ApiResponse<null` |
| `AdminSubscriptionsApi.ts` | `removePaymentMethod` | `DELETE` | `id: string, idempotencyKey: string` | `ApiResponse<null` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminSubscriptionsEmptyState.tsx` | Renders the empty state for an Admin subscriptions data section. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSubscriptionsInvoices.tsx` | Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSubscriptionsKPIs.tsx` | KPI cards for the Subscriptions module. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSubscriptionsMain.tsx` | Main orchestrator for the Subscriptions / Billing module — tabs for overview, plans, invoices, payment. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSubscriptionsPaymentMethod.tsx` | Payment method management — list, set default, remove. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminSubscriptionsPlanCard.tsx` | Renders one SaaS subscription plan comparison card and its upgrade action. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminSubscriptionsEmptyState.tsx` | Renders the empty state for an Admin subscriptions data section. | 1 |
| `AdminSubscriptionsInvoices.tsx` | Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions. | 1 |
| `AdminSubscriptionsKPIs.tsx` | KPI cards for the Subscriptions module. | 0 |
| `AdminSubscriptionsMain.tsx` | Main orchestrator for the Subscriptions / Billing module — tabs for overview, plans, invoices, payment. | 2 |
| `AdminSubscriptionsPaymentMethod.tsx` | Payment method management — list, set default, remove. | 2 |
| `AdminSubscriptionsPaymentMethodIcon.tsx` | Renders the semantic icon for one supported subscription payment method type. | 0 |
| `AdminSubscriptionsPaymentMethodLabel.tsx` | Renders the human-readable masked label for one subscription payment method. | 0 |
| `AdminSubscriptionsPlanCard.tsx` | Renders one SaaS subscription plan comparison card and its upgrade action. | 3 |
| `AdminSubscriptionsPlanCards.tsx` | SaaS plan comparison cards with upgrade CTA. | 0 |


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

`admin_subscriptions_components/`
- `admin_subscriptions_empty_state/AdminSubscriptionsEmptyState.tsx`
- `admin_subscriptions_invoices/AdminSubscriptionsInvoices.tsx`
- `admin_subscriptions_kpis/AdminSubscriptionsKPIs.tsx`
- `admin_subscriptions_main/AdminSubscriptionsMain.tsx`
- `admin_subscriptions_payment_method/AdminSubscriptionsPaymentMethod.tsx`
- `admin_subscriptions_payment_method/AdminSubscriptionsPaymentMethodIcon.tsx`
- `admin_subscriptions_payment_method/AdminSubscriptionsPaymentMethodLabel.tsx`
- `admin_subscriptions_plan_cards/AdminSubscriptionsPlanCard.tsx`
- `admin_subscriptions_plan_cards/AdminSubscriptionsPlanCards.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_subscriptions_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
