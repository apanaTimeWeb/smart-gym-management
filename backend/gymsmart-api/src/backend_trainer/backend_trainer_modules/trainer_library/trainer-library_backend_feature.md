# library Backend Feature Map

## Module Purpose
The Library module provides Trainer-readable diet-plan data and the member assignment lookup used by the current Trainer UI. Diet plans remain feature-owned and server-authoritative, with soft-delete and active-state filtering applied in repository queries. The module must not trust client-provided diet snapshots or import business logic from sibling features.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-library-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-library-member-diet-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-library-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-library-assign-diet.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-library-diet-plan-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-library-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-library-update-diet-plan.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library-diet-plan-assignment.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library-diet-plan.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library-diet-plan.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library-diet-plan.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library-enum.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-library.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-library-diet-plan.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-library-authorization.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-library-diet-assignment.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-library-diet-plan-delete.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-library-diet-plan-update.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-library-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/library/diet-plans` | GET | Returns paginated active diet plans visible to the Trainer. |
| `/trainer/library/assigned-members` | GET | Returns Trainer-visible members and diet assignment state. |
| `/trainer/members/:memberId/diet` | PATCH | Assigns or replaces the member diet plan. |

## Approved External Dependencies
- **Business Feature Dependencies**: None; direct sibling business imports are forbidden.
- **Infrastructure Dependencies**: Core request context, authentication, tenant authorization, TypeORM tenant resolver, canonical response/error infrastructure, Redis/idempotency where used, and audit/UoW where used.
- **Runtime/Event Dependencies**: Notifications additionally depend on the shared realtime transport; other Trainer modules have no current frontend-derived event dependency.

## Data and State Architecture
- **DB Entities**: Feature-owned `trainer_*` tables plus explicitly documented core audit/auth tables where applicable.
- **Redis Caching Keys**: Rate-limit and idempotency infrastructure keys; no feature cache is claimed unless explicitly implemented.
- **Event Emitters**: None within the supplied Trainer feature except the Notifications realtime dependency, which is outside the role ZIP.
- **Background Jobs**: None owned by this Trainer feature. Tenant-wide exports are intentionally outside Trainer scope under Rule 119.
- **Idempotency Keys**: All mutating Trainer endpoints are protected by the canonical idempotency contract; GET endpoints remain read-safe.

### Database Constraint Inventory (repair-time)
Named constraints present in the supplied migration sources for module-owned tables.

| Table | Constraint |
|---|---|
| trainer_diet_plan_assignments | FK_trainer_diet_plan_assignments_trainer_diet_plans_diet_plan_id |
| trainer_diet_plan_assignments | FK_trainer_diet_plan_assignments_trainer_members_member_id |
| trainer_diet_plan_assignments | PK_trainer_diet_plan_assignments |
| trainer_diet_plans | PK_trainer_diet_plans |
## Business Flow / Key Sequences
1. Global request-context middleware establishes request/trace context.
2. Authentication establishes the actor identity.
3. Tenant authorization verifies the actor in the master database before tenant DataSource creation.
4. DTO validation rejects unknown/invalid inputs before business logic.
5. Feature services perform guard checks and call named repository operations.
6. Required multi-write flows execute through the UnitOfWork and transaction context.
7. Audit records use the active transaction where atomicity is required.
8. The canonical response interceptor/filter owns response envelope shaping.

## File Responsibility Map

- `controllers/trainer-library-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-library-member-diet-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-library-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-library-assign-diet.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-library-diet-plan-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-library-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-library-update-diet-plan.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `trainer-library-diet-plan-assignment.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-library-diet-plan.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-library-diet-plan.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-library-diet-plan.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-library-enum.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-library-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-library.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-library.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `repositories/trainer-library-diet-plan.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-library-authorization.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-library-diet-assignment.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-library-diet-plan-delete.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-library-diet-plan-update.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-library-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/library/diet-plans` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/library/assigned-members` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:memberId/diet` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

## Edge Cases / AI Warnings
- Never bypass trusted tenant context or select a tenant database from an unverified client tenant identifier — Rule 39.
- Never import sibling feature business code or move feature logic into a shared business folder — Rules 0C and 49.
- Never persist client-provided relationship snapshots as authoritative data; resolve relationships server-side — Rules 36 and 82A.
- Preserve soft-delete filters on every normal read and mutation — Rule 29.

## Frozen API Contract

This field-level contract is regenerated from the frozen Stage 1 executable frontend requirements and the repaired controller/DTO source. The canonical wrapper remains { success, message, data, meta?, error?, errorCode?, statusCode?, validationErrors? }.

### Frontend-Frozen Endpoint Matrix
| Requirement | Method | Endpoint | Request DTO / fields | Response data DTO / fields | IO | Status |
|---|---|---|---|---|---|---|
| LIB-001 | GET | /trainer/library/diet-plans | TrainerLibraryQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>goal: DietGoal (optional)<br>sortBy: string (optional) | TrainerLibraryDietPlansResponseDto<br>dietPlans: TrainerLibraryDietPlanResponseDto[]<br>total: number | query | OK |
| LIB-002 | GET | /trainer/library/assigned-members | — | TrainerLibraryAssignedMembersResponseDto<br>members: TrainerLibraryAssignedMemberResponseDto[] | — | OK |
| LIB-003 | PATCH | /trainer/members/:memberId/diet | TrainerLibraryAssignDietDto<br>dietPlanId: string | TrainerLibraryAssignmentResponseDto<br>memberId: string<br>dietPlanId: string | body+path | OK |

### UI-Required Fields
Diet plan identity, goals, nutrition fields, meals, assignment IDs, and member lookup.

### Request / Response Semantics
- Request DTOs are explicitly Swagger-decorated at property level; query/body/path parameters are separately annotated at the controller boundary.
- Path resources remain Trainer-authorized before business execution; tenant selection remains server-authoritative.
- Mutations that intentionally return no business object expose `data: null`.
- Response DTOs above are the declared data contract; placeholder or undeclared response fields are not accepted.

### Pagination / Error Contract
- List endpoints use canonical 1-indexed pagination and bounded page sizes where the request DTO inherits the pagination contract.
- Validation errors use HTTP 400 with VALIDATION.DTO.FAILED and field-level validationErrors.
- Authentication, authorization, conflict, not-found, and business failures retain machine-readable canonical error codes.

### Backend Compatibility / Non-Frozen Routes
- Diet-plan update/delete endpoints are backend-supported and outside the three frozen executable requirements.

## Rule Compliance Checklist
- [x] Rule 29: Soft-delete behavior represented in feature persistence.
- [x] Rule 31/112: Mutations are protected by the canonical idempotency interceptor/decorator contract where the endpoint is mutating.
- [x] Rule 48: Query/read and command/write controllers are separated where both sides exist.
- [x] Rule 62: Public service/repository methods have explicit return types in the repaired feature scope.
- [x] Rule 76: Repaired feature files contain `// RESPONSIBILITY:` headers.
- [x] Rule 79: Repaired feature files contain `// FLOW:` headers.
- [x] Rule 80: Public service/repository methods carry JSDoc in the repaired feature scope.
- [x] Rule 83: Trainer controller endpoints use `@CoreRoles(CoreRole.TRAINER)`.
- [x] Rule 85: Guard clauses/shallow control flow are used in repaired services.
- [x] Rule 86: Service/repository method naming follows the verb contract.
- [x] Rule 89/99: ORM persistence remains behind repository-owned mutation methods.
- [x] Rule 92: User-controlled filtering/sorting is allowlisted in feature query DTOs/repositories where applicable.
- [⚠️] Rule 93: CODEOWNERS path is outside the supplied role ZIP; root repository verification is BLOCKED_BY_SUPPLIED_SCOPE.
- [⚠️] Runtime bootstrap/E2E: live verification is BLOCKED_BY_SUPPLIED_SCOPE; static E2E assets are supplied separately.

