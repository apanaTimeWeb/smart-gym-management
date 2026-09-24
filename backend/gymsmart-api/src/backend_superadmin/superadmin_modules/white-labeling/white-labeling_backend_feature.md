# white-labeling Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/white-labeling feature. It exposes 10 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `superadmin-white-labeling-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-white-labeling-domains-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-white-labeling-domains-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-white-labeling-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-white-labeling.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-white-labeling.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-white-labeling.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-white-labeling.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-white-labeling.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-white-labeling.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-white-labeling.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `white-labeling_dtos/superadmin-white-labeling-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling_dtos/superadmin-white-labeling-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling_dtos/superadmin-white-labeling-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling_dtos/superadmin-white-labeling-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling_responses/superadmin-white-labeling-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `white-labeling_services/superadmin-white-labeling-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_services/superadmin-white-labeling-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_services/superadmin-white-labeling-domains.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_services/superadmin-white-labeling-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_services/superadmin-white-labeling-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_services/superadmin-white-labeling-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_services/superadmin-white-labeling-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `white-labeling_types/superadmin-white-labeling.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `white-labeling_types/superadmin-white-labeling.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-white-labeling-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the create operation. | `SuperadminWhiteLabelingCreateDto` | `See controller contract` |
| `superadmin-white-labeling-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the update operation. | `SuperadminWhiteLabelingUpdateDto` | `See controller contract` |
| `superadmin-white-labeling-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-white-labeling-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the changeStatus operation. | `SuperadminWhiteLabelingStatusDto` | `See controller contract` |
| `superadmin-white-labeling-domains-command.controller.ts::status` | PATCH | `superadmin/white-labeling/domains/:id/status` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the status operation. | `SuperadminWhiteLabelingStatusDto` | `See controller contract` |
| `superadmin-white-labeling-domains-command.controller.ts::status` | PATCH | `api/superadmin/white-labeling/domains/:id/status` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the status operation. | `SuperadminWhiteLabelingStatusDto` | `See controller contract` |
| `superadmin-white-labeling-domains-query.controller.ts::domains` | GET | `superadmin/white-labeling/domains` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the domains operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-white-labeling-domains-query.controller.ts::domains` | GET | `api/superadmin/white-labeling/domains` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the domains operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-white-labeling-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the findAll operation. | `SuperadminWhiteLabelingQueryDto` | `See controller contract` |
| `superadmin-white-labeling-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning white-labeling use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-white-labeling.entity → `superadmin_white_label_domains`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/api/superadmin/white-labeling/domains/:id/status`, `/superadmin/white-labeling`, `/superadmin/white-labeling/:id`, `/superadmin/white-labeling/:id/status`, `/superadmin/white-labeling/domains/:id/status`

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/white-labeling` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/white-labeling/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/white-labeling/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/white-labeling/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/white-labeling/domains/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /api/superadmin/white-labeling/domains/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/white-labeling/domains` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/white-labeling/domains` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/white-labeling` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/white-labeling/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `white-labeling/superadmin_white-labeling_features.md`

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `getDomains` | GET | configured White-labeling domains endpoint | normalized search/filter params | domain list + pagination metadata |
| `updateDomainStatus` | PATCH | configured domain-status endpoint | domain identifier + next status | updated domain record |

All responses are runtime-validated at the module API boundary before application consumption.

### UI-Required Data Evidence

#### Source: `white-labeling/superadmin_white-labeling_features.md`

| UI Element | Required Field(s) | API Endpoint | Nullable? | Mocked? |
|---|---|---|---|---|
| Domain table identifier | domain/tenant identifier + domain name | `getDomains` | Per schema | Yes |
| Domain status badge | domain status | `getDomains`, `updateDomainStatus` | No | Yes |
| SSL status | SSL/domain health status | `getDomains` | Per schema | Yes |
| Tenant name | tenant name | `getDomains` | Per schema | Yes |
| Search result count | pagination/result metadata | `getDomains` | Per schema | Yes |
| Selected drawer status | selected domain status | `getDomains`, `updateDomainStatus` | No | Yes |

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``{api}{suffix}`` | ``WhiteLabelDomainsListResponse`` | `REQ-132` / ``getDomains`` |
| ``/api/superadmin/white-labeling/domains/{id}/status(id)`` | ``UpdateDomainStatusResponse`` | `REQ-133` / ``updateDomainStatus`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

| UI Element | Required Field(s) | API Endpoint | Nullable? | Mocked? |
|---|---|---|---|---|
| Domain table identifier | domain/tenant identifier + domain name | `getDomains` | Per schema | Yes |
| Domain status badge | domain status | `getDomains`, `updateDomainStatus` | No | Yes |
| SSL status | SSL/domain health status | `getDomains` | Per schema | Yes |
| Tenant name | tenant name | `getDomains` | Per schema | Yes |
| Search result count | pagination/result metadata | `getDomains` | Per schema | Yes |
| Selected drawer status | selected domain status | `getDomains`, `updateDomainStatus` | No | Yes |


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


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

