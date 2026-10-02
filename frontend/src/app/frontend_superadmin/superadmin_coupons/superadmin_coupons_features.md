# Superadmin Coupons â€” Feature Map

## Module Purpose
superadmin_coupons_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/coupons``. Authenticated Superadmin users can create coupon; delete coupon; open history; share whats app; submit; toggle restore; toggle status; update coupon. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_coupons_api/SuperadminCouponsApi.ts``.


## Routes

- Primary feature route: `/superadmin/saas-billing/coupons`
- Route ownership remains inside `superadmin_coupons`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminCouponsCouponEditModal.tsx`, `SuperadminCouponsCouponModal.tsx`, `SuperadminCouponsDateFilterDropdown.tsx`, `SuperadminCouponsEmptyState.tsx`, `SuperadminCouponsHeader.tsx`, `SuperadminCouponsMain.tsx`, `SuperadminCouponsRedemptionDrawer.tsx`, `SuperadminCouponsStatsBar.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `createCoupon`, `deleteCoupon`, `fetchCoupons`, `fetchRedemptions`, `restoreCoupon`, `updateCoupon`, `updateCouponStatus`.
- URL paths remain centralized in `superadmin_coupons_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_coupons_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_coupons_forbidden.md`.
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
- http-status-codes
- next-intl
- sonner

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** `createCoupon`
- **Read:** `fetchCoupons`, `fetchRedemptions`
- **Update / Action:** `restoreCoupon`, `updateCoupon`, `updateCouponStatus`
- **Delete:** `deleteCoupon`

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_coupons`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_coupons_features.md, superadmin_coupons_forbidden.md, superadmin_coupons_theme_contract.md, superadmin_coupons_url_config.ts` |
| `superadmin_coupons_api/` | Owns module-scoped api artifacts. | `SuperadminCouponsApi.ts` |
| `superadmin_coupons_components/` | Owns module-scoped components artifacts. | `SuperadminCouponsCouponEditModal.tsx, SuperadminCouponsCouponModal.tsx, SuperadminCouponsDateFilterDropdown.tsx, SuperadminCouponsMain.tsx, SuperadminCouponsRedemptionDrawer.tsx` |
| `superadmin_coupons_constants/` | Owns module-scoped constants artifacts. | `SuperadminCouponsConstants.test.ts, SuperadminCouponsConstants.ts, SuperadminCouponsQueryKeys.ts` |
| `superadmin_coupons_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminCoupons.test.ts, useSuperadminCoupons.ts, useSuperadminCouponsCouponRedemptions.test.tsx, useSuperadminCouponsCouponRedemptions.ts, useSuperadminCouponsMain.test.ts` (+5 more) |
| `superadmin_coupons_locales/` | Owns module-scoped locales artifacts. | `superadmin_coupons_en.json, superadmin_coupons_hi.json` |
| `superadmin_coupons_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_coupons_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminCouponsContractSchemas.ts` |
| `superadmin_coupons_tests/` | Owns module-scoped tests artifacts. | `SuperadminCouponsBasic.test.tsx` |
| `superadmin_coupons_types/` | Owns module-scoped types artifacts. | `SuperadminCouponsCouponEditModalTypes.ts, SuperadminCouponsCouponModalTypes.ts, SuperadminCouponsDateFilterTypes.ts, SuperadminCouponsEmptyStateTypes.ts, SuperadminCouponsHeaderTypes.ts` (+7 more) |
| `superadmin_coupons_utils/` | Owns module-scoped utils artifacts. | `SuperadminCouponsDateRangeUtils.test.ts, SuperadminCouponsDateRangeUtils.ts, SuperadminCouponsDateUtils.test.ts, SuperadminCouponsDateUtils.ts, SuperadminCouponsFormatCurrency.test.ts` (+1 more) |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/Pagination`
- `@/components/ui/SearchableDropdown`
- `@/hooks/useDateRangeSuffix`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/formatters`
- `@/lib/logger`
- `@/lib/whatsapp_formatter`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Coupons | `/superadmin/coupons` | create coupon; delete coupon; open history; share whats app; submit; toggle restore; toggle status; update coupon | `superadmin_coupons_api/SuperadminCouponsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary coupons view
1. Enter `/superadmin/saas-billing/coupons`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminCouponsMain.tsx`.
2. `useSuperadminCoupons.test.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported server mutation
1. Submit the supported action through `useSuperadminCouponsMutation.ts` (not directly through an API client from JSX).
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

- **Actual feature root:** `superadmin_coupons`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_coupons_hooks/useSuperadminCouponsMutation.ts`, `superadmin_coupons_hooks/useSuperadminCouponsMutations.ts`, `superadmin_coupons_hooks/useSuperadminCouponsCouponRedemptions.ts`, `superadmin_coupons_hooks/useSuperadminCoupons.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_coupons_constants/SuperadminCouponsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_coupons_api/SuperadminCouponsApi.ts`
- **Detected API symbols:** `fetchCoupons` — `superadmin_coupons_api/SuperadminCouponsApi.ts`; `createCoupon` — `superadmin_coupons_api/SuperadminCouponsApi.ts`; `updateCoupon` — `superadmin_coupons_api/SuperadminCouponsApi.ts`; `deleteCoupon` — `superadmin_coupons_api/SuperadminCouponsApi.ts`; `restoreCoupon` — `superadmin_coupons_api/SuperadminCouponsApi.ts`; `updateCouponStatus` — `superadmin_coupons_api/SuperadminCouponsApi.ts`; `fetchRedemptions` — `superadmin_coupons_api/SuperadminCouponsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| No non-framework data-bearing component fields could be derived statically. | — | — | — |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `superadmin_coupons_components/superadmin_coupons_empty_state/SuperadminCouponsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the coupons page. Renders the interactive client component. |
| `superadmin_coupons_components/SuperadminCouponsCouponModal.tsx` | Renders the Create Coupon modal form. Receives form state via props from useCouponsPage. No API calls. |
| `superadmin_coupons_components/SuperadminCouponsCouponEditModal.tsx` | Renders the Edit Coupon modal form. Manages its own local form state via React Hook Form. No API calls — delegates save to onSubmit prop. |
| `superadmin_coupons_components/SuperadminCouponsRedemptionDrawer.tsx` | Renders the coupon redemption history drawer using the feature-owned redemption query. |
| `superadmin_coupons_components/SuperadminCouponsDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `superadmin_coupons_components/SuperadminCouponsMain.tsx` | Root orchestrator for the Coupons page. Composes isolated sub-components and passes state from useSuperadminCoupons. No business logic here. |
| `superadmin_coupons_components/superadmin_coupons_stats_bar/SuperadminCouponsStatsBar.tsx` | Renders the KPI stat cards (Active Coupons, Total Redeemed) for the Coupons page. Purely presentational â€” receives data via props. |
| `superadmin_coupons_components/superadmin_coupons_empty_state/SuperadminCouponsEmptyState.tsx` | Renders the empty state UI for the Coupons table when no coupons exist. Shows icon, message, and CTA to create first coupon. |
| `superadmin_coupons_components/superadmin_coupons_status_badge/SuperadminCouponsStatusBadge.tsx` | Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors. |
| `superadmin_coupons_components/superadmin_coupons_header/SuperadminCouponsHeader.tsx` | Renders the page title, search input, and "Create Coupon" CTA button for the Coupons page. Receives all state via props â€” no API calls. |
| `superadmin_coupons_components/superadmin_coupons_table/SuperadminCouponsTableRow.tsx` | Renders a single row in the Coupons data table. Handles row-level action buttons with stopPropagation. Purely presentational. |
| `superadmin_coupons_components/superadmin_coupons_table/SuperadminCouponsTable.tsx` | Renders the Coupons data table shell (header row + rows). Delegates each row to CouponsTableRow. No API calls. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into coupons.
- **Destructive Actions**: Any deletion or modification of coupons records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for coupons do not expose cross-tenant sensitive data.

- **Module API boundary:** All `coupons` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `coupons` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `coupons` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `coupons` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `coupons` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.
