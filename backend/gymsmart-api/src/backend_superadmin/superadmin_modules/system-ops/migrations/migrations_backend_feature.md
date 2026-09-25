# migrations Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/system-ops/migrations feature. It exposes 7 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-system-ops-migrations-advanced-command.controller.ts::trigger` | POST | `/superadmin/system-ops/migrations/trigger` | This endpoint invokes `trigger` on `superadmin-system-ops-migrations-advanced-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::create` | POST | `/superadmin/system-ops/migrations` | This endpoint invokes `create` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::update` | PATCH | `/superadmin/system-ops/migrations/:id` | This endpoint invokes `update` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::remove` | DELETE | `/superadmin/system-ops/migrations/:id` | This endpoint invokes `remove` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-command.controller.ts::changeStatus` | PATCH | `/superadmin/system-ops/migrations/:id/status` | This endpoint invokes `changeStatus` on `superadmin-system-ops-migrations-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-query.controller.ts::findAll` | GET | `/superadmin/system-ops/migrations` | This endpoint invokes `findAll` on `superadmin-system-ops-migrations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-system-ops-migrations-query.controller.ts::findOne` | GET | `/superadmin/system-ops/migrations/:id` | This endpoint invokes `findOne` on `superadmin-system-ops-migrations-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: system-ops
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-system-ops-migrations.entity → `superadmin_migration_logs`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/system-ops/migrations`, `/superadmin/system-ops/migrations/:id`, `/superadmin/system-ops/migrations/:id/status`, `/superadmin/system-ops/migrations/trigger`

## Business Flow / Key Sequences
Controller -> DTO validation -> use-case service -> named repository method -> PostgreSQL -> mapper/contract response. Heavy work is asynchronous where required.

## File Responsibility Map
Every source file is feature-scoped and has one reason to change. Controllers do not contain business rules; repositories do not call sibling repositories.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/system-ops/migrations/trigger` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/system-ops/migrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/system-ops/migrations/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/migrations` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/system-ops/migrations/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never directly import sibling system-ops business logic — Rule 0C/49.
- Never hard-delete operational data — Rule 29.
- Required concurrent mutations must use locking/idempotency — Rules 31 and 41.
- Heavy operations must have job lifecycle/DLQ protection — Rules 23/61.

## Frozen API Contract

<!-- Exact source: frontend system-ops/migrations/superadmin_migrations_features.md -->

﻿# Superadmin Migrations â€” Feature Map

## Module Purpose
The migrations module is responsible for the Superadmin business workflow managing Migrations. It enables superadmins to view, monitor, and control the lifecycle and configurations of Migrations across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure


| File | Responsibility |
|---|---|
| `migrations_dtos/superadmin-system-ops-migrations-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations_dtos/superadmin-system-ops-migrations-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations_dtos/superadmin-system-ops-migrations-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations_dtos/superadmin-system-ops-migrations-trigger.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations_dtos/superadmin-system-ops-migrations-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations_responses/superadmin-system-ops-migrations-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `migrations_services/superadmin-system-ops-migrations-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_services/superadmin-system-ops-migrations-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_services/superadmin-system-ops-migrations-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_services/superadmin-system-ops-migrations-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_services/superadmin-system-ops-migrations-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_services/superadmin-system-ops-migrations-trigger.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_services/superadmin-system-ops-migrations-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `migrations_types/superadmin-system-ops-migrations.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `migrations_types/superadmin-system-ops-migrations.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-migrations-advanced-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-migrations-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-migrations-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-system-ops-migrations.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-system-ops-migrations.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-system-ops-migrations.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-system-ops-migrations.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-system-ops-migrations.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-system-ops-migrations.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-system-ops-migrations.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Migrations | `/superadmin/system-ops/migrations` | rollout | `SuperadminMigrationsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/system-ops/migrations route to load the Migrations data context securely via TanStack Query.
2. Interact with the Migrations dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Migrations status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `system-ops/migrations`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `migrations_utils/useSuperadminMigrationsPage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** No query key detected statically.

## API Contract

- **API files:** `migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchMigrations` — `migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `migrations_components/SuperadminMigrationStatusBadge.tsx`, `migrations_components/SuperadminMigrationsEmptyState.tsx`, `migrations_components/SuperadminMigrationsClient.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
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
- **Empty-state components:** `migrations_components/SuperadminMigrationsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server component entry point for the Superadmin Migrations module. |
| `migrations_components/SuperadminMigrationStatusBadge.tsx` | Renders one semantic migration status badge with its status-specific icon. |
| `migrations_components/SuperadminMigrationsEmptyState.tsx` | Renders the empty state for the Superadmin migration history table. |
| `migrations_components/SuperadminMigrationsClient.tsx` | Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into migrations.
- **Destructive Actions**: Any deletion or modification of migrations records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for migrations do not expose cross-tenant sensitive data.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `migrations_components/SuperadminMigrationStatusBadge.tsx`, `migrations_components/SuperadminMigrationsEmptyState.tsx`, `migrations_components/SuperadminMigrationsClient.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
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

