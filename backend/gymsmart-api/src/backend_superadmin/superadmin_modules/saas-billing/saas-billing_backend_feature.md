# saas-billing Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/saas-billing feature. It exposes 30 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `coupons/coupons_dtos/superadmin-saas-billing-coupons-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons/coupons_dtos/superadmin-saas-billing-coupons-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons/coupons_dtos/superadmin-saas-billing-coupons-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons/coupons_dtos/superadmin-saas-billing-coupons-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons/coupons_responses/superadmin-saas-billing-coupons-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-redemptions.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-restore.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_services/superadmin-saas-billing-coupons-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `coupons/coupons_types/superadmin-saas-billing-coupons.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `coupons/coupons_types/superadmin-saas-billing-coupons.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `coupons/superadmin-saas-billing-coupons-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `coupons/superadmin-saas-billing-coupons-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `coupons/superadmin-saas-billing-coupons-redemptions-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `coupons/superadmin-saas-billing-coupons-restore-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `coupons/superadmin-saas-billing-coupons.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `coupons/superadmin-saas-billing-coupons.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `coupons/superadmin-saas-billing-coupons.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `coupons/superadmin-saas-billing-coupons.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `coupons/superadmin-saas-billing-coupons.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `coupons/superadmin-saas-billing-coupons.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `coupons/superadmin-saas-billing-coupons.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `invoices/invoices_adapters/superadmin-saas-billing-invoices-email.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `invoices/invoices_dtos/superadmin-saas-billing-invoices-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_dtos/superadmin-saas-billing-invoices-export-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_dtos/superadmin-saas-billing-invoices-manual-payment.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_dtos/superadmin-saas-billing-invoices-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_dtos/superadmin-saas-billing-invoices-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_dtos/superadmin-saas-billing-invoices-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `invoices/invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_responses/superadmin-saas-billing-invoices-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-export.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-manual-payment.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-recovery-center.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-resend.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_services/superadmin-saas-billing-invoices-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/invoices_types/superadmin-saas-billing-invoices.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `invoices/invoices_types/superadmin-saas-billing-invoices.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `invoices/invoices_workers/superadmin-saas-billing-invoices-resend-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices/superadmin-saas-billing-invoices-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `invoices/superadmin-saas-billing-invoices-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `invoices/superadmin-saas-billing-invoices-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `invoices/superadmin-saas-billing-invoices-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `invoices/superadmin-saas-billing-invoices-recovery-center-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices/superadmin-saas-billing-invoices-recovery-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `invoices/superadmin-saas-billing-invoices-recovery-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `invoices/superadmin-saas-billing-invoices-resend-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `invoices/superadmin-saas-billing-invoices.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `invoices/superadmin-saas-billing-invoices.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `invoices/superadmin-saas-billing-invoices.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `invoices/superadmin-saas-billing-invoices.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `invoices/superadmin-saas-billing-invoices.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `invoices/superadmin-saas-billing-invoices.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `invoices/superadmin-saas-billing-invoices.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `plans/plans_dtos/superadmin-saas-billing-plans-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans/plans_dtos/superadmin-saas-billing-plans-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans/plans_dtos/superadmin-saas-billing-plans-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans/plans_responses/superadmin-saas-billing-plans-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans/plans_services/superadmin-saas-billing-plans-archive.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_services/superadmin-saas-billing-plans-business-controls.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_services/superadmin-saas-billing-plans-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_services/superadmin-saas-billing-plans-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_services/superadmin-saas-billing-plans-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_services/superadmin-saas-billing-plans-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_services/superadmin-saas-billing-plans-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `plans/plans_types/superadmin-saas-billing-plans.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `plans/plans_types/superadmin-saas-billing-plans.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `plans/superadmin-saas-billing-plans-api.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `plans/superadmin-saas-billing-plans-business-controls-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `plans/superadmin-saas-billing-plans-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `plans/superadmin-saas-billing-plans-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `plans/superadmin-saas-billing-plans-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `plans/superadmin-saas-billing-plans-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `plans/superadmin-saas-billing-plans.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `plans/superadmin-saas-billing-plans.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `plans/superadmin-saas-billing-plans.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `plans/superadmin-saas-billing-plans.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `plans/superadmin-saas-billing-plans.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `plans/superadmin-saas-billing-plans.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `plans/superadmin-saas-billing-plans.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-saas-billing.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-saas-billing-coupons-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the create operation. | `SuperadminSaasBillingCouponsCreateDto` | `See controller contract` |
| `superadmin-saas-billing-coupons-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the update operation. | `SuperadminSaasBillingCouponsUpdateDto` | `See controller contract` |
| `superadmin-saas-billing-coupons-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-saas-billing-coupons-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the changeStatus operation. | `SuperadminSaasBillingCouponsStatusDto` | `See controller contract` |
| `superadmin-saas-billing-coupons-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the findAll operation. | `SuperadminSaasBillingCouponsQueryDto` | `See controller contract` |
| `superadmin-saas-billing-coupons-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |
| `superadmin-saas-billing-coupons-redemptions-query.controller.ts::redemptions` | GET | `superadmin/saas-billing/coupons/:id/redemptions` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the redemptions operation. | `—` | `See controller contract` |
| `superadmin-saas-billing-coupons-restore-command.controller.ts::restore` | POST | `superadmin/saas-billing/coupons/:id/restore` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the restore operation. | `—` | `See controller contract` |
| `superadmin-saas-billing-invoices-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the create operation. | `SuperadminSaasBillingInvoicesCreateDto` | `See controller contract` |
| `superadmin-saas-billing-invoices-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the update operation. | `SuperadminSaasBillingInvoicesUpdateDto` | `See controller contract` |
| `superadmin-saas-billing-invoices-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-saas-billing-invoices-command.controller.ts::changeStatus` | PATCH | `:id/status` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the changeStatus operation. | `SuperadminSaasBillingInvoicesStatusDto` | `See controller contract` |
| `superadmin-saas-billing-invoices-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the findAll operation. | `SuperadminSaasBillingInvoicesQueryDto` | `See controller contract` |
| `superadmin-saas-billing-invoices-query.controller.ts::export` | GET | `export` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the export operation. | `SuperadminSaasBillingInvoicesExportQueryDto` | `See controller contract` |
| `superadmin-saas-billing-invoices-query.controller.ts::download` | GET | `:id/download` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the download operation. | `—` | `See controller contract` |
| `superadmin-saas-billing-invoices-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts::manualPayment` | POST | `superadmin/saas-billing/invoices/manual-payment` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the manualPayment operation. | `SuperadminSaasBillingInvoicesManualPaymentDto` | `See controller contract` |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts::resend` | POST | `superadmin/saas-billing/invoices/:id/resend` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the resend operation. | `—` | `null` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::recoveryCenter` | GET | `superadmin/saas-billing/invoices/recovery-center` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the recoveryCenter operation. | `SuperadminQueryDto` | `SuperadminSaasBillingInvoicesResendJobStatusResponseDto` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::recoveryCenter` | GET | `api/superadmin/saas-billing/invoices/recovery-center` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the recoveryCenter operation. | `SuperadminQueryDto` | `SuperadminSaasBillingInvoicesResendJobStatusResponseDto` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::resendJobStatus` | GET | `superadmin/saas-billing/invoices/resend-jobs/:jobId` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the resendJobStatus operation. | `—` | `SuperadminSaasBillingInvoicesResendJobStatusResponseDto` |
| `superadmin-saas-billing-plans-api.controller.ts::businessControls` | GET | `api/superadmin/saas-billing/plans/business-controls` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the businessControls operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-saas-billing-plans-command.controller.ts::create` | POST | `/` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the create operation. | `SuperadminSaasBillingPlansCreateDto` | `See controller contract` |
| `superadmin-saas-billing-plans-command.controller.ts::update` | PATCH | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the update operation. | `SuperadminSaasBillingPlansUpdateDto` | `See controller contract` |
| `superadmin-saas-billing-plans-command.controller.ts::remove` | DELETE | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the remove operation. | `—` | `void` |
| `superadmin-saas-billing-plans-command.controller.ts::archive` | PATCH | `:id/archive` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the archive operation. | `—` | `See controller contract` |
| `superadmin-saas-billing-plans-query.controller.ts::findAll` | GET | `/` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the findAll operation. | `SuperadminSaasBillingPlansQueryDto` | `See controller contract` |
| `superadmin-saas-billing-plans-query.controller.ts::businessControls` | GET | `business-controls` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the businessControls operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-saas-billing-plans-query.controller.ts::businessControls` | GET | `api/superadmin/saas-billing/plans/business-controls` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the businessControls operation. | `SuperadminQueryDto` | `See controller contract` |
| `superadmin-saas-billing-plans-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning saas-billing use case, and returns the declared contract for the findOne operation. | `—` | `See controller contract` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_config, superadmin_core_database, superadmin_core_external, superadmin_core_jobs, superadmin_core_pagination, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-saas-billing-coupons.entity → `superadmin_coupons`, superadmin-saas-billing-invoices-contract-snapshot.entity → `superadmin_invoices_contract_snapshots`, superadmin-saas-billing-invoices-resend-job.entity → `superadmin_saas_invoice_resend_jobs`, superadmin-saas-billing-invoices.entity → `superadmin_saas_invoices`, superadmin-saas-billing-plans-contract-snapshot.entity → `superadmin_plans_contract_snapshots`, superadmin-saas-billing-plans.entity → `superadmin_subscription_plans`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: invoices/superadmin-saas-billing-invoices-resend-job.entity.ts, invoices/invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto.ts, invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository.ts
- Idempotency Keys: `/superadmin/saas-billing/coupons`, `/superadmin/saas-billing/coupons/:id`, `/superadmin/saas-billing/coupons/:id/restore`, `/superadmin/saas-billing/coupons/:id/status`, `/superadmin/saas-billing/invoices`, `/superadmin/saas-billing/invoices/:id`, `/superadmin/saas-billing/invoices/:id/resend`, `/superadmin/saas-billing/invoices/:id/status`, `/superadmin/saas-billing/invoices/manual-payment`, `/superadmin/saas-billing/plans`, `/superadmin/saas-billing/plans/:id`, `/superadmin/saas-billing/plans/:id/archive`

