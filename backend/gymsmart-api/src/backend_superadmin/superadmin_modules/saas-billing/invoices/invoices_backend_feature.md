# Invoices Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/saas-billing/invoices feature. It exposes 13 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `invoices_adapters/superadmin-saas-billing-invoices-email.adapter.ts` | Isolates an external provider boundary; MUST NOT contain feature business rules. |
| `invoices_dtos/superadmin-saas-billing-invoices-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_dtos/superadmin-saas-billing-invoices-export-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_dtos/superadmin-saas-billing-invoices-manual-payment.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_dtos/superadmin-saas-billing-invoices-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_dtos/superadmin-saas-billing-invoices-status.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_dtos/superadmin-saas-billing-invoices-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_responses/superadmin-saas-billing-invoices-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `invoices_services/superadmin-saas-billing-invoices-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-export.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-manual-payment.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-recovery-center.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-resend.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-status.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_services/superadmin-saas-billing-invoices-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `invoices_types/superadmin-saas-billing-invoices.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `invoices_types/superadmin-saas-billing-invoices.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `invoices_workers/superadmin-saas-billing-invoices-resend-worker.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `superadmin-saas-billing-invoices-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-invoices-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-saas-billing-invoices-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-saas-billing-invoices-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-invoices-recovery-center-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-saas-billing-invoices-resend-job.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-saas-billing-invoices.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-saas-billing-invoices.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-saas-billing-invoices.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-saas-billing-invoices.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-saas-billing-invoices.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-saas-billing-invoices.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-saas-billing-invoices.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-saas-billing-invoices-command.controller.ts::create` | POST | `/superadmin/saas-billing/invoices` | This endpoint invokes `create` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::update` | PATCH | `/superadmin/saas-billing/invoices/:id` | This endpoint invokes `update` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::remove` | DELETE | `/superadmin/saas-billing/invoices/:id` | This endpoint invokes `remove` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-command.controller.ts::changeStatus` | PATCH | `/superadmin/saas-billing/invoices/:id/status` | This endpoint invokes `changeStatus` on `superadmin-saas-billing-invoices-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::findAll` | GET | `/superadmin/saas-billing/invoices` | This endpoint invokes `findAll` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::export` | GET | `/superadmin/saas-billing/invoices/export` | This endpoint invokes `export` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::download` | GET | `/superadmin/saas-billing/invoices/:id/download` | This endpoint invokes `download` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-query.controller.ts::findOne` | GET | `/superadmin/saas-billing/invoices/:id` | This endpoint invokes `findOne` on `superadmin-saas-billing-invoices-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts::manualPayment` | POST | `/superadmin/saas-billing/invoices/manual-payment` | This endpoint invokes `manualPayment` on `superadmin-saas-billing-invoices-recovery-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-command.controller.ts::resend` | POST | `/superadmin/saas-billing/invoices/:id/resend` | This endpoint invokes `resend` on `superadmin-saas-billing-invoices-recovery-command.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::recoveryCenter` | GET | `/superadmin/saas-billing/invoices/recovery-center` | This endpoint invokes `recoveryCenter` on `superadmin-saas-billing-invoices-recovery-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::recoveryCenter` | GET | `/api/superadmin/saas-billing/invoices/recovery-center` | This endpoint invokes `recoveryCenter` on `superadmin-saas-billing-invoices-recovery-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |
| `superadmin-saas-billing-invoices-recovery-query.controller.ts::resendJobStatus` | GET | `/superadmin/saas-billing/invoices/resend-jobs/:jobId` | This endpoint invokes `resendJobStatus` on `superadmin-saas-billing-invoices-recovery-query.controller.ts` and returns the feature contract for its requested operation. | `—` | `unknown` |

## Approved External Dependencies

- **Business Feature Dependencies**: saas-billing
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_config, superadmin_core_database, superadmin_core_external, superadmin_core_jobs, superadmin_core_pagination, superadmin_core_tenancy
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-saas-billing-invoices-contract-snapshot.entity → `superadmin_invoices_contract_snapshots`, superadmin-saas-billing-invoices-resend-job.entity → `superadmin_saas_invoice_resend_jobs`, superadmin-saas-billing-invoices.entity → `superadmin_saas_invoices`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: superadmin-saas-billing-invoices-resend-job.entity.ts, invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto.ts, invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository.ts
- Idempotency Keys: `/superadmin/saas-billing/invoices`, `/superadmin/saas-billing/invoices/:id`, `/superadmin/saas-billing/invoices/:id/resend`, `/superadmin/saas-billing/invoices/:id/status`, `/superadmin/saas-billing/invoices/manual-payment`

## Business Flow / Key Sequences
**Standard mutation:** Controller -> DTO validation -> micro-service -> named repository mutation -> mapper -> ResponseInterceptor.

