# progress-tracking Backend Feature Map

## Module Purpose
The Progress Tracking module records and queries Trainer-visible member measurement history and summaries. Entry reads, writes, and deletion are restricted to members the Trainer is authorized to manage. Summary responses must be semantically complete for the frozen frontend contract and must never expose fields as undefined placeholders.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-progress-tracking-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-progress-tracking-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-progress-tracking-create-progress-entry.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-progress-tracking-progress-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-progress-tracking-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-progress-tracking-update-progress-entry.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking-progress-entry.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking-progress-entry.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking-progress-entry.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking.interfaces.ts` | Defines application-level feature contracts without ORM coupling. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-progress-tracking.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-progress-tracking-repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-progress-tracking-authorization.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-progress-tracking-command.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-progress-tracking-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/progress-tracking/members` | GET | Returns Trainer-visible member options. |
| `/trainer/progress-tracking/:memberId/entries` | GET | Returns paginated progress entries. |
| `/trainer/progress-tracking/:memberId/entries/:entryId` | GET | Returns one authorized progress entry. |
| `/trainer/progress-tracking/:memberId/summary` | GET | Returns the complete progress summary contract. |
| `/trainer/progress-tracking/:memberId/entries` | POST | Creates a progress entry. |
| `/trainer/progress-tracking/:memberId/entries/:entryId` | PATCH | Updates an authorized progress entry. |
| `/trainer/progress-tracking/:memberId/entries/:entryId` | DELETE | Soft-deletes an authorized progress entry. |

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
| trainer_progress_entries | FK_trainer_progress_entries_trainer_members_member_id |
| trainer_progress_entries | PK_trainer_progress_entries |
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

- `controllers/trainer-progress-tracking-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-progress-tracking-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-progress-tracking-create-progress-entry.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-progress-tracking-progress-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-progress-tracking-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-progress-tracking-update-progress-entry.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `trainer-progress-tracking-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-progress-tracking-progress-entry.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-progress-tracking-progress-entry.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-progress-tracking-progress-entry.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-progress-tracking.interfaces.ts` — defines application-level feature contracts without orm coupling; it must not contain unrelated sibling-feature logic.
- `trainer-progress-tracking.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-progress-tracking.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `repositories/trainer-progress-tracking-repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-progress-tracking-authorization.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-progress-tracking-command.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-progress-tracking-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/progress-tracking/members` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/progress-tracking/:memberId/entries` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/progress-tracking/:memberId/entries/:entryId` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/progress-tracking/:memberId/summary` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/progress-tracking/:memberId/entries` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/progress-tracking/:memberId/entries/:entryId` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/progress-tracking/:memberId/entries/:entryId` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| PROG-001 | GET | /trainer/progress-tracking/members | — | TrainerProgressTrackingMemberResponseDto[]<br>array of TrainerProgressTrackingMemberResponseDto (id: string, name: string) | — | OK |
| PROG-002 | GET | /trainer/progress-tracking/:memberId/entries | TrainerProgressTrackingQueryDto<br>page: number (optional)<br>limit: number (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>sortBy: string (optional)<br>sortDirection: string (optional) | TrainerProgressTrackingEntriesResponseDto<br>entries: TrainerProgressTrackingEntryResponseDto[]<br>total: number<br>page: number<br>limit: number<br>pagination: object | query+path | OK |
| PROG-003 | GET | /trainer/progress-tracking/:memberId/summary | — | TrainerProgressTrackingSummaryResponseDto<br>memberId: string<br>memberName: string<br>totalEntries: number<br>latestEntry: TrainerProgressTrackingEntryResponseDto | null<br>firstEntry: TrainerProgressTrackingEntryResponseDto | null<br>weightChangeKg: number<br>bmiChange: number<br>targetWeightKg: number (optional)<br>targetBodyFatPercent: number (optional)<br>targetDate: string (optional)<br>goalStatus: string (optional) | path | OK |
| PROG-004 | POST | /trainer/progress-tracking/:memberId/entries | TrainerProgressTrackingCreateProgressEntryDto<br>date: string<br>weightKg: number<br>heightCm: number<br>bodyFatPercent: number (optional)<br>muscleMassKg: number (optional)<br>chestCm: number (optional)<br>waistCm: number (optional)<br>hipCm: number (optional)<br>notes: string (optional)<br>bloodPressure: string (optional)<br>restingHeartRate: number (optional)<br>vo2Max: number (optional)<br>progressPhotos: string[] (optional) | TrainerProgressTrackingEntryResponseDto<br>id: string<br>memberId: string<br>date: string<br>weightKg: number<br>heightCm: number<br>bmi: number<br>bodyFatPercent: number | null (optional)<br>muscleMassKg: number | null (optional)<br>chestCm: number | null (optional)<br>waistCm: number | null (optional)<br>hipCm: number | null (optional)<br>notes: string | null (optional)<br>recordedBy: string<br>bloodPressure: string | null (optional)<br>restingHeartRate: number | null (optional)<br>vo2Max: number | null (optional)<br>progressPhotos: string[] (optional) | body+path | CREATED |
| PROG-005 | PATCH | /trainer/progress-tracking/:memberId/entries/:entryId | TrainerProgressTrackingUpdateProgressEntryDto<br>date: string (optional)<br>weightKg: number (optional)<br>heightCm: number (optional)<br>bodyFatPercent: number (optional)<br>muscleMassKg: number (optional)<br>chestCm: number (optional)<br>waistCm: number (optional)<br>hipCm: number (optional)<br>notes: string (optional)<br>bloodPressure: string (optional)<br>restingHeartRate: number (optional)<br>vo2Max: number (optional)<br>progressPhotos: string[] (optional) | TrainerProgressTrackingEntryResponseDto<br>id: string<br>memberId: string<br>date: string<br>weightKg: number<br>heightCm: number<br>bmi: number<br>bodyFatPercent: number | null (optional)<br>muscleMassKg: number | null (optional)<br>chestCm: number | null (optional)<br>waistCm: number | null (optional)<br>hipCm: number | null (optional)<br>notes: string | null (optional)<br>recordedBy: string<br>bloodPressure: string | null (optional)<br>restingHeartRate: number | null (optional)<br>vo2Max: number | null (optional)<br>progressPhotos: string[] (optional) | body+path | OK |
| PROG-006 | DELETE | /trainer/progress-tracking/:memberId/entries/:entryId | — | null | path | OK |

### UI-Required Fields
Progress entries, summary, weight/BMI/body composition metrics, goals, optional photos and notes.

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
- Additional route: GET /trainer/progress-tracking/:memberId/entries/:entryId.

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
- Existing member-scoped query/command boundaries remain unchanged; no new cross-feature imports were introduced.
---

## Fix V3 Contract
- Progress summary `latestEntry` and `firstEntry` must use the same mapped numeric/nullable semantics as paginated entry responses.

## Fix V3 Implementation Status
- Summary raw query rows are explicitly normalized into the progress entry domain shape before being returned.
- Numeric PostgreSQL values are converted to numbers so the frontend `ProgressEntrySchema` contract remains valid.
- Added a co-located summary contract regression test.

