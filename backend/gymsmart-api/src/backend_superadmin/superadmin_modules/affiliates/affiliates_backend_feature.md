# affiliates Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/affiliates feature. It exposes 8 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `affiliates_dtos/superadmin-affiliates-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates_dtos/superadmin-affiliates-pay.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates_dtos/superadmin-affiliates-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates_dtos/superadmin-affiliates-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates_dtos/superadmin-affiliates-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates_responses/superadmin-affiliates-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `affiliates_services/superadmin-affiliates-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_services/superadmin-affiliates-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_services/superadmin-affiliates-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_services/superadmin-affiliates-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_services/superadmin-affiliates-payout.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_services/superadmin-affiliates-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_services/superadmin-affiliates-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `affiliates_types/superadmin-affiliates.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `affiliates_types/superadmin-affiliates.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-affiliates-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-affiliates-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-affiliates.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-affiliates.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-affiliates.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-affiliates.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-affiliates.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-affiliates.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-affiliates.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-affiliates-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the create operation. | `SuperadminAffiliatesCreateDto` | `SuperadminAffiliatesResponseDto` |
| `superadmin-affiliates-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the update operation. | `SuperadminAffiliatesUpdateDto` | `SuperadminAffiliatesResponseDto` |
| `superadmin-affiliates-command.controller.ts::pay` | POST | `:id/pay` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the pay operation. | `—` | `SuperadminAffiliatesResponseDto` |
| `superadmin-affiliates-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the remove operation. | `—` | `SuperadminAffiliatesResponseDto` |
| `superadmin-affiliates-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the changeStatus operation. | `SuperadminAffiliatesStatusDto` | `SuperadminAffiliatesResponseDto` |
| `superadmin-affiliates-query.controller.ts::payoutHistory` | GET | `payout-history` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the payoutHistory operation. | `—` | `[SuperadminAffiliatePayoutRecordDto]` |
| `superadmin-affiliates-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the findAll operation. | `SuperadminAffiliatesQueryDto` | `[SuperadminAffiliatesResponseDto]` |
| `superadmin-affiliates-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning affiliates use case, and returns the declared contract for the findOne operation. | `—` | `SuperadminAffiliatesResponseDto` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-affiliates.entity → `superadmin_affiliates`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/affiliates`, `/superadmin/affiliates/:id`, `/superadmin/affiliates/:id/pay`, `/superadmin/affiliates/:id/status`

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
| `POST /superadmin/affiliates` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/affiliates/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/affiliates/:id/pay` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/affiliates/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/affiliates/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/affiliates/payout-history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/affiliates` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/affiliates/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `affiliates/superadmin_affiliates_features.md`

- **API files:** `affiliates_api/SuperadminAffiliatesApi.ts`
- **Detected API symbols:** `fetchAffiliates` — `affiliates_api/SuperadminAffiliatesApi.ts`; `createAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `updateAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `updateAffiliateStatus` — `affiliates_api/SuperadminAffiliatesApi.ts`; `deleteAffiliate` — `affiliates_api/SuperadminAffiliatesApi.ts`; `payAffiliateCommission` — `affiliates_api/SuperadminAffiliatesApi.ts`; `fetchPayoutHistory` — `affiliates_api/SuperadminAffiliatesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `affiliates/superadmin_affiliates_features.md`

- **Data-bearing components:** `page.tsx`, `affiliates_components/SuperadminAffiliatesClient.tsx`, `affiliates_components/SuperadminAffiliateModal.tsx`, `affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx`, `affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx`, `affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx`, `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx`, `affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``{superadmin}{q}`` | ``ApiResponse<Affiliate[]>`` | `REQ-001` / ``fetchAffiliates`` |
| ``/superadmin/affiliates`` | ``ApiResponse<Affiliate>`` | `REQ-002` / ``createAffiliate`` |
| ``{superadmin}/{id}`` | ``ApiResponse<Affiliate>`` | `REQ-003` / ``updateAffiliate`` |
| ``{superadmin}/{id}/status`` | ``ApiResponse<Affiliate>`` | `REQ-004` / ``updateAffiliateStatus`` |
| ``{superadmin}/{id}`` | ``ApiResponse<void>`` | `REQ-005` / ``deleteAffiliate`` |
| ``{superadmin}/{id}/pay`` | ``ApiResponse<Affiliate>`` | `REQ-006` / ``payAffiliateCommission`` |
| ``{superadmin}/payout-history`` | ``ApiResponse<AffiliatePayoutRecord[]>`` | `REQ-007` / ``fetchPayoutHistory`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `affiliates_components/SuperadminAffiliatesClient.tsx`, `affiliates_components/SuperadminAffiliateModal.tsx`, `affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader.tsx`, `affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory.tsx`, `affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow.tsx`, `affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable.tsx`, `affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState.tsx`, `affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

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



## Repair Baseline — 2026-09-24
2026-09-24 repair: affiliate monetary truth is derived from immutable double-entry ledger rows; bank metadata is encrypted before persistence; currency is explicit; payout mutations use row locking and the UnitOfWork boundary.

## Repair Addendum — Financial Safety

Affiliate payable truth is now held in the immutable affiliate ledger; `pendingPayout` is no longer a mutable financial source of truth. Payouts execute through `SuperadminAffiliatesPayoutOrchestratorService`, lock the affiliate row, derive the payable balance from ledger entries, append a debit/credit pair, and update only the UI payout-history projection inside the same transaction. Bank details are encrypted before persistence and never returned in raw form.

### Added Files
- `superadmin-affiliates-ledger.entity.ts` — immutable debit/credit ledger rows.
- `affiliates_repositories/superadmin-affiliates-ledger.repository.ts` — ledger balance and payout-pair persistence.
- `affiliates_services/superadmin-affiliates-payout-orchestrator.service.ts` — atomic UnitOfWork boundary for payout.

