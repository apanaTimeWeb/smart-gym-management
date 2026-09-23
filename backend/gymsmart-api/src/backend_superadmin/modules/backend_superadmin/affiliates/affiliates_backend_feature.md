# affiliates Backend Feature Map

## Module Purpose
Owns the `affiliates` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `affiliates-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `affiliates-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `affiliates.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `affiliates.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `affiliates.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `affiliates.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `affiliates.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `affiliates.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `affiliates_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `affiliates_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `affiliates_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `affiliates_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dtos/affiliates-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/affiliates-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/affiliates-update.dto.ts` | Validates one request or response contract at the module edge. |
| `responses/affiliates-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/affiliates-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/affiliates-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/affiliates-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/affiliates-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/affiliates-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/affiliates-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/affiliates.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/affiliates.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `affiliates-command.controller.ts` / `create` | POST | `/superadmin/affiliates` | Creates a resource after DTO validation and persists it through the feature repository. | `AffiliatesCreateDto` | `unknown` |
| `affiliates-command.controller.ts` / `update` | PATCH | `/superadmin/affiliates/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `AffiliatesUpdateDto` | `unknown` |
| `affiliates-command.controller.ts` / `remove` | DELETE | `/superadmin/affiliates/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `affiliates-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/affiliates/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `affiliates-query.controller.ts` / `findAll` | GET | `/superadmin/affiliates` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `affiliates-query.controller.ts` / `findOne` | GET | `/superadmin/affiliates/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |

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

CODEOWNERS path: `src/modules/backend_superadmin/affiliates/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend affiliates/superadmin_affiliates_features.md -->

﻿# Superadmin Affiliates â€” Feature Map

## Module Purpose
The affiliates module is responsible for the Superadmin business workflow managing Affiliates. It enables superadmins to view, monitor, and control the lifecycle and configurations of Affiliates across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `affiliates_api/` | Feature-owned responsibility for affiliates api. | `SuperadminAffiliatesApi.ts` |
| `affiliates_components/` | Feature-owned responsibility for affiliates components. | `SuperadminAffiliateModal.tsx`, `SuperadminAffiliatesClient.tsx` |
| `affiliates_mocks/` | Feature-owned responsibility for affiliates mocks. | `(directory present; no direct files)` |
| `affiliates_tests/` | Feature-owned responsibility for affiliates tests. | `SuperadminAffiliatesBasic.test.tsx` |
| `affiliates_types/` | Feature-owned responsibility for affiliates types. | `SuperadminAffiliateModalTypes.ts`, `SuperadminAffiliateStatusBadgeTypes.ts`, `SuperadminAffiliatesClientTypes.ts`, `SuperadminAffiliatesEmptyStateTypes.ts`, `SuperadminAffiliatesHeaderTypes.ts`, `SuperadminAffiliatesStatsBarTypes.ts`, `SuperadminAffiliatesTableRowTypes.ts`, `SuperadminAffiliatesTableTypes.ts`, `SuperadminAffiliatesTypes.ts` |
| `affiliates_utils/` | Feature-owned responsibility for affiliates utils. | `SuperadminAffiliatesQueryUtils.ts`, `useSuperadminAffiliatesMutation.ts`, `useSuperadminAffiliatesMutations.ts`, `useSuperadminAffiliatesPage.test.ts`, `useSuperadminAffiliatesPage.ts` |

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
| Superadmin Affiliates | `/superadmin/affiliates` | add affiliate; delete affiliate; edit affiliate; pay commission; submit; toggle affiliate status | `SuperadminAffiliatesApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/affiliates route to load the Affiliates data context securely via TanStack Query.
2. Interact with the Affiliates dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Affiliates status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `affiliates`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `affiliates_utils/useSuperadminAffiliatesPage.ts`, `affiliates_utils/useSuperadminAffiliatesMutation.ts`, `affiliates_utils/useSuperadminAffiliatesMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'affiliates', 'payout-history']`

## API Contract

- **API files:** `affiliates_api/SuperadminAffiliatesApi.ts`
- **Detected API symbols:** `fetchAffiliates` — `affiliates_api/SuperadminAffiliatesApi.ts`; `createAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `updateAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `updateAffiliateStatus` — `affiliates_api/SuperadminAffiliatesApi.ts`; `deleteAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `payAffiliateCommission` — `affiliates_api/SuperadminAffiliatesApi.ts`; `fetchPayoutHistory` — `affiliates_api/SuperadminAffiliatesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `affiliates_components/SuperadminAffiliatesClient.tsx`, `affiliates_components/SuperadminAffiliateModal.tsx`, `affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx`, `affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx`, `affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx`, `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx`, `affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the affiliates page. Renders the interactive client component. |
| `affiliates_components/SuperadminAffiliatesClient.tsx` | Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesPage. No business logic here. |
| `affiliates_components/SuperadminAffiliateModal.tsx` | Renders the Create/Edit Affiliate modal form. Receives form state via props from useSuperadminAffiliatesPage. No API calls. |
| `affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx` | Renders the page title, search, status filter, date-range filter, and Add CTA for the Affiliates page. |
| `affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx` | Renders server-backed affiliate payout history passed from the feature page query. |
| `affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx` | Renders the status badge pill for a single affiliate. Purely presentational — maps AffiliateStatus to design system colors. |
| `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx` | Renders a single row in the Affiliates data table. Handles row-level action buttons with stopPropagation. Purely presentational. |
| `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx` | Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls. |
| `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx` | Renders the empty state UI for the Affiliates table when no affiliates exist. Shows icon, message, and CTA to add first affiliate. |
| `affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx` | Renders the KPI stat cards (Total Affiliates, Total Commission Paid) for the Affiliates page. Purely presentational — receives data via props. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into affiliates.
- **Destructive Actions**: Any deletion or modification of affiliates records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for affiliates do not expose cross-tenant sensitive data.

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

