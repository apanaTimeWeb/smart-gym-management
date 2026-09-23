# dashboard Backend Feature Map

## Module Purpose
Owns the Superadmin dashboard read projections and business overview metrics. Dashboard values are sourced from persisted snapshot state, with the V1 business-overview response retaining every frontend KPI, alert, leaderboard, and waterfall field. The feature is read-oriented and does not become a shared analytics service for sibling modules.


## Repair Synchronization
The dashboard API is widget-fragmented to comply with Rule 123. Business overview, KPIs, revenue chart, growth chart, revenue-by-tier, revenue-by-geography, and recent-onboard projections are exposed as separate query capabilities; no single mega-response is used by the frontend repair snapshot.

## Directory Structure
| File | Responsibility |
|---|---|
| `dashboard-business-overview-response.dto.ts` | Validates one request or response contract at the module edge. |
| `dashboard-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `dashboard-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `dashboard-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `dashboard.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dashboard.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `dashboard.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dashboard.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `dashboard.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `dashboard.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `dashboard.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dashboard_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dashboard_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dashboard_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dashboard_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dtos/dashboard-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/dashboard-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/dashboard-update.dto.ts` | Validates one request or response contract at the module edge. |
| `responses/dashboard-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/dashboard-business-overview.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-main.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-metrics.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/dashboard-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/dashboard.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/dashboard.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `dashboard-command.controller.ts` / `create` | POST | `/superadmin/dashboard` | Creates a resource after DTO validation and persists it through the feature repository. | `DashboardCreateDto` | `unknown` |
| `dashboard-command.controller.ts` / `update` | PATCH | `/superadmin/dashboard/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `DashboardUpdateDto` | `unknown` |
| `dashboard-command.controller.ts` / `remove` | DELETE | `/superadmin/dashboard/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `dashboard-query.controller.ts` / `findOne` | GET | `/superadmin/dashboard/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `dashboard-special.controller.ts` / `businessOverview` | GET | `/superadmin/dashboard/business-overview` | Returns the Superadmin data required by the ``/superadmin/dashboard/business-overview`` frontend contract, with filtering or lookup semantics defined by that feature contract. |
| `dashboard-special.controller.ts` / `main` | GET | `/superadmin/dashboard` | Returns the feature-level frontend contract projection owned by this module. | `None` | `Record<string, unknown` |
| `dashboard-special.controller.ts` / `metrics` | GET | `/superadmin/dashboard/metrics` | Returns the feature metrics projection used by the Superadmin dashboard. | `None` | `Record<string, unknown` |

## Approved External Dependencies
- **Business Feature Dependencies**: None by direct business-code import. Runtime event dependencies are documented explicitly below.
- **Infrastructure Dependencies**: Core authentication/authorization, configuration, PostgreSQL/TypeORM repository infrastructure, Redis, response/error infrastructure, observability, and tenant resolution where applicable.
- **Runtime/Event Dependencies**: None unless an event appears in this module's source and dependency document.

## Data and State Architecture
- DB Entities: Every TypeORM entity registered by this module; contract snapshots are stored in explicit PostgreSQL JSONB tables when the frontend contract is snapshot-backed.
- Redis Caching Keys: Only feature-owned operational keys; Idempotency-Key reservations use the core idempotency namespace.
- Event Emitters: Only event names from the centralized registry are permitted.
- Background Jobs: Heavy exports, messaging, backups, migrations, and bulk work are queued where applicable; scheduled work is recorded in the central registry.
- Idempotency Keys: All mutations for which the frontend API exposes `idempotencyKey` are protected by `RequireIdempotencyKey`.

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security
Every Superadmin business endpoint is protected at controller level with `JwtAuthGuard`, `RolesGuard`, and the `SUPERADMIN` role. Resource-specific endpoints must additionally fail closed when the requested resource is missing, soft-deleted, outside the trusted tenant/resource scope, or otherwise unauthorized.

CODEOWNERS path: `src/modules/backend_superadmin/dashboard/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend dashboard/superadmin_dashboard_features.md -->

﻿# Superadmin Dashboard â€” Feature Map

