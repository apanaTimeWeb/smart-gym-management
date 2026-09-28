# earnings Backend Feature Map

## Module Purpose
The Earnings module provides the Trainer earnings summary, payout state, and paginated earnings history. Monetary persistence uses integer minor units and API responses include currency semantics so clients cannot interpret raw integers ambiguously. Tenant-wide exports are deliberately absent because Rule 119 reserves them to the top-level admin role.

## Directory Structure
| File | Responsibility |
|---|---|
| `controllers/trainer-earnings-query.controller.ts` | Owns the HTTP boundary for this feature layer only. | Must not contain sibling-feature business logic or global infrastructure. |
| `dtos/trainer-earnings-query.dto.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-enum.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-enums.ts` | Defines finite canonical feature enum values. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-history.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-history.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-history.mapper.ts` | Maps ORM/persistence state into the domain or frontend contract. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-payout.domain.ts` | Defines a persistence-independent feature domain shape. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings-payout.entity.ts` | Maps one tenant database table to the ORM layer. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings.module.ts` | Registers this isolated feature providers, repositories, services, and controllers. | Must not contain sibling-feature business logic or global infrastructure. |
| `trainer-earnings.seeder.ts` | Owns deterministic feature seed data for isolated environments. | Must not contain sibling-feature business logic or global infrastructure. |
| `repositories/trainer-earnings-repository.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |
| `services/trainer-earnings-query.service.ts` | Owns one isolated feature artifact responsibility. | Must not contain sibling-feature business logic or global infrastructure. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| `/trainer/earnings` | GET | Returns the consolidated Trainer earnings page contract. |

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
| trainer_earnings_history | CHK_trainer_earnings_history_amount |
| trainer_earnings_history | CHK_trainer_earnings_history_net_nonnegative |
| trainer_earnings_history | CHK_trainer_earnings_history_tds_nonnegative |
| trainer_earnings_history | FK_trainer_earnings_history_trainer_sessions_session_id |
| trainer_earnings_history | PK_trainer_earnings_history |
| trainer_earnings_payouts | CHK_trainer_earnings_payouts_amount |
| trainer_earnings_payouts | PK_trainer_earnings_payouts |
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

- `controllers/trainer-earnings-query.controller.ts` — owns the HTTP boundary only and must not contain business logic or direct ORM calls.
- `dtos/trainer-earnings-query.dto.ts` — defines request validation or response contract shape and must not contain business/persistence logic.
- `trainer-earnings-enum.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-earnings-enums.ts` — defines finite canonical feature enum values; it must not contain unrelated sibling-feature logic.
- `trainer-earnings-history.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-earnings-history.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-earnings-history.mapper.ts` — maps persistence/domain data to the API/domain shape and must not perform database I/O.
- `trainer-earnings-payout.domain.ts` — defines the feature data contract and must remain persistence/framework neutral.
- `trainer-earnings-payout.entity.ts` — defines the persistence mapping and must not be returned directly from controllers/services.
- `trainer-earnings.module.ts` — registers feature dependencies and must not own business use-case logic.
- `trainer-earnings.seeder.ts` — provides deterministic idempotent seed data only and must not become runtime business logic.
- `repositories/trainer-earnings-repository.ts` — owns persistence queries/mutations for this feature data and must not contain controller/HTTP logic.
- `services/trainer-earnings-query.service.ts` — owns one business use case only and must not perform raw ORM queries or sibling-feature orchestration.


## Permissions and Security
| Endpoint | Required Role | Resource-Level Check |
|---|---|---|
| `/trainer/earnings` | TRAINER | Authenticated Trainer + trusted tenant context; target-resource ownership applies where the endpoint contains a resource ID. |

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
| EARN-001 | GET | /trainer/earnings | TrainerEarningsQueryDto<br>page: number (optional)<br>limit: number (optional)<br>startDate: string (optional)<br>endDate: string (optional)<br>search: string (optional)<br>sortBy: string (optional)<br>sortDirection: string (optional) | TrainerEarningsOverviewResponseDto<br>kpis: TrainerEarningsKpisResponseDto<br>pendingPayouts: TrainerEarningsPendingPayoutResponseDto[]<br>history: TrainerEarningsHistoryRowResponseDto[]<br>historyTotal: number<br>historyPage: number<br>historyLimit: number<br>pagination: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean } | query | OK |

### UI-Required Fields
Total earnings, pending payouts, completed sessions, commission rate, tax deduction, payout/history records, and currency companion fields.

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
- No Trainer earnings export endpoint is frozen; documentation-only export language is not executable frontend evidence.

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
- `tdsDeducted` and `netPayout` are omitted when no value exists; they are never emitted as `null` because the frontend contract treats these fields as optional numbers.
- All monetary values remain integer minor units and are paired with `currency: INR`.

---

## Fix V1 Implementation Status
- Verified against the supplied Trainer backend architecture and current frontend-derived contract baseline.
- `tdsDeducted` and `netPayout` are omitted when unset so the frontend optional-number contract remains valid.
---

## Fix V2 Contract
- Earnings optional response fields (`bankAccount`, `sessionId`, `tdsDeducted`, `netPayout`, `invoiceNumber`) must be omitted when unavailable, not returned as `null`.

## Fix V2 Implementation Status
- Updated `EarningsQueryService` to omit unavailable optional fields while preserving integer minor-unit money and currency semantics.
