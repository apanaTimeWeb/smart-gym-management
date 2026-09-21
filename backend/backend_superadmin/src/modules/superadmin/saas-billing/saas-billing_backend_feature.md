# saas-billing Backend Feature Map

## Module Purpose
The SaaS Billing container coordinates the Superadmin billing feature family. Coupons, invoices, and plans remain separate AI repair units and expose their own persistence, validation, and API contracts. The container must not absorb child feature business logic.

## Directory Structure
| File | Responsibility |
|---|---|
| `coupons/coupons-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/coupons.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/dtos/coupons-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/dtos/coupons-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/dtos/coupons-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/responses/coupons-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-redemptions.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-restore.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-status.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/services/coupons-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/types/coupons.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `coupons/types/coupons.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/dtos/invoices-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/dtos/invoices-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/dtos/invoices-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/invoices.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/responses/invoices-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-manual-payment.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-recovery-center.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-resend.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-status.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/services/invoices-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/types/invoices.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `invoices/types/invoices.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/dtos/plans-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/dtos/plans-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/dtos/plans-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/plans.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/responses/plans-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/services/plans-business-controls.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/services/plans-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/services/plans-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/services/plans-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/services/plans-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/services/plans-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/types/plans.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `plans/types/plans.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `saas-billing.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `coupons-command.controller.ts` | POST | `/superadmin/saas-billing/coupons` | Implements the `POST /superadmin/saas-billing/coupons` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-command.controller.ts` | PATCH | `/superadmin/saas-billing/coupons:id` | Implements the `PATCH /superadmin/saas-billing/coupons:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-command.controller.ts` | DELETE | `/superadmin/saas-billing/coupons:id` | Implements the `DELETE /superadmin/saas-billing/coupons:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-command.controller.ts` | PATCH | `/superadmin/saas-billing/coupons:id/status` | Implements the `PATCH /superadmin/saas-billing/coupons:id/status` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-query.controller.ts` | GET | `/superadmin/saas-billing/coupons` | Implements the `GET /superadmin/saas-billing/coupons` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-query.controller.ts` | GET | `/superadmin/saas-billing/coupons:id` | Implements the `GET /superadmin/saas-billing/coupons:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-special.controller.ts` | GET | `superadmin/saas-billing/coupons/:id/redemptions` | Implements the `GET superadmin/saas-billing/coupons/:id/redemptions` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `coupons-special.controller.ts` | POST | `superadmin/saas-billing/coupons/:id/restore` | Implements the `POST superadmin/saas-billing/coupons/:id/restore` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-command.controller.ts` | POST | `/superadmin/saas-billing/invoices` | Implements the `POST /superadmin/saas-billing/invoices` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-command.controller.ts` | PATCH | `/superadmin/saas-billing/invoices:id` | Implements the `PATCH /superadmin/saas-billing/invoices:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-command.controller.ts` | DELETE | `/superadmin/saas-billing/invoices:id` | Implements the `DELETE /superadmin/saas-billing/invoices:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-command.controller.ts` | PATCH | `/superadmin/saas-billing/invoices:id/status` | Implements the `PATCH /superadmin/saas-billing/invoices:id/status` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-query.controller.ts` | GET | `/superadmin/saas-billing/invoices` | Implements the `GET /superadmin/saas-billing/invoices` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-query.controller.ts` | GET | `/superadmin/saas-billing/invoices:id` | Implements the `GET /superadmin/saas-billing/invoices:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-special.controller.ts` | POST | `superadmin/saas-billing/invoices/manual-payment` | Implements the `POST superadmin/saas-billing/invoices/manual-payment` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-special.controller.ts` | GET | `superadmin/saas-billing/invoices/recovery-center` | Implements the `GET superadmin/saas-billing/invoices/recovery-center` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `invoices-special.controller.ts` | POST | `superadmin/saas-billing/invoices/:id/resend` | Implements the `POST superadmin/saas-billing/invoices/:id/resend` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `plans-command.controller.ts` | POST | `/superadmin/saas-billing/plans` | Implements the `POST /superadmin/saas-billing/plans` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `plans-command.controller.ts` | PATCH | `/superadmin/saas-billing/plans:id` | Implements the `PATCH /superadmin/saas-billing/plans:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `plans-command.controller.ts` | DELETE | `/superadmin/saas-billing/plans:id` | Implements the `DELETE /superadmin/saas-billing/plans:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `plans-query.controller.ts` | GET | `/superadmin/saas-billing/plans` | Implements the `GET /superadmin/saas-billing/plans` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `plans-query.controller.ts` | GET | `/superadmin/saas-billing/plans:id` | Implements the `GET /superadmin/saas-billing/plans:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `plans-special.controller.ts` | GET | `superadmin/saas-billing/plans/business-controls` | Implements the `GET superadmin/saas-billing/plans/business-controls` contract for this feature. | DTO validated at controller boundary | Feature response contract |
## Approved External Dependencies
- **Business Feature Dependencies**: None by direct import. Cross-feature runtime coupling must use registered events.
- **Infrastructure Dependencies**: Core configuration, authentication/authorization, PostgreSQL/TypeORM, Redis where applicable, canonical response/error infrastructure.
- **Runtime/Event Dependencies**: Only events explicitly listed in this feature's dependency document.

