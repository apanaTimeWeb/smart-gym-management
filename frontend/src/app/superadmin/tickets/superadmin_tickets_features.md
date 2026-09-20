# Superadmin Tickets â€” Feature Map

## Module Purpose
The tickets module is responsible for the Superadmin business workflow managing Tickets. It enables superadmins to view, monitor, and control the lifecycle and configurations of Tickets across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `tickets_api/` | Feature-owned responsibility for tickets api. | `SuperadminTicketsApi.ts`, `SuperadminTicketsServiceInsightsApi.ts` |
| `tickets_mocks/` | Feature-owned responsibility for tickets mocks. | `(directory present; no direct files)` |
| `tickets_store/` | Feature-owned responsibility for tickets store. | `useSuperadminTicketsStore.ts` |
| `tickets_tests/` | Feature-owned responsibility for tickets tests. | `SuperadminTicketsBasic.test.tsx`, `SuperadminTicketsServiceInsights.test.ts` |
| `tickets_types/` | Feature-owned responsibility for tickets types. | `SuperadminTicketsHeaderTypes.ts`, `SuperadminTicketsReplyFormTypes.ts`, `SuperadminTicketsReplyModalTypes.ts`, `SuperadminTicketsTableTypes.ts`, `SuperadminTicketsTypes.ts`, `SuperadminTicketsV1Types.ts` |
| `tickets_utils/` | Feature-owned responsibility for tickets utils. | `SuperadminTicketsConstants.ts`, `useSuperadminTicketMutations.ts`, `useSuperadminTicketReply.ts`, `useSuperadminTickets.ts`, `useSuperadminTicketsV1.ts` |

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
| Superadmin Tickets | `/superadmin/tickets` | close; close ticket; confirm assign; open assign; submit | `SuperadminTicketsApi.ts`, `SuperadminTicketsServiceInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/tickets route to load the Tickets data context securely via TanStack Query.
2. Interact with the Tickets dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Tickets status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `tickets`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `tickets_store/useSuperadminTicketsStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `tickets_utils/useSuperadminTicketMutations.ts`, `tickets_utils/useSuperadminTickets.ts`, `tickets_utils/useSuperadminTicketReply.ts`, `tickets_utils/useSuperadminTicketsV1.ts`, `tickets_store/useSuperadminTicketsStore.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'tickets']`, `['superadmin', 'tickets', 'detail', ticketId]`, `['superadmin', 'tickets', queryParams]`, `['superadmin', 'tickets', 'detail', variables.ticketId]`, `['superadmin', 'tickets_service_insights']`

## API Contract

- **API files:** `tickets_api/SuperadminTicketsApi.ts`, `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Detected API symbols:** `fetchTickets` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketById` — `tickets_api/SuperadminTicketsApi.ts`; `updateTicket` — `tickets_api/SuperadminTicketsApi.ts`; `closeTicket` — `tickets_api/SuperadminTicketsApi.ts`; `assignTicket` — `tickets_api/SuperadminTicketsApi.ts`; `replyToTicket` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketServiceInsights` — `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `tickets_components/SuperadminTicketsClient.tsx`, `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx`, `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx`, `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx`, `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the tickets page. Renders the interactive client component. |
| `tickets_components/SuperadminTicketsClient.tsx` | Root view for the Tickets page. Query/mutation orchestration stays in feature hooks; this file composes UI only. |
| `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx` | Renders the Superadmin tickets V1 Support categories view. |
| `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx` | Renders the Superadmin tickets V1 TicketsSupportSummary summary cards. |
| `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx` | Renders the Superadmin tickets V1 Operator workload, Backlog age view. |
| `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx` | Renders the header and filter/search controls for Support Tickets |
| `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx` | Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminTicketReply. |
| `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx` | Renders the data table for Support Tickets |
| `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx` | Renders the SuperadminTicketsEmptyState component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into tickets.
- **Destructive Actions**: Any deletion or modification of tickets records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for tickets do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

