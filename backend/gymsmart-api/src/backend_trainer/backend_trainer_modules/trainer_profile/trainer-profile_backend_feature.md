# profile Backend Feature Map

## Module Purpose
The Profile module owns the authenticated Trainer profile read, profile update, and password-change workflows. Every mutation is scoped to the current authenticated Trainer and uses repository-owned persistence. Credential values must never appear in logs or responses, and profile serialization must remain compatible with the frozen frontend contract.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-profile-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-profile-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-profile-change-password.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-profile-update-trainer-profile.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-profile-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-profile-trainer-profile.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-profile-trainer-profile.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-profile-trainer-profile.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-profile.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-profile.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-profile-trainer-profile.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-profile-trainer-password-change.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-profile-trainer-profile-read.service.spec.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-profile-trainer-profile-read.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-profile-trainer-profile-update.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/profile` | GET | Returns the authenticated Trainer profile. |
| `/trainer/profile` | PATCH | Updates the authenticated Trainer profile. |
| `/trainer/profile/password` | PATCH | Changes the authenticated Trainer password. |

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
| trainer_profiles | CHK_trainer_profiles_currency_code |
| trainer_profiles | PK_trainer_profiles |
| trainer_profiles | UQ_trainer_profiles_user_id |
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

- `controllers/trainer-profile-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-profile-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-profile-change-password.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-profile-update-trainer-profile.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `trainer-profile-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-profile-trainer-profile.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-profile-trainer-profile.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-profile-trainer-profile.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-profile.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-profile.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `repositories/trainer-profile-trainer-profile.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-profile-trainer-password-change.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-profile-trainer-profile-read.service.spec.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-profile-trainer-profile-read.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-profile-trainer-profile-update.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/profile` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/profile` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/profile/password` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| PROF-001 | GET | /trainer/profile | — | TrainerProfileResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>role: string<br>specialization: string[]<br>joinedAt: string<br>avatarInitial: string<br>certifications: string[] (optional)<br>specialties: string[] (optional)<br>emergencyContact: TrainerProfileEmergencyContactResponseDto (optional)<br>bio: string (optional)<br>experienceYears: number (optional)<br>profilePhotoUrl: string (optional)<br>languagesSpoken: string[] (optional) | — | OK |
| PROF-002 | PATCH | /trainer/profile | TrainerProfileUpdateTrainerProfileDto<br>name: string<br>phone: string<br>specialization: string[] | TrainerProfileResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>role: string<br>specialization: string[]<br>joinedAt: string<br>avatarInitial: string<br>certifications: string[] (optional)<br>specialties: string[] (optional)<br>emergencyContact: TrainerProfileEmergencyContactResponseDto (optional)<br>bio: string (optional)<br>experienceYears: number (optional)<br>profilePhotoUrl: string (optional)<br>languagesSpoken: string[] (optional) | body | OK |
| PROF-003 | PATCH | /trainer/profile/password | TrainerProfileChangePasswordDto<br>currentPassword: string<br>newPassword: string<br>confirmPassword: string | null | body | OK |

### UI-Required Fields
Identity, specialization, joinedAt, optional certifications/specialties/emergency contact/bio/experience/language fields.

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
- `PATCH /trainer/profile/password` returns canonical `data: null` on success.
- Password business failures use typed profile exceptions and never expose credentials.

---

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- Password change returns `data: null` on success and uses typed profile exceptions.
---

## Fix V2 Contract
- Optional Trainer profile fields must be omitted when their persistence value is `null`; emergency contact data must match the frontend object shape.

## Fix V2 Implementation Status
- Updated `ProfileTrainerProfileMapper` and its domain contract to normalize optional values.
- Added emergency-contact mapping and a co-located regression test.
