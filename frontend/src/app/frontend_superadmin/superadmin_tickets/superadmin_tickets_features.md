# superadmin_tickets — Feature Map

## Module Purpose
The Tickets module gives Superadmins a support-operations workspace for tenant-facing tickets. Users can search and filter tickets, page through the result set, inspect ticket details, reply to a ticket, close a ticket, and assign an owner when the supplied contract permits it. Service/summary views are read-only reporting companions to the operational ticket table. The module uses feature-local stores for UI state while server ticket state remains in TanStack Query.


## Routes

- Primary feature route: `/superadmin/tickets`
- Route ownership remains inside `superadmin_tickets`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminTicketsEmptyState.tsx`, `SuperadminTicketsHeader.tsx`, `SuperadminTicketsMain.tsx`, `SuperadminTicketsReplyModal.tsx`, `SuperadminTicketsReplyModal.test.tsx`, `SuperadminTicketsTable.tsx`, `SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `SuperadminTicketsV1SupportCategoriesPanel.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `assignTicket`, `closeTicket`, `fetchTicketById`, `fetchTickets`, `updateTicket`.
- URL paths remain centralized in `superadmin_tickets_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_tickets_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_tickets_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest
- Next.js App Router route/page boundary as supplied.
- React + TypeScript.
- TanStack Query for server state and module query-key registries.
- Zod at form/API boundaries where the module contract defines schemas.
- next-intl with active `en` and `hi` module-local catalogs.
- React Hook Form for form workflows present in this module.
- MSW fixtures/handlers for frontend contract testing.
- Approved application infrastructure imported from `frontend_superadmin/superadmin_layout` and dumb UI primitives only.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchTicketById`, `fetchTicketServiceInsights`, `fetchTickets`
- **Update / Action:** `assignTicket`, `closeTicket`, `replyToTicket`, `updateTicket`
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_tickets`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_tickets_features.md, superadmin_tickets_forbidden.md, superadmin_tickets_theme_contract.md, superadmin_tickets_url_config.ts` |
| `superadmin_tickets_api/` | Owns module-scoped api artifacts. | `SuperadminTicketsApiCrudApi.ts, SuperadminTicketsServiceInsightsApi.ts` |
| `superadmin_tickets_components/` | Owns module-scoped components artifacts. | `SuperadminTicketsMain.tsx, SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx, SuperadminTicketsV1SupportCategoriesPanel.tsx, SuperadminTicketsV1SupportSummaryCards.tsx` |
| `superadmin_tickets_constants/` | Owns module-scoped constants artifacts. | `SuperadminTicketsConstants.test.ts, SuperadminTicketsConstants.ts, SuperadminTicketsQueryKeys.ts` |
| `superadmin_tickets_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_tickets_repair_map.md, superadmin_tickets_service_insights_features.md, superadmin_tickets_service_insights_forbidden.md, superadmin_tickets_service_insights_repair_map.md, superadmin_tickets_service_insights_theme_contract.md` |
| `superadmin_tickets_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminTickets.test.tsx, useSuperadminTickets.ts, useSuperadminTicketsMainViewModel.test.ts, useSuperadminTicketsMainViewModel.ts, useSuperadminTicketsPageActions.test.tsx` (+7 more) |
| `superadmin_tickets_locales/` | Owns module-scoped locales artifacts. | `superadmin_tickets_en.json, superadmin_tickets_hi.json` |
| `superadmin_tickets_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_tickets_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminTicketsApiSchema.ts, SuperadminTicketsTypesSchemas.ts, SuperadminTicketsV1ResponseSchema.ts, SuperadminTicketsV1Schema.ts` |
| `superadmin_tickets_store/` | Owns module-scoped store artifacts. | `useSuperadminTicketsStore.test.ts, useSuperadminTicketsStore.ts` |
| `superadmin_tickets_tests/` | Owns module-scoped tests artifacts. | `SuperadminTicketsBasic.test.tsx, SuperadminTicketsServiceInsights.test.ts` |
| `superadmin_tickets_types/` | Owns module-scoped types artifacts. | `SuperadminTicketsHeaderTypes.ts, SuperadminTicketsReplyFormTypes.ts, SuperadminTicketsReplyModalTypes.ts, SuperadminTicketsStoreTypes.ts, SuperadminTicketsTableTypes.ts` (+2 more) |
| `superadmin_tickets_utils/` | Owns module-scoped utils artifacts. | `SuperadminTicketsFormatters.test.ts, SuperadminTicketsFormatters.ts, SuperadminTicketsSlaUtils.test.ts, SuperadminTicketsSlaUtils.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/ApexBarChart`
- `@/components/ui/MetricCard`
- `@/components/ui/Pagination`
- `@/components/ui/Panel`
- `@/hooks/useDebouncedValue`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_types/SuperadminLayoutInfrastructureTypes`

