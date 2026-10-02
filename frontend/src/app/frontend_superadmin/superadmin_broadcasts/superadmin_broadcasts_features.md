# Superadmin Broadcasts â€” Feature Map

## Module Purpose
superadmin_broadcasts_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/broadcasts``. Authenticated Superadmin users can create broadcast; delete broadcast; select all; send broadcast; submit; toggle gym. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`, `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts``.


## Routes

- Primary feature route: `/superadmin/broadcasts`
- Route ownership remains inside `superadmin_broadcasts`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminBroadcastsBroadcastModal.tsx`, `SuperadminBroadcastsBroadcastQueueModal.tsx`, `SuperadminBroadcastsBroadcastQueueModal.test.tsx`, `SuperadminBroadcastsBroadcastStatusBadge.tsx`, `SuperadminBroadcastsEmptyState.tsx`, `SuperadminBroadcastsHeader.tsx`, `SuperadminBroadcastsMain.tsx`, `SuperadminBroadcastsTable.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `createBroadcast`, `deleteBroadcast`, `fetchBroadcasts`, `fetchRecipientCount`, `fetchTenants`, `updateBroadcast`.
- URL paths remain centralized in `superadmin_broadcasts_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_broadcasts_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_broadcasts_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- @hookform/resolvers
- Lucide React
- MSW
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
- **Create / Trigger:** `createBroadcast`
- **Read:** `fetchBroadcastAudienceInsights`, `fetchBroadcasts`, `fetchRecipientCount`, `fetchTenants`
- **Update / Action:** `deliverBroadcastToRecipient`, `updateBroadcast`
- **Delete:** `deleteBroadcast`

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_broadcasts`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_broadcasts_features.md, superadmin_broadcasts_forbidden.md, superadmin_broadcasts_theme_contract.md, superadmin_broadcasts_url_config.ts` |
| `superadmin_broadcasts_api/` | Owns module-scoped api artifacts. | `SuperadminBroadcastsApi.ts, SuperadminBroadcastsAudienceInsightsApi.ts` |
| `superadmin_broadcasts_components/` | Owns module-scoped components artifacts. | `SuperadminBroadcastsBroadcastModal.tsx, SuperadminBroadcastsBroadcastQueueModal.test.tsx, SuperadminBroadcastsBroadcastQueueModal.tsx, SuperadminBroadcastsMain.tsx` |
| `superadmin_broadcasts_constants/` | Owns module-scoped constants artifacts. | `SuperadminBroadcastsBroadcastConstants.test.ts, SuperadminBroadcastsBroadcastConstants.ts, SuperadminBroadcastsQueryKeys.ts` |
| `superadmin_broadcasts_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_broadcasts_audience_insights_features.md, superadmin_broadcasts_audience_insights_forbidden.md, superadmin_broadcasts_audience_insights_theme_contract.md` |
| `superadmin_broadcasts_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminBroadcastsBroadcastDelivery.test.tsx, useSuperadminBroadcastsBroadcastDelivery.ts, useSuperadminBroadcastsBroadcastModalData.test.tsx, useSuperadminBroadcastsBroadcastModalData.ts, useSuperadminBroadcastsBroadcastQueueState.test.ts` (+11 more) |
| `superadmin_broadcasts_locales/` | Owns module-scoped locales artifacts. | `superadmin_broadcasts_en.json, superadmin_broadcasts_hi.json` |
| `superadmin_broadcasts_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_broadcasts_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminBroadcastsApiSchemas.ts, SuperadminBroadcastsBroadcastDeliveryContractSchemas.ts, SuperadminBroadcastsContractSchemas.ts, SuperadminBroadcastsSchemas.test.ts, SuperadminBroadcastsSchemas.ts` (+1 more) |
| `superadmin_broadcasts_tests/` | Owns module-scoped tests artifacts. | `SuperadminBroadcastsAudienceInsights.test.ts, SuperadminBroadcastsBasic.test.tsx` |
| `superadmin_broadcasts_types/` | Owns module-scoped types artifacts. | `SuperadminBroadcastsBroadcastDeliveryTypes.ts, SuperadminBroadcastsBroadcastModalTypes.ts, SuperadminBroadcastsBroadcastQueueModalTypes.ts, SuperadminBroadcastsBroadcastQueueStateTypes.ts, SuperadminBroadcastsTypes.ts` (+1 more) |
| `superadmin_broadcasts_utils/` | Owns module-scoped utils artifacts. | `SuperadminBroadcastsBroadcastScheduleUtils.test.ts, SuperadminBroadcastsBroadcastScheduleUtils.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/Pagination`
- `@/components/ui/SearchableDropdown`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/formatters`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Broadcasts | `/superadmin/broadcasts` | create broadcast; delete broadcast; select all; send broadcast; submit; toggle gym | `superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`, `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary broadcasts view
1. Enter `/superadmin/broadcasts`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminBroadcastsMain.tsx`.
2. `useSuperadminBroadcastsPage.test.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported server mutation
1. Submit the supported action through `useSuperadminBroadcastsMutations.ts` (not directly through an API client from JSX).
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

- **Actual feature root:** `superadmin_broadcasts`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_broadcasts_hooks/useSuperadminBroadcastsData.ts`, `superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastDelivery.ts`, `superadmin_broadcasts_hooks/useSuperadminBroadcastsV1.ts`, `superadmin_broadcasts_hooks/useSuperadminBroadcastsPage.ts`, `superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastQueueState.ts`, `superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastModalData.ts`, `superadmin_broadcasts_hooks/useSuperadminBroadcastsMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_broadcasts_constants/SuperadminBroadcastsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`, `superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`
- **Detected API symbols:** `fetchBroadcasts` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `createBroadcast` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `deleteBroadcast` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `updateBroadcast` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchTenants` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchRecipientCount` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `deliverBroadcastToRecipient` — `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchBroadcastAudienceInsights` — `superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_broadcasts_components/SuperadminBroadcastsBroadcastModal.tsx` | `id`, `name`, `ownerName` | `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`, `superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_broadcasts_components/SuperadminBroadcastsBroadcastQueueModal.tsx` | `id` | `superadmin_broadcasts_api/SuperadminBroadcastsApi.ts`, `superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `superadmin_broadcasts_components/superadmin_broadcasts_empty_state/SuperadminBroadcastsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the broadcasts page. Renders the interactive client component. |
| `superadmin_broadcasts_components/SuperadminBroadcastsMain.tsx` | Root orchestrator for the Broadcasts page. Composes isolated sub-components and passes state from useSuperadminBroadcastsPage. No business logic here. |
| `superadmin_broadcasts_components/SuperadminBroadcastsV1AudienceBuilderPanel.tsx` | Lets a Superadmin select an audience insight and exposes the selected audience for the downstream broadcast workflow. |
| `superadmin_broadcasts_components/SuperadminBroadcastsBroadcastModal.tsx` | Renders the Create/Edit Broadcast modal form. Receives form state via props and server-state preview data from useSuperadminBroadcastsBroadcastModalData. |
| `superadmin_broadcasts_components/SuperadminBroadcastsV1ChannelResultsAndTemplateSection.tsx` | Renders the Superadmin broadcasts V1 Channel results, Reusable templates view. |
| `superadmin_broadcasts_components/SuperadminBroadcastsBroadcastQueueModal.tsx` | Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence. |
| `superadmin_broadcasts_components/superadmin_broadcasts_empty_state/SuperadminBroadcastsEmptyState.tsx` | Renders the empty state UI for the Broadcasts table when no broadcasts exist. Shows icon, message, and CTA to create first broadcast. |
| `superadmin_broadcasts_components/superadmin_broadcasts_header/SuperadminBroadcastsHeader.tsx` | Renders the page title, search input, and "New Broadcast" CTA for the Broadcasts page. Receives all state via props — no API calls. |
| `superadmin_broadcasts_components/superadmin_broadcasts_table/SuperadminBroadcastsTable.tsx` | Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls. |
| `superadmin_broadcasts_components/superadmin_broadcasts_broadcast_status_badge/SuperadminBroadcastsBroadcastStatusBadge.tsx` | Renders the status badge pill for a single broadcast. Purely presentational — maps BroadcastStatus to design system colors. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into broadcasts.
- **Destructive Actions**: Any deletion or modification of broadcasts records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for broadcasts do not expose cross-tenant sensitive data.

- **Module API boundary:** All `broadcasts` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `broadcasts` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `broadcasts` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `broadcasts` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `broadcasts` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.
