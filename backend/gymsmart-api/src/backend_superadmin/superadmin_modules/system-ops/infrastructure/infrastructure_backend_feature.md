# infrastructure Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/system-ops/infrastructure feature. It exposes 13 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-system-ops-infrastructure-cache-command.controller.ts::flushGlobal` | POST | `/superadmin/system-ops/infrastructure/redis/flush-global` | This endpoint invokes `flushGlobal` on `superadmin-system-ops-infrastructure-cache-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<unknown` |
| `superadmin-system-ops-infrastructure-cache-command.controller.ts::flushTenant` | POST | `/superadmin/system-ops/infrastructure/redis/flush-tenant` | This endpoint invokes `flushTenant` on `superadmin-system-ops-infrastructure-cache-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::create` | POST | `/superadmin/system-ops/infrastructure` | This endpoint invokes `create` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::update` | PATCH | `/superadmin/system-ops/infrastructure/:id` | This endpoint invokes `update` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/infrastructure/:id` | This endpoint invokes `remove` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/infrastructure/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-infrastructure-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-query.controller.ts::findAll` | GET | `/superadmin/system-ops/infrastructure` | This endpoint invokes `findAll` on `superadmin-system-ops-infrastructure-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-query.controller.ts::findOne` | GET | `/superadmin/system-ops/infrastructure/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-infrastructure-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::redis` | GET | `/superadmin/system-ops/infrastructure/redis` | This endpoint invokes `redis` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::uptime` | GET | `/superadmin/system-ops/infrastructure/uptime` | This endpoint invokes `uptime` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::uptime` | GET | `/superadmin/system-ops/infrastructure/uptime-history` | This endpoint invokes `uptime` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::apiHealth` | GET | `/superadmin/system-ops/infrastructure/api-health` | This endpoint invokes `apiHealth` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts::apiHealth` | GET | `/api/superadmin/system-ops/infrastructure/api-health` | This endpoint invokes `apiHealth` on `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: system-ops
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_observability, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-system-ops-infrastructure-contract-snapshot.entity → `superadmin_infrastructure_contract_snapshots`, superadmin-system-ops-infrastructure.entity → `superadmin_infrastructure_nodes`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/system-ops/infrastructure`, `/superadmin/system-ops/infrastructure/:id`, `/superadmin/system-ops/infrastructure/:id/status`, `/superadmin/system-ops/infrastructure/redis/flush-global`, `/superadmin/system-ops/infrastructure/redis/flush-tenant`

## Business Flow / Key Sequences
Controller -> DTO validation -> use-case service -> named repository method -> PostgreSQL -> mapper/contract response. Heavy work is asynchronous where required.

## File Responsibility Map
Every source file is feature-scoped and has one reason to change. Controllers do not contain business rules; repositories do not call sibling repositories.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/system-ops/infrastructure/redis/flush-global` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure/redis/flush-tenant` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/infrastructure` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/infrastructure/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/redis` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/uptime` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/uptime-history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/infrastructure/api-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/system-ops/infrastructure/api-health` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never directly import sibling system-ops business logic — Rule 0C/49.
- Never hard-delete operational data — Rule 29.
- Required concurrent mutations must use locking/idempotency — Rules 31 and 41.
- Heavy operations must have job lifecycle/DLQ protection — Rules 23/61.

## Frozen API Contract

<!-- Exact source: frontend system-ops/infrastructure/superadmin_infrastructure_features.md -->

﻿# Superadmin Infrastructure â€” Feature Map

## Module Purpose
The infrastructure module is responsible for the Superadmin business workflow managing Infrastructure. It enables superadmins to view, monitor, and control the lifecycle and configurations of Infrastructure across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure


| File | Responsibility |
|---|---|
| `infrastructure_dtos/superadmin-system-ops-infrastructure-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure_dtos/superadmin-system-ops-infrastructure-flush-tenant.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure_dtos/superadmin-system-ops-infrastructure-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure_dtos/superadmin-system-ops-infrastructure-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure_dtos/superadmin-system-ops-infrastructure-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure_responses/superadmin-system-ops-infrastructure-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `infrastructure_services/superadmin-system-ops-infrastructure-api-health.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-flush-global.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-flush-tenant.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-redis.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_services/superadmin-system-ops-infrastructure-uptime.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `infrastructure_types/superadmin-system-ops-infrastructure.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `infrastructure_types/superadmin-system-ops-infrastructure.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-infrastructure-api-health-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-system-ops-infrastructure-cache-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-infrastructure-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-infrastructure-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-infrastructure-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-infrastructure-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-infrastructure-telemetry-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-infrastructure.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-infrastructure.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-infrastructure.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-system-ops-infrastructure.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-system-ops-infrastructure.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-system-ops-infrastructure.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-infrastructure.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

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

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [ ] Rules 7, 19, 23, 28, 29, 31, 34, 36, 41, 48, 62, 76, 79, 80, 82A, 83, 86, 87, 89, 92, 93.

