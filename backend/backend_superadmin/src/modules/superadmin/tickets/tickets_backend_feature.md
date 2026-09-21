# tickets Backend Feature Map

## Module Purpose
Owns the `tickets` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/tickets-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/tickets-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/tickets-update.dto.ts` | Validates one request or response contract at the module edge. |
| `responses/tickets-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/tickets-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/tickets-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/tickets-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/tickets-insights.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/tickets-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/tickets-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/tickets-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `tickets-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `tickets-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `tickets-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `tickets-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `tickets-service-insights-response.dto.ts` | Validates one request or response contract at the module edge. |
| `tickets-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `tickets.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `tickets.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `tickets.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `tickets.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `tickets.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `tickets.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `tickets.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `tickets_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `tickets_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `tickets_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `tickets_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/tickets.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/tickets.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `tickets-command.controller.ts` / `create` | POST | `/superadmin/tickets` | Creates a resource after DTO validation and persists it through the feature repository. | `TicketsCreateDto` | `unknown` |
| `tickets-command.controller.ts` / `update` | PATCH | `/superadmin/tickets/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `TicketsUpdateDto` | `unknown` |
| `tickets-command.controller.ts` / `remove` | DELETE | `/superadmin/tickets/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `tickets-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/tickets/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `tickets-query.controller.ts` / `findAll` | GET | `/superadmin/tickets` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `tickets-query.controller.ts` / `findOne` | GET | `/superadmin/tickets/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `tickets-special.controller.ts` / `insights` | GET | `/superadmin/tickets/service-insights` | Returns support service-level metrics, agent performance, aging buckets, and category counts. | `None` | `Record<string, unknown` |

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

CODEOWNERS path: `src/modules/superadmin/tickets/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend tickets/superadmin_tickets_features.md -->

﻿# Superadmin Tickets â€” Feature Map

## Module Purpose
The tickets module is responsible for the Superadmin business workflow managing Tickets. It enables superadmins to view, monitor, and control the lifecycle and configurations of Tickets across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `tickets_api/` | Feature-owned responsibility for tickets api. | `SuperadminTicketsApi.ts`, `SuperadminTicketsServiceInsightsApi.ts` |
| `tickets_mocks/` | Feature-owned responsibility for tickets mocks. | `(directory present; no direct files)` |
| `tickets_store/` | Feature-owned responsibility for tickets store. | `useSuperadminTicketsStore.ts` |
| `tickets_tests/` | Feature-owned responsibility for tickets tests. | `SuperadminTicketsBasic.test.tsx`, `SuperadminTicketsServiceInsights.test.ts` |
| `tickets_types/` | Feature-owned responsibility for tickets types. | `SuperadminTicketsHeaderTypes.ts`, `SuperadminTicketsReplyFormTypes.ts`, `SuperadminTicketsReplyModalTypes.ts`, `SuperadminTicketsTableTypes.ts`, `SuperadminTicketsTypes.ts`, `SuperadminTicketsV1Types.ts` |
| `tickets_utils/` | Feature-owned responsibility for tickets utils. | `SuperadminTicketsConstants.ts`, `useSuperadminTicketMutations.ts`, `useSuperadminTicketReply.ts`, `useSuperadminTickets.ts`, `useSuperadminTicketsV1.ts` |

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
| Superadmin Tickets | `/superadmin/tickets` | close; close ticket; confirm assign; open assign; submit | `SuperadminTicketsApi.ts`, `SuperadminTicketsServiceInsightsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/tickets route to load the Tickets data context securely via TanStack Query.
2. Interact with the Tickets dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Tickets status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `tickets`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** `tickets_store/useSuperadminTicketsStore.ts`
- **Context files:** None detected.
- **Custom hooks:** `tickets_utils/useSuperadminTicketMutations.ts`, `tickets_utils/useSuperadminTickets.ts`, `tickets_utils/useSuperadminTicketReply.ts`, `tickets_utils/useSuperadminTicketsV1.ts`, `tickets_store/useSuperadminTicketsStore.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'tickets']`, `['superadmin', 'tickets', 'detail', ticketId]`, `['superadmin', 'tickets', queryParams]`, `['superadmin', 'tickets', 'detail', variables.ticketId]`, `['superadmin', 'tickets_service_insights']`

## API Contract

- **API files:** `tickets_api/SuperadminTicketsApi.ts`, `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Detected API symbols:** `fetchTickets` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketById` — `tickets_api/SuperadminTicketsApi.ts`; `updateTicket` — `tickets_api/SuperadminTicketsApi.ts`; `closeTicket` — `tickets_api/SuperadminTicketsApi.ts`; `assignTicket` — `tickets_api/SuperadminTicketsApi.ts`; `replyToTicket` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketServiceInsights` — `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `tickets_components/SuperadminTicketsClient.tsx`, `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx`, `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx`, `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx`, `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the tickets page. Renders the interactive client component. |
| `tickets_components/SuperadminTicketsClient.tsx` | Root view for the Tickets page. Query/mutation orchestration stays in feature hooks; this file composes UI only. |
| `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx` | Renders the Superadmin tickets V1 Support categories view. |
| `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx` | Renders the Superadmin tickets V1 TicketsSupportSummary summary cards. |
| `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx` | Renders the Superadmin tickets V1 Operator workload, Backlog age view. |
| `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx` | Renders the header and filter/search controls for Support Tickets |
| `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx` | Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminTicketReply. |
| `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx` | Renders the data table for Support Tickets |
| `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx` | Renders the SuperadminTicketsEmptyState component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into tickets.
- **Destructive Actions**: Any deletion or modification of tickets records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for tickets do not expose cross-tenant sensitive data.

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

