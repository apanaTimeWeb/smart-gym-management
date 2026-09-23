# Invoices Backend Feature Map

## Module Purpose
The invoices module owns the Superadmin invoices business capability exposed by the corresponding frontend feature slice. All HTTP mutations are isolated into command-controller micro-services, while reads stay in a separate query-controller path. The module does not directly depend on sibling business modules and keeps PostgreSQL access inside its repository boundary.

## Directory Structure
| File | Responsibility |
|---|---|
| invoices-query.controller.ts | Read-only GET endpoints for the feature. |
| invoices-command.controller.ts | Create/update/delete and status mutation endpoints. |
| invoices.repository.ts | TypeORM queries and named mutations for `saas_invoices` only. |
| invoices.entity.ts | Maps `saas_invoices` to the persistence model. |
| invoices.mapper.ts | Converts ORM entities into domain-safe data. |
| services/ | One micro-service per use case. |
| dtos/ | Request validation only. |
| responses/ | Stable response DTO contract. |

## Feature Inventory
| Endpoint | HTTP | Purpose |
|---|---|---|
| /superadmin/invoices | GET | Returns invoice records required by the Superadmin Invoices feature, preserving the frontend list, status, and recovery workflows. |
| /superadmin/invoices/:id | GET | Returns invoice records required by the Superadmin Invoices feature, preserving the frontend list, status, and recovery workflows. |
| /superadmin/invoices | POST | Returns invoice records required by the Superadmin Invoices feature, preserving the frontend list, status, and recovery workflows. |
| /superadmin/invoices/:id | PATCH | Returns invoice records required by the Superadmin Invoices feature, preserving the frontend list, status, and recovery workflows. |
| /superadmin/invoices/:id | DELETE | Returns invoice records required by the Superadmin Invoices feature, preserving the frontend list, status, and recovery workflows. |
| /superadmin/invoices/:id/status | PATCH | Returns invoice records required by the Superadmin Invoices feature, preserving the frontend list, status, and recovery workflows. |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: TypeORM, PostgreSQL, Redis, auth/RBAC core.
- **Runtime/Event Dependencies**: None declared.

## Data and State Architecture
- DB Entities: `SaasInvoice` -> `saas_invoices`.
- Redis Caching Keys: rate-limit keys only; no business cache declared.
- Event Emitters: none by default.
- Background Jobs: none declared for the V1 core CRUD flow.
- Idempotency Keys: required on financial/communication/resource-creation mutations where applicable.

## Business Flow / Key Sequences
**Standard mutation:** Controller -> DTO validation -> micro-service -> named repository mutation -> mapper -> ResponseInterceptor.

## File Responsibility Map
- `invoices-query.controller.ts` — GET transport only; MUST NOT mutate persistence.
- `invoices-command.controller.ts` — HTTP mutation transport only; MUST NOT contain business logic.
- `invoices.repository.ts` — DB queries/mutations only; MUST NOT call sibling repositories.
- `invoices-*.service.ts` — one business use case each; MUST NOT call TypeORM directly.

## Permissions and Security
All `/superadmin/invoices` endpoints require `SUPERADMIN` at the controller layer. Resource-specific tenant checks are performed when tenant identifiers are present.

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

