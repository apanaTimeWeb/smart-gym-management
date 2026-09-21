# settings Backend Feature Map

## Module Purpose
Owns the `settings` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/settings-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/settings-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/settings-update.dto.ts` | Validates one request or response contract at the module edge. |
| `responses/settings-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/settings-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/settings-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/settings-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/settings-governance.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/settings-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/settings-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `settings-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `settings-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `settings-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `settings-governance-response.dto.ts` | Validates one request or response contract at the module edge. |
| `settings-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `settings-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `settings.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `settings.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `settings.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `settings.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `settings.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `settings.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `settings.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `settings_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `settings_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `settings_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `settings_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/settings.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/settings.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `settings-command.controller.ts` / `create` | POST | `/superadmin/settings` | Creates a resource after DTO validation and persists it through the feature repository. | `SettingsCreateDto` | `unknown` |
| `settings-command.controller.ts` / `update` | PATCH | `/superadmin/settings/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `SettingsUpdateDto` | `unknown` |
| `settings-command.controller.ts` / `remove` | DELETE | `/superadmin/settings/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `settings-query.controller.ts` / `findAll` | GET | `/superadmin/settings` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `settings-query.controller.ts` / `findOne` | GET | `/superadmin/settings/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `settings-special.controller.ts` / `governance` | GET | `/superadmin/settings/governance` | Returns the complete platform-governance contract for billing, security, data, and communication policy panels. | `None` | `Record<string, unknown` |

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

CODEOWNERS path: `src/modules/superadmin/settings/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend settings/superadmin_settings_features.md -->

﻿# Superadmin Settings â€” Feature Map

## Module Purpose
The settings module is responsible for the Superadmin business workflow managing Settings. It enables superadmins to view, monitor, and control the lifecycle and configurations of Settings across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `settings_api/` | Feature-owned responsibility for settings api. | `SuperadminSettingsApi.ts`, `SuperadminSettingsGovernanceApi.ts` |
| `settings_mocks/` | Feature-owned responsibility for settings mocks. | `(directory present; no direct files)` |
| `settings_tests/` | Feature-owned responsibility for settings tests. | `SuperadminSettingsBasic.test.tsx`, `SuperadminSettingsGovernance.test.ts` |
| `settings_types/` | Feature-owned responsibility for settings types. | `SuperadminSettingsTypes.ts`, `SuperadminSettingsV1Types.ts` |
| `settings_utils/` | Feature-owned responsibility for settings utils. | `SuperadminSettingsSchemas.ts`, `useSuperadminSettingsPage.ts`, `useSuperadminSettingsV1.ts` |

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
| Superadmin Settings | `/superadmin/settings` | save | `SuperadminSettingsApi.ts`, `SuperadminSettingsGovernanceApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/settings route to load the Settings data context securely via TanStack Query.
2. Interact with the Settings dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Settings status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `settings`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `settings_utils/useSuperadminSettingsPage.ts`, `settings_utils/useSuperadminSettingsV1.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'settings']`, `['superadmin', 'settings_governance']`

## API Contract

- **API files:** `settings_api/SuperadminSettingsGovernanceApi.ts`, `settings_api/SuperadminSettingsApi.ts`
- **Detected API symbols:** `fetchSettingsGovernance` — `settings_api/SuperadminSettingsGovernanceApi.ts`; `fetchSettings` — `settings_api/SuperadminSettingsApi.ts`; `updateSetting` — `settings_api/SuperadminSettingsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `settings_components/SuperadminSettingsV1DataControlsPanel.tsx`, `settings_components/SuperadminSettingsClient.tsx`, `settings_components/SuperadminSettingsV1SecurityControlsPanel.tsx`, `settings_components/SuperadminSettingsV1BillingControlsPanel.tsx`, `settings_components/SuperadminSettingsV1CommunicationDefaultsPanel.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
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
| `page.tsx` | Pure Server Component for the settings page. Renders the interactive client component. |
| `settings_components/SuperadminSettingsV1DataControlsPanel.tsx` | Renders the Superadmin settings V1 Data controls view. |
| `settings_components/SuperadminSettingsClient.tsx` | Renders platform settings. The view owns only local draft input state; server state and mutations stay in the feature hook. |
| `settings_components/SuperadminSettingsV1SecurityControlsPanel.tsx` | Renders the Superadmin settings V1 Security controls view. |
| `settings_components/SuperadminSettingsV1BillingControlsPanel.tsx` | Renders the Superadmin settings V1 Billing controls view. |
| `settings_components/SuperadminSettingsV1CommunicationDefaultsPanel.tsx` | Renders the Superadmin settings V1 Communication defaults view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into settings.
- **Destructive Actions**: Any deletion or modification of settings records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for settings do not expose cross-tenant sensitive data.

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

