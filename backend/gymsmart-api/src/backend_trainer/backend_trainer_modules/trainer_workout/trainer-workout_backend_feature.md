# workout Backend Feature Map

## Module Purpose
The Workout module owns Trainer workout-plan and exercise-library CRUD plus server-side search, filtering, sorting, and pagination. Workout ownership is Trainer-scoped and all mutations remain behind repository-owned methods. Canonical database enums are normalized while module mappers preserve the existing frontend labels.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-workout-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-workout-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-workout-create-exercise.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-workout-create-workout.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-workout-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-workout-update-exercise.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-workout-update-workout.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-workout-create-workout-exercise.dto.ts` | Validates one nested workout-exercise item in create/update plan requests. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-workout-exercises.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-workout-repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-workout-command.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-workout-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout-enum.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout-exercise.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout-exercise.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout-exercise.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout-trainer-workout.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-workout.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/workout` | GET | Returns the legacy overview contract for compatibility. |
| `/trainer/workout/workouts` | GET | Returns paginated Trainer-owned workout plans. |
| `/trainer/workout/workouts/:id` | GET | Returns one Trainer-owned workout plan. |
| `/trainer/workout/workouts` | POST | Creates a Trainer-owned workout plan. |
| `/trainer/workout/workouts/:id` | PATCH | Updates a Trainer-owned workout plan. |
| `/trainer/workout/workouts/:id` | DELETE | Soft-deletes a Trainer-owned workout plan. |
| `/trainer/workout/exercises` | GET | Returns paginated Trainer-owned exercise records. |
| `/trainer/workout/exercises/:id` | GET | Returns one Trainer-owned exercise. |
| `/trainer/workout/exercises` | POST | Creates a Trainer-owned exercise. |
| `/trainer/workout/exercises/:id` | PATCH | Updates a Trainer-owned exercise. |
| `/trainer/workout/exercises/:id` | DELETE | Soft-deletes a Trainer-owned exercise. |

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
| trainer_exercises | PK_trainer_exercises |
| trainer_workouts | CHK_trainer_workouts_days_positive |
| trainer_workouts | CHK_trainer_workouts_exercises_count_positive |
| trainer_workouts | FK_trainer_workouts_trainer_members_assigned_member_id |
| trainer_workouts | PK_trainer_workouts |
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

