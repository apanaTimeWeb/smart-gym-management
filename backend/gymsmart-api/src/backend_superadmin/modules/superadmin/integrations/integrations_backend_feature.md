# integrations Backend Feature Map

## Module Purpose
Owns the `integrations` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/integrations-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/integrations-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/integrations-update.dto.ts` | Validates one request or response contract at the module edge. |
| `integrations-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `integrations-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `integrations-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `integrations-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `integrations-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `integrations.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `integrations.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `integrations.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `integrations.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `integrations.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `integrations.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `integrations.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `integrations_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `integrations_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `integrations_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `integrations_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `responses/integrations-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/integrations-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-generate-key.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-main.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/integrations-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/integrations.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/integrations.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `integrations-command.controller.ts` / `create` | POST | `/superadmin/integrations` | Creates a resource after DTO validation and persists it through the feature repository. | `IntegrationsCreateDto` | `unknown` |
| `integrations-command.controller.ts` / `update` | PATCH | `/superadmin/integrations/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `IntegrationsUpdateDto` | `unknown` |
| `integrations-command.controller.ts` / `remove` | DELETE | `/superadmin/integrations/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `integrations-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/integrations/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `integrations-query.controller.ts` / `findOne` | GET | `/superadmin/integrations/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `integrations-special.controller.ts` / `main` | GET | `/superadmin/integrations` | Returns the feature-level frontend contract projection owned by this module. | `None` | `Record<string, unknown` |
| `integrations-special.controller.ts` / `generateKey` | POST | `/superadmin/integrations/keys` | Generates an integration secret through the adapter/security boundary. | `Record` | `Record<string, unknown` |

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

CODEOWNERS path: `src/modules/superadmin/integrations/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend integrations/superadmin_integrations_features.md -->

﻿# Superadmin Integrations â€” Feature Map

## Module Purpose
The integrations module is responsible for the Superadmin business workflow managing Integrations. It enables superadmins to view, monitor, and control the lifecycle and configurations of Integrations across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `integrations_api/` | Feature-owned responsibility for integrations api. | `SuperadminIntegrationsApi.ts` |
| `integrations_components/` | Feature-owned responsibility for integrations components. | `SuperadminIntegrationsClient.tsx`, `SuperadminIntegrationsConnectionHealthPanel.tsx`, `SuperadminIntegrationsConnectionsEmptyState.tsx`, `SuperadminIntegrationsDeveloperAccessEmptyState.tsx`, `SuperadminIntegrationsPageHeader.tsx`, `SuperadminIntegrationsSummaryCards.tsx`, `SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx`, `SuperadminIntegrationsWebhooksEmptyState.tsx` |
| `integrations_mocks/` | Feature-owned responsibility for integrations mocks. | `(directory present; no direct files)` |
| `integrations_tests/` | Feature-owned responsibility for integrations tests. | `SuperadminIntegrationsBasic.test.tsx` |
| `integrations_types/` | Feature-owned responsibility for integrations types. | `SuperadminIntegrationsTypes.ts`, `SuperadminRouteErrorTypes.ts` |
| `integrations_utils/` | Feature-owned responsibility for integrations utils. | `SuperadminIntegrationsStatusBadgeConfig.ts`, `useSuperadminIntegrationsPage.test.tsx`, `useSuperadminIntegrationsPage.ts` |

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
| Superadmin Integrations | `/superadmin/integrations` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminIntegrationsApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/integrations route to load the Integrations data context securely via TanStack Query.
2. Interact with the Integrations dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Integrations status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `integrations`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `integrations_utils/useSuperadminIntegrationsPage.ts`, `integrations_utils/useSuperadminGenerateApiKey.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'integrations', 'overview']`

## API Contract

- **API files:** `integrations_api/SuperadminIntegrationsApi.ts`
- **Detected API symbols:** `fetchIntegrations` — `integrations_api/SuperadminIntegrationsApi.ts`; `generateSuperadminApiKey` — `integrations_api/SuperadminIntegrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState.tsx`, `integrations_components/SuperadminIntegrationsWebhooksEmptyState.tsx`, `integrations_components/SuperadminIntegrationsPageHeader.tsx`, `integrations_components/SuperadminIntegrationsClient.tsx`, `integrations_components/SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx`, `integrations_components/SuperadminGenerateApiKeyModal.tsx`, `integrations_components/SuperadminIntegrationsSummaryCards.tsx`, `integrations_components/SuperadminIntegrationsConnectionsEmptyState.tsx`, `integrations_components/SuperadminIntegrationsConnectionHealthPanel.tsx`
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
- **Empty-state components:** `integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState.tsx`, `integrations_components/SuperadminIntegrationsWebhooksEmptyState.tsx`, `integrations_components/SuperadminIntegrationsConnectionsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for integrations. |
| `integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState.tsx` | Renders the dedicated empty state for the Superadmin developer access list. |
| `integrations_components/SuperadminIntegrationsWebhooksEmptyState.tsx` | Renders the dedicated empty state for the Superadmin webhook deliveries list. |
| `integrations_components/SuperadminIntegrationsPageHeader.tsx` | Renders the Superadmin integrations page header section. |
| `integrations_components/SuperadminIntegrationsClient.tsx` | Orchestrates the Superadmin integrations page and its focused child sections. |
| `integrations_components/SuperadminIntegrationsWebhooksAndDeveloperAccessPanel.tsx` | Renders the Superadmin integrations webhooks and developer access panel section. |
| `integrations_components/SuperadminGenerateApiKeyModal.tsx` | Renders the validated Superadmin API-key generation form and one-time generated-secret result. |
| `integrations_components/SuperadminIntegrationsSummaryCards.tsx` | Renders the Superadmin integrations summary cards section. |
| `integrations_components/SuperadminIntegrationsConnectionsEmptyState.tsx` | Renders the dedicated empty state for the Superadmin connections list. |
| `integrations_components/SuperadminIntegrationsConnectionHealthPanel.tsx` | Renders the Superadmin integrations connection health panel section. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into integrations.
- **Destructive Actions**: Any deletion or modification of integrations records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for integrations do not expose cross-tenant sensitive data.

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