## Data and State Architecture
- DB Entities: Listed directly by the feature module and TypeORM registration.
- Redis Caching Keys: Feature-specific keys only; no global business cache helper.
- Event Emitters: Only centralized registry names.
- Background Jobs: Only named queue work documented by this feature.
- Idempotency Keys: Required for applicable resource/financial/communication mutations.

## Business Flow / Key Sequences
For each mutation, the controller validates the request, the use-case service applies business rules, the repository owns PostgreSQL mutation/query details, and the mapper/response DTO exposes only contract-approved fields. Heavy work is queued rather than performed in the HTTP request.

## File Responsibility Map
Every file has one responsibility. Controllers own HTTP wiring only; DTOs own edge validation; services own use-case decisions; repositories own ORM access; mappers own domain/response translation; adapters own external APIs.

## Permissions and Security
All Superadmin endpoints require the Superadmin role at the controller boundary. Resource-specific operations must additionally verify the requested resource belongs to the authorized scope before performing mutations.

## Edge Cases / AI Warnings
- Cross-feature direct business imports violate the feature write boundary and can introduce hidden coupling — see Rules 0B/0C and Rule 49.
- DTO acceptance does not prove behavior; every accepted field must reach the intended use case and persistence/query path — see Rule 82A.
- Soft-deleted records must never silently reappear in standard reads — see Rule 29.
- User-controlled sorting/filtering must resolve only through allowlists — see Rule 92.

## Frozen API Contract
The following frontend contract evidence is copied from the corresponding frontend V1 type definitions where they exist. The backend response DTO/service must preserve the complete shape and semantics rather than reconstructing data on the client.

### Request Shape
| Endpoint | Method | Request DTO fields |
|---|---|---|
| See Feature Inventory above | — | Derived from the exact frontend API client and DTO files. |

### Response Shape
| Endpoint | Response DTO fields | Notes |
|---|---|---|
| See Feature Inventory above | Complete frontend-consumed data shape | No minimal DTO shortcut is permitted. |

### UI-Required Fields
- Frontend schema declarations:
{frozen}
- Table/KPI/chart/detail fields must remain complete with their frontend semantics.

### Pagination / Error Contract
- Pagination: List endpoints use the canonical pagination wrapper where applicable.
- Validation errors: `400`, `VALIDATION.DTO.FAILED`, `validationErrors[]`.
- Business errors: `DOMAIN.ENTITY.REASON` machine-readable codes.

## Rule Compliance Checklist
- [ ] Rule 7: TypeORM is the sole approved ORM.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is global and automatic.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency for applicable critical mutations.
- [ ] Rule 34: N+1/index review for required relations and filters.
- [ ] Rule 36: Fail-fast null/constraint checks.
- [ ] Rule 41: Concurrency protection where state is contested.
- [ ] Rule 48: Query/command controller separation.
- [ ] Rule 62: Explicit return types.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc.
- [ ] Rule 82A: Complete frontend UI data contract.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 86/87: Intention-revealing names and small single-responsibility methods.
- [ ] Rule 89: ORM entities stay behind repositories.
- [ ] Rule 92: Query allowlists.
