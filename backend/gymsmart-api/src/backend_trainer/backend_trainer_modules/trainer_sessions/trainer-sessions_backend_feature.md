# sessions Backend Feature Map

## Module Purpose
The Sessions module owns Trainer session scheduling, editing, cancellation/no-show state, member lookup, and attendance marking. Session attendance uses a pessimistic write lock to prevent concurrent counter corruption, and session mutations are scoped to Trainer-owned records. Frontend-visible enum labels are translated from canonical database values at the response boundary.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-sessions-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-sessions-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-sessions-cancel-session.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-sessions-create-session.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-sessions-mark-session-attendance.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-sessions-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-sessions-update-session.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-sessions-repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-sessions-authorization.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-sessions-command.service.spec.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-sessions-command.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-sessions-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions-enum.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions-exceptions.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions-session.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions-session.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions-session.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-sessions.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/sessions` | GET | Returns paginated Trainer-owned sessions. |
| `/trainer/sessions/members` | GET | Returns Trainer-visible member options. |
| `/trainer/sessions` | POST | Creates a Trainer-owned session. |
| `/trainer/sessions/:id` | PATCH | Updates a Trainer-owned session. |
| `/trainer/sessions/:id/cancel` | POST | Marks a Trainer-owned session as no-show/cancelled. |
| `/trainer/sessions/:id/attendance` | POST | Records selected enrolled-member attendance under a transaction lock. |
| `/trainer/sessions/:id` | DELETE | Deprecated compatibility cancellation route; not used by current frontend. |

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
| trainer_sessions | FK_trainer_sessions_trainer_members_member_id |
| trainer_sessions | PK_trainer_sessions |
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

- `controllers/trainer-sessions-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-sessions-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-sessions-cancel-session.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-sessions-create-session.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-sessions-mark-session-attendance.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-sessions-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-sessions-update-session.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `repositories/trainer-sessions-repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-sessions-authorization.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-sessions-command.service.spec.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-sessions-command.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-sessions-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `trainer-sessions-enum.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-sessions-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-sessions-exceptions.ts` — owns one isolated feature artifact responsibility; it must not contain unrelated sibling-feature logic.
- `trainer-sessions-session.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-sessions-session.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-sessions-session.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-sessions.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-sessions.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/sessions` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/sessions/members` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/sessions` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/sessions/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/sessions/:id/cancel` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/sessions/:id/attendance` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/sessions/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| SESS-001 | GET | /trainer/sessions?date= | TrainerSessionsQueryDto<br>page: number (optional)<br>limit: number (optional)<br>date: string (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>status: SessionStatus (optional)<br>sortBy: string (optional)<br>sortDirection: string (optional) | TrainerSessionsSessionResponseDto[]<br>array of TrainerSessionsSessionResponseDto (id: string, title: string, type: string, time: string, sessionDate: string, duration: string, status: string, attendees: number, maxAttendees: number optional, member: string optional, isOnline: boolean, enrolledMembers: TrainerSessionsEnrolledMemberResponseDto[] optional, sessionNotes: string optional, location: string optional, room: string optional, trainerNotes: string optional, memberRating: number optional, cancellationReason: string optional, recurrenceRule: string optional, recurrenceEndDate: string optional) | query | OK |
| SESS-002 | GET | /trainer/sessions/members | — | TrainerSessionsMemberResponseDto[]<br>array of TrainerSessionsMemberResponseDto (id: string, name: string) | — | OK |
| SESS-003 | POST | /trainer/sessions | TrainerSessionsCreateSessionDto<br>memberId: string (optional)<br>date: string<br>time: string<br>duration: string<br>type: SessionType<br>recurrenceType: SessionRecurrence (optional)<br>recurrenceEndDate: string (optional)<br>location: string (optional)<br>room: string (optional) | TrainerSessionsSessionResponseDto<br>id: string<br>title: string<br>type: string<br>time: string<br>sessionDate: string<br>duration: string<br>status: string<br>attendees: number<br>maxAttendees: number (optional)<br>member: string (optional)<br>isOnline: boolean<br>enrolledMembers: TrainerSessionsEnrolledMemberResponseDto[] (optional)<br>sessionNotes: string (optional)<br>location: string (optional)<br>room: string (optional)<br>trainerNotes: string (optional)<br>memberRating: number (optional)<br>cancellationReason: string (optional)<br>recurrenceRule: string (optional)<br>recurrenceEndDate: string (optional) | body | CREATED |
| SESS-004 | PATCH | /trainer/sessions/:id | TrainerSessionsUpdateSessionDto<br>memberId: string | null (optional)<br>date: string (optional)<br>time: string (optional)<br>duration: string (optional)<br>type: SessionType (optional)<br>recurrenceType: SessionRecurrence (optional)<br>recurrenceEndDate: string (optional)<br>location: string (optional)<br>room: string (optional) | TrainerSessionsSessionResponseDto<br>id: string<br>title: string<br>type: string<br>time: string<br>sessionDate: string<br>duration: string<br>status: string<br>attendees: number<br>maxAttendees: number (optional)<br>member: string (optional)<br>isOnline: boolean<br>enrolledMembers: TrainerSessionsEnrolledMemberResponseDto[] (optional)<br>sessionNotes: string (optional)<br>location: string (optional)<br>room: string (optional)<br>trainerNotes: string (optional)<br>memberRating: number (optional)<br>cancellationReason: string (optional)<br>recurrenceRule: string (optional)<br>recurrenceEndDate: string (optional) | body+path | OK |
| SESS-005 | POST | /trainer/sessions/:id/cancel | TrainerSessionsCancelSessionDto<br>reason: string (optional) | null | body+path | OK |
| SESS-006 | POST | /trainer/sessions/:id/attendance | TrainerSessionsMarkSessionAttendanceDto<br>memberIds: string[] | null | body+path | OK |

### UI-Required Fields
Session identity, time/status/member/enrollment/location/recurrence fields.

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
- DELETE /trainer/sessions/:id is retained as deprecated soft-cancel compatibility; POST /trainer/sessions/:id/cancel is frozen.

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
- Current frontend cancellation contract is `POST /trainer/sessions/:id/cancel`; success response data is `null`.
- `DELETE /trainer/sessions/:id` is retained only as deprecated cancellation compatibility and never hard-deletes data.
- Session list responses expose `data: Session[]` with pagination metadata at canonical envelope level.

---

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- Cancel returns `data: null`; DELETE remains deprecated soft-cancel compatibility. Session list keeps canonical data/meta envelope.

---

## Fix V2 Contract
- `GET /trainer/sessions` and session mutation responses must omit optional fields when the tenant persistence value is `null`.
- The API must not expose `null` for frontend schema fields declared as optional-only (`maxAttendees`, `member`, `sessionNotes`, `location`, `room`, `trainerNotes`, `memberRating`, `cancellationReason`, `recurrenceRule`).

## Fix V2 Implementation Status
- Updated `SessionsSessionMapper` to normalize persistence nulls into omitted optional response properties.
- Updated the session domain response contract to match the frontend optional-field semantics.
- Added a co-located mapper regression test covering both empty nullable persistence and populated optional fields.


## Repair V1 Amendment
Sessions Repair V1: the frozen response contract includes optional `recurrenceEndDate`; member display resolves the trainer-owned member name instead of exposing the UUID; empty `memberId` is normalized; recurrence end dates are persisted in the tenant schema and provisioning migrations.
