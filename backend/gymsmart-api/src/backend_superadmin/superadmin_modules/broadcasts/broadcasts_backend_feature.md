# broadcasts Backend Feature Map

## Module Purpose
Owns Superadmin broadcast lifecycle management and audience insights. Broadcast creation, status changes, deletion, and delivery are controlled mutations and use Idempotency-Key where the frontend provides it. Audience analytics is exposed as a complete nested response contract.

## Directory Structure
| File | Responsibility |
|---|---|
| `broadcasts-audience-insights-response.dto.ts` | Validates one request or response contract at the module edge. |
| `broadcasts-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `broadcasts-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `broadcasts-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `broadcasts-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `broadcasts-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `broadcasts.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `broadcasts.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `broadcasts.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `broadcasts.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `broadcasts.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `broadcasts.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `broadcasts.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `broadcasts_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `broadcasts_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `broadcasts_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `broadcasts_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `dtos/broadcasts-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/broadcasts-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/broadcasts-update.dto.ts` | Validates one request or response contract at the module edge. |
| `responses/broadcasts-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/broadcasts-audience-insights.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/broadcasts-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/broadcasts-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/broadcasts-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/broadcasts-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/broadcasts-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/broadcasts-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/broadcasts.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/broadcasts.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `broadcasts-command.controller.ts` / `create` | POST | `/superadmin/broadcasts` | Creates a resource after DTO validation and persists it through the feature repository. | `BroadcastsCreateDto` | `unknown` |
| `broadcasts-command.controller.ts` / `update` | PATCH | `/superadmin/broadcasts/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `BroadcastsUpdateDto` | `unknown` |
| `broadcasts-command.controller.ts` / `remove` | DELETE | `/superadmin/broadcasts/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `broadcasts-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/broadcasts/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `broadcasts-query.controller.ts` / `findAll` | GET | `/superadmin/broadcasts` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `broadcasts-query.controller.ts` / `findOne` | GET | `/superadmin/broadcasts/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `broadcasts-special.controller.ts` / `audienceInsights` | GET | `/superadmin/broadcasts/audience-insights` | Returns the complete broadcast audience-segmentation contract consumed by the frontend. | `None` | `Record<string, unknown` |

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

CODEOWNERS path: `src/modules/backend_superadmin/broadcasts/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend broadcasts/superadmin_broadcasts_features.md -->

﻿# Superadmin Broadcasts â€” Feature Map