## File Responsibility Map
- `invoices-query.controller.ts` — GET transport only; MUST NOT mutate persistence.
- `invoices-command.controller.ts` — HTTP mutation transport only; MUST NOT contain business logic.
- `invoices.repository.ts` — DB queries/mutations only; MUST NOT call sibling repositories.
- `invoices-*.service.ts` — one business use case each; MUST NOT call TypeORM directly.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
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

## Edge Cases / AI Warnings
- Soft deletes MUST remain invisible to standard reads — violating Rule 29 can expose deleted records.
- Sort/search inputs MUST be allowlisted — violating Rule 92 enables unsafe query construction.
- Service mutations MUST use named repository methods — violating Rule 99 leaks persistence behavior into business code.

## Frozen API Contract

<!-- Exact source: frontend saas-billing/invoices/superadmin_invoices_features.md -->

﻿# Superadmin Invoices â€” Feature Map

## Module Purpose
The invoices module is responsible for the Superadmin business workflow managing Invoices. It enables superadmins to view, monitor, and control the lifecycle and configurations of Invoices across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `invoices_api/` | Feature-owned responsibility for invoices api. | `SuperadminInvoicesApi.ts`, `SuperadminInvoicesRecoveryCenterApi.ts` |
| `invoices_mocks/` | Feature-owned responsibility for invoices mocks. | `(directory present; no direct files)` |
| `invoices_tests/` | Feature-owned responsibility for invoices tests. | `SuperadminInvoicesBasic.test.tsx`, `SuperadminInvoicesRecoveryCenter.test.ts` |
| `invoices_types/` | Feature-owned responsibility for invoices types. | `SuperadminInvoicesAgingReportTypes.ts`, `SuperadminInvoicesClientTypes.ts`, `SuperadminInvoicesEmptyStateTypes.ts`, `SuperadminInvoicesHeaderTypes.ts`, `SuperadminInvoicesLogPaymentModalTypes.ts`, `SuperadminInvoicesStatsBarTypes.ts`, `SuperadminInvoicesTableRowTypes.ts`, `SuperadminInvoicesTableTypes.ts`, `SuperadminInvoicesTypes.ts`, `SuperadminInvoicesV1Types.ts` |
| `invoices_utils/` | Feature-owned responsibility for invoices utils. | `SuperadminInvoicesMetrics.ts`, `SuperadminInvoicesStatusBadgeConfig.ts`, `useSuperadminInvoiceActions.ts`, `useSuperadminInvoicesV1.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Invoices | `/superadmin/saas-billing/invoices` | download; export c s v; log manual payment; resend email; select gym; share whats app | `SuperadminInvoicesRecoveryCenterApi.ts`, `SuperadminInvoicesApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/saas-billing/invoices route to load the Invoices data context securely via TanStack Query.
2. Interact with the Invoices dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Invoices status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `saas-billing/invoices`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `invoices_components/useSuperadminInvoicesPage.ts`, `invoices_utils/useSuperadminInvoicesV1.ts`, `invoices_utils/useSuperadminInvoiceActions.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'invoices', queryParams]`, `['superadmin', 'invoices', 'tenants']`, `['superadmin', 'invoices']`, `['superadmin', 'invoices_recovery_center']`

## API Contract