- `controllers/trainer-workout-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-workout-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-workout-create-exercise.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-workout-create-workout.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-workout-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-workout-update-exercise.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-workout-update-workout.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-workout-create-workout-exercise.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `repositories/trainer-workout-exercises.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `repositories/trainer-workout-repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-workout-command.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-workout-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `trainer-workout-enum.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-workout-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-workout-exercise.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-workout-exercise.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-workout-exercise.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-workout-trainer-workout.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-workout.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-workout.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-workout.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-workout.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-workout.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/workout` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/workouts` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/workouts/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/workouts` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/workouts/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/workouts/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/exercises` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/exercises/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/exercises` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/exercises/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/workout/exercises/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| WORK-001 | GET | /trainer/workout/workouts | TrainerWorkoutQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>category: string (optional)<br>sortBy: string (optional) | TrainerWorkoutPlanCollectionResponseDto<br>workouts: TrainerWorkoutResponseDto[]<br>total: number<br>page: number<br>limit: number<br>sortBy: string (optional)<br>sortDirection: string (optional)<br>pagination: object | query | OK |
| WORK-002 | POST | /trainer/workout/workouts | TrainerWorkoutCreateWorkoutDto<br>name: string<br>level: WorkoutLevel<br>days: number<br>exercises: number<br>focus: string<br>duration: string<br>tags: string (optional)<br>goal: string (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>instructions: string (optional)<br>assignedMemberId: string (optional)<br>workoutExercises: TrainerWorkoutCreateWorkoutExerciseDto[] (optional) | TrainerWorkoutResponseDto<br>id: string<br>name: string<br>level: string<br>days: number<br>exercises: number<br>focus: string<br>duration: string<br>tags: string[]<br>goal: string (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>instructions: string (optional)<br>assignedMemberId: string (optional)<br>workoutExercises: TrainerWorkoutPlanExerciseResponseDto[] (optional)<br>isActive: boolean (optional) | body | CREATED |
| WORK-003 | PATCH | /trainer/workout/workouts/:id | TrainerWorkoutUpdateWorkoutDto<br>name: string (optional)<br>level: WorkoutLevel (optional)<br>days: number (optional)<br>exercises: number (optional)<br>focus: string (optional)<br>duration: string (optional)<br>tags: string (optional)<br>goal: string (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>instructions: string (optional)<br>assignedMemberId: string (optional)<br>workoutExercises: TrainerWorkoutCreateWorkoutExerciseDto[] (optional) | TrainerWorkoutResponseDto<br>id: string<br>name: string<br>level: string<br>days: number<br>exercises: number<br>focus: string<br>duration: string<br>tags: string[]<br>goal: string (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>instructions: string (optional)<br>assignedMemberId: string (optional)<br>workoutExercises: TrainerWorkoutPlanExerciseResponseDto[] (optional)<br>isActive: boolean (optional) | body+path | OK |
| WORK-004 | DELETE | /trainer/workout/workouts/:id | — | null | path | OK |
| WORK-005 | GET | /trainer/workout/exercises | TrainerWorkoutQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>category: string (optional)<br>sortBy: string (optional) | TrainerWorkoutExerciseCollectionResponseDto<br>exercises: TrainerWorkoutExerciseResponseDto[]<br>total: number<br>page: number<br>limit: number<br>sortBy: string (optional)<br>sortDirection: string (optional)<br>pagination: object | query | OK |
| WORK-006 | POST | /trainer/workout/exercises | TrainerWorkoutCreateExerciseDto<br>name: string<br>category: string (optional)<br>muscle: string<br>equipment: string (optional)<br>difficulty: ExerciseDifficulty<br>instructions: string (optional)<br>videoUrl: string (optional)<br>imageUrl: string (optional)<br>reps: string (optional)<br>duration: string (optional)<br>description: string (optional) | TrainerWorkoutExerciseResponseDto<br>id: string<br>name: string<br>category: string (optional)<br>muscleGroup: string[] (optional)<br>equipment: string (optional)<br>difficulty: string<br>instructions: string (optional)<br>videoUrl: string (optional)<br>imageUrl: string (optional)<br>isActive: boolean<br>sets: number (optional)<br>reps: string (optional)<br>duration: string (optional)<br>description: string (optional) | body | CREATED |
| WORK-007 | PATCH | /trainer/workout/exercises/:id | TrainerWorkoutUpdateExerciseDto<br>name: string (optional)<br>category: string (optional)<br>muscle: string (optional)<br>equipment: string (optional)<br>difficulty: ExerciseDifficulty (optional)<br>instructions: string (optional)<br>videoUrl: string (optional)<br>imageUrl: string (optional)<br>reps: string (optional)<br>duration: string (optional)<br>description: string (optional) | TrainerWorkoutExerciseResponseDto<br>id: string<br>name: string<br>category: string (optional)<br>muscleGroup: string[] (optional)<br>equipment: string (optional)<br>difficulty: string<br>instructions: string (optional)<br>videoUrl: string (optional)<br>imageUrl: string (optional)<br>isActive: boolean<br>sets: number (optional)<br>reps: string (optional)<br>duration: string (optional)<br>description: string (optional) | body+path | OK |
| WORK-008 | DELETE | /trainer/workout/exercises/:id | — | null | path | OK |

### UI-Required Fields
Workout and exercise CRUD fields plus nested workout-exercise configuration.

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
- GET /trainer/workout is a backend overview compatibility route; the frontend CRUD freeze remains the eight WORK requirements.

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
- Workout/exercise query parameters remain backend-driven and allowlisted; no trainer business ownership changes.
---

## Fix V3 Contract
- `POST /trainer/workout/exercises` requires the frontend-required `muscle` field and must reject missing values at the DTO boundary.
- Workout create/update requests must validate every nested `workoutExercises` item instead of accepting arbitrary objects; numeric `sets`/`sortOrder` are normalized and `reps` is normalized to the frontend-compatible string representation.

## Fix V3 Implementation Status
- Added `trainer-workout-create-workout-exercise.dto.ts` with nested validation and transformation.
- Wired nested DTO validation into workout create/update DTOs.
- Made `muscle` required on workout exercise creation.
- Added co-located DTO contract regression coverage.

## Fix V2 Contract
- Workout and exercise optional frontend fields must be omitted when persistence stores `null`.

## Fix V2 Implementation Status
- Updated workout and exercise mappers/domain contracts to normalize nullable optional persistence values.
- Added co-located mapper regression tests.

## Repair V1 Amendment — 2026-09-24
- Workout-plan category filtering is now driven by the persisted `focus` field and ignores the frontend `All` sentinel.
- Exercise-library category filtering now applies the selected muscle group against the persisted JSONB muscle-group array and also ignores the `All` sentinel.
