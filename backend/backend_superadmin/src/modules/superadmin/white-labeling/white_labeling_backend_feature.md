# white-labeling Backend Feature Map

## Module Purpose
Owns the `white-labeling` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/white-labeling-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/white-labeling-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/white-labeling-update.dto.ts` | Validates one request or response contract at the module edge. |
| `responses/white-labeling-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/white-labeling-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/white-labeling-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/white-labeling-domains.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/white-labeling-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/white-labeling-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/white-labeling-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/white-labeling-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/white-labeling.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/white-labeling.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `white-labeling-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `white-labeling-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `white-labeling-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `white-labeling.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `white-labeling.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `white-labeling.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `white-labeling.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `white-labeling.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `white-labeling.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `white-labeling_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `white-labeling_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `white-labeling_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `white-labeling_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `white-labeling-command.controller.ts` / `create` | POST | `/superadmin/white-labeling` | Creates a resource after DTO validation and persists it through the feature repository. | `WhiteLabelingCreateDto` | `unknown` |
| `white-labeling-command.controller.ts` / `update` | PATCH | `/superadmin/white-labeling/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `WhiteLabelingUpdateDto` | `unknown` |
| `white-labeling-command.controller.ts` / `remove` | DELETE | `/superadmin/white-labeling/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `white-labeling-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/white-labeling/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `white-labeling-query.controller.ts` / `findAll` | GET | `/superadmin/white-labeling` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `white-labeling-query.controller.ts` / `findOne` | GET | `/superadmin/white-labeling/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `white-labeling-special.controller.ts` / `domains` | GET | `/superadmin/white-labeling/domains` | Returns the Superadmin data required by the ``/superadmin/white-labeling/domains`` frontend contract, with filtering or lookup semantics defined by that feature contract. |
| `white-labeling-special.controller.ts` / `status` | PATCH | `/superadmin/white-labeling/domains/:id/status` | Applies the partial update or state transition exposed by ``/superadmin/white-labeling/domains/:id/status`` after validation, authorization, and named repository mutation. |

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

CODEOWNERS path: `src/modules/superadmin/white-labeling/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend white-labeling/superadmin_white-labeling_features.md -->

# Superadmin White-labeling — Feature Map

## Module Purpose
The White-labeling feature lets Superadmins inspect tenant domain/branding configuration and change supported domain lifecycle status through a controlled drawer. The module owns list search, status filtering, selected-record state, mutation orchestration, and the feature-owned MSW contract. It is strictly limited to the documented white-labeling domain workflow; it does not own tenant billing, authentication, or unrelated branding logic.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `white-labeling_components/` | Renders the list page, status badges, empty/error/loading UI, and status-edit drawer. | `SuperadminWhiteLabelingMain.tsx`, `SuperadminWhiteLabelingTable.tsx`, `SuperadminWhiteLabelingDrawer.tsx`, `SuperadminWhiteLabelingStatusBadge.tsx` |
| `white-labeling_hooks/` | Owns query/mutation orchestration and URL-driven list behavior. | `useSuperadminWhiteLabeling.ts` |
| `white-labeling_store/` | Owns UI-only selection and filter state. | `useSuperadminWhiteLabelingStore.ts` |
| `white-labeling_api/` | Owns white-labeling API calls and URL configuration. | `SuperadminWhiteLabelingApi.ts`, `superadmin_white_labeling_url_config.ts` |
| `white-labeling_types/` | Owns API/domain types and request/response shapes. | module type files |
| `white-labeling_schemas/` | Owns runtime response validation. | module schema files |
| `white-labeling_mocks/fixtures/` | Owns realistic white-labeling server records. | `SuperadminWhiteLabelingMockFixtures.ts` |
| `white-labeling_mocks/handlers/` | Owns GET/update MSW behavior and mutable in-memory state. | `SuperadminWhiteLabelingMockHandlers.ts` |
| `white-labeling_tests/` | Owns feature contract/interaction verification. | `SuperadminWhiteLabelingContract.test.ts` |
| `loading.tsx`, `error.tsx`, `page.tsx` | Framework route boundary. | reserved Next.js files |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global HTTP transport only.
- `@/lib/formatters` — approved formatting infrastructure only when consumed.
- `@/components/ui/*` — zero-business UI primitives only.
- `@/hooks/useUnsavedChangesGuard` — approved generic browser/navigation safety utility.

### Business Feature Dependencies
- None.

### Role-Level Business Dependencies
- None.

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| White-label domain list | `/superadmin/white-labeling` | Search and filter tenant domain configurations; inspect status | `SuperadminWhiteLabelingMain`, `SuperadminWhiteLabelingTable`, `SuperadminWhiteLabelingStatusBadge` | `getDomains` | Implemented with module MSW |
| Domain status management | `/superadmin/white-labeling` | Open the selected domain drawer and change supported status with confirmation | `SuperadminWhiteLabelingDrawer` | `updateDomainStatus` | Implemented with mutable module MSW |

## User Flows & Interactions
### Flow 1: Search / Filter Domains
1. User changes Search or Status Filter in `SuperadminWhiteLabelingMain`.
2. UI state is serialized into the documented query parameters.
3. `useSuperadminWhiteLabeling` derives the query key from the normalized query state.
4. `getDomains` requests the filtered result set.
5. MSW returns the matching fixture subset.
6. The table updates; zero matches render the empty state.

