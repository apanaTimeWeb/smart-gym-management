# attendance Backend Feature Map

## Module Purpose
The Attendance module records and queries Trainer/member attendance within the authenticated Trainer scope. Member attendance and Trainer self-attendance use the same tenant-scoped persistence boundary while keeping ownership checks inside feature services. Mutations use the canonical idempotency and audit infrastructure, and the module MUST NOT expose tenant-wide export capabilities because Rule 119 reserves those to the top-level admin role.

## Directory Structure
| File | Responsibility |
|---|---|
| `trainer-attendance-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-attendance-exceptions.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-attendance-record.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-attendance-record.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-attendance-record.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-attendance.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-attendance.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-attendance-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-attendance-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-attendance-checkout-attendance.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-attendance-create-attendance.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-attendance-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-attendance-repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-attendance-checkout.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-attendance-create.service.spec.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-attendance-create.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-attendance-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/attendance` | GET | Returns filtered attendance records for the authenticated Trainer. |
| `/trainer/attendance/stats` | GET | Returns Trainer-scoped attendance KPI counts. |
| `/trainer/attendance/members-basic` | GET | Returns authorized member options for attendance entry. |
| `/trainer/attendance/today-stats` | GET | Returns a backend-only today-stat compatibility capability; not consumed by current frontend. |
| `/trainer/attendance` | POST | Creates one Trainer/member attendance record. |
| `/trainer/attendance/checkout/:staffId` | PATCH | Closes the authenticated Trainer staff-attendance record. |

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
| trainer_attendance_records | CHK_trainer_attendance_records_duration |
| trainer_attendance_records | FK_trainer_attendance_records_trainer_members_member_id |
| trainer_attendance_records | PK_trainer_attendance_records |
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

- `trainer-attendance-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-attendance-exceptions.ts` — owns one isolated feature artifact responsibility; it must not contain unrelated sibling-feature logic.
- `trainer-attendance-record.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-attendance-record.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-attendance-record.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-attendance.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-attendance.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `controllers/trainer-attendance-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-attendance-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-attendance-checkout-attendance.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-attendance-create-attendance.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-attendance-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `repositories/trainer-attendance-repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-attendance-checkout.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-attendance-create.service.spec.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-attendance-create.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-attendance-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/attendance` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/attendance/stats` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/attendance/members-basic` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/attendance/today-stats` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/attendance` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/attendance/checkout/:staffId` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| ATT-001 | GET | /trainer/attendance | TrainerAttendanceQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>date: string (optional)<br>type: AttendanceRecordType (optional)<br>staffId: string (optional)<br>sortBy: string (optional) | TrainerAttendanceListResponseDto<br>attendance: TrainerAttendanceRecordResponseDto[]<br>total: number<br>page: number<br>limit: number | query | OK |
| ATT-002 | GET | /trainer/attendance/stats | — | TrainerAttendanceStatsResponseDto<br>totalCheckIns: number<br>memberCheckIns: number<br>staffCheckIns: number | — | OK |
| ATT-003 | GET | /trainer/attendance/members-basic | — | TrainerAttendanceMemberOptionResponseDto[]<br>array of TrainerAttendanceMemberOptionResponseDto (id: string, name: string, phone: string optional) | — | OK |
| ATT-004 | POST | /trainer/attendance | TrainerAttendanceCreateAttendanceDto<br>type: AttendanceRecordType (optional)<br>memberId: string (optional)<br>staffId: string (optional)<br>date: string (optional)<br>checkIn: string (optional)<br>checkOut: string (optional)<br>checkInMethod: AttendanceCheckInMethod (optional)<br>notes: string (optional)<br>isSelfCheckIn: boolean (optional) | TrainerAttendanceRecordResponseDto<br>id: string<br>type: 'MEMBER' | 'STAFF'<br>date: string<br>checkIn: string (optional)<br>checkOut: string (optional)<br>durationMinutes: number (optional)<br>checkInMethod: string (optional)<br>notes: string (optional)<br>staffId: string (optional)<br>memberId: string (optional)<br>member: TrainerAttendanceMemberResponseDto (optional)<br>staff: TrainerAttendanceMemberResponseDto (optional) | body | CREATED |
| ATT-005 | POST | /trainer/attendance | TrainerAttendanceCreateAttendanceDto<br>type: AttendanceRecordType (optional)<br>memberId: string (optional)<br>staffId: string (optional)<br>date: string (optional)<br>checkIn: string (optional)<br>checkOut: string (optional)<br>checkInMethod: AttendanceCheckInMethod (optional)<br>notes: string (optional)<br>isSelfCheckIn: boolean (optional) | TrainerAttendanceRecordResponseDto<br>id: string<br>type: 'MEMBER' | 'STAFF'<br>date: string<br>checkIn: string (optional)<br>checkOut: string (optional)<br>durationMinutes: number (optional)<br>checkInMethod: string (optional)<br>notes: string (optional)<br>staffId: string (optional)<br>memberId: string (optional)<br>member: TrainerAttendanceMemberResponseDto (optional)<br>staff: TrainerAttendanceMemberResponseDto (optional) | body | CREATED |
| ATT-006 | PATCH | /trainer/attendance/checkout/:staffId | TrainerAttendanceCheckoutAttendanceDto<br>checkoutAt: string (optional)<br>checkOutTime: string (optional) | null | body+path | OK |

### UI-Required Fields
Paginated attendance rows, statistics, member selector, and check-in/out metadata.

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
- Additional route: GET /trainer/attendance/today-stats.

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

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- Trainer checkout uses the typed attendance exception boundary; request validation remains global and tenant-scoped.
---

## Fix V2 Contract
- Attendance response fields that are optional in the frontend schema must be omitted when the persistence value is `null`.

## Fix V2 Implementation Status
- Updated `AttendanceRecordMapper` and its domain contract to omit nullable optional fields.
- Related member/staff contact fields are normalized so null phone/email values are omitted.
- Added a co-located mapper regression test.
