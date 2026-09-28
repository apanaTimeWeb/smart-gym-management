# members Backend Feature Map

## Module Purpose
The Members module owns Trainer member listing, member detail, assessment updates, assignment relationships, notes, progress reads, and attendance reads. Relationship snapshots are derived from authoritative tenant data after resource authorization rather than trusted from the client. Member detail must provide every frozen frontend field, including authoritative workout history, without importing sibling feature business services.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-members-command.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `controllers/trainer-members-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-members-create-member-note.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-members-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-members-update-member.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-enum.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-member-note.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-member-note.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-member-note.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-member.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-member.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members-member.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members.interfaces.ts` | Defines application-level feature contracts without ORM coupling. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-members.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-members-repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-members-assessment-encryption-repair.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-members-authorization.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-members-note.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-members-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-members-update.service.spec.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-members-update.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/members` | GET | Returns a paginated, searchable, filterable member list. |
| `/trainer/members/stats` | GET | Returns Trainer-scoped member KPI counts. |
| `/trainer/members/:id` | GET | Returns complete member detail including authoritative workout history. |
| `/trainer/members/:id/notes` | GET | Returns active Trainer notes. |
| `/trainer/members/:id/attendance` | GET | Returns Trainer-visible member attendance history. |
| `/trainer/members/:id/diet` | GET | Returns active diet-plan lookup values. |
| `/trainer/members/:id/workout` | GET | Returns Trainer-owned workout-plan lookup values. |
| `/trainer/members/:id/progress` | GET | Returns member progress history. |
| `/trainer/members/:id` | PATCH | Updates authorized member fields and server-resolves assignment snapshots. |
| `/trainer/members/:id/notes` | POST | Creates a Trainer-authored member note. |

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
| trainer_member_notes | FK_trainer_member_notes_trainer_members_member_id |
| trainer_member_notes | PK_trainer_member_notes |
| trainer_members | CHK_trainer_members_age_non_negative |
| trainer_members | CHK_trainer_members_progress_status |
| trainer_members | CHK_trainer_members_status |
| trainer_members | FK_trainer_members_trainer_diet_plans_assigned_diet_id |
| trainer_members | FK_trainer_members_trainer_workouts_assigned_workout_id |
| trainer_members | PK_trainer_members |
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

- `controllers/trainer-members-command.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `controllers/trainer-members-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-members-create-member-note.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-members-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `dtos/trainer-members-update-member.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `trainer-members-enum.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-members-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-members-member-note.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-members-member-note.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-members-member-note.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-members-member.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-members-member.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-members-member.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-members.interfaces.ts` — defines application-level feature contracts without orm coupling; it must not contain unrelated sibling-feature logic.
- `trainer-members.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-members.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `repositories/trainer-members-repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-members-assessment-encryption-repair.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-members-authorization.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-members-note.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-members-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-members-update.service.spec.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-members-update.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/members` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/stats` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id/notes` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id/attendance` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id/diet` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id/workout` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id/progress` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/members/:id/notes` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| MEM-001 | GET | /trainer/members | TrainerMembersQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>status: string (optional)<br>progressStatus: MemberProgressStatus (optional)<br>sortBy: string (optional) | TrainerMembersListResponseDto<br>members: TrainerMembersMemberResponseDto[]<br>total: number<br>page: number<br>limit: number<br>pagination: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean } | query | OK |
| MEM-002 | GET | /trainer/members/:id | — | TrainerMembersMemberResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>gender: string<br>address: string (optional)<br>branch: string<br>planId: string<br>plan: TrainerMembersPlanResponseDto (optional)<br>billingCycle: string<br>status: string<br>joinDate: string<br>expiryDate: string<br>photo: string (optional)<br>createdAt: string<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>lastWorkout: string (optional)<br>progressStatus: string (optional)<br>assignedTrainerId: string (optional)<br>assignedTrainerName: string (optional)<br>isPT: boolean (optional)<br>assignedDietId: string (optional)<br>assignedDiet: TrainerMembersDietSnapshotResponseDto (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: TrainerMembersWorkoutSnapshotResponseDto (optional)<br>fitnessLevel: string (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>medicalRestrictions: string (optional)<br>fitnessGoal: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>trainerNotes: TrainerMembersNoteResponseDto[] (optional)<br>emergencyContact: string (optional)<br>bloodGroup: string (optional)<br>medicalHistory: string[] (optional)<br>membershipNumber: string (optional)<br>workoutHistory: TrainerMembersWorkoutHistoryResponseDto[] (optional)<br>assessment: TrainerMembersAssessmentResponseDto (optional) | path | OK |
| MEM-003 | GET | /trainer/members/stats | — | TrainerMembersStatsResponseDto<br>total: number<br>active: number<br>pending: number<br>expired: number | — | OK |
| MEM-004 | PATCH | /trainer/members/:id | TrainerMembersUpdateMemberDto<br>name: string (optional)<br>email: string (optional)<br>phone: string (optional)<br>address: string (optional)<br>gender: MemberGender (optional)<br>branch: string (optional)<br>planId: string (optional)<br>planName: string (optional)<br>planTier: string (optional)<br>billingCycle: MemberBillingCycle (optional)<br>status: MemberStatus (optional)<br>joinDate: string (optional)<br>expiryDate: string (optional)<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>fitnessGoal: string (optional)<br>fitnessLevel: string (optional)<br>progressStatus: MemberProgressStatus (optional)<br>isPT: boolean (optional)<br>medicalRestrictions: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>membershipNumber: string (optional)<br>assessment: Record<string, unknown> (optional)<br>assignedDietId: string (optional)<br>assignedDiet: Record<string, unknown> (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: Record<string, unknown> (optional) | TrainerMembersMemberResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>gender: string<br>address: string (optional)<br>branch: string<br>planId: string<br>plan: TrainerMembersPlanResponseDto (optional)<br>billingCycle: string<br>status: string<br>joinDate: string<br>expiryDate: string<br>photo: string (optional)<br>createdAt: string<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>lastWorkout: string (optional)<br>progressStatus: string (optional)<br>assignedTrainerId: string (optional)<br>assignedTrainerName: string (optional)<br>isPT: boolean (optional)<br>assignedDietId: string (optional)<br>assignedDiet: TrainerMembersDietSnapshotResponseDto (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: TrainerMembersWorkoutSnapshotResponseDto (optional)<br>fitnessLevel: string (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>medicalRestrictions: string (optional)<br>fitnessGoal: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>trainerNotes: TrainerMembersNoteResponseDto[] (optional)<br>emergencyContact: string (optional)<br>bloodGroup: string (optional)<br>medicalHistory: string[] (optional)<br>membershipNumber: string (optional)<br>workoutHistory: TrainerMembersWorkoutHistoryResponseDto[] (optional)<br>assessment: TrainerMembersAssessmentResponseDto (optional) | body+path | OK |
| MEM-005 | PATCH | /trainer/members/:id | TrainerMembersUpdateMemberDto<br>name: string (optional)<br>email: string (optional)<br>phone: string (optional)<br>address: string (optional)<br>gender: MemberGender (optional)<br>branch: string (optional)<br>planId: string (optional)<br>planName: string (optional)<br>planTier: string (optional)<br>billingCycle: MemberBillingCycle (optional)<br>status: MemberStatus (optional)<br>joinDate: string (optional)<br>expiryDate: string (optional)<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>fitnessGoal: string (optional)<br>fitnessLevel: string (optional)<br>progressStatus: MemberProgressStatus (optional)<br>isPT: boolean (optional)<br>medicalRestrictions: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>membershipNumber: string (optional)<br>assessment: Record<string, unknown> (optional)<br>assignedDietId: string (optional)<br>assignedDiet: Record<string, unknown> (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: Record<string, unknown> (optional) | TrainerMembersMemberResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>gender: string<br>address: string (optional)<br>branch: string<br>planId: string<br>plan: TrainerMembersPlanResponseDto (optional)<br>billingCycle: string<br>status: string<br>joinDate: string<br>expiryDate: string<br>photo: string (optional)<br>createdAt: string<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>lastWorkout: string (optional)<br>progressStatus: string (optional)<br>assignedTrainerId: string (optional)<br>assignedTrainerName: string (optional)<br>isPT: boolean (optional)<br>assignedDietId: string (optional)<br>assignedDiet: TrainerMembersDietSnapshotResponseDto (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: TrainerMembersWorkoutSnapshotResponseDto (optional)<br>fitnessLevel: string (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>medicalRestrictions: string (optional)<br>fitnessGoal: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>trainerNotes: TrainerMembersNoteResponseDto[] (optional)<br>emergencyContact: string (optional)<br>bloodGroup: string (optional)<br>medicalHistory: string[] (optional)<br>membershipNumber: string (optional)<br>workoutHistory: TrainerMembersWorkoutHistoryResponseDto[] (optional)<br>assessment: TrainerMembersAssessmentResponseDto (optional) | body+path | OK |
| MEM-006 | PATCH | /trainer/members/:id | TrainerMembersUpdateMemberDto<br>name: string (optional)<br>email: string (optional)<br>phone: string (optional)<br>address: string (optional)<br>gender: MemberGender (optional)<br>branch: string (optional)<br>planId: string (optional)<br>planName: string (optional)<br>planTier: string (optional)<br>billingCycle: MemberBillingCycle (optional)<br>status: MemberStatus (optional)<br>joinDate: string (optional)<br>expiryDate: string (optional)<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>fitnessGoal: string (optional)<br>fitnessLevel: string (optional)<br>progressStatus: MemberProgressStatus (optional)<br>isPT: boolean (optional)<br>medicalRestrictions: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>membershipNumber: string (optional)<br>assessment: Record<string, unknown> (optional)<br>assignedDietId: string (optional)<br>assignedDiet: Record<string, unknown> (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: Record<string, unknown> (optional) | TrainerMembersMemberResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>gender: string<br>address: string (optional)<br>branch: string<br>planId: string<br>plan: TrainerMembersPlanResponseDto (optional)<br>billingCycle: string<br>status: string<br>joinDate: string<br>expiryDate: string<br>photo: string (optional)<br>createdAt: string<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>lastWorkout: string (optional)<br>progressStatus: string (optional)<br>assignedTrainerId: string (optional)<br>assignedTrainerName: string (optional)<br>isPT: boolean (optional)<br>assignedDietId: string (optional)<br>assignedDiet: TrainerMembersDietSnapshotResponseDto (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: TrainerMembersWorkoutSnapshotResponseDto (optional)<br>fitnessLevel: string (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>medicalRestrictions: string (optional)<br>fitnessGoal: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>trainerNotes: TrainerMembersNoteResponseDto[] (optional)<br>emergencyContact: string (optional)<br>bloodGroup: string (optional)<br>medicalHistory: string[] (optional)<br>membershipNumber: string (optional)<br>workoutHistory: TrainerMembersWorkoutHistoryResponseDto[] (optional)<br>assessment: TrainerMembersAssessmentResponseDto (optional) | body+path | OK |
| MEM-007 | PATCH | /trainer/members/:id | TrainerMembersUpdateMemberDto<br>name: string (optional)<br>email: string (optional)<br>phone: string (optional)<br>address: string (optional)<br>gender: MemberGender (optional)<br>branch: string (optional)<br>planId: string (optional)<br>planName: string (optional)<br>planTier: string (optional)<br>billingCycle: MemberBillingCycle (optional)<br>status: MemberStatus (optional)<br>joinDate: string (optional)<br>expiryDate: string (optional)<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>fitnessGoal: string (optional)<br>fitnessLevel: string (optional)<br>progressStatus: MemberProgressStatus (optional)<br>isPT: boolean (optional)<br>medicalRestrictions: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>membershipNumber: string (optional)<br>assessment: Record<string, unknown> (optional)<br>assignedDietId: string (optional)<br>assignedDiet: Record<string, unknown> (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: Record<string, unknown> (optional) | TrainerMembersMemberResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>gender: string<br>address: string (optional)<br>branch: string<br>planId: string<br>plan: TrainerMembersPlanResponseDto (optional)<br>billingCycle: string<br>status: string<br>joinDate: string<br>expiryDate: string<br>photo: string (optional)<br>createdAt: string<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>lastWorkout: string (optional)<br>progressStatus: string (optional)<br>assignedTrainerId: string (optional)<br>assignedTrainerName: string (optional)<br>isPT: boolean (optional)<br>assignedDietId: string (optional)<br>assignedDiet: TrainerMembersDietSnapshotResponseDto (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: TrainerMembersWorkoutSnapshotResponseDto (optional)<br>fitnessLevel: string (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>medicalRestrictions: string (optional)<br>fitnessGoal: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>trainerNotes: TrainerMembersNoteResponseDto[] (optional)<br>emergencyContact: string (optional)<br>bloodGroup: string (optional)<br>medicalHistory: string[] (optional)<br>membershipNumber: string (optional)<br>workoutHistory: TrainerMembersWorkoutHistoryResponseDto[] (optional)<br>assessment: TrainerMembersAssessmentResponseDto (optional) | body+path | OK |
| MEM-008 | GET | /trainer/members/:id/attendance | — | TrainerMembersAttendanceDayResponseDto[]<br>array of TrainerMembersAttendanceDayResponseDto (day: number, status: string) | path | OK |
| MEM-009 | GET | /trainer/library/diet-plans | TrainerLibraryQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>goal: DietGoal (optional)<br>sortBy: string (optional) | TrainerLibraryDietPlansResponseDto<br>dietPlans: TrainerLibraryDietPlanResponseDto[]<br>total: number | query | OK |
| MEM-010 | GET | /trainer/workout/workouts | TrainerWorkoutQueryDto<br>page: number (optional)<br>limit: number (optional)<br>search: string (optional)<br>sortDirection: string (optional)<br>category: string (optional)<br>sortBy: string (optional) | TrainerWorkoutPlanCollectionResponseDto<br>workouts: TrainerWorkoutResponseDto[]<br>total: number<br>page: number<br>limit: number<br>sortBy: string (optional)<br>sortDirection: string (optional)<br>pagination: object | query | OK |
| MEM-011 | POST | /trainer/members/:id/notes | TrainerMembersCreateMemberNoteDto<br>text: string | TrainerMembersMemberResponseDto<br>id: string<br>name: string<br>email: string<br>phone: string<br>gender: string<br>address: string (optional)<br>branch: string<br>planId: string<br>plan: TrainerMembersPlanResponseDto (optional)<br>billingCycle: string<br>status: string<br>joinDate: string<br>expiryDate: string<br>photo: string (optional)<br>createdAt: string<br>age: number (optional)<br>heightCm: number (optional)<br>weightKg: number (optional)<br>lastWorkout: string (optional)<br>progressStatus: string (optional)<br>assignedTrainerId: string (optional)<br>assignedTrainerName: string (optional)<br>isPT: boolean (optional)<br>assignedDietId: string (optional)<br>assignedDiet: TrainerMembersDietSnapshotResponseDto (optional)<br>assignedWorkoutId: string (optional)<br>assignedWorkout: TrainerMembersWorkoutSnapshotResponseDto (optional)<br>fitnessLevel: string (optional)<br>targetWeightKg: number (optional)<br>bmi: number (optional)<br>medicalRestrictions: string (optional)<br>fitnessGoal: string (optional)<br>daysSinceLastCheckIn: number (optional)<br>trainerNotes: TrainerMembersNoteResponseDto[] (optional)<br>emergencyContact: string (optional)<br>bloodGroup: string (optional)<br>medicalHistory: string[] (optional)<br>membershipNumber: string (optional)<br>workoutHistory: TrainerMembersWorkoutHistoryResponseDto[] (optional)<br>assessment: TrainerMembersAssessmentResponseDto (optional) | body+path | CREATED |
| MEM-012 | GET | /trainer/progress-tracking/:id/entries | TrainerProgressTrackingQueryDto<br>page: number (optional)<br>limit: number (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>sortBy: string (optional)<br>sortDirection: string (optional) | TrainerProgressTrackingEntriesResponseDto<br>entries: TrainerProgressTrackingEntryResponseDto[]<br>total: number<br>page: number<br>limit: number<br>pagination: object | query+path | OK |

### UI-Required Fields
Identity, membership, fitness, assignments, assessment, attendance, progress, workout/diet lookups, and Trainer notes.

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
- Additional route: GET /trainer/members/:id/notes.
- Additional route: GET /trainer/members/:id/diet.
- Additional route: GET /trainer/members/:id/workout.
- Additional route: GET /trainer/members/:id/progress.

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
- Assessment encryption repair persistence is isolated inside `MembersAssessmentRepairRepository`; services do not directly obtain TypeORM repositories.

---

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- Assessment repair persistence is repository-owned; member business services do not access ORM repositories directly.
---

## Fix V2 Contract
- Member response fields declared optional by the frontend contract must be omitted when persistence stores `null`; required fields remain present.

## Fix V2 Implementation Status
- Updated `MembersMemberMapper` and its domain response contract to normalize nullable optional fields.
- Added explicit numeric conversion for nullable numeric persistence values.
- Added a co-located mapper regression test.
---

## Fix V3 Contract
- `/trainer/members/:id/attendance` must return the exact current frontend calendar shape `{ day, status }` rather than persistence-shaped attendance rows.
- `/trainer/members/:id/diet` and `/trainer/members/:id/progress` must normalize PostgreSQL numeric values before crossing the API response boundary.

## Fix V3 Implementation Status
- Member attendance is normalized to unique current-month present-day entries with `status: 'P'`; absent/rest semantics remain frontend-derived because the supplied persistence model does not contain authoritative member absence/leave state.
- Diet-plan nutrition values are converted to numbers and nullable optional values are omitted.
- Progress-entry measurements are converted to numbers and nullable optional values are omitted.
- Added a co-located repository contract test covering all three supporting-read response paths.


## Fix V4 Contract
- The current Trainer frontend sends `assignedDiet` and `assignedWorkout` snapshots together with their assignment IDs on member update mutations.
- The backend must accept those contract fields at the strict DTO boundary while treating the snapshots as non-authoritative; assignment IDs remain the only persistence authority and the service must resolve authoritative snapshots from backend-owned records.

## Fix V4 Implementation Status
- Added typed DTO acceptance for `assignedDiet` and `assignedWorkout` objects so strict `forbidNonWhitelisted` validation no longer rejects the frontend assignment payload.
- Existing update-service logic continues to ignore client snapshots and resolve persistence snapshots from authoritative relationship records.
- Added a co-located DTO contract regression test.


## Repair V1 Amendment
Members Repair V1: detail responses expose optional `emergencyContact`, `bloodGroup`, and `medicalHistory`; progress/attendance support responses normalize PostgreSQL numeric values; assignment snapshot objects are server-derived from authoritative IDs and are not trusted from the client.

## Repair V1 Amendment — 2026-09-24
- Member-detail note identifiers are exposed as UUID strings, matching the actual frontend `TrainerMemberNoteSchema`; the prior response DTO numeric declaration was corrected.
- Progress history query now explicitly selects notes, blood pressure, resting heart rate, and VO2 max so these UI fields are populated rather than inferred from missing raw columns.
