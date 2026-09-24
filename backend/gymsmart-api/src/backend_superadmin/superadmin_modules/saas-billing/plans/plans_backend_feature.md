# Plans Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/saas-billing/plans feature. It exposes 9 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `plans_dtos/superadmin-saas-billing-plans-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans_dtos/superadmin-saas-billing-plans-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans_dtos/superadmin-saas-billing-plans-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans_responses/superadmin-saas-billing-plans-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans_services/superadmin-saas-billing-plans-archive.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_services/superadmin-saas-billing-plans-business-controls.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_services/superadmin-saas-billing-plans-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_services/superadmin-saas-billing-plans-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_services/superadmin-saas-billing-plans-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_services/superadmin-saas-billing-plans-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_services/superadmin-saas-billing-plans-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans_types/superadmin-saas-billing-plans.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `plans_types/superadmin-saas-billing-plans.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-saas-billing-plans-api.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-plans-business-controls-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-saas-billing-plans-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-plans-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-saas-billing-plans-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-saas-billing-plans-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-plans.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-saas-billing-plans.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-saas-billing-plans.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-saas-billing-plans.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-saas-billing-plans.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-saas-billing-plans.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-saas-billing-plans.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-saas-billing-plans-api.controller.ts::businessControls` | GET | `/api/superadmin/saas-billing/plans/business-controls` | This endpoint invokes `businessControls` on `superadmin-saas-billing-plans-api.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::create` | POST | `/superadmin/saas-billing/plans` | This endpoint invokes `create` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::update` | PATCH | `/superadmin/saas-billing/plans/:id` | This endpoint invokes `update` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::remove` | DELETE | `/superadmin/saas-billing/plans/:id` | This endpoint invokes `remove` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-command.controller.ts::archive` | PATCH | `/superadmin/saas-billing/plans/:id/archive` | This endpoint invokes `archive` on `superadmin-saas-billing-plans-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::findAll` | GET | `/superadmin/saas-billing/plans` | This endpoint invokes `findAll` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::businessControls` | GET | `/superadmin/saas-billing/plans/business-controls` | This endpoint invokes `businessControls` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::businessControls` | GET | `/superadmin/saas-billing/plans/api/superadmin/saas-billing/plans/business-controls` | This endpoint invokes `businessControls` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-plans-query.controller.ts::findOne` | GET | `/superadmin/saas-billing/plans/:id` | This endpoint invokes `findOne` on `superadmin-saas-billing-plans-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: saas-billing
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-saas-billing-plans-contract-snapshot.entity → `superadmin_plans_contract_snapshots`, superadmin-saas-billing-plans.entity → `superadmin_subscription_plans`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/saas-billing/plans`, `/superadmin/saas-billing/plans/:id`, `/superadmin/saas-billing/plans/:id/archive`

## Business Flow / Key Sequences
**Standard mutation:** Controller -> DTO validation -> micro-service -> named repository mutation -> mapper -> ResponseInterceptor.

## File Responsibility Map
- `plans-query.controller.ts` — GET transport only; MUST NOT mutate persistence.
- `plans-command.controller.ts` — HTTP mutation transport only; MUST NOT contain business logic.
- `plans.repository.ts` — DB queries/mutations only; MUST NOT call sibling repositories.
- `plans-*.service.ts` — one business use case each; MUST NOT call TypeORM directly.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `GET /api/superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/plans` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/plans/:id/archive` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/api/superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Soft deletes MUST remain invisible to standard reads — violating Rule 29 can expose deleted records.
- Sort/search inputs MUST be allowlisted — violating Rule 92 enables unsafe query construction.
- Service mutations MUST use named repository methods — violating Rule 99 leaks persistence behavior into business code.

## Frozen API Contract

<!-- Exact source: frontend saas-billing/plans/superadmin_plans_features.md -->

﻿# Superadmin Plans â€” Feature Map

