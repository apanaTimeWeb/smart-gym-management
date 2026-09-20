# Superadmin Invoices Recovery Center â€” Feature Map

## Module Purpose
The invoices_recovery_center module is responsible for the Superadmin business workflow managing Invoices_recovery_center. It enables superadmins to view, monitor, and control the lifecycle and configurations of Invoices_recovery_center across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

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
| Superadmin Invoices Recovery Center | `/superadmin/saas-billing/invoices` | download; export c s v; log manual payment; resend email; select gym; share whats app | `SuperadminInvoicesRecoveryCenterApi.ts`, `SuperadminInvoicesApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/saas-billing/invoices_recovery_center route to load the Invoices_recovery_center data context securely via TanStack Query.
2. Interact with the Invoices_recovery_center dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Invoices_recovery_center status) through feature-owned API contracts.
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
- **Strict Isolation**: Never import admin or manager components into invoices_recovery_center.
- **Destructive Actions**: Any deletion or modification of invoices_recovery_center records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for invoices_recovery_center do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