- **API files:** `invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `invoices_api/SuperadminInvoicesApi.ts`
- **Detected API symbols:** `fetchInvoiceRecoveryCenter` — `invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`; `fetchInvoices` — `invoices_api/SuperadminInvoicesApi.ts`; `createManualPayment` — `invoices_api/SuperadminInvoicesApi.ts`; `fetchInvoiceDownloadUrl` — `invoices_api/SuperadminInvoicesApi.ts`; `exportInvoiceReport` — `invoices_api/SuperadminInvoicesApi.ts`; `resendInvoiceEmail` — `invoices_api/SuperadminInvoicesApi.ts`; `fetchTenants` — `invoices_api/SuperadminInvoicesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `invoices_components/SuperadminInvoicesDateFilterDropdown.tsx`, `invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx`, `invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx`, `invoices_components/SuperadminInvoicesClient.tsx`, `invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx`, `invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx`, `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx`, `invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx`, `invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx`, `invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the invoices page. Renders the interactive client component. |
| `invoices_components/SuperadminInvoicesDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx` | Renders the Superadmin invoices V1 Payment recovery queue view. |
| `invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx` | Renders the Superadmin invoices V1 InvoicesRecoverySummary summary cards. |
| `invoices_components/SuperadminInvoicesClient.tsx` | Root orchestrator for the Invoices page. Composes sub-components and passes state from useSuperadminInvoicesPage. No inline business logic. |
| `invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx` | Renders the Superadmin invoices V1 Recovery schedule, Refunds, credits & write-offs view. |
| `invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx` | Renders invoice page actions and delegates export behavior to the invoice action hook. |
| `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx` | Renders the empty state UI for the Invoices table when no invoices exist. Shows icon, message, and CTA to log first payment. |
| `invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx` | Renders the Superadmin invoices summary statistics. |
| `invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx` | Renders the aging report for unpaid invoices. |
| `invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx` | Renders the SuperadminInvoicesLogPaymentModal component. |
| `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx` | Renders a single row in the Invoices table with WhatsApp, Email resend, and PDF download actions. |
| `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx` | Renders the SuperadminInvoicesTable component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into invoices.
- **Destructive Actions**: Any deletion or modification of invoices records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for invoices do not expose cross-tenant sensitive data.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `invoices_components/SuperadminInvoicesDateFilterDropdown.tsx`, `invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx`, `invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx`, `invoices_components/SuperadminInvoicesClient.tsx`, `invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx`, `invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx`, `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx`, `invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx`, `invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx`, `invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `invoices_components/SuperadminInvoicesDateFilterDropdown.tsx`, `invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx`, `invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx`, `invoices_components/SuperadminInvoicesClient.tsx`, `invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx`, `invoices_components/SuperadminInvoicesHeader/SuperadminInvoicesHeader.tsx`, `invoices_components/SuperadminInvoicesEmptyState/SuperadminInvoicesEmptyState.tsx`, `invoices_components/SuperadminInvoicesStatsBar/SuperadminInvoicesStatsBar.tsx`, `invoices_components/SuperadminInvoicesAgingReport/SuperadminInvoicesAgingReport.tsx`, `invoices_components/SuperadminInvoicesLogPaymentModal/SuperadminInvoicesLogPaymentModal.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTableRow.tsx`, `invoices_components/SuperadminInvoicesTable/SuperadminInvoicesTable.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

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


- [ ] Rule 7: TypeORM is the sole ORM and is used behind repositories.
- [ ] Rule 19: This feature doc updates with feature changes.
- [ ] Rule 28: Responses use the canonical envelope.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency on applicable critical mutations.
- [ ] Rule 48: Separate query/command controllers.
- [ ] Rule 56: `findByIdOrThrow()` for fail-fast reads.
- [ ] Rule 62: Explicit service/repository return types.
- [ ] Rule 82A: Response DTO must remain complete against frontend UI data requirements.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 85: Guard clauses and low conditional nesting.
- [ ] Rule 89: ORM entities do not cross into business logic.
- [ ] Rule 92: Query fields validated by allowlists.
- [ ] Rule 99: Named repository mutation methods only.
- [ ] Rule 100: Explicit named DB constraints in migrations.
- [ ] Rule 101: Tests must prove observable behavior.

## Repair Addendum — Async Invoice Resend

The invoice resend flow is asynchronous and durable. `POST /superadmin/saas-billing/invoices/:id/resend` validates the invoice and tenant recipient, persists a resend job, and returns `202 Accepted` with `jobId` and `statusUrl`; delivery is performed by the feature-owned Redis worker through the email adapter with bounded timeout, retries, and a DLQ.

| Endpoint | HTTP | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|
| `/superadmin/saas-billing/invoices/:id/resend` | POST | Queues one invoice email resend without performing provider I/O on the HTTP thread. | path `id` | `SuperadminSaasBillingInvoicesResendQueuedResponseDto` |
| `/superadmin/saas-billing/invoices/resend-jobs/:jobId` | GET | Returns durable resend status for the frontend async lifecycle. | path `jobId` | `SuperadminSaasBillingInvoicesResendJobStatusResponseDto` |

- Background Job: `superadmin:invoice-resend`; DLQ: `superadmin:invoice-resend:dlq`.
- Persistence: `superadmin_saas_invoice_resend_jobs`; tenant identity is retained on the job.
- Idempotency: the resend command is protected by `@RequireIdempotencyKey()` and the frontend generates one key per resend operation.

## V1 Repair Addendum — Durable Invoice Resend Contract
The `POST /superadmin/saas-billing/invoices/:id/resend` mutation now creates a durable resend job and queues provider delivery. The frontend's frozen response contract remains `data: null`; the asynchronous job lifecycle is exposed through the HTTP `Location` response header pointing to `GET /superadmin/saas-billing/invoices/resend-jobs/:jobId`. Retries return the job to `QUEUED`, terminal failures enter the queue DLQ, and successful delivery marks the job `SUCCESS` only after the provider call completes.

**AI MUST NOT** change this endpoint to return a job object in `data` without a coordinated frontend contract amendment, and MUST NOT bypass the resend job repository/worker path.

## Repair Addendum — Financial Safety

Manual invoice payments now pass through `SuperadminSaasBillingInvoicesManualPaymentOrchestratorService` and append immutable debit/credit ledger entries alongside the paid-invoice mutation in one UnitOfWork transaction. Ledger rows are the financial audit source; the invoice status remains a domain projection.

### Added Files
- `superadmin-saas-billing-invoices-ledger.entity.ts` — immutable debit/credit ledger rows.
- `invoices_repositories/superadmin-saas-billing-invoices-ledger.repository.ts` — paired-entry persistence.
- `invoices_services/superadmin-saas-billing-invoices-manual-payment-orchestrator.service.ts` — atomic payment orchestration.

