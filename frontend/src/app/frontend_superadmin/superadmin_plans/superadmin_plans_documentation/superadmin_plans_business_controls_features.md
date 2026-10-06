# Superadmin Plans Business Controls â€” Feature Map

## Module Purpose
superadmin_plans_business_controls_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/plans``. Authenticated Superadmin users can close; submit. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts`, `superadmin_plans_api/SuperadminPlansApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchPlansBusinessControls`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_plans`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_plans_features.md, superadmin_plans_forbidden.md, superadmin_plans_theme_contract.md, superadmin_plans_url_config.ts` |
| `superadmin_plans_api/` | Owns module-scoped api artifacts. | `SuperadminPlansApi.ts, SuperadminPlansBusinessControlsApi.ts` |
| `superadmin_plans_components/` | Owns module-scoped components artifacts. | `SuperadminPlansList.tsx, SuperadminPlansMain.tsx, SuperadminPlansPlanCreateModal.tsx, SuperadminPlansPlanEditModal.tsx` |
| `superadmin_plans_constants/` | Owns module-scoped constants artifacts. | `SuperadminPlansQueryKeys.ts` |
| `superadmin_plans_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_plans_business_controls_features.md, superadmin_plans_business_controls_forbidden.md, superadmin_plans_business_controls_theme_contract.md` |
| `superadmin_plans_locales/` | Owns module-scoped locales artifacts. | `superadmin_plans_en.json, superadmin_plans_hi.json` |
| `superadmin_plans_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_plans_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminPlansApiSchemas.ts, SuperadminPlansContractSchemas.ts, SuperadminPlansSchema.ts, SuperadminPlansSchemas.test.ts, SuperadminPlansSchemas.ts` (+1 more) |
| `superadmin_plans_store/` | Owns module-scoped store artifacts. | `useSuperadminPlansStore.test.ts, useSuperadminPlansStore.ts` |
| `superadmin_plans_tests/` | Owns module-scoped tests artifacts. | `SuperadminPlansBasic.test.tsx, SuperadminPlansBusinessControls.test.ts` |
| `superadmin_plans_types/` | Owns module-scoped types artifacts. | `SuperadminPlansFormTypes.ts, SuperadminPlansListMutationTypes.ts, SuperadminPlansStoreTypes.ts, SuperadminPlansTypes.ts, SuperadminPlansUiTypes.ts` (+1 more) |
| `superadmin_plans_utils/` | Owns module-scoped utils artifacts. | `SuperadminPlansFormatCurrency.test.ts, SuperadminPlansFormatCurrency.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/frontend_superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Plans Business Controls | `/superadmin/plans` | close; submit | `superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts`, `superadmin_plans_api/SuperadminPlansApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/plans_business_controls route to load the Plans_business_controls data context securely via TanStack Query.
2. Interact with the Plans_business_controls dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Plans_business_controls status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_plans`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `superadmin_plans_store/useSuperadminPlansStore.ts`
- **Context files:** None detected.
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `superadmin_plans_constants/SuperadminPlansQueryKeys.ts`

## API Contract

- **API files:** `superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts`, `superadmin_plans_api/SuperadminPlansApi.ts`
- **Detected API symbols:** `fetchPlansBusinessControls` — `superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts`; `fetchPlans` — `superadmin_plans_api/SuperadminPlansApi.ts`; `fetchPlanById` — `superadmin_plans_api/SuperadminPlansApi.ts`; `createPlan` — `superadmin_plans_api/SuperadminPlansApi.ts`; `updatePlan` — `superadmin_plans_api/SuperadminPlansApi.ts`; `deletePlan` — `superadmin_plans_api/SuperadminPlansApi.ts`; `archivePlan` — `superadmin_plans_api/SuperadminPlansApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_plans_components/SuperadminPlansList.tsx` | `id`, `isArchived`, `activeTenants`, `name`, `priceMonthly`, `currency`, `maxMembers`, `maxStaff` | `superadmin_plans_api/SuperadminPlansApi.ts`, `superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts` | Module-owned fixture/handler |
| `superadmin_plans_components/SuperadminPlansPlanCreateModal.tsx` | `features` | `superadmin_plans_api/SuperadminPlansApi.ts`, `superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts` | Module-owned fixture/handler |
| `superadmin_plans_components/SuperadminPlansPlanEditModal.tsx` | `features` | `superadmin_plans_api/SuperadminPlansApi.ts`, `superadmin_plans_api/SuperadminPlansBusinessControlsApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the plans page. Renders the interactive client component. |
| `superadmin_plans_components/SuperadminPlansList.tsx` | Renders the grid of subscription plan cards using TanStack Query. |
| `superadmin_plans_components/SuperadminPlansPlanCreateModal.tsx` | Renders the modal form for creating a new subscription plan. Reads/writes via useSuperadminPlansStore. |
| `superadmin_plans_components/SuperadminPlansMain.tsx` | SuperadminPlansMain.tsx is the root client entry for the Plans page. Initialises the Zustand store on mount. |
| `superadmin_plans_components/SuperadminPlansPlanEditModal.tsx` | Renders the modal form for editing an existing subscription plan. Reads/writes via useSuperadminPlansStore. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into superadmin_plans_business_controls.
- **Destructive Actions**: Any deletion or modification of superadmin_plans_business_controls records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for superadmin_plans_business_controls do not expose cross-tenant sensitive data.

- **Module API boundary:** All `plans` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `plans` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `plans` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `plans` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `plans` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.
