# Manager Plans — Feature Map

## Module Purpose
Manager Plans is the membership plan administration workspace. Managers can browse plans, create/update/delete plans, review membership overview metrics, and request or perform membership lifecycle actions such as activate, renew, and freeze. Plan and membership data remains server state owned by this module. Financial or destructive lifecycle changes must use the confirmation flow and authoritative responses.

Module root: `frontend_manager/manager_plans/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerPlansApi, query |
| Read | Exposed | ManagerPlansApi: fetchPlans, fetchPlanById, fetchMembershipOverview. |
| Update | Exposed | ManagerPlansApi |
| Delete | Exposed | ManagerPlansApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_plans_api/` | Owns feature API clients and request/response transport contracts. | `ManagerPlansApi.ts` |
| `manager_plans_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_plans_components/manager_plans_main/` | Owns the named feature-specific responsibility implied by this folder. | ManagerPlansMain.tsx |
| `manager_plans_components/manager_plans_main/manager_plans_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPlansContent.tsx` |
| `manager_plans_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerPlansConstants.ts`, `ManagerPlansQueryKeys.ts`, `ManagerPlansSharedConstants.test.ts`, `ManagerPlansSharedConstants.ts`, `ManagerPlansTabConstants.ts` |
| `manager_plans_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerPlansLogic.test.ts`, `useManagerPlansLogic.ts`, `useManagerPlansMembershipForms.test.ts`, `useManagerPlansMembershipForms.ts`, `useManagerPlansMembershipMutations.test.ts`, `useManagerPlansMembershipMutations.ts`, `useManagerPlansMembershipQueries.test.ts`, `useManagerPlansMembershipQueries.ts` (+2 more) |
| `manager_plans_locales/` | Owns module English and Hindi translation catalogs. | `manager_plans_en.json`, `manager_plans_hi.json` |
| `manager_plans_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_plans_mocks/manager_plans_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPlansMembershipMockData.ts`, `ManagerPlansMockData.ts` |
| `manager_plans_mocks/manager_plans_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerPlansMockHandlers.ts` |
| `manager_plans_schemas/` | Owns feature Zod validation and response schemas. | `ManagerPlansChangeRequestSchema.ts`, `ManagerPlansMembershipSchema.ts`, `ManagerPlansMembershipSchemas.ts`, `ManagerPlansSchema.ts` |
| `manager_plans_store/` | Owns module-scoped Zustand UI state only. | `useManagerPlansUiStore.test.ts`, `useManagerPlansUiStore.ts` |
| `manager_plans_tests/` | Owns module behavior and utility tests. | `ManagerPlansBehavior.test.tsx` |
| `manager_plans_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerPlansChangeRequestTypes.ts`, `ManagerPlansMembershipFormTypes.ts`, `ManagerPlansMembershipTypes.ts`, `ManagerPlansTypes.ts` |
| `manager_plans_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerPlansFormatters.test.ts`, `ManagerPlansFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_plans_features.md`
- `manager_plans_forbidden.md`
- `manager_plans_theme_contract.md`
- `manager_plans_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchPlans | `/manager/plans` | Uses the fetchPlans workflow with typed request/response handling. | `GET /manager/plans` | ✅ Implemented |
| fetchPlanById | `/manager/plans` | Uses the fetchPlanById workflow with typed request/response handling. | `GET /manager/plans/:id` | ✅ Implemented |
| createPlan | `/manager/plans` | Uses the createPlan workflow with typed request/response handling. | `POST /manager/plans` | ✅ Implemented |
| updatePlan | `/manager/plans` | Uses the updatePlan workflow with typed request/response handling. | `PATCH /manager/plans/:id` | ✅ Implemented |
| deletePlan | `/manager/plans` | Uses the deletePlan workflow with typed request/response handling. | `DELETE /manager/plans/:id` | ✅ Implemented |
| createChangeRequest | `/manager/plans` | Uses the createChangeRequest workflow with typed request/response handling. | `POST /manager/plans/change-requests` | ✅ Implemented |
| fetchMembershipOverview | `/manager/plans` | Uses the fetchMembershipOverview workflow with typed request/response handling. | `GET /manager/plans/membership-overview` | ✅ Implemented |
| activateMembership | `/manager/plans` | Uses the activateMembership workflow with typed request/response handling. | `POST /manager/plans/membership-activate` | ✅ Implemented |
| renewMembership | `/manager/plans` | Uses the renewMembership workflow with typed request/response handling. | `POST /manager/plans/membership-renew` | ✅ Implemented |
| freezeMembership | `/manager/plans` | Uses the freezeMembership workflow with typed request/response handling. | `POST /manager/plans/membership-freeze` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage plans
1. Manager opens the plan grid and loads the paginated plan list.
2. Create/edit actions validate through the module form/schema.
3. CRUD mutations send the request and reconcile the plan cache from the backend response.
### Flow 2: Process membership action
1. Manager opens a member-plan context and selects activate/renew/freeze or change-request.
2. The dedicated membership API sends the typed payload.
3. The backend response and message drive the UI; no optimistic destructive update is used.

## Component Tree

- Route: `manager_plans/page.tsx`
  - `<ManagerPlansMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_plans_store/useManagerPlansUiStore.ts`, `manager_plans_store/useManagerPlansUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'plans', 'list', params]`; `['manager', 'plans', 'list']`; `['manager', 'plans', 'membership-overview']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_plans/manager_plans_mocks/manager_plans_mocks_handlers/` and `manager_plans/manager_plans_mocks/manager_plans_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPlans` | `GET` | `/api/v1/manager/plans` | `{ page?, limit?, search?, status? }` | `{ plans: Plan[]; total: number }` |
| `fetchPlanById` | `GET` | `/api/v1/manager/plans/:id` | `{ id: string }` | `Plan` |
| `createPlan` | `POST` | `/api/v1/manager/plans` | `Partial<Plan>` | `Plan` |
| `updatePlan` | `PATCH` | `/api/v1/manager/plans/:id` | `{ id: string; body: Partial<Plan> }` | `Plan` |
| `deletePlan` | `DELETE` | `/api/v1/manager/plans/:id` | `{ id: string }` | `{ id: string }` |
| `createChangeRequest` | `POST` | `/api/v1/manager/plans/change-requests` | `ManagerPlansChangeRequestPayload` | `ManagerPlansChangeRequestResponse` |
| `fetchMembershipOverview` | `GET` | `/api/v1/manager/plans/membership-overview` | `—` | `ManagerPlansMembershipOverview` |
| `activateMembership` | `POST` | `/api/v1/manager/plans/membership-activate` | `ManagerPlansActivatePayload` | `Record<string, never>` |
| `renewMembership` | `POST` | `/api/v1/manager/plans/membership-renew` | `ManagerPlansRenewPayload` | `Record<string, never>` |
| `freezeMembership` | `POST` | `/api/v1/manager/plans/membership-freeze` | `ManagerPlansFreezePayload` | `Record<string, never>` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Plan: Name | `name` | `/api/v1/manager/plans` | `data.plans[].name` | No | Yes |
| Plan: Duration | `duration` | `/api/v1/manager/plans` | `data.plans[].duration` | No | Yes |
| Plan: Price | `price` | `/api/v1/manager/plans` | `data.plans[].price` | No | Yes |
| Plan: Active | `isActive` | `/api/v1/manager/plans` | `data.plans[].isActive` | No | Yes |
| Membership overview: Active count | `activeCount` | `/api/v1/manager/plans/membership-overview` | `data.activeCount` | No | Yes |
| Membership overview: Revenue | `revenue` | `/api/v1/manager/plans/membership-overview` | `data.revenue` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_plans_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Plan delete is destructive and must be confirmed:** Plan delete is destructive and must be confirmed.
- **Activate/renew/freeze are domain mutations; do not collapse them into a generic `updatePlan` call:** Activate/renew/freeze are domain mutations; do not collapse them into a generic `updatePlan` call.
- **Plan prices and membership revenue must use centralized currency formatting:** Plan prices and membership revenue must use centralized currency formatting.
- **Membership overview data must come from its dedicated endpoint, not the plan-list response:** Membership overview data must come from its dedicated endpoint, not the plan-list response.
- **The UI must consume backend response messages after lifecycle mutations:** The UI must consume backend response messages after lifecycle mutations.
- **Do not move plan business rules into global UI primitives:** Do not move plan business rules into global UI primitives.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_plans/manager_plans_components/manager_plans_plan_card/ManagerPlansPlanCard.tsx` | Pure display component rendering a single membership plan. |
| `manager_plans/manager_plans_components/manager_plans_grid/ManagerPlansGrid.tsx` | Renders the grid of plans or loading/empty states. |
| `manager_plans/manager_plans_components/manager_plans_main/ManagerPlansMain.tsx` | Framework entry component for the Plans module; delegates feature behavior and UI composition to `ManagerPlansContent`. |
| `manager_plans/manager_plans_components/manager_plans_request_change_modal/ManagerPlansRequestChangeModal.tsx` | Renders the modal to request a change to a plan. |
| `manager_plans/manager_plans_components/manager_plans_tabs/ManagerPlansTabs.tsx` | Renders Manager plan tabs, lifecycle forms, and API-backed expiry/renewal views. |
| `manager_plans/manager_plans_components/manager_plans_toolbar/ManagerPlansToolbar.tsx` | Renders search and filter controls for the plans list. |
| `manager_plans/manager_plans_hooks/useManagerPlansLogic.ts` | module-local state/query layer — bridges TanStack Query plans with UI state (search, filters, modal) synced to URL. |
| `manager_plans_components/manager_plans_main/manager_plans_content/ManagerPlansContent.tsx` | Composes the Plans Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_plans_components/manager_plans_empty_state/ManagerPlansEmptyState.tsx` | Renders the Plans contextual empty state and the documented permitted recovery or create action. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_PLANS`
- Active locales: `en`, `hi`
- English catalog: `manager_plans/manager_plans_locales/manager_plans_en.json`
- Hindi catalog: `manager_plans/manager_plans_locales/manager_plans_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerPlansMain.tsx`
- Primary query-key registry: `ManagerPlansQueryKeys.ts`
- Primary module constants registry: `ManagerPlansConstants.ts`
- Canonical schema file: `ManagerPlansSchema.ts` in `manager_plans_schemas/`
- Module theme contract: `manager_plans_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_plans_components/manager_plans_main/ManagerPlansMain.tsx` | YES |
| API client | `ManagerPlansApi.ts` | YES |
| Schema file | `ManagerPlansSchema.ts` | YES |
| Query-key registry | `ManagerPlansQueryKeys.ts` | YES |
| Constants registry | `ManagerPlansConstants.ts` | YES |
| URL config | `manager_plans_url_config.ts` | YES |
| Behavior test | `ManagerPlansBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_plans_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_plans/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_plans/manager_plans_mocks/manager_plans_mocks_fixtures/` and `manager_plans/manager_plans_mocks/manager_plans_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
