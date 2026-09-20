# Superadmin Usage Meters â€” Feature Map

## Module Purpose
The usage-meters module is responsible for the Superadmin business workflow managing Usage Meters. It enables superadmins to view, monitor, and control the lifecycle and configurations of Usage Meters across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `usage-meters_api/` | Feature-owned responsibility for usage-meters api. | `SuperadminUsageMetersApi.ts` |
| `usage-meters_components/` | Feature-owned responsibility for usage-meters components. | `SuperadminUsageMetersClient.tsx` |
| `usage-meters_mocks/` | Feature-owned responsibility for usage-meters mocks. | `(directory present; no direct files)` |
| `usage-meters_tests/` | Feature-owned responsibility for usage-meters tests. | `SuperadminUsage-metersBasic.test.tsx` |
| `usage-meters_types/` | Feature-owned responsibility for usage-meters types. | `SuperadminUsageMetersTypes.ts` |
| `usage-meters_utils/` | Feature-owned responsibility for usage-meters utils. | `SuperadminUsageMetersConstants.ts`, `SuperadminUsageMetersUtils.ts`, `useSuperadminUsageMetersPage.ts` |

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
| Superadmin Usage Meters | `/superadmin/usage-meters` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminUsageMetersApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/usage-meters route to load the Usage Meters data context securely via TanStack Query.
2. Interact with the Usage Meters dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Usage Meters status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `usage-meters`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `usage-meters_utils/useSuperadminUsageMetersPage.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'usage-meters', params]`

## API Contract

- **API files:** `usage-meters_api/SuperadminUsageMetersApi.ts`
- **Detected API symbols:** `fetchUsageMeters` — `usage-meters_api/SuperadminUsageMetersApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `usage-meters_components/SuperadminUsageMetersClient.tsx`, `usage-meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** No direct TanStack Query `useMutation` usage detected.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `usage-meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Renders the page component. |
| `usage-meters_components/SuperadminUsageMetersClient.tsx` | Renders the Superadmin feature UI for SuperadminUsageMetersClient. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer. |
| `usage-meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx` | Renders the empty state UI for the Usage Meters table when no data is available. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into usage-meters.
- **Destructive Actions**: Any deletion or modification of usage-meters records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for usage-meters do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

