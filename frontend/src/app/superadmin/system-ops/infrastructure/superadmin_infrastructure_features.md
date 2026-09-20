# Superadmin Infrastructure â€” Feature Map

## Module Purpose
The infrastructure module is responsible for the Superadmin business workflow managing Infrastructure. It enables superadmins to view, monitor, and control the lifecycle and configurations of Infrastructure across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `infrastructure_api/` | Feature-owned responsibility for infrastructure api. | `SuperadminInfrastructureApi.ts`, `SuperadminInfrastructureApiHealthApi.ts` |
| `infrastructure_mocks/` | Feature-owned responsibility for infrastructure mocks. | `(directory present; no direct files)` |
| `infrastructure_tests/` | Feature-owned responsibility for infrastructure tests. | `SuperadminInfrastructureApiHealth.test.ts`, `SuperadminInfrastructureBasic.test.tsx` |
| `infrastructure_types/` | Feature-owned responsibility for infrastructure types. | `SuperadminFlushTenantModalTypes.ts`, `SuperadminInfrastructureMutationTypes.ts`, `SuperadminInfrastructureTypes.ts`, `SuperadminInfrastructureUptimeTypes.ts`, `SuperadminInfrastructureV1Types.ts` |
| `infrastructure_utils/` | Feature-owned responsibility for infrastructure utils. | `SuperadminInfrastructureConstants.ts`, `SuperadminInfrastructureStatusBadgeConfig.ts`, `useSuperadminInfrastructureActions.ts`, `useSuperadminInfrastructureData.ts`, `useSuperadminInfrastructureTenants.ts`, `useSuperadminInfrastructureUptime.ts`, `useSuperadminInfrastructureV1.ts` |

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
| Superadmin Infrastructure | `/superadmin/system-ops/infrastructure` | flush; flush all; flush specific | `SuperadminInfrastructureApiHealthApi.ts`, `SuperadminInfrastructureApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/infrastructure route to load the Infrastructure data context securely via TanStack Query.
2. Interact with the Infrastructure dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Infrastructure status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/infrastructure`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `infrastructure_utils/useSuperadminInfrastructureUptime.ts`, `infrastructure_utils/useSuperadminInfrastructureData.ts`, `infrastructure_utils/useSuperadminInfrastructureTenants.ts`, `infrastructure_utils/useSuperadminInfrastructureV1.ts`, `infrastructure_utils/useSuperadminInfrastructureActions.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'infrastructure', 'uptime-history']`, `['superadmin', 'infrastructure', 'nodes', normalizedParams]`, `['superadmin', 'infrastructure', 'redis']`, `['superadmin', 'infrastructure', 'tenants']`, `['superadmin', 'infrastructure_api_health']`, `['superadmin', 'infrastructure']`

## API Contract

- **API files:** `infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`
- **Detected API symbols:** `fetchInfrastructureNodes` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

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
| `page.tsx` | Pure Server Component for the infrastructure page. Renders the interactive client component. |
| `infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx` | Renders the Superadmin infrastructure V1 Recent incidents view. |
| `infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx` | Renders the Superadmin infrastructure V1 Service endpoint health view. |
| `infrastructure_components/SuperadminFlushTenantModal.tsx` | Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle. |
| `infrastructure_components/SuperadminInfrastructureClient.tsx` | Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query. |
| `infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx` | Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards. |
| `infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx` | Renders the historical uptime chart from Infrastructure API data; no generated business values are created in the component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into infrastructure.
- **Destructive Actions**: Any deletion or modification of infrastructure records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for infrastructure do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