## Feature Inventory
| Feature | Route Ownership | What the User Can Do | Main API/Query Surface | Status |
|---|---|---|---|---|
| Root page | `frontend_superadmin/superadmin_tickets` | Loads the module entrypoint and its feature-owned state | Module API facade | Implemented in supplied source |

## User Flows & Interactions
### Flow 1
Open Tickets → load/filter/search the ticket list → page through server data → inspect or act on one ticket.
### Flow 2
Reply → open the reply modal → validate reply text → guard unsaved changes → send with idempotency/toast deduplication → reset on authoritative success.
### Flow 3
Assign/Close → select a ticket → confirm the operational action where required → mutate → reconcile list/detail state and keep failures retryable.

## Data & State Architecture
- Server data is owned by TanStack Query query/mutation hooks; presentation components do not call transport functions directly.
- Query keys are defined in the module query-key registry and preserve resource/filter identity.
- UI-only state remains in the module store or local component state when no server contract is involved.
- Forms use React Hook Form + Zod when a form contract is present.
- Cache reconciliation is performed through the feature mutation/query layer; presentation code does not maintain duplicate server-state copies.

## Data and State Architecture

- **Server state:** TanStack Query for API-backed async data where present.
- **Zustand stores:** `superadmin_tickets_store/useSuperadminTicketsStore.ts`
- **Context files:** None detected.
- **URL state:** No `useUrlState` usage detected; no module-owned list/filter URL state was evidenced.
- **Query-key registries:** `superadmin_tickets_constants/SuperadminTicketsQueryKeys.ts`
- **MSW handlers:** `superadmin_tickets_mocks/superadmin_tickets_mocks_handlers/SuperadminTicketsMockHandlers.ts`, `superadmin_tickets_mocks/superadmin_tickets_mocks_handlers/SuperadminTicketsV1MockHandlers.ts`
- **MSW fixtures:** `superadmin_tickets_mocks/superadmin_tickets_mocks_fixtures/SuperadminTicketsMockData.ts`, `superadmin_tickets_mocks/superadmin_tickets_mocks_fixtures/SuperadminTicketsV1MockFixtures.ts`

## API Contract
The module uses centralized URL-config files and the approved role API transport. API response payloads passed to application code are supplied with `dataSchema` contracts where the source defines a response schema. The audit must not infer backend behavior beyond these frontend contracts.