## Module Purpose
The plans module is responsible for the Superadmin business workflow managing Plans. It enables superadmins to view, monitor, and control the lifecycle and configurations of Plans across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `plans_api/` | Feature-owned responsibility for plans api. | `SuperadminPlansApi.ts`, `SuperadminPlansBusinessControlsApi.ts` |
| `plans_mocks/` | Feature-owned responsibility for plans mocks. | `(directory present; no direct files)` |
| `plans_store/` | Feature-owned responsibility for plans store. | `useSuperadminPlansStore.ts` |
| `plans_tests/` | Feature-owned responsibility for plans tests. | `SuperadminPlansBasic.test.tsx`, `SuperadminPlansBusinessControls.test.ts` |
| `plans_types/` | Feature-owned responsibility for plans types. | `SuperadminPlansFormTypes.ts`, `SuperadminPlansListMutationTypes.ts`, `SuperadminPlansSchema.ts`, `SuperadminPlansTypes.ts`, `SuperadminPlansUiTypes.ts`, `SuperadminPlansV1Types.ts` |
| `plans_utils/` | Feature-owned responsibility for plans utils. | `SuperadminPlansSchemas.ts`, `useSuperadminPlanMutations.ts`, `useSuperadminPlansV1.ts` |

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
| Superadmin Plans | `/superadmin/saas-billing/plans` | close; submit | `SuperadminPlansBusinessControlsApi.ts`, `SuperadminPlansApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/saas-billing/plans route to load the Plans data context securely via TanStack Query.
2. Interact with the Plans dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Plans status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `saas-billing/plans`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `plans_store/useSuperadminPlansStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `plans_components/useSuperadminPlansList.ts`, `plans_store/useSuperadminPlansStore.ts`, `plans_utils/useSuperadminPlansV1.ts`, `plans_utils/useSuperadminPlanMutations.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'plans']`, `['superadmin', 'plans_business_controls']`

## API Contract

- **API files:** `plans_api/SuperadminPlansBusinessControlsApi.ts`, `plans_api/SuperadminPlansApi.ts`
- **Detected API symbols:** `fetchPlansBusinessControls` — `plans_api/SuperadminPlansBusinessControlsApi.ts`; `fetchPlans` — `plans_api/SuperadminPlansApi.ts`; `fetchPlanById` — `plans_api/SuperadminPlansApi.ts`; `createPlan` — `plans_api/SuperadminPlansApi.ts`; `updatePlan` — `plans_api/SuperadminPlansApi.ts`; `deletePlan` — `plans_api/SuperadminPlansApi.ts`; `archivePlan` — `plans_api/SuperadminPlansApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `plans_components/SuperadminPlansList.tsx`, `plans_components/SuperadminPlanCreateModal.tsx`, `plans_components/SuperadminPlansClient.tsx`, `plans_components/SuperadminPlanEditModal.tsx`, `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx`, `plans_components/SuperadminPlansV1ComparisonPanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

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
| `page.tsx` | Pure Server Component for the plans page. Renders the interactive client component. |
| `plans_components/SuperadminPlansList.tsx` | Renders the grid of subscription plan cards using TanStack Query. |
| `plans_components/SuperadminPlanCreateModal.tsx` | Renders the modal form for creating a new subscription plan. Reads/writes via useSuperadminPlansStore. |
| `plans_components/SuperadminPlansClient.tsx` | SuperadminPlansClient.tsx is the root client entry for the Plans page. Initialises the Zustand store on mount. |
| `plans_components/SuperadminPlanEditModal.tsx` | Renders the modal form for editing an existing subscription plan. Reads/writes via useSuperadminPlansStore. |
| `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx` | Renders the Superadmin plans V1 Price history, Add-ons, Plan move preview view. |
| `plans_components/SuperadminPlansV1ComparisonPanel.tsx` | Renders the Superadmin plans V1 Plan comparison view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into plans.
- **Destructive Actions**: Any deletion or modification of plans records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for plans do not expose cross-tenant sensitive data.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `plans_components/SuperadminPlansList.tsx`, `plans_components/SuperadminPlanCreateModal.tsx`, `plans_components/SuperadminPlansClient.tsx`, `plans_components/SuperadminPlanEditModal.tsx`, `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx`, `plans_components/SuperadminPlansV1ComparisonPanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `plans_components/SuperadminPlansList.tsx`, `plans_components/SuperadminPlanCreateModal.tsx`, `plans_components/SuperadminPlansClient.tsx`, `plans_components/SuperadminPlanEditModal.tsx`, `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx`, `plans_components/SuperadminPlansV1ComparisonPanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

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


- [ ] Rule 7: TypeORM is the sole ORM and is used behind repositories.
- [ ] Rule 19: This feature doc updates with feature changes.
- [ ] Rule 28: Responses use the canonical envelope.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency on applicable critical mutations.
- [ ] Rule 48: Separate query/command controllers.
- [ ] Rule 56: `findByIdOrThrow()` for fail-fast reads.
- [ ] Rule 62: Explicit service/repository return types.
- [ ] Rule 82A: Response DTO must remain complete against frontend UI data requirements.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 85: Guard clauses and low conditional nesting.
- [ ] Rule 89: ORM entities do not cross into business logic.
- [ ] Rule 92: Query fields validated by allowlists.
- [ ] Rule 99: Named repository mutation methods only.
- [ ] Rule 100: Explicit named DB constraints in migrations.
- [ ] Rule 101: Tests must prove observable behavior.

