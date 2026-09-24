# team Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/team feature. It exposes 6 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `superadmin-team-administration-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-team-alerts-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-team-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-team-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-team.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-team.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-team.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-team.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-team.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-team.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-team.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `team_dtos/superadmin-team-alert-action.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team_dtos/superadmin-team-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team_dtos/superadmin-team-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team_dtos/superadmin-team-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team_responses/superadmin-team-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `team_services/superadmin-team-alerts.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_services/superadmin-team-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_services/superadmin-team-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_services/superadmin-team-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_services/superadmin-team-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_services/superadmin-team-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_services/superadmin-team-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `team_types/superadmin-team.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `team_types/superadmin-team.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-team-administration-query.controller.ts::main` | GET | `superadmin/team` | This endpoint validates transport input, invokes the owning team use case, and returns the declared contract for the main operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-team-alerts-command.controller.ts::alerts` | PATCH | `superadmin/team/alerts` | This endpoint validates transport input, invokes the owning team use case, and returns the declared contract for the alerts operation. | `SuperadminTeamAlertActionDto` | `See controller contract` |
| `superadmin-team-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning team use case, and returns the declared contract for the create operation. | `SuperadminTeamCreateDto` | `See controller contract` |
| `superadmin-team-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning team use case, and returns the declared contract for the update operation. | `SuperadminTeamUpdateDto` | `See controller contract` |
| `superadmin-team-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning team use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-team-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning team use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_observability, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-team.entity → `superadmin_team_snapshots`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/team`, `/superadmin/team/:id`, `/superadmin/team/alerts`

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
| `GET /superadmin/team` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/team/alerts` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/team` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/team/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/team/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/team/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `team/superadmin_team_features.md`

- **API files:** `team_api/SuperadminTeamApi.ts`
- **Detected API symbols:** `fetchTeam` — `team_api/SuperadminTeamApi.ts`; `updateTeamAlertPreferences` — `team_api/SuperadminTeamApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `team/superadmin_team_features.md`

- **Data-bearing components:** `page.tsx`, `team_components/SuperadminTeamRoleGroupsEmptyState.tsx`, `team_components/SuperadminTeamMembersEmptyState.tsx`, `team_components/SuperadminTeamMembersPanel.tsx`, `team_components/SuperadminTeamAlertPreferencesEmptyState.tsx`, `team_components/SuperadminTeamPageHeader.tsx`, `team_components/SuperadminTeamRolesAndAlertPreferencesPanel.tsx`, `team_components/SuperadminTeamClient.tsx`, `team_components/SuperadminTeamSummaryCards.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``/superadmin/team`` | ``ApiResponse<SuperadminTeamResponse>`` | `REQ-122` / ``fetchTeam`` |
| ``/superadmin/team/alerts`` | ``ApiResponse<null>`` | `REQ-123` / ``updateTeamAlertPreferences`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `team_components/SuperadminTeamRoleGroupsEmptyState.tsx`, `team_components/SuperadminTeamMembersEmptyState.tsx`, `team_components/SuperadminTeamMembersPanel.tsx`, `team_components/SuperadminTeamAlertPreferencesEmptyState.tsx`, `team_components/SuperadminTeamPageHeader.tsx`, `team_components/SuperadminTeamRolesAndAlertPreferencesPanel.tsx`, `team_components/SuperadminTeamClient.tsx`, `team_components/SuperadminTeamSummaryCards.tsx`
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


## Repair Notes — v1
- Team-alert mutations preserve the frontend contract with `data: null`; audit metadata is recorded server-side.
- Team-alert audit records use the authenticated `requestId` context identity (`userId`, role, IP, tenant) and MUST NOT fabricate `system` or `unknown` values for HTTP-originated actions.
