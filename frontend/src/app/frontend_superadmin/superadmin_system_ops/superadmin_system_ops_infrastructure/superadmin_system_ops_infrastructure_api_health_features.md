# Superadmin Infrastructure Api Health — Feature Map

## Module Purpose
The infrastructure_api_health module is responsible for the Superadmin business workflow managing Infrastructure_api_health. It enables superadmins to view, monitor, and control the lifecycle and configurations of Infrastructure_api_health across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `superadmin_system_ops_infrastructure_api/` | Feature-owned responsibility for infrastructure api. | `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`, `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApiHealthApi.ts` |
| `superadmin_system_ops_infrastructure_mocks/` | Feature-owned responsibility for infrastructure mocks. | `(directory present; no direct files)` |
| `superadmin_system_ops_infrastructure_tests/` | Feature-owned responsibility for infrastructure tests. | `superadmin_system_ops_infrastructure_tests/SuperadminSystemOpsInfrastructureApiHealth.test.ts`, `superadmin_system_ops_infrastructure_tests/SuperadminSystemOpsInfrastructureBasic.test.tsx` |
| `superadmin_system_ops_infrastructure_types/` | Feature-owned responsibility for infrastructure types. | `superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureFlushTenantModalTypes.ts`, `superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureMutationTypes.ts`, `superadmin_system_ops_infrastructure_types/SuperadminLayoutInfrastructureTypes.ts`, `superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureUptimeTypes.ts`, `superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureV1Types.ts` |
| `superadmin_system_ops_infrastructure_utils/` | Feature-owned responsibility for infrastructure utils. | `superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureConstants.ts`, `superadmin_system_ops_infrastructure_utils/SuperadminSystemOpsInfrastructureStatusBadgeConfig.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureActions.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureData.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureTenants.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureUptime.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureV1.ts` |

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
| Superadmin Infrastructure Api Health | `/superadmin/system-ops/infrastructure` | flush; flush all; flush specific | `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApiHealthApi.ts`, `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/infrastructure_api_health route to load the Infrastructure_api_health data context securely via TanStack Query.
2. Interact with the Infrastructure_api_health dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Infrastructure_api_health status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `HOST ROUTE WRAPPER (outside supplied bundle)`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/infrastructure`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureUptime.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureData.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureTenants.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureV1.ts`, `superadmin_system_ops_infrastructure_utils/useSuperadminSystemOpsInfrastructureActions.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'infrastructure', 'uptime-history']`, `['superadmin', 'infrastructure', 'nodes', normalizedParams]`, `['superadmin', 'infrastructure', 'redis']`, `['superadmin', 'infrastructure', 'tenants']`, `['superadmin', 'infrastructure_api_health']`, `['superadmin', 'infrastructure']`

## API Contract

- **API files:** `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`, `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApiHealthApi.ts`
- **Detected API symbols:** `fetchInfrastructureNodes` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`; `fetchRedisTelemetry` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`; `fetchUptimeHistory` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`; `flushGlobalCache` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`; `flushTenantCache` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`; `fetchTenants` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApiHealthApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `HOST ROUTE WRAPPER (outside supplied bundle)`, `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1RecentIncidentsPanel.tsx`, `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1EndpointHealthTable.tsx`, `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureFlushTenantModal.tsx`, `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureMain.tsx`, `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1ServiceHealthSummaryCards.tsx`, `superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_uptime_chart/SuperadminSystemOpsInfrastructureUptimeChart.tsx`
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

- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **`HOST ROUTE WRAPPER (outside supplied bundle)`:** `HOST ROUTE WRAPPER (outside supplied bundle)`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `HOST ROUTE WRAPPER (outside supplied bundle)` | Pure Server Component for the infrastructure page. Renders the interactive client component. |
| `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1RecentIncidentsPanel.tsx` | Renders the Superadmin infrastructure V1 Recent incidents view. |
| `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1EndpointHealthTable.tsx` | Renders the Superadmin infrastructure V1 Service endpoint health view. |
| `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureFlushTenantModal.tsx` | Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle. |
| `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureMain.tsx` | Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query. |
| `superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureV1ServiceHealthSummaryCards.tsx` | Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards. |
| `superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_uptime_chart/SuperadminSystemOpsInfrastructureUptimeChart.tsx` | Renders the historical uptime chart from Infrastructure API data; no generated business values are created in the component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into infrastructure_api_health.
- **Destructive Actions**: Any deletion or modification of infrastructure_api_health records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for infrastructure_api_health do not expose cross-tenant sensitive data.


## Canonical Current Source Structure (v5-fix)

The following filesystem facts are generated from the repaired bundle and override any stale pre-repair path examples in this document. 
Nested System Ops feature folders do not contain Next.js route files in the supplied ZIP; where this document lists a route wrapper, that wrapper is `HOST ROUTE WRAPPER (outside supplied bundle)` and remains `NOT VERIFIED` until the host application is supplied.

### Current child folders
- `superadmin_system_ops_infrastructure_api/`
- `superadmin_system_ops_infrastructure_components/`
- `superadmin_system_ops_infrastructure_constants/`
- `superadmin_system_ops_infrastructure_locales/`
- `superadmin_system_ops_infrastructure_mocks/`
- `superadmin_system_ops_infrastructure_query_keys/`
- `superadmin_system_ops_infrastructure_schemas/`
- `superadmin_system_ops_infrastructure_tests/`
- `superadmin_system_ops_infrastructure_types/`
- `superadmin_system_ops_infrastructure_url_config.ts`
- `superadmin_system_ops_infrastructure_utils/`

### Current root files
- `superadmin_infrastructure_api_health_features.md`
- `superadmin_infrastructure_api_health_forbidden.md`
- `superadmin_infrastructure_api_health_repair_map.md`
- `superadmin_infrastructure_api_health_theme_contract.md`
- `superadmin_infrastructure_features.md`
- `superadmin_infrastructure_forbidden.md`
- `superadmin_infrastructure_repair_map.md`
- `superadmin_infrastructure_theme_contract.md`


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
