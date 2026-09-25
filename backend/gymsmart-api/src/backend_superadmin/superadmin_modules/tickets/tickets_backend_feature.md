# tickets Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/tickets feature. It exposes 11 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `superadmin-tickets-actions.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-tickets-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-tickets-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-tickets-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-tickets-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-tickets-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-tickets-service-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-tickets.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-tickets.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-tickets.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-tickets.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-tickets.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-tickets.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-tickets.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `tickets_dtos/superadmin-tickets-assign.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_dtos/superadmin-tickets-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_dtos/superadmin-tickets-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_dtos/superadmin-tickets-reply.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_dtos/superadmin-tickets-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_dtos/superadmin-tickets-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_responses/superadmin-tickets-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `tickets_services/superadmin-tickets-actions.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_services/superadmin-tickets-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `tickets_types/superadmin-tickets.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `tickets_types/superadmin-tickets.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-tickets-actions.controller.ts::close` | POST | `:id/close` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the close operation. | `—` | `See controller contract` |
| `superadmin-tickets-actions.controller.ts::assign` | POST | `:id/assign` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the assign operation. | `SuperadminTicketsAssignDto` | `See controller contract` |
| `superadmin-tickets-actions.controller.ts::reply` | POST | `:id/reply` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the reply operation. | `SuperadminTicketsReplyDto` | `See controller contract` |
| `superadmin-tickets-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the create operation. | `SuperadminTicketsCreateDto` | `See controller contract` |
| `superadmin-tickets-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the update operation. | `SuperadminTicketsUpdateDto` | `See controller contract` |
| `superadmin-tickets-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-tickets-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the changeStatus operation. | `SuperadminTicketsStatusDto` | `See controller contract` |
| `superadmin-tickets-insights-query.controller.ts::insights` | GET | `superadmin/tickets/service-insights` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the insights operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-tickets-insights-query.controller.ts::insights` | GET | `api/superadmin/tickets/service-insights` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the insights operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-tickets-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the findAll operation. | `SuperadminTicketsQueryDto` | `See controller contract` |
| `superadmin-tickets-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning tickets use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-tickets-contract-snapshot.entity → `superadmin_tickets_contract_snapshots`, superadmin-tickets.entity → `superadmin_support_tickets`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/tickets`, `/superadmin/tickets/:id`, `/superadmin/tickets/:id/assign`, `/superadmin/tickets/:id/close`, `/superadmin/tickets/:id/reply`, `/superadmin/tickets/:id/status`

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
| `POST /superadmin/tickets/:id/close` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets/:id/assign` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets/:id/reply` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/tickets` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/tickets/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/tickets/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/tickets/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/tickets/service-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/tickets/service-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/tickets` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/tickets/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `tickets/superadmin_tickets_features.md`

- **API files:** `tickets_api/SuperadminTicketsApi.ts`, `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Detected API symbols:** `fetchTickets` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketById` — `tickets_api/SuperadminTicketsApi.ts`; `updateTicket` — `tickets_api/SuperadminTicketsApi.ts`; `closeTicket` — `tickets_api/SuperadminTicketsApi.ts`; `assignTicket` — `tickets_api/SuperadminTicketsApi.ts`; `replyToTicket` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketServiceInsights` — `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `tickets/superadmin_tickets_service_insights_features.md`

- **API files:** `tickets_api/SuperadminTicketsApi.ts`, `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Detected API symbols:** `fetchTickets` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketById` — `tickets_api/SuperadminTicketsApi.ts`; `updateTicket` — `tickets_api/SuperadminTicketsApi.ts`; `closeTicket` — `tickets_api/SuperadminTicketsApi.ts`; `assignTicket` — `tickets_api/SuperadminTicketsApi.ts`; `replyToTicket` — `tickets_api/SuperadminTicketsApi.ts`; `fetchTicketServiceInsights` — `tickets_api/SuperadminTicketsServiceInsightsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `tickets/superadmin_tickets_features.md`

- **Data-bearing components:** `page.tsx`, `tickets_components/SuperadminTicketsClient.tsx`, `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx`, `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx`, `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx`, `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `tickets/superadmin_tickets_service_insights_features.md`

- **Data-bearing components:** `page.tsx`, `tickets_components/SuperadminTicketsClient.tsx`, `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx`, `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx`, `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx`, `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
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
| ``{superadmin}{q}`` | ``ApiResponse<SupportTicket[]>`` | `REQ-124` / ``fetchTickets`` |
| ``{superadmin}/{id}`` | ``ApiResponse<SupportTicket>`` | `REQ-125` / ``fetchTicketById`` |
| ``{superadmin}/{id}`` | ``ApiResponse<SupportTicket>`` | `REQ-126` / ``updateTicket`` |
| ``/superadmin/tickets/{encodeURIComponent}/close(id)`` | ``ApiResponse<SupportTicket>`` | `REQ-127` / ``closeTicket`` |
| ``/superadmin/tickets/{encodeURIComponent}/assign(id)`` | ``ApiResponse<SupportTicket>`` | `REQ-128` / ``assignTicket`` |
| ``{superadmin}/{id}/reply`` | ``ApiResponse<SupportTicket>`` | `REQ-129` / ``replyToTicket`` |
| ``/api/superadmin/tickets/service-insights`` | ``ApiResponse<SuperadminTicketsV1Data>`` | `REQ-130` / ``fetchTicketServiceInsights`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `tickets_components/SuperadminTicketsClient.tsx`, `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx`, `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx`, `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx`, `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `tickets_components/SuperadminTicketsClient.tsx`, `tickets_components/SuperadminTicketsV1SupportCategoriesPanel.tsx`, `tickets_components/SuperadminTicketsV1SupportSummaryCards.tsx`, `tickets_components/SuperadminTicketsV1OperatorWorkloadAndBacklogSection.tsx`, `tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader.tsx`, `tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal.tsx`, `tickets_components/SuperadminTicketsTable/SuperadminTicketsTable.tsx`, `tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState.tsx`
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
2026-09-24 repair: ticket satisfaction is derived from persisted satisfactionScore rather than a constant placeholder.

## Repair Addendum — Satisfaction Metric

Service insights now calculate customer satisfaction from persisted `satisfactionScore` values for the selected tenant scope. A zero placeholder is no longer emitted when survey data exists; an empty population remains explicitly represented by the service's aggregate semantics.