## Module Purpose
The broadcasts module is responsible for the Superadmin business workflow managing Broadcasts. It enables superadmins to view, monitor, and control the lifecycle and configurations of Broadcasts across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `broadcasts_api/` | Feature-owned responsibility for broadcasts api. | `SuperadminBroadcastsApi.ts`, `SuperadminBroadcastsAudienceInsightsApi.ts` |
| `broadcasts_mocks/` | Feature-owned responsibility for broadcasts mocks. | `(directory present; no direct files)` |
| `broadcasts_tests/` | Feature-owned responsibility for broadcasts tests. | `SuperadminBroadcastsAudienceInsights.test.ts`, `SuperadminBroadcastsBasic.test.tsx` |
| `broadcasts_types/` | Feature-owned responsibility for broadcasts types. | `SuperadminBroadcastDeliveryTypes.ts`, `SuperadminBroadcastModalTypes.ts`, `SuperadminBroadcastQueueModalTypes.ts`, `SuperadminBroadcastsTypes.ts`, `SuperadminBroadcastsV1Types.ts` |
| `broadcasts_utils/` | Feature-owned responsibility for broadcasts utils. | `SuperadminBroadcastConstants.ts`, `SuperadminBroadcastQueueStateTypes.ts`, `SuperadminBroadcastScheduleUtils.ts`, `SuperadminBroadcastsSchemas.ts`, `useSuperadminBroadcastDelivery.ts`, `useSuperadminBroadcastModalData.ts`, `useSuperadminBroadcastQueueState.ts`, `useSuperadminBroadcastsData.ts`, `useSuperadminBroadcastsMutations.ts`, `useSuperadminBroadcastsPage.test.ts`, `useSuperadminBroadcastsPage.ts`, `useSuperadminBroadcastsV1.ts` |

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
| Superadmin Broadcasts | `/superadmin/broadcasts` | create broadcast; delete broadcast; select all; send broadcast; submit; toggle gym | `SuperadminBroadcastsAudienceInsightsApi.ts`, `SuperadminBroadcastsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/broadcasts route to load the Broadcasts data context securely via TanStack Query.
2. Interact with the Broadcasts dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Broadcasts status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `broadcasts`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `broadcasts_utils/useSuperadminBroadcastsData.ts`, `broadcasts_utils/useSuperadminBroadcastDelivery.ts`, `broadcasts_utils/useSuperadminBroadcastsV1.ts`, `broadcasts_utils/useSuperadminBroadcastsPage.ts`, `broadcasts_utils/useSuperadminBroadcastQueueState.ts`, `broadcasts_utils/useSuperadminBroadcastModalData.ts`, `broadcasts_utils/useSuperadminBroadcastsMutations.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'broadcasts', 'tenants']`, `['superadmin', 'broadcasts']`, `['superadmin', 'broadcasts', 'detail', variables.broadcastId]`, `['superadmin', 'broadcasts_audience_insights']`, `['superadmin', 'broadcasts', 'modal-tenants']`, `['superadmin', 'broadcasts', 'modal-recipient-count']`

## API Contract

- **API files:** `broadcasts_api/SuperadminBroadcastsApi.ts`, `broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`
- **Detected API symbols:** `fetchBroadcasts` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `createBroadcast` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `deleteBroadcast` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `updateBroadcast` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchTenants` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchRecipientCount` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `deliverBroadcastToRecipient` — `broadcasts_api/SuperadminBroadcastsApi.ts`; `fetchBroadcastAudienceInsights` — `broadcasts_api/SuperadminBroadcastsAudienceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `broadcasts_components/SuperadminBroadcastsClient.tsx`, `broadcasts_components/SuperadminBroadcastsV1AudienceBuilderPanel.tsx`, `broadcasts_components/SuperadminBroadcastModal.tsx`, `broadcasts_components/SuperadminBroadcastsV1ChannelResultsAndTemplateSection.tsx`, `broadcasts_components/SuperadminBroadcastQueueModal.tsx`, `broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx`, `broadcasts_components/SuperadminBroadcastsHeader/SuperadminBroadcastsHeader.tsx`, `broadcasts_components/SuperadminBroadcastsTable/SuperadminBroadcastsTable.tsx`, `broadcasts_components/SuperadminBroadcastStatusBadge/SuperadminBroadcastStatusBadge.tsx`
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
- **Empty-state components:** `broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the broadcasts page. Renders the interactive client component. |
| `broadcasts_components/SuperadminBroadcastsClient.tsx` | Root orchestrator for the Broadcasts page. Composes isolated sub-components and passes state from useSuperadminBroadcastsPage. No business logic here. |
| `broadcasts_components/SuperadminBroadcastsV1AudienceBuilderPanel.tsx` | Lets a Superadmin select an audience insight and exposes the selected audience for the downstream broadcast workflow. |
| `broadcasts_components/SuperadminBroadcastModal.tsx` | Renders the Create/Edit Broadcast modal form. Receives form state via props and server-state preview data from useSuperadminBroadcastModalData. |
| `broadcasts_components/SuperadminBroadcastsV1ChannelResultsAndTemplateSection.tsx` | Renders the Superadmin broadcasts V1 Channel results, Reusable templates view. |
| `broadcasts_components/SuperadminBroadcastQueueModal.tsx` | Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence. |
| `broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState.tsx` | Renders the empty state UI for the Broadcasts table when no broadcasts exist. Shows icon, message, and CTA to create first broadcast. |
| `broadcasts_components/SuperadminBroadcastsHeader/SuperadminBroadcastsHeader.tsx` | Renders the page title, search input, and "New Broadcast" CTA for the Broadcasts page. Receives all state via props — no API calls. |
| `broadcasts_components/SuperadminBroadcastsTable/SuperadminBroadcastsTable.tsx` | Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls. |
| `broadcasts_components/SuperadminBroadcastStatusBadge/SuperadminBroadcastStatusBadge.tsx` | Renders the status badge pill for a single broadcast. Purely presentational — maps BroadcastStatus to design system colors. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into broadcasts.
- **Destructive Actions**: Any deletion or modification of broadcasts records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for broadcasts do not expose cross-tenant sensitive data.

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