## Business Flow / Key Sequences
For each mutation, the controller validates the request, the use-case service applies business rules, the repository owns PostgreSQL mutation/query details, and the mapper/response DTO exposes only contract-approved fields. Heavy work is queued rather than performed in the HTTP request.

## File Responsibility Map
Every file has one responsibility. Controllers own HTTP wiring only; DTOs own edge validation; services own use-case decisions; repositories own ORM access; mappers own domain/response translation; adapters own external APIs.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/saas-billing/coupons` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/coupons/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/coupons/:id/redemptions` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/coupons/:id/restore` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/invoices` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/invoices/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/invoices/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/invoices/:id/status` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/export` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/:id/download` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/invoices/manual-payment` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/invoices/:id/resend` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/recovery-center` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/saas-billing/invoices/recovery-center` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/invoices/resend-jobs/:jobId` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/saas-billing/plans` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/saas-billing/plans/:id/archive` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/api/superadmin/saas-billing/plans/business-controls` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/saas-billing/plans/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Cross-feature direct business imports violate the feature write boundary and can introduce hidden coupling — see Rules 0B/0C and Rule 49.
- DTO acceptance does not prove behavior; every accepted field must reach the intended use case and persistence/query path — see Rule 82A.
- Soft-deleted records must never silently reappear in standard reads — see Rule 29.
- User-controlled sorting/filtering must resolve only through allowlists — see Rule 92.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `saas-billing/coupons/superadmin_coupons_features.md`

- **API files:** `coupons_api/SuperadminCouponsApi.ts`
- **Detected API symbols:** `fetchCoupons` — `coupons_api/SuperadminCouponsApi.ts`; `createCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `updateCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `deleteCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `restoreCoupon` — `coupons_api/SuperadminCouponsApi.ts`; `updateCouponStatus` — `coupons_api/SuperadminCouponsApi.ts`; `fetchRedemptions` — `coupons_api/SuperadminCouponsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `saas-billing/invoices/superadmin_invoices_features.md`

- **API files:** `invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `invoices_api/SuperadminInvoicesApi.ts`
- **Detected API symbols:** `fetchInvoiceRecoveryCenter` — `invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`; `fetchInvoices` — `invoices_api/SuperadminInvoicesApi.ts`; `createManualPayment` — `invoices_api/SuperadminInvoicesApi.ts`; `fetchInvoiceDownloadUrl` — `invoices_api/SuperadminInvoicesApi.ts`; `exportInvoiceReport` — `invoices_api/SuperadminInvoicesApi.ts`; `resendInvoiceEmail` — `invoices_api/SuperadminInvoicesApi.ts`; `fetchTenants` — `invoices_api/SuperadminInvoicesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `saas-billing/invoices/superadmin_invoices_recovery_center_features.md`

- **API files:** `invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `invoices_api/SuperadminInvoicesApi.ts`
- **Detected API symbols:** `fetchInvoiceRecoveryCenter` — `invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`; `fetchInvoices` — `invoices_api/SuperadminInvoicesApi.ts`; `createManualPayment` — `invoices_api/SuperadminInvoicesApi.ts`; `fetchInvoiceDownloadUrl` — `invoices_api/SuperadminInvoicesApi.ts`; `exportInvoiceReport` — `invoices_api/SuperadminInvoicesApi.ts`; `resendInvoiceEmail` — `invoices_api/SuperadminInvoicesApi.ts`; `fetchTenants` — `invoices_api/SuperadminInvoicesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `saas-billing/plans/superadmin_plans_business_controls_features.md`

- **API files:** `plans_api/SuperadminPlansBusinessControlsApi.ts`, `plans_api/SuperadminPlansApi.ts`
- **Detected API symbols:** `fetchPlansBusinessControls` — `plans_api/SuperadminPlansBusinessControlsApi.ts`; `fetchPlans` — `plans_api/SuperadminPlansApi.ts`; `fetchPlanById` — `plans_api/SuperadminPlansApi.ts`; `createPlan` — `plans_api/SuperadminPlansApi.ts`; `updatePlan` — `plans_api/SuperadminPlansApi.ts`; `deletePlan` — `plans_api/SuperadminPlansApi.ts`; `archivePlan` — `plans_api/SuperadminPlansApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `saas-billing/plans/superadmin_plans_features.md`

