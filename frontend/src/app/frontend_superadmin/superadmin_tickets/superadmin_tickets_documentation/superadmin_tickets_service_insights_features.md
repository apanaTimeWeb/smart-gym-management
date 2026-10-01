# Superadmin Tickets Service Insights — Feature Map

## Module Purpose
The tickets_service_insights module is responsible for the Superadmin business workflow managing Tickets_service_insights. It enables superadmins to view, monitor, and control the lifecycle and configurations of Tickets_service_insights across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_tickets_api/` | Feature-owned responsibility for tickets api. | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` |
| `superadmin_tickets_mocks/` | Feature-owned responsibility for tickets mocks. | `(directory present; no direct files)` |
| `superadmin_tickets_store/` | Feature-owned responsibility for tickets store. | `superadmin_tickets_store/useSuperadminTicketsStore.ts` |
| `superadmin_tickets_tests/` | Feature-owned responsibility for tickets tests. | `superadmin_tickets_tests/SuperadminTicketsBasic.test.tsx`, `superadmin_tickets_tests/SuperadminTicketsServiceInsights.test.ts` |
| `superadmin_tickets_types/` | Feature-owned responsibility for tickets types. | `superadmin_tickets_types/SuperadminTicketsHeaderTypes.ts`, `superadmin_tickets_types/SuperadminTicketsReplyFormTypes.ts`, `superadmin_tickets_types/SuperadminTicketsReplyModalTypes.ts`, `superadmin_tickets_types/SuperadminTicketsTableTypes.ts`, `superadmin_tickets_types/SuperadminTicketsTypes.ts`, `superadmin_tickets_types/SuperadminTicketsV1Types.ts` |
| `superadmin_tickets_utils/` | Feature-owned responsibility for tickets utils. | `superadmin_tickets_constants/SuperadminTicketsConstants.ts`, `superadmin_tickets_utils/useSuperadminTicketsTicketMutations.ts`, `superadmin_tickets_utils/useSuperadminTicketsTicketReply.ts`, `superadmin_tickets_utils/useSuperadminTickets.ts`, `superadmin_tickets_utils/useSuperadminTicketsV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui` — role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` — only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Tickets Service Insights | `/superadmin/tickets` | close; close ticket; confirm assign; open assign; submit | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
1. Open the owning `/superadmin/tickets` route and load the service-insights surface through the module-owned TanStack Query path.
2. Review the read-only service-level metrics exposed by `fetchTicketServiceInsights`.
3. Use the parent Tickets module documented reply/assign/close flows from the ticket list/detail surfaces; service-insights itself has no mutation API in the supplied source.
4. Recover from service-insights query failure through the feature retry path.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `tickets`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `superadmin_tickets_store/useSuperadminTicketsStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `superadmin_tickets_utils/useSuperadminTicketsTicketMutations.ts`, `superadmin_tickets_utils/useSuperadminTickets.ts`, `superadmin_tickets_utils/useSuperadminTicketsTicketReply.ts`, `superadmin_tickets_utils/useSuperadminTicketsV1.ts`, `superadmin_tickets_store/useSuperadminTicketsStore.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'tickets']`, `['superadmin', 'tickets', 'detail', ticketId]`, `['superadmin', 'tickets', queryParams]`, `['superadmin', 'tickets', 'detail', variables.ticketId]`, `['superadmin', 'tickets_service_insights']`

## API Contract

- **API files:** `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Detected API symbols:** `fetchTickets` — `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`; `fetchTicketById` — `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`; `updateTicket` — `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`; `closeTicket` — `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`; `assignTicket` — `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`; `replyToTicket` — `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`; `fetchTicketServiceInsights` — `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `superadmin_tickets_components/SuperadminTicketsMain.tsx`, `superadmin_tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `superadmin_tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `superadmin_tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `superadmin_tickets_components/superadmin_tickets_header/SuperadminTicketsHeader.tsx`, `superadmin_tickets_components/superadmin_tickets_reply_modal/SuperadminTicketsReplyModal.tsx`, `superadmin_tickets_components/superadmin_tickets_table/SuperadminTicketsTable.tsx`, `superadmin_tickets_components/superadmin_tickets_empty_state/SuperadminTicketsEmptyState.tsx`
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
- **Empty-state components:** `superadmin_tickets_components/superadmin_tickets_empty_state/SuperadminTicketsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the tickets page. Renders the interactive client component. |
| `superadmin_tickets_components/SuperadminTicketsMain.tsx` | Root view for the Tickets page. Query/mutation orchestration stays in feature hooks; this file composes UI only. |
| `superadmin_tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx` | Renders the Superadmin tickets V1 Support categories view. |
| `superadmin_tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx` | Renders the Superadmin tickets V1 TicketsSupportSummary summary cards. |
| `superadmin_tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx` | Renders the Superadmin tickets V1 Operator workload, Backlog age view. |
| `superadmin_tickets_components/superadmin_tickets_header/SuperadminTicketsHeader.tsx` | Renders the header and filter/search controls for Support Tickets |
| `superadmin_tickets_components/superadmin_tickets_reply_modal/SuperadminTicketsReplyModal.tsx` | Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminTicketsTicketReply. |
| `superadmin_tickets_components/superadmin_tickets_table/SuperadminTicketsTable.tsx` | Renders the data table for Support Tickets |
| `superadmin_tickets_components/superadmin_tickets_empty_state/SuperadminTicketsEmptyState.tsx` | Renders the SuperadminTicketsEmptyState component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into tickets_service_insights.
- **Destructive Actions**: Any deletion or modification of tickets_service_insights records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for tickets_service_insights do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_tickets_api/`
- `superadmin_tickets_components/`
- `superadmin_tickets_constants/`
- `superadmin_tickets_locales/`
- `superadmin_tickets_mocks/`
- `superadmin_tickets_query_keys/`
- `superadmin_tickets_schemas/`
- `superadmin_tickets_store/`
- `superadmin_tickets_tests/`
- `superadmin_tickets_types/`
- `superadmin_tickets_url_config.ts`
- `superadmin_tickets_utils/`

### Current root files
- `error.tsx`
- `loading.tsx`
- `page.tsx`
- `superadmin_tickets_features.md`
- `superadmin_tickets_forbidden.md`
- `superadmin_tickets_repair_map.md`
- `superadmin_tickets_service_insights_features.md`
- `superadmin_tickets_service_insights_forbidden.md`
- `superadmin_tickets_service_insights_repair_map.md`
- `superadmin_tickets_service_insights_theme_contract.md`
- `superadmin_tickets_theme_contract.md`


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification — unavailable in source-only package.



## V4-FIX Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v5-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.
