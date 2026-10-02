# Superadmin Settings â€” Feature Map

## Module Purpose
superadmin_settings_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/settings``. Authenticated Superadmin users can save. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_settings_api/SuperadminSettingsApi.ts`, `superadmin_settings_api/SuperadminSettingsGovernanceApi.ts``.


## Routes

- Primary feature route: `/superadmin/settings`
- Route ownership remains inside `superadmin_settings`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminSettingsMain.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `fetchSettings`, `updateSetting`.
- URL paths remain centralized in `superadmin_settings_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_settings_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_settings_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- Lucide React
- MSW
- React
- TanStack Query
- Vitest
- Zod
- http-status-codes
- next-intl
- sonner

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchSettings`, `fetchSettingsGovernance`
- **Update / Action:** `updateSetting`
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_settings`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_settings_features.md, superadmin_settings_forbidden.md, superadmin_settings_theme_contract.md, superadmin_settings_url_config.ts` |
| `superadmin_settings_api/` | Owns module-scoped api artifacts. | `SuperadminSettingsApi.ts, SuperadminSettingsGovernanceApi.ts` |
| `superadmin_settings_components/` | Owns module-scoped components artifacts. | `SuperadminSettingsMain.tsx` |
| `superadmin_settings_constants/` | Owns module-scoped constants artifacts. | `SuperadminSettingsQueryKeys.ts` |
| `superadmin_settings_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_settings_governance_features.md, superadmin_settings_governance_forbidden.md, superadmin_settings_governance_theme_contract.md` |
| `superadmin_settings_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminSettingsMain.test.ts, useSuperadminSettingsMain.ts, useSuperadminSettingsPage.test.tsx, useSuperadminSettingsPage.ts, useSuperadminSettingsUpdateMutation.test.ts` (+3 more) |
| `superadmin_settings_locales/` | Owns module-scoped locales artifacts. | `superadmin_settings_en.json, superadmin_settings_hi.json` |
| `superadmin_settings_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_settings_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminSettingsContractSchemas.ts, SuperadminSettingsSchemas.test.ts, SuperadminSettingsSchemas.ts, SuperadminSettingsV1ContractSchemas.ts` |
| `superadmin_settings_tests/` | Owns module-scoped tests artifacts. | `SuperadminSettingsBasic.test.tsx, SuperadminSettingsGovernance.test.ts` |
| `superadmin_settings_types/` | Owns module-scoped types artifacts. | `SuperadminSettingsTypes.ts, SuperadminSettingsV1Types.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/components/ui/SearchableDropdown`
- `@/lib/api`
- `@/lib/logger`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Settings | `/superadmin/settings` | save | `superadmin_settings_api/SuperadminSettingsApi.ts`, `superadmin_settings_api/SuperadminSettingsGovernanceApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary settings view
1. Enter `/superadmin/settings`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminSettingsMain.tsx`.
2. `useSuperadminSettingsPage.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported server mutation
1. Submit the supported action through `useSuperadminSettingsUpdateMutation.test.ts` (not directly through an API client from JSX).
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

- **Actual feature root:** `superadmin_settings`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_settings_hooks/useSuperadminSettingsPage.ts`, `superadmin_settings_hooks/useSuperadminSettingsV1.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `superadmin_settings_constants/SuperadminSettingsQueryKeys.ts`

## API Contract

- **API files:** `superadmin_settings_api/SuperadminSettingsGovernanceApi.ts`, `superadmin_settings_api/SuperadminSettingsApi.ts`
- **Detected API symbols:** `fetchSettingsGovernance` — `superadmin_settings_api/SuperadminSettingsGovernanceApi.ts`; `fetchSettings` — `superadmin_settings_api/SuperadminSettingsApi.ts`; `updateSetting` — `superadmin_settings_api/SuperadminSettingsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_settings_components/SuperadminSettingsMain.tsx` | `id`, `value`, `key`, `description`, `dataType` | `superadmin_settings_api/SuperadminSettingsApi.ts`, `superadmin_settings_api/SuperadminSettingsGovernanceApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
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
| `page.tsx` | Pure Server Component for the settings page. Renders the interactive client component. |
| `superadmin_settings_components/SuperadminSettingsV1DataControlsPanel.tsx` | Renders the Superadmin settings V1 Data controls view. |
| `superadmin_settings_components/SuperadminSettingsMain.tsx` | Renders platform settings. The view owns only local draft input state; server state and mutations stay in the feature hook. |
| `superadmin_settings_components/SuperadminSettingsV1SecurityControlsPanel.tsx` | Renders the Superadmin settings V1 Security controls view. |
| `superadmin_settings_components/SuperadminSettingsV1BillingControlsPanel.tsx` | Renders the Superadmin settings V1 Billing controls view. |
| `superadmin_settings_components/SuperadminSettingsV1CommunicationDefaultsPanel.tsx` | Renders the Superadmin settings V1 Communication defaults view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into settings.
- **Destructive Actions**: Any deletion or modification of settings records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for settings do not expose cross-tenant sensitive data.

- **Module API boundary:** All `settings` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `settings` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `settings` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `settings` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `settings` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.
