# Superadmin Broadcasts Audience Insights â€” Feature Map

## Module Purpose
The broadcasts_audience_insights module is responsible for the Superadmin business workflow managing Broadcasts_audience_insights. It enables superadmins to view, monitor, and control the lifecycle and configurations of Broadcasts_audience_insights across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `broadcasts_api/` | Feature-owned responsibility for broadcasts api. | `SuperadminBroadcastsApi.ts`, `SuperadminBroadcastsAudienceInsightsApi.ts` |
| `broadcasts_mocks/` | Feature-owned responsibility for broadcasts mocks. | `(directory present; no direct files)` |
| `broadcasts_tests/` | Feature-owned responsibility for broadcasts tests. | `SuperadminBroadcastsAudienceInsights.test.ts`, `SuperadminBroadcastsBasic.test.tsx` |
| `broadcasts_types/` | Feature-owned responsibility for broadcasts types. | `SuperadminBroadcastDeliveryTypes.ts`, `SuperadminBroadcastModalTypes.ts`, `SuperadminBroadcastQueueModalTypes.ts`, `SuperadminBroadcastsTypes.ts`, `SuperadminBroadcastsV1Types.ts` |
| `broadcasts_utils/` | Feature-owned responsibility for broadcasts utils. | `SuperadminBroadcastConstants.ts`, `SuperadminBroadcastQueueStateTypes.ts`, `SuperadminBroadcastScheduleUtils.ts`, `SuperadminBroadcastsSchemas.ts`, `useSuperadminBroadcastDelivery.ts`, `useSuperadminBroadcastModalData.ts`, `useSuperadminBroadcastQueueState.ts`, `useSuperadminBroadcastsData.ts`, `useSuperadminBroadcastsMutations.ts`, `useSuperadminBroadcastsPage.test.ts`, `useSuperadminBroadcastsPage.ts`, `useSuperadminBroadcastsV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Broadcasts Audience Insights | `/superadmin/broadcasts` | create broadcast; delete broadcast; select all; send broadcast; submit; toggle gym | `SuperadminBroadcastsAudienceInsightsApi.ts`, `SuperadminBroadcastsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/broadcasts_audience_insights route to load the Broadcasts_audience_insights data context securely via TanStack Query.
2. Interact with the Broadcasts_audience_insights dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Broadcasts_audience_insights status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `broadcasts`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `broadcasts_utils/useSuperadminBroadcastsData.ts`, `broadcasts_utils/useSuperadminBroadcastDelivery.ts`, `broadcasts_utils/useSuperadminBroadcastsV1.ts`, `broadcasts_utils/useSuperadminBroadcastsPage.ts`, `broadcasts_utils/useSuperadminBroadcastQueueState.ts`, `broadcasts_utils/useSuperadminBroadcastModalData.ts`, `broadcasts_utils/useSuperadminBroadcastsMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'broadcasts', 'tenants']`, `['superadmin', 'broadcasts']`, `['superadmin', 'broadcasts', 'detail', variables.broadcastId]`, `['superadmin', 'broadcasts_audience_insights']`, `['superadmin', 'broadcasts', 'modal-tenants']`, `['superadmin', 'broadcasts', 'modal-recipient-count']`

## API Contract

- **API files:** `broadcasts_api/SuperadminBroadcastsApi.ts`, `broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`
- **Detected API symbols:** `fetchBroadcasts` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `createBroadcast` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `deleteBroadcast` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `updateBroadcast` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchTenants` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchRecipientCount` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `deliverBroadcastToRecipient` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchBroadcastAudienceInsights` — `broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `broadcasts_components/SuperadminBroadcastsClient.tsx`, `broadcasts_components/SuperadminBroadcastsV1AudienceBuilderPanel.tsx`, `broadcasts_components/SuperadminBroadcastModal.tsx`, `broadcasts_components/SuperadminBroadcastsV1ChannelResultsAndTemplateSection.tsx`, `broadcasts_components/SuperadminBroadcastQueueModal.tsx`, `broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx`, `broadcasts_components/SuperadminBroadcastsHeader/SuperadminBroadcastsHeader.tsx`, `broadcasts_components/SuperadminBroadcastsTable/SuperadminBroadcastsTable.tsx`, `broadcasts_components/SuperadminBroadcastStatusBadge/SuperadminBroadcastStatusBadge.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the broadcasts page. Renders the interactive client component. |
| `broadcasts_components/SuperadminBroadcastsClient.tsx` | Root orchestrator for the Broadcasts page. Composes isolated sub-components and passes state from useSuperadminBroadcastsPage. No business logic here. |
| `broadcasts_components/SuperadminBroadcastsV1AudienceBuilderPanel.tsx` | Lets a Superadmin select an audience insight and exposes the selected audience for the downstream broadcast workflow. |
| `broadcasts_components/SuperadminBroadcastModal.tsx` | Renders the Create/Edit Broadcast modal form. Receives form state via props and server-state preview data from useSuperadminBroadcastModalData. |
| `broadcasts_components/SuperadminBroadcastsV1ChannelResultsAndTemplateSection.tsx` | Renders the Superadmin broadcasts V1 Channel results, Reusable templates view. |
| `broadcasts_components/SuperadminBroadcastQueueModal.tsx` | Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence. |
| `broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx` | Renders the empty state UI for the Broadcasts table when no broadcasts exist. Shows icon, message, and CTA to create first broadcast. |
| `broadcasts_components/SuperadminBroadcastsHeader/SuperadminBroadcastsHeader.tsx` | Renders the page title, search input, and "New Broadcast" CTA for the Broadcasts page. Receives all state via props — no API calls. |
| `broadcasts_components/SuperadminBroadcastsTable/SuperadminBroadcastsTable.tsx` | Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls. |
| `broadcasts_components/SuperadminBroadcastStatusBadge/SuperadminBroadcastStatusBadge.tsx` | Renders the status badge pill for a single broadcast. Purely presentational — maps BroadcastStatus to design system colors. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into broadcasts_audience_insights.
- **Destructive Actions**: Any deletion or modification of broadcasts_audience_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for broadcasts_audience_insights do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

