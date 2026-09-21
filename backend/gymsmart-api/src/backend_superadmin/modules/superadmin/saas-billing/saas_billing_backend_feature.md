# saas-billing Backend Feature Map

## Module Purpose
The SaaS Billing container coordinates the Superadmin billing feature family. Coupons, invoices, and plans remain separate AI repair units and expose their own persistence, validation, and API contracts. The container must not absorb child feature business logic.

## Directory Structure
| File | Responsibility |
|---|---|
| `coupons/coupons-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `coupons/coupons-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `coupons/coupons-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `coupons/coupons.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `coupons/coupons.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/coupons.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `coupons/coupons.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `coupons/coupons.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `coupons/coupons.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/coupons_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/coupons_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/coupons_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/coupons_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/dtos/coupons-create.dto.ts` | Validates one request or response contract at the module edge. |
| `coupons/dtos/coupons-query.dto.ts` | Validates one request or response contract at the module edge. |
| `coupons/dtos/coupons-update.dto.ts` | Validates one request or response contract at the module edge. |
| `coupons/responses/coupons-response.dto.ts` | Validates one request or response contract at the module edge. |
| `coupons/services/coupons-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-redemptions.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-restore.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/services/coupons-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `coupons/types/coupons.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `coupons/types/coupons.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/dtos/invoices-create.dto.ts` | Validates one request or response contract at the module edge. |
| `invoices/dtos/invoices-query.dto.ts` | Validates one request or response contract at the module edge. |
| `invoices/dtos/invoices-update.dto.ts` | Validates one request or response contract at the module edge. |
| `invoices/invoices-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `invoices/invoices-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `invoices/invoices-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `invoices/invoices-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `invoices/invoices-recovery-center-response.dto.ts` | Validates one request or response contract at the module edge. |
| `invoices/invoices-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `invoices/invoices.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/invoices.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `invoices/invoices.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/invoices.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `invoices/invoices.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `invoices/invoices.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `invoices/invoices.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/invoices_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/invoices_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/invoices_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/invoices_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/responses/invoices-response.dto.ts` | Validates one request or response contract at the module edge. |
| `invoices/services/invoices-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-manual-payment.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-recovery-center.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-resend.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-status.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/services/invoices-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `invoices/types/invoices.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `invoices/types/invoices.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/dtos/plans-create.dto.ts` | Validates one request or response contract at the module edge. |
| `plans/dtos/plans-query.dto.ts` | Validates one request or response contract at the module edge. |
| `plans/dtos/plans-update.dto.ts` | Validates one request or response contract at the module edge. |
| `plans/plans-business-controls-response.dto.ts` | Validates one request or response contract at the module edge. |
| `plans/plans-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `plans/plans-contract-snapshot.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `plans/plans-contract-snapshot.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `plans/plans-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `plans/plans-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `plans/plans.constants.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/plans.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `plans/plans.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/plans.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `plans/plans.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `plans/plans.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `plans/plans.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/plans_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/plans_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/plans_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/plans_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/responses/plans-response.dto.ts` | Validates one request or response contract at the module edge. |
| `plans/services/plans-business-controls.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `plans/services/plans-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `plans/services/plans-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `plans/services/plans-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `plans/services/plans-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `plans/services/plans-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `plans/types/plans.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `plans/types/plans.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `saas-billing.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `saas-billing_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `saas-billing_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `saas-billing_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `coupons/coupons-command.controller.ts` / `create` | POST | `/superadmin/saas-billing/coupons` | Creates a resource after DTO validation and persists it through the feature repository. | `CouponsCreateDto` | `unknown` |
| `coupons/coupons-command.controller.ts` / `update` | PATCH | `/superadmin/saas-billing/coupons/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `CouponsUpdateDto` | `unknown` |
| `coupons/coupons-command.controller.ts` / `remove` | DELETE | `/superadmin/saas-billing/coupons/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `coupons/coupons-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/saas-billing/coupons/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `coupons/coupons-query.controller.ts` / `findAll` | GET | `/superadmin/saas-billing/coupons` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `coupons/coupons-query.controller.ts` / `findOne` | GET | `/superadmin/saas-billing/coupons/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `coupons/coupons-special.controller.ts` / `redemptions` | GET | `/superadmin/saas-billing/coupons/:id/redemptions` | Returns coupon redemption history with deleted records excluded. | `None` | `Record<string, unknown` |
| `coupons/coupons-special.controller.ts` / `restore` | POST | `/superadmin/saas-billing/coupons/:id/restore` | Restores a soft-deleted resource through the owning repository mutation. | `Record` | `Record<string, unknown` |
| `invoices/invoices-command.controller.ts` / `create` | POST | `/superadmin/saas-billing/invoices` | Creates a resource after DTO validation and persists it through the feature repository. | `InvoicesCreateDto` | `unknown` |
| `invoices/invoices-command.controller.ts` / `update` | PATCH | `/superadmin/saas-billing/invoices/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `InvoicesUpdateDto` | `unknown` |
| `invoices/invoices-command.controller.ts` / `remove` | DELETE | `/superadmin/saas-billing/invoices/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `invoices/invoices-command.controller.ts` / `changeStatus` | PATCH | `/superadmin/saas-billing/invoices/:id/status` | Applies the requested status transition through the named repository mutation. | `None` | `unknown` |
| `invoices/invoices-query.controller.ts` / `findAll` | GET | `/superadmin/saas-billing/invoices` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `invoices/invoices-query.controller.ts` / `findOne` | GET | `/superadmin/saas-billing/invoices/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `invoices/invoices-special.controller.ts` / `manualPayment` | POST | `/superadmin/saas-billing/invoices/manual-payment` | Records a manual invoice payment through the billing repository and audit boundary. | `Record` | `Record<string, unknown` |
| `invoices/invoices-special.controller.ts` / `recoveryCenter` | GET | `/superadmin/saas-billing/invoices/recovery-center` | Returns payment-recovery summary, recovery queue, reconciliation entries, and retry policy. | `None` | `Record<string, unknown` |
| `invoices/invoices-special.controller.ts` / `resend` | POST | `/superadmin/saas-billing/invoices/:id/resend` | Queues an invoice resend instead of blocking the HTTP request on message delivery. | `Record` | `Record<string, unknown` |
| `plans/plans-command.controller.ts` / `create` | POST | `/superadmin/saas-billing/plans` | Creates a resource after DTO validation and persists it through the feature repository. | `PlansCreateDto` | `unknown` |
| `plans/plans-command.controller.ts` / `update` | PATCH | `/superadmin/saas-billing/plans/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `PlansUpdateDto` | `unknown` |
| `plans/plans-command.controller.ts` / `remove` | DELETE | `/superadmin/saas-billing/plans/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `plans/plans-query.controller.ts` / `findAll` | GET | `/superadmin/saas-billing/plans` | Returns a paginated collection using the feature query contract. | `None` | `unknown` |
| `plans/plans-query.controller.ts` / `findOne` | GET | `/superadmin/saas-billing/plans/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `plans/plans-query.controller.ts` / `businessControls` | GET | `/superadmin/saas-billing/plans/business-controls` | Returns the complete frontend business-controls contract including segments, filters, bulk vocabulary, saved views, and rows. | `None` | `Record<string, unknown` |

## Approved External Dependencies
- **Business Feature Dependencies**: None by direct business-code import. Runtime event dependencies are documented explicitly below.
- **Infrastructure Dependencies**: Core authentication/authorization, configuration, PostgreSQL/TypeORM repository infrastructure, Redis, response/error infrastructure, observability, and tenant resolution where applicable.
- **Runtime/Event Dependencies**: None unless an event appears in this module's source and dependency document.

## Data and State Architecture
- DB Entities: Every TypeORM entity registered by this module; contract snapshots are stored in explicit PostgreSQL JSONB tables when the frontend contract is snapshot-backed.
- Redis Caching Keys: Only feature-owned operational keys; Idempotency-Key reservations use the core idempotency namespace.
- Event Emitters: Only event names from the centralized registry are permitted.
- Background Jobs: Heavy exports, messaging, backups, migrations, and bulk work are queued where applicable; scheduled work is recorded in the central registry.
- Idempotency Keys: All mutations for which the frontend API exposes `idempotencyKey` are protected by `RequireIdempotencyKey`.

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security
Every Superadmin business endpoint is protected at controller level with `JwtAuthGuard`, `RolesGuard`, and the `SUPERADMIN` role. Resource-specific endpoints must additionally fail closed when the requested resource is missing, soft-deleted, outside the trusted tenant/resource scope, or otherwise unauthorized.

CODEOWNERS path: `src/modules/superadmin/saas-billing/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

### Contract Source
The module's normal API clients, request DTOs, and response DTOs define the current contract. No frontend V1 schema file was supplied for this feature; no additional fields are invented here.

### Pagination / Error Contract
- Pagination: List endpoints return the canonical `{ data: T[], meta: PaginationMeta }` payload before the global response envelope.
- Validation errors: HTTP 400 with `errorCode = VALIDATION.DTO.FAILED` and `validationErrors[]`.
- Business errors: machine-readable `DOMAIN.ENTITY.REASON` codes.
- Errors always have `data: null`; pagination metadata is absent from errors.

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