## Module Purpose
The dashboard module is responsible for the Superadmin business workflow managing Dashboard. It enables superadmins to view, monitor, and control the lifecycle and configurations of Dashboard across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `dashboard_api/` | Feature-owned responsibility for dashboard api. | `SuperadminDashboardApi.ts`, `SuperadminDashboardBusinessOverviewApi.ts` |
| `dashboard_mocks/` | Feature-owned responsibility for dashboard mocks. | `(directory present; no direct files)` |
| `dashboard_tests/` | Feature-owned responsibility for dashboard tests. | `SuperadminDashboardBasic.test.tsx`, `SuperadminDashboardBusinessOverview.test.ts` |
| `dashboard_types/` | Feature-owned responsibility for dashboard types. | `SuperadminDashboardTypes.ts`, `SuperadminDashboardV1Types.ts` |
| `dashboard_utils/` | Feature-owned responsibility for dashboard utils. | `SuperadminDashboardConstants.ts`, `useSuperadminDashboardV1.ts` |

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
| Superadmin Dashboard | `/superadmin/dashboard` | custom date change; preset change | `SuperadminDashboardBusinessOverviewApi.ts`, `SuperadminDashboardApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/dashboard route to load the Dashboard data context securely via TanStack Query.
2. Interact with the Dashboard dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Dashboard status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `dashboard`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `dashboard_utils/useSuperadminDashboardV1.ts`, `dashboard_components/SuperadminDashboardDateFilterDropdown/useSuperadminDashboardDateFilter.ts`, `dashboard_components/SuperadminDashboardView/useSuperadminDashboardView.ts`, `dashboard_components/SuperadminDashboardView/useSuperadminDashboardDateRangeSuffix.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'dashboard_business_overview']`, `['superadmin', 'dashboard', timeRange, startDate, endDate]`

## API Contract

- **API files:** `dashboard_api/SuperadminDashboardApi.ts`, `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Detected API symbols:** `fetchDashboard` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardMetrics` — `dashboard_api/SuperadminDashboardApi.ts`; `fetchDashboardBusinessOverview` — `dashboard_api/SuperadminDashboardBusinessOverviewApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx`, `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx`, `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx`, `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx`, `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx`
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
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardView. |
| `dashboard_components/SuperadminDashboardV1IncomeGymsAndAlertsSection.tsx` | Renders the Superadmin dashboard V1 Why monthly income changed, Top & at-risk gyms, Critical platform alerts view. |
| `dashboard_components/SuperadminDashboardV1RetentionSummaryCards.tsx` | Renders the Superadmin dashboard V1 DashboardRetentionSummary summary cards. |
| `dashboard_components/SuperadminDashboardV1BusinessOverviewHeader.tsx` | Renders the Superadmin dashboard V1 DashboardBusinessOverviewHeader. |
| `dashboard_components/SuperadminDashboardDateFilterDropdown/SuperadminDashboardDateFilterDropdown.tsx` | Pure View component for the Dashboard date filter dropdown, consuming its local hook. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardRecentOnboards.tsx` | Renders the recent tenant onboarding records and navigates to the tenant detail page. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardView.tsx` | Pure View component for the Dashboard. Renders KPI cards, charts, and recent onboards by consuming useSuperadminDashboardView. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardCharts.tsx` | Renders the Dashboard revenue, growth, plan, and geography ApexCharts. No data fetching. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardKpiGrid.tsx` | Renders the Dashboard KPI cards. No API calls. |
| `dashboard_components/SuperadminDashboardView/SuperadminDashboardHeader.tsx` | Renders the Dashboard header with the local date filter. No API calls. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into dashboard.
- **Destructive Actions**: Any deletion or modification of dashboard records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for dashboard do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [x] Rule 7: TypeORM is the only approved ORM in this backend.
- [x] Rule 19: This feature document contains concrete endpoints, state, flows, permissions, edge cases, and contract evidence.
- [x] Rule 28: Successful responses are wrapped by the global response interceptor.
- [x] Rule 29: Delete paths use soft-delete semantics.
- [x] Rule 31: Frontend-exposed critical mutations use `RequireIdempotencyKey`.
- [x] Rule 48: Query and command controllers are physically separated where CRUD endpoints exist.
- [x] Rule 62: Service/repository return types are explicit.
- [x] Rule 76/79: Responsibility/Flow headers exist on authored source files.
- [x] Rule 82A: V1 response classes preserve the complete frontend contract.
- [x] Rule 83: RBAC is enforced at the controller boundary.
- [x] Rule 89: ORM access stays behind repositories.
- [x] Rule 92: Dynamic filtering/sorting uses server-defined allowlists.
- [x] Rule 101: Tests must assert observable behavior; placeholder tests are not accepted.

