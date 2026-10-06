# Superadmin Usage Meters â€” Feature Map

## Module Purpose
superadmin_usage_meters_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/usage_meters``. Authenticated Superadmin users can view the module surface; use the documented filters and controls; open supported detail/edit surfaces. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_usage_meters_api/SuperadminUsageMetersApi.ts``.


## Routes

- Primary feature route: `/superadmin/usage-meters`
- Route ownership remains inside `superadmin_usage_meters`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminUsageMetersMain.tsx`, `SuperadminUsageMetersProgressBar.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `fetchUsageMeters`.
- URL paths remain centralized in `superadmin_usage_meters_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_usage_meters_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_usage_meters_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- Lucide React
- MSW
- React
- TanStack Query
- Vitest
- Zod
- next-intl

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchUsageMeters`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_usage_meters`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_usage_meters_features.md, superadmin_usage_meters_forbidden.md, superadmin_usage_meters_theme_contract.md, superadmin_usage_meters_url_config.ts` |
| `superadmin_usage_meters_api/` | Owns module-scoped api artifacts. | `SuperadminUsageMetersApi.ts` |
| `superadmin_usage_meters_components/` | Owns module-scoped components artifacts. | `SuperadminUsageMetersMain.tsx, SuperadminUsageMetersProgressBar.module.css, SuperadminUsageMetersProgressBar.tsx` |
| `superadmin_usage_meters_constants/` | Owns module-scoped constants artifacts. | `SuperadminUsageMetersConstants.test.ts, SuperadminUsageMetersConstants.ts, SuperadminUsageMetersQueryKeys.ts` |
| `superadmin_usage_meters_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminUsageMetersPage.test.tsx, useSuperadminUsageMetersPage.ts` |
| `superadmin_usage_meters_locales/` | Owns module-scoped locales artifacts. | `superadmin_usage_meters_en.json, superadmin_usage_meters_hi.json` |
| `superadmin_usage_meters_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_usage_meters_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminUsageMetersContractSchemas.ts` |
| `superadmin_usage_meters_tests/` | Owns module-scoped tests artifacts. | `SuperadminUsageMetersBasic.test.tsx` |
| `superadmin_usage_meters_types/` | Owns module-scoped types artifacts. | `SuperadminUsageMetersProgressBarTypes.ts, SuperadminUsageMetersTypes.ts` |
| `superadmin_usage_meters_utils/` | Owns module-scoped utils artifacts. | `SuperadminUsageMetersUtils.test.ts, SuperadminUsageMetersUtils.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/SearchableDropdown`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/formatters`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Usage Meters | `/superadmin/usage_meters` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `superadmin_usage_meters_api/SuperadminUsageMetersApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary usage meters view
1. Enter `/superadmin/usage-meters`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminUsageMetersMain.tsx`.
2. `useSuperadminUsageMetersPage.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported module action
1. Invoke the module-owned API action(s) such as `fetchUsageMeters` — `superadmin_usage_meters_api/SuperadminUsageMetersApi.ts` through the owning hook/action boundary.
2. The action validates the backend envelope before presentation code consumes the result and does not bypass the centralized URL configuration or transport layer.
3. Read-only/export/navigation actions remain explicitly separate from server-state mutations so they do not invent cache invalidations that affect no query data.

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

- **Actual feature root:** `superadmin_usage_meters`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_usage_meters_hooks/useSuperadminUsageMetersPage.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_usage_meters_constants/SuperadminUsageMetersQueryKeys.ts`

## API Contract

- **API files:** `superadmin_usage_meters_api/SuperadminUsageMetersApi.ts`
- **Detected API symbols:** `fetchUsageMeters` — `superadmin_usage_meters_api/SuperadminUsageMetersApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| No non-framework data-bearing component fields could be derived statically. | — | — | — |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** No direct TanStack Query `useMutation` usage detected.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `superadmin_usage_meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Renders the page component. |
| `superadmin_usage_meters_components/SuperadminUsageMetersMain.tsx` | Renders the Superadmin feature UI for SuperadminUsageMetersMain. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer. |
| `superadmin_usage_meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx` | Renders the empty state UI for the Usage Meters table when no data is available. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into usage-meters.
- **Destructive Actions**: Any deletion or modification of usage-meters records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for usage-meters do not expose cross-tenant sensitive data.

- **Module API boundary:** All `usage meters` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `usage meters` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `usage meters` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `usage meters` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `usage meters` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.