### API Functions Present in Supplied Source
- `fetchTicketServiceInsights`
- `replyToTicket`
- `ticketsApi`

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_tickets_components/SuperadminTicketsMain.tsx` | `isPending`, `isError`, `t`, `search`, `setSearch`, `showFilter`, `setShowFilter`, `statusFilter` | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx` | `agents`, `aging` | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx` | `categories` | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx` | `summary` | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` | Module-owned fixture/handler |
| `superadmin_tickets_components/superadmin_tickets_table/SuperadminTicketsTable.tsx` | `slaDeadline`, `id`, `tenantId`, `tenantName`, `subject`, `priority`, `status`, `lastUpdated` | `superadmin_tickets_api/SuperadminTicketsApiCrudApi.ts`, `superadmin_tickets_api/SuperadminTicketsServiceInsightsApi.ts` | Module-owned fixture/handler |

## Permissions / Security
- This module is part of the Superadmin role container.
- Destructive/security-sensitive actions use the approved confirmation and idempotency patterns where supplied.
- API secrets/passwords are not exposed through generic error rendering.
- No frontend permission check is treated as a replacement for backend authorization.

## Loading / Empty / Error / Recovery
- Every async surface must expose pending/loading, empty/no-data, error, and retry states where the API/query can enter those states.
- Recoverable mutations preserve form/draft state until the authoritative success path clears it.
- Error messages shown to users are translated and safe; detailed exceptions remain in approved logging/error boundaries only.

## Edge Cases and AI Warnings
- Do not move feature business behavior into global UI primitives.
- Do not add sibling-module business imports.
- Do not bypass the module-owned API client or query-key registry.
- Do not introduce new hardcoded route/API URLs in JSX or hooks.
- Do not fabricate missing backend fields; classify missing contract information as `BLOCKED BY SUPPLIED SCOPE`.

- **Module API boundary:** All `tickets` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `tickets` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `tickets` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `tickets` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `tickets` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Component Responsibility Map
- Main/page composition components: render the page and assemble child views.
- Feature hooks/view-models: perform query/mutation orchestration and derived-state calculations.
- API files: define transport calls and response schemas.
- Types/schemas/constants: define contracts, validation, and static configuration only.
- Mocks/tests: encode the same frontend contract and recoverable interaction flows.

## Rule Compliance Checklist
- [x] Feature-prefixed folder hierarchy retained.
- [x] Query-key registry present.
- [x] URL configuration present.
- [x] API response schemas supplied at transport boundary where contracts exist.
- [x] No relative imports in production feature code.
- [x] No raw runtime exception text rendered to end users.
- [x] All intrinsic interactive controls carry `data-testid`, explicit button type, visible focus, and minimum touch sizing in AST audit.
- [x] Custom hook JSDoc coverage completed.
- [x] Active `en` and `hi` locales are module-local.
- [x] MSW handlers/fixtures remain module-owned.
- [ ] Host-wide CI/build/ESLint/Prettier/CODEOWNERS enforcement: `BLOCKED BY SUPPLIED SCOPE` because repository host configuration is not present in the supplied ZIP.
- [ ] Global token definition/Tailwind mapping verification: `BLOCKED BY SUPPLIED SCOPE` because the global theme/CSS host files are not present in the supplied ZIP.

## V13 Audit Freshness Addendum

- Current repair baseline: `frontend-superadmin-v13-fix`.
- Architecture repair update: custom hooks are owned by module-prefixed `_hooks/` folders; feature roots remain quarantined to framework route files, the module URL config, and the three primary module documentation files.
- Dependency repair update: business query keys are module-prefixed; pure API/type/constant re-export facades were removed where applicable; direct absolute imports now target concrete module-owned files.
- AI introspection update: React components carry responsibility comments, custom hooks/stores carry data-flow/JSDoc context, and native interactive controls have stable `data-testid` hooks for behavioral verification.
- Testing update: formatter/utility and fixture tests were strengthened where prior tests only asserted file/source shape. Automated execution remains dependent on the host project's missing package/build/test configuration.
- Scope note: browser/build/CI verification is `BLOCKED BY SUPPLIED SCOPE` because the supplied archive does not contain the host package manifest and tool configuration.

## V13 Repair Freshness

Current repair baseline: `frontend-superadmin-v13-fix`. This feature was re-audited in the v5 repair cycle for module isolation, semantic design-token usage, AI-introspection identifiers, loading/error/not-found coverage, test ownership, and functional-flow evidence. The role-level isolated Playwright journey for this route lives under `playwright_E2E/` at the corresponding `frontend_superadmin_e2e/` path.