### Flow 2: Update Domain Status
1. User selects a domain row.
2. `SuperadminWhiteLabelingDrawer` opens with that domain.
3. User chooses a supported status.
4. Destructive/critical status changes use the documented confirmation path.
5. `updateDomainStatus` runs through TanStack Query mutation state.
6. On success, the mutation reconciles/invalidate the affected list query and shows the backend response message.
7. The drawer closes only after confirmed success; the updated status is visible in the list.

## Data and State Architecture
- **Server state:** TanStack Query only.
- **UI state:** `white-labeling_store/useSuperadminWhiteLabelingStore.ts` for selected domain and local UI state.
- **URL state:** Search/filter values are query-state driven; do not keep the authoritative list filter only in Zustand.
- **Query key:** list query is namespaced to the White-labeling feature and includes normalized filter state.
- **Mock state:** `white-labeling_mocks/handlers/SuperadminWhiteLabelingMockHandlers.ts` maintains mutable session/in-memory state for status mutation verification.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `getDomains` | GET | configured White-labeling domains endpoint | normalized search/filter params | domain list + pagination metadata |
| `updateDomainStatus` | PATCH | configured domain-status endpoint | domain identifier + next status | updated domain record |

All responses are runtime-validated at the module API boundary before application consumption.

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Nullable? | Mocked? |
|---|---|---|---|---|
| Domain table identifier | domain/tenant identifier + domain name | `getDomains` | Per schema | Yes |
| Domain status badge | domain status | `getDomains`, `updateDomainStatus` | No | Yes |
| SSL status | SSL/domain health status | `getDomains` | Per schema | Yes |
| Tenant name | tenant name | `getDomains` | Per schema | Yes |
| Search result count | pagination/result metadata | `getDomains` | Per schema | Yes |
| Selected drawer status | selected domain status | `getDomains`, `updateDomainStatus` | No | Yes |

## Permissions and Security
- Required role: `SUPERADMIN` through the host role/session boundary.
- Status-changing controls are feature-protected and must remain hidden/disabled when the documented capability is unavailable.
- Destructive/critical changes must use `useConfirm()`; never use `window.confirm()`.
- API responses must never expose raw internal errors in the UI.
- There are no sibling business-feature dependencies.

## Loading, Empty, and Error States
| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full route | `loading.tsx` structural skeleton matching toolbar + table | N/A | `error.tsx` route-level branded recovery state with Retry |
| Domain table | `SuperadminWhiteLabelingLoadingState.tsx` table-shaped skeleton | `SuperadminWhiteLabelingEmptyState.tsx` explains no matching domains | `SuperadminWhiteLabelingErrorState.tsx` provides retry |
| Status drawer | mutation-driven disabled/loading controls | N/A | backend-safe inline mutation error |

## Edge Cases and AI Warnings
1. **Never move filter authority back into Zustand only:** the URL/query contract is part of the list interaction and must remain shareable and back/forward compatible.
2. **Never update only the toast:** status mutation success must update or invalidate the list data so the visible row reflects the new status.
3. **Never change the selected domain identity during a refetch:** the drawer must continue to represent the same domain until the user closes it or the selected resource becomes invalid.
4. **Never import branding/billing/tenant business logic from another feature:** duplicate the small amount of feature-specific logic when necessary for isolation.
5. **Never bypass the confirmation flow for restricted status changes:** a critical status action must have an explicit documented terminal state.
6. **Do not introduce browser-native confirmation dialogs:** use the approved design-system confirmation mechanism.
7. **Do not treat browser refresh as persistence:** current module mock state is session/in-memory unless a persistence contract is explicitly documented.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `page.tsx` | Server route entry only; no client business orchestration. |
| `SuperadminWhiteLabelingMain.tsx` | Client view/orchestrator for search/filter/table/drawer composition. |
| `SuperadminWhiteLabelingTable.tsx` | Renders accessible clickable table rows and mobile card-stack representation. |
| `SuperadminWhiteLabelingStatusBadge.tsx` | Renders feature-owned status mapping using semantic tokens. |
| `SuperadminWhiteLabelingDrawer.tsx` | Renders selected-domain status-edit workflow and consumes mutation hook state. |
| `SuperadminWhiteLabelingEmptyState.tsx` | Renders zero-result state and documented contextual action. |
| `SuperadminWhiteLabelingErrorState.tsx` | Renders feature-level query recovery UI. |
| `SuperadminWhiteLabelingLoadingState.tsx` | Renders structural loading skeleton. |

## Rule Compliance Checklist
- [x] Feature-owned components/hooks/store/API/types/schemas/mocks/tests/docs are contained in the feature.
- [x] No sibling business imports.
- [x] Absolute `@/` imports only.
- [x] Module URL configuration is used by API/navigation call sites.
- [x] Server/API data is not stored as primary Zustand state.
- [x] API responses are runtime validated.
- [x] Mock mutations update mutable in-memory state.
- [x] Search/filter state participates in the documented URL/query flow.
- [x] Destructive/critical confirmation uses the approved confirm flow.
- [x] Loading/empty/error/retry states are explicitly mapped.
- [x] Table rows provide keyboard/touch-accessible action paths.
- [x] Feature theme contract is documented.

## Verification Notes
Static repository verification is complete for the module-owned source. Browser runtime, full host build, and E2E remain `NOT VERIFIED` because those host-level dependencies are not included in the supplied module-only archive.

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

