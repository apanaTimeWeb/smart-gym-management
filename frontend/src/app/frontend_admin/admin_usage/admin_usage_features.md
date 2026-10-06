# Admin Usage — Feature Map

## Module Purpose
The Admin Usage module gives administrators a view of current plan usage and the upgrade-request surface defined by the supplied contract. Users can review usage metrics, inspect their current-plan information, and submit an upgrade request when the supported UI allows it. The module owns the usage query/mutation flow and UI state while keeping server values in TanStack Query. It does not itself change subscription entitlement rules or invent upgrade APIs beyond the supplied contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/usage` | ``frontend_admin/admin_usage/page.tsx`` | ``frontend_admin/admin_usage/admin_usage_components/admin_usage_main/AdminUsageMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_usage/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_usage_api/` | Typed API transport boundary. | AdminUsageApi.ts |
| `admin_usage_components/` | Feature component root. | (empty) |
| `admin_usage_constants/` | Static business configuration and query-key registries. | AdminUsageConstants.ts, AdminUsageQueryKeys.ts |
| `admin_usage_hooks/` | Feature data-flow and interaction hooks. | useAdminUsageLogic.test.tsx, useAdminUsageLogic.ts, useAdminUsageMutations.test.tsx, useAdminUsageMutations.ts |
| `admin_usage_locales/` | Module-owned localized resources. | admin_usage_en.json, admin_usage_hi.json |
| `admin_usage_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_usage_schemas/` | Zod validation/runtime contracts. | AdminUsageSchemas.ts, AdminUsageUpgradeSchemas.ts |
| `admin_usage_types/` | Domain, DTO, state, and prop type contracts. | AdminUsageErrorPropsTypes.ts, AdminUsageMetricCardPropsTypes.ts, AdminUsageTypes.ts, AdminUsageUpgradeTypes.ts |
| `admin_usage_utils/` | Feature-local deterministic utilities and formatters. | AdminUsageFormatCurrency.test.ts, AdminUsageFormatCurrency.ts, AdminUsageFormatters.test.ts, AdminUsageFormatters.ts, AdminUsageSharedConstants.test.ts |
| `admin_usage_components/admin_usage_alert/` | Feature-owned implementation boundary. | AdminUsageAlert.tsx, useAdminUsageAlert.test.ts, useAdminUsageAlert.ts |
| `admin_usage_components/admin_usage_main/` | Feature-owned implementation boundary. | AdminUsageMain.tsx |
| `admin_usage_components/admin_usage_metric_card/` | Feature-owned implementation boundary. | AdminUsageMetricCard.tsx |
| `admin_usage_components/admin_usage_plan_card/` | Feature-owned implementation boundary. | AdminUsagePlanCard.tsx |
| `admin_usage_mocks/admin_usage_fixtures/` | Module-owned mock API datasets. | AdminUsageMockFixtures.ts |
| `admin_usage_mocks/admin_usage_handlers/` | Module-owned MSW request handlers. | AdminUsageMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Present in supplied API client.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage`
- `@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore`
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
| `AdminUsageAlert.tsx` | `Renders the global Admin usage warning banner using the dedicated usage query hook.` |
| `AdminUsageMain.tsx` | `Main entry point for Admin Usage & Subscription page. Composes metric cards and plan cards.` |
| `AdminUsageMetricCard.tsx` | `Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).` |
| `AdminUsagePlanCard.tsx` | `Renders plan tiers and owns only the view-level trigger for an upgrade request.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: requestUpgrade
requestUpgrade: UI control → dedicated mutation hook → idempotency key → module API → authoritative response/cache reconciliation → success or error feedback.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminUsageLogic.ts`, `useAdminUsageMutations.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `detail`, `list`, `usage`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminUsageApi.ts` | `fetchMyUsage` | `GET` | `—` | `ApiResponse<AdminUsageData` |
| `AdminUsageApi.ts` | `requestUpgrade` | `POST` | `planName: string, idempotencyKey: string` | `ApiResponse<AdminUsageUpgradeRequest` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminUsageAlert.tsx` | Renders the global Admin usage warning banner using the dedicated usage query hook. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminUsageMain.tsx` | Main entry point for Admin Usage & Subscription page. Composes metric cards and plan cards. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminUsageMetricCard.tsx` | Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold). | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminUsagePlanCard.tsx` | Renders plan tiers and owns only the view-level trigger for an upgrade request. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminUsageAlert.tsx` | Renders the global Admin usage warning banner using the dedicated usage query hook. | 2 |
| `AdminUsageMain.tsx` | Main entry point for Admin Usage & Subscription page. Composes metric cards and plan cards. | 1 |
| `AdminUsageMetricCard.tsx` | Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold). | 3 |
| `AdminUsagePlanCard.tsx` | Renders plan tiers and owns only the view-level trigger for an upgrade request. | 1 |


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

`admin_usage_components/`
- `admin_usage_alert/AdminUsageAlert.tsx`
- `admin_usage_alert/useAdminUsageAlert.test.ts`
- `admin_usage_alert/useAdminUsageAlert.ts`
- `admin_usage_main/AdminUsageMain.tsx`
- `admin_usage_metric_card/AdminUsageMetricCard.tsx`
- `admin_usage_plan_card/AdminUsagePlanCard.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_usage_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
