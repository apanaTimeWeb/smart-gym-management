# dashboard Backend Feature Map

## Module Purpose
The Dashboard module exposes independently consumable Trainer operational widgets for current-day KPIs, goal-completion trend, member-plan distribution, upcoming sessions, and recent progress. Each widget owns a separate query service and repository so failures and caching decisions remain isolated. Dashboard responses MUST contain operational data only and MUST NOT become a Mega API or cross feature boundaries.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-dashboard-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-dashboard.interfaces.ts` | Defines application-level feature contracts without ORM coupling. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-dashboard.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-dashboard.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-dashboard-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-dashboard-kpis.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-dashboard-membership-distribution.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-dashboard-recent-progress.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-dashboard-trend.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-dashboard-upcoming-sessions.repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-dashboard-kpis.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-dashboard-membership-distribution.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-dashboard-recent-progress.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-dashboard-trend.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-dashboard-upcoming-sessions.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/dashboard/kpis` | GET | Returns current-day operational dashboard KPIs. |
| `/trainer/dashboard/trend` | GET | Returns goal-completion trend points for the requested reporting range. |
| `/trainer/dashboard/membership-distribution` | GET | Returns assigned-member distribution by plan. |
| `/trainer/dashboard/upcoming-sessions` | GET | Returns upcoming Trainer sessions for the requested range. |
| `/trainer/dashboard/recent-progress` | GET | Returns the five newest Trainer-scoped progress activities. |
| `/trainer/dashboard/stats` | GET | Compatibility facade that flattens the widget responses into the exact legacy frontend dashboard contract. |

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

- `controllers/trainer-dashboard-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `trainer-dashboard.interfaces.ts` — defines application-level feature contracts without orm coupling; it must not contain unrelated sibling-feature logic.
- `trainer-dashboard.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-dashboard.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `dtos/trainer-dashboard-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `repositories/trainer-dashboard-kpis.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `repositories/trainer-dashboard-membership-distribution.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `repositories/trainer-dashboard-recent-progress.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `repositories/trainer-dashboard-trend.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `repositories/trainer-dashboard-upcoming-sessions.repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-dashboard-kpis.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-dashboard-membership-distribution.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-dashboard-recent-progress.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-dashboard-trend.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.
- `services/trainer-dashboard-upcoming-sessions.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/dashboard/kpis` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/dashboard/trend` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/dashboard/membership-distribution` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/dashboard/upcoming-sessions` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |
| `/trainer/dashboard/recent-progress` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| DASH-001 | GET | /trainer/dashboard/stats | TrainerDashboardQueryDto<br>page: number (optional)<br>limit: number (optional)<br>range: string (optional)<br>startDate: string (optional)<br>endDate: string (optional) | TrainerDashboardStatsResponseDto<br>todaysSessions: number<br>completedSessions: number<br>pendingSessions: number<br>myMembersCount: number<br>todaysAttendance: number<br>pendingWorkoutPlans: number<br>memberGoalCompletionRate: number<br>goalCompletionTrend: TrainerDashboardTrendPointResponseDto[] (optional)<br>recentMemberProgress: TrainerDashboardRecentProgressItemResponseDto[]<br>upcomingSessions: TrainerDashboardUpcomingSessionResponseDto[]<br>membersByPlan: TrainerDashboardPlanDistributionResponseDto[] (optional)<br>recentMembers: TrainerDashboardRecentMemberResponseDto[] (optional)<br>trainerProfile: TrainerDashboardProfileSummaryResponseDto (optional) | query | OK |

### UI-Required Fields
Operational KPIs, goal-completion trend, recent progress, upcoming sessions, and members-by-plan; no financial dashboard fields are frozen.

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
- Widget routes are intentionally additional backend APIs; the frontend freeze remains /trainer/dashboard/stats.

## Rule Compliance Checklist
- [N/A] Rule 29: Dashboard is read-only and owns no soft-deletable feature table.
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
- Canonical widget endpoints remain `/trainer/dashboard/kpis`, `/trainer/dashboard/trend`, `/trainer/dashboard/membership-distribution`, `/trainer/dashboard/upcoming-sessions`, and `/trainer/dashboard/recent-progress`.
- `/trainer/dashboard/stats` is a compatibility composition endpoint for the current frontend; it contains no repository or ORM query logic.
- The widget services remain the source of truth for individual dashboard query ownership.

---

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- `/trainer/dashboard/stats` is a compatibility composition endpoint; widget endpoints remain canonical and own all query behavior.

---

## Fix V2 Contract
- `/trainer/dashboard/stats` must return flattened arrays for `goalCompletionTrend`, `membersByPlan`, `upcomingSessions`, and `recentMemberProgress`.
- The compatibility composition service must not expose the internal widget response wrappers as frontend fields.

## Fix V2 Implementation Status
- Corrected `DashboardTrainerStatsCompositionService` to flatten each widget service envelope into the frozen frontend `DashboardStatsSchema` shape.
- Added a co-located regression test proving the four collection fields remain arrays and all five widget services are called exactly once.