- **API files:** `plans_api/SuperadminPlansBusinessControlsApi.ts`, `plans_api/SuperadminPlansApi.ts`
- **Detected API symbols:** `fetchPlansBusinessControls` — `plans_api/SuperadminPlansBusinessControlsApi.ts`; `fetchPlans` — `plans_api/SuperadminPlansApi.ts`; `fetchPlanById` — `plans_api/SuperadminPlansApi.ts`; `createPlan` — `plans_api/SuperadminPlansApi.ts`; `updatePlan` — `plans_api/SuperadminPlansApi.ts`; `deletePlan` — `plans_api/SuperadminPlansApi.ts`; `archivePlan` — `plans_api/SuperadminPlansApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `saas-billing/coupons/superadmin_coupons_features.md`

- **Data-bearing components:** `page.tsx`, `coupons_components/SuperadminCouponModal.tsx`, `coupons_components/SuperadminCouponEditModal.tsx`, `coupons_components/SuperadminCouponsRedemptionDrawer.tsx`, `coupons_components/SuperadminCouponsDateFilterDropdown.tsx`, `coupons_components/SuperadminCouponsClient.tsx`, `coupons_components/SuperadminCouponsStatsBar/SuperadminCouponsStatsBar.tsx`, `coupons_components/SuperadminCouponsEmptyState/SuperadminCouponsEmptyState.tsx`, `coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge.tsx`, `coupons_components/SuperadminCouponsHeader/SuperadminCouponsHeader.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTableRow.tsx`, `coupons_components/SuperadminCouponsTable/SuperadminCouponsTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `saas-billing/invoices/superadmin_invoices_features.md`

