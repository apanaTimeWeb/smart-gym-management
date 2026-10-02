# Superadmin Gyms â€” Feature Map

## Module Purpose
superadmin_gyms_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/gyms``. Authenticated Superadmin users can bulk action; confirm delete; export gyms; row click; row key down; search change; sort; submit. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts`, `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts``.


## Routes

- Primary feature route: `/superadmin/gyms`
- Route ownership remains inside `superadmin_gyms`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminGymsAddGymForm.tsx`, `SuperadminGymsCalendar.tsx`, `SuperadminGymsEmptyState.tsx`, `SuperadminGymsGymDeleteModal.tsx`, `SuperadminGymsGymDetailBranchesSection.tsx`, `SuperadminGymsGymDetailLifecycleSection.tsx`, `SuperadminGymsGymDetailOverviewSection.tsx`, `SuperadminGymsGymDetailRow.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `createGym`, `deleteGym`, `exitGhostLogin`, `exportGymsReport`, `fetchGymById`, `fetchGyms`, `fetchSubscriptionPlans`, `impersonateTenant`, `provisionGym`, `setGhostLoginCookie`, `updateGym`, `updateGymStatus`.
- URL paths remain centralized in `superadmin_gyms_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_gyms_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_gyms_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- @hookform/resolvers
- Lucide React
- MSW
- Next.js
- React
- React Hook Form
- React Testing Library
- TanStack Query
- Vitest
- Zod
- Zustand
- date-fns
- http-status-codes
- lodash.debounce
- next
- next-intl
- sonner

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** `createGym`, `provisionGym`
- **Read:** `exportGymsReport`, `fetchGymById`, `fetchGymDetailBusinessOverview`, `fetchGyms`, `fetchGymsBusinessControls`, `fetchSubscriptionPlans`
- **Update / Action:** `exitGhostLogin`, `impersonateTenant`, `setGhostLoginCookie`, `updateGym`, `updateGymStatus`, `updateGymsBulkAction`
- **Delete:** `deleteGym`

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_gyms`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_gyms_features.md, superadmin_gyms_forbidden.md, superadmin_gyms_theme_contract.md, superadmin_gyms_url_config.ts` |
| `[id]/` | Owns module-scoped [id] artifacts. | `error.tsx, loading.tsx, not-found.tsx, page.tsx` |
| `add/` | Owns module-scoped add artifacts. | `error.tsx, loading.tsx, page.tsx` |
| `superadmin_gyms_api/` | Owns module-scoped api artifacts. | `SuperadminGymsApi.ts, SuperadminGymsBusinessControlsApi.ts, SuperadminGymsGymDetailBusinessOverviewApi.ts` |
| `superadmin_gyms_components/` | Owns module-scoped components artifacts. | `SuperadminGymsMain.tsx` |
| `superadmin_gyms_constants/` | Owns module-scoped constants artifacts. | `SuperadminGymsConstants.test.ts, SuperadminGymsConstants.ts, SuperadminGymsFilterConstants.ts, SuperadminGymsQueryKeys.ts, SuperadminGymsStorageConstants.ts` (+2 more) |
| `superadmin_gyms_documentation/` | Owns module-scoped documentation artifacts. | `SuperadminGymsGymDetailFeatures.md, SuperadminGymsGymDetailForbidden.md, SuperadminGymsGymDetailThemeContract.md, superadmin_gyms_business_controls_features.md, superadmin_gyms_business_controls_forbidden.md` (+1 more) |
| `superadmin_gyms_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminGymsAddGymForm.test.ts, useSuperadminGymsAddGymForm.ts, useSuperadminGymsAddGymFormSubmit.test.tsx, useSuperadminGymsAddGymFormSubmit.ts, useSuperadminGymsExitGhostLogin.test.ts` (+21 more) |
| `superadmin_gyms_locales/` | Owns module-scoped locales artifacts. | `superadmin_gyms_en.json, superadmin_gyms_hi.json` |
| `superadmin_gyms_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_gyms_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminGymsApiSchemas.ts, SuperadminGymsContractSchemas.ts, SuperadminGymsGymDetailContractSchemas.ts, SuperadminGymsPlanContractSchemas.ts, SuperadminGymsSchema.ts` (+5 more) |
| `superadmin_gyms_store/` | Owns module-scoped store artifacts. | `useSuperadminGymsGymGhostLoginStore.test.ts, useSuperadminGymsGymGhostLoginStore.ts, useSuperadminGymsStore.test.ts, useSuperadminGymsStore.ts` |
| `superadmin_gyms_tests/` | Owns module-scoped tests artifacts. | `SuperadminGymsBasic.test.tsx, SuperadminGymsBusinessControls.test.ts, SuperadminGymsGymDetailBusinessOverview.test.ts, SuperadminGymsGymDetailContract.test.ts` |
| `superadmin_gyms_types/` | Owns module-scoped types artifacts. | `SuperadminGymsGymDetailLifecycleSectionTypes.ts, SuperadminGymsGymDetailMainTypes.ts, SuperadminGymsGymDetailOverviewSectionTypes.ts, SuperadminGymsGymDetailPageTypes.ts, SuperadminGymsGymDetailRowTypes.ts` (+9 more) |
| `superadmin_gyms_utils/` | Owns module-scoped utils artifacts. | `SuperadminGymsCalendarUtils.test.ts, SuperadminGymsCalendarUtils.ts, SuperadminGymsFormatCurrency.test.ts, SuperadminGymsFormatCurrency.ts, SuperadminGymsGymWhatsappReceiptUtils.test.ts` (+3 more) |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/CopyButton`
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/Pagination`
- `@/components/ui/SearchableDropdown`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/formatters`
- `@/lib/logger`
- `@/lib/whatsapp_formatter`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Gyms | `/superadmin/gyms` | bulk action; confirm delete; export gyms; row click; row key down; search change; sort; submit | `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts`, `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary gyms view
1. Enter `/superadmin/gyms`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminGymsMain.tsx`.
2. `useSuperadminGymsAddGymForm.test.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported server mutation
1. Submit the supported action through `useSuperadminGymsAddGymFormSubmit.ts` (not directly through an API client from JSX).
2. The feature API sends the same idempotency key for retries of one user intent and surfaces the backend response message through the approved toast path.
3. Mutation success reconciles the affected module query keys before the UI presents the resulting authoritative state; failure preserves the retryable path and does not fabricate a success state.

### Flow 4 — Recover from a failed request
1. A rejected request enters the feature's error boundary/state instead of rendering stale success data.
2. The visible Retry/reload affordance reuses the owning query hook or refetch callback, preserving the module's current UI state where documented.
3. The success path is reached only after a new authoritative response arrives; stale cached data is reconciled through the module query-key contract.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_gyms`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `superadmin_gyms_store/useSuperadminGymsStore.ts`, `superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `superadmin_gyms_store/useSuperadminGymsStore.ts`, `superadmin_gyms_store/useSuperadminGymsGymGhostLoginStore.ts`, `superadmin_gyms_hooks/useSuperadminGymsGymDetail.ts`, `superadmin_gyms_hooks/useSuperadminGymsV1.ts`, `superadmin_gyms_hooks/useSuperadminGymsGymDetailActions.ts`, `superadmin_gyms_hooks/useSuperadminGymsGymWhatsappModal.ts`, `superadmin_gyms_hooks/useSuperadminGymsAddGymForm.ts`, `superadmin_gyms_hooks/useSuperadminGymsAddGymFormSubmit.ts`, `superadmin_gyms_hooks/useSuperadminGymsGymEditModal.ts`, `superadmin_gyms_hooks/useSuperadminGymsGymDeleteModal.ts`, `superadmin_gyms_hooks/useSuperadminGymsTable.ts`, `superadmin_gyms_hooks/useSuperadminGymsGymMutations.ts`, `superadmin_gyms_hooks/useSuperadminGymsToolbar.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_gyms_constants/SuperadminGymsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Detected API symbols:** `fetchGyms` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `fetchGymById` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `fetchSubscriptionPlans` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `createGym` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `updateGym` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `updateGymStatus` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `impersonateTenant` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `deleteGym` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `fetchGymStats` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `emailGymOwner` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `exportGymsReport` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `provisionGym` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `exitGhostLogin` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `setGhostLoginCookie` — `superadmin_gyms_api/SuperadminGymsApi.ts`; `fetchGymDetailBusinessOverview` — `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts`; `fetchGymsBusinessControls` — `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`; `updateGymsBulkAction` — `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_gyms_components/superadmin_gyms_add_gym_form/SuperadminGymsAddGymForm.tsx` | `message` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_calendar/SuperadminGymsCalendar.tsx` | `trialEndsAt`, `createdAt`, `id`, `name`, `plan` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailLifecycleSection.tsx` | `subscription` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailOverviewSection.tsx` | `memberCount`, `monthlyRevenue`, `currency`, `plan`, `databaseVersion`, `ownerName`, `adminEmail`, `phone` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailView.tsx` | `query`, `gym`, `goBackToGyms`, `gymName`, `gymId`, `handleGhostLogin`, `isStartingGhostLogin`, `status` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailWhiteLabelSection.tsx` | `gymName`, `plan`, `status` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_gym_edit_modal/SuperadminGymsGymEditModal.tsx` | `message` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |
| `superadmin_gyms_components/superadmin_gyms_table/SuperadminGymsTable.tsx` | `id`, `name`, `ownerName`, `adminEmail`, `plan`, `memberCount`, `monthlyRevenue`, `currency` | `superadmin_gyms_api/SuperadminGymsApi.ts`, `superadmin_gyms_api/SuperadminGymsBusinessControlsApi.ts`, `superadmin_gyms_api/SuperadminGymsGymDetailBusinessOverviewApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`, `add/loading.tsx`, `[id]/loading.tsx`
- **`error.tsx`:** `error.tsx`, `add/error.tsx`, `[id]/error.tsx`
- **Empty-state components:** `superadmin_gyms_components/superadmin_gyms_empty_state/SuperadminGymsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server Component that acts as the entry point for the Tenants (Gyms) list page. |
| `add/page.tsx` | Server Component that acts as the entry point for the Add Gym page. |
| `superadmin_gyms_components/SuperadminGymsV1FiltersSavedViewsAndBulkActionsSection.tsx` | Renders executable tenant filters, saved views, tenant selection, and bulk actions for the V1 controls feature. |
| `superadmin_gyms_components/SuperadminGymsMain.tsx` | Root orchestrator for the Gyms page. Renders the layout, toolbar, and table. |
| `superadmin_gyms_components/SuperadminGymsV1TenantComparisonPanel.tsx` | Renders the current filtered tenant dataset and exposes row selection for bulk operations. |
| `[id]/page.tsx` | Server entry for the Superadmin gym detail route; passes the route gym ID to client views. |
| `superadmin_gyms_components/superadmin_gyms_gym_whatsapp_modal/SuperadminGymsGymWhatsappModal.tsx` | Renders the modal UI for sending a WhatsApp message to a Gym owner. Purely a view component. |
| `superadmin_gyms_components/superadmin_gyms_empty_state/SuperadminGymsEmptyState.tsx` | Renders the empty state UI for the Gyms table when no gyms match the current search. Shows icon, message, and search adjustment hint. |
| `superadmin_gyms_components/superadmin_gyms_add_gym_form/SuperadminGymsAddGymForm.tsx` | Renders the form UI for onboarding a new gym tenant. Receives logic from useSuperadminGymsAddGymForm hook. |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailRow.tsx` | Renders one labeled value row inside a Superadmin gym detail section. |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailSkeleton.tsx` | Renders the route-level structural skeleton for the Gym Detail screen. |
| `superadmin_gyms_components/superadmin_gyms_gym_detail_client/SuperadminGymsGymDetailView.tsx` | Renders the Superadmin Gym 360 detail workspace from query-owned data and feature-owned action hooks. No direct API calls. |
| `superadmin_gyms_components/superadmin_gyms_gym_edit_modal/SuperadminGymsGymEditModal.tsx` | Renders the modal UI for editing Gym details. Purely a view component. |
| `superadmin_gyms_components/superadmin_gyms_gym_delete_modal/SuperadminGymsGymDeleteModal.tsx` | Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE". |
| `superadmin_gyms_components/superadmin_gyms_table/SuperadminGymsTableSortIcon.tsx` | Renders the semantic sort indicator for a gym table column. |
| `superadmin_gyms_components/superadmin_gyms_table/SuperadminGymsTable.tsx` | Renders the table view of Gym tenants. Purely a view component that consumes useSuperadminGymsTable hook. |
| `superadmin_gyms_components/superadmin_gyms_toolbar/SuperadminGymsToolbar.tsx` | Renders the search toolbar for the Gyms table. |
| `superadmin_gyms_components/SuperadminGymGhostLoginBanner/SuperadminGymGhostLoginBanner.tsx` | Renders the feature-owned tenant impersonation session banner for the Superadmin shell. |
| `superadmin_gyms_components/superadmin_gyms_calendar/SuperadminGymsCalendar.tsx` | Renders the subscription renewal calendar view for Gym tenants. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into gyms.
- **Destructive Actions**: Any deletion or modification of gyms records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for gyms do not expose cross-tenant sensitive data.

- **Module API boundary:** All `gyms` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `gyms` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `gyms` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `gyms` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `gyms` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Independent Store Repair Boundaries

This module intentionally uses two module-scoped Zustand stores because they represent separate repair boundaries with different lifecycles:

- `useSuperadminGymsStore.ts` owns table/detail UI preferences and selection state for the main gyms workflow.
- `useSuperadminGymsGymGhostLoginStore.ts` owns the transient ghost-login session/exit UI state and is isolated from the normal gyms browsing state.

The ghost-login store must remain UI/session-shell state only. It must not become a second cache for gym API data. Normal gym server data remains owned by TanStack Query.