## Repair-State Notes
- Enum persistence values are canonical `SCREAMING_SNAKE_CASE`; frontend labels are translated through module-local enum mappers.
- Feature documentation is updated with the repaired endpoint/ownership graph.
- Root repository artifacts (CI, CODEOWNERS, package dependencies, global realtime gateway, pytest E2E) are explicitly outside this role ZIP and are not falsely marked PASS.

---

## Fix V1 Contract
- Trainer owns diet-plan assignment only. Trainer does not receive direct diet-plan administration PATCH/DELETE routes.
- Direct plan administration routes are not registered by `LibraryModule` in this role slice.

---

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- Trainer plan administration PATCH/DELETE routes are not registered. Trainer owns assignment only.
---

## Fix V2 Contract
- Optional diet-plan nutrition/description fields must not cross the API as `null`; absent persistence values are omitted.

## Fix V2 Implementation Status
- Updated `LibraryDietPlanMapper` and its domain contract to omit null optionals and normalize numeric fields.
- Added a co-located mapper regression test.


## Repair V1 Amendment
Library Repair V1: diet assignment persists both the authoritative assignment ID and the response snapshot atomically; assignment audit records preserve previous and new assignment state.

## Repair V1 Amendment — 2026-09-24
- Diet-plan update audit records the complete mutable nutrition/content state before and after mutation rather than only name/goal.