- **Data-bearing components:** `page.tsx`, `invoices_components/SuperadminInvoicesDateFilterDropdown.tsx`, `invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx`, `invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx`, `invoices_components/SuperadminInvoicesClient.tsx`, `invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx`, `invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx`, `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx`, `invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx`, `invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx`, `invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `saas-billing/invoices/superadmin_invoices_recovery_center_features.md`

- **Data-bearing components:** `page.tsx`, `invoices_components/SuperadminInvoicesDateFilterDropdown.tsx`, `invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx`, `invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx`, `invoices_components/SuperadminInvoicesClient.tsx`, `invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx`, `invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx`, `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx`, `invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx`, `invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx`, `invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `saas-billing/plans/superadmin_plans_business_controls_features.md`

- **Data-bearing components:** `page.tsx`, `plans_components/SuperadminPlansList.tsx`, `plans_components/SuperadminPlanCreateModal.tsx`, `plans_components/SuperadminPlansClient.tsx`, `plans_components/SuperadminPlanEditModal.tsx`, `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx`, `plans_components/SuperadminPlansV1ComparisonPanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `saas-billing/plans/superadmin_plans_features.md`

- **Data-bearing components:** `page.tsx`, `plans_components/SuperadminPlansList.tsx`, `plans_components/SuperadminPlanCreateModal.tsx`, `plans_components/SuperadminPlansClient.tsx`, `plans_components/SuperadminPlanEditModal.tsx`, `plans_components/SuperadminPlansV1HistoryAddonsAndMigrationSection.tsx`, `plans_components/SuperadminPlansV1ComparisonPanel.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``{superadmin}{q}`` | ``ApiResponse<Coupon[]>`` | `REQ-072` / ``fetchCoupons`` |
| ``/superadmin/saas-billing/coupons`` | ``ApiResponse<Coupon>`` | `REQ-073` / ``createCoupon`` |
| ``{superadmin}/{id}`` | ``ApiResponse<Coupon>`` | `REQ-074` / ``updateCoupon`` |
| ``{superadmin}/{id}`` | ``ApiResponse<void>`` | `REQ-075` / ``deleteCoupon`` |
| ``{superadmin}/{id}/restore`` | ``ApiResponse<Coupon>`` | `REQ-076` / ``restoreCoupon`` |
| ``{superadmin}/{id}/status`` | ``ApiResponse<Coupon>`` | `REQ-077` / ``updateCouponStatus`` |
| ``{superadmin}/{id}/redemptions`` | ``ApiResponse<RedemptionRecord[]>`` | `REQ-078` / ``fetchRedemptions`` |
| ``{superadmin}{q}`` | ``ApiResponse<SaaSInvoice[]>`` | `REQ-079` / ``fetchInvoices`` |
| ``/superadmin/saas-billing/invoices/manual-payment`` | ``ApiResponse<SaaSInvoice>`` | `REQ-080` / ``createManualPayment`` |
| ``{superadmin}/{id}/download`` | ``ApiResponse<{` | `REQ-081` / ``fetchInvoiceDownloadUrl`` |
| ``{superadmin}/export{q}`` | ``ApiResponse<{` | `REQ-082` / ``exportInvoiceReport`` |
| ``{superadmin}/{id}/resend`` | ``ApiResponse<null>`` | `REQ-083` / ``resendInvoiceEmail`` |
| ``/api/gyms`` | ``ApiResponse<SuperadminInvoicesTenant[]>`` | `REQ-084` / ``fetchTenants`` |
| ``/api/superadmin/saas-billing/invoices/recovery-center`` | ``ApiResponse<SuperadminInvoicesV1Data>`` | `REQ-085` / ``fetchInvoiceRecoveryCenter`` |
| ``{superadmin}{q}`` | ``ApiResponse<SubscriptionPlan[]>`` | `REQ-086` / ``fetchPlans`` |
| ``{superadmin}/{id}`` | ``ApiResponse<SubscriptionPlan>`` | `REQ-087` / ``fetchPlanById`` |
| ``/superadmin/saas-billing/plans`` | ``ApiResponse<SubscriptionPlan>`` | `REQ-088` / ``createPlan`` |
| ``{superadmin}/{id}`` | ``ApiResponse<SubscriptionPlan>`` | `REQ-089` / ``updatePlan`` |
| ``{superadmin}/{id}`` | ``ApiResponse<void>`` | `REQ-090` / ``deletePlan`` |
| ``{superadmin}/{id}/archive`` | ``ApiResponse<void>`` | `REQ-091` / ``archivePlan`` |
| ``/api/superadmin/saas-billing/plans/business-controls`` | ``ApiResponse<SuperadminPlansV1Data>`` | `REQ-092` / ``fetchPlansBusinessControls`` |

### UI-Required Fields
No dedicated frontend UI Data Requirements section was supplied for this module. The frozen Stage 1 requirement IDs remain the authoritative frontend-derived evidence; no additional fields are invented here.

### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


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
