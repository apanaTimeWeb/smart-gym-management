# Superadmin Invoices Recovery Center â€” Feature Map

## Module Purpose
superadmin_invoices_recovery_center_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/invoices``. Authenticated Superadmin users can download; export c s v; log manual payment; resend email; select gym; share whats app. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `superadmin_invoices_api/SuperadminInvoicesApi.ts``.

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** None identified in the owned API surface.
- **Read:** `fetchInvoiceRecoveryCenter`
- **Update / Action:** None identified in the owned API surface.
- **Delete:** None identified in the owned API surface.

## Directory Structure

| Path | Responsibility | Key Files |
|---|---|---|
| `./` | Route/documentation root for `superadmin_invoices`. | `error.tsx, loading.tsx, not-found.tsx, page.tsx, superadmin_invoices_features.md, superadmin_invoices_forbidden.md, superadmin_invoices_theme_contract.md, superadmin_invoices_url_config.ts` |
| `superadmin_invoices_api/` | Owns module-scoped api artifacts. | `SuperadminInvoicesApi.ts, SuperadminInvoicesRecoveryCenterApi.ts` |
| `superadmin_invoices_components/` | Owns module-scoped components artifacts. | `SuperadminInvoicesDateFilterDropdown.tsx, SuperadminInvoicesMain.tsx` |
| `superadmin_invoices_constants/` | Owns module-scoped constants artifacts. | `SuperadminInvoicesConstants.test.ts, SuperadminInvoicesConstants.ts, SuperadminInvoicesQueryKeys.ts, SuperadminInvoicesStatusBadgeConfig.test.ts, SuperadminInvoicesStatusBadgeConfig.ts` |
| `superadmin_invoices_documentation/` | Owns module-scoped documentation artifacts. | `superadmin_invoices_recovery_center_features.md, superadmin_invoices_recovery_center_forbidden.md, superadmin_invoices_recovery_center_theme_contract.md` |
| `superadmin_invoices_hooks/` | Owns module-scoped hooks artifacts. | `useSuperadminInvoicesInvoiceActions.test.tsx, useSuperadminInvoicesInvoiceActions.ts, useSuperadminInvoicesMain.test.ts, useSuperadminInvoicesMain.ts, useSuperadminInvoicesManualPayment.test.ts` (+7 more) |
| `superadmin_invoices_locales/` | Owns module-scoped locales artifacts. | `superadmin_invoices_en.json, superadmin_invoices_hi.json` |
| `superadmin_invoices_mocks/` | Owns module-scoped mocks artifacts. | `` |
| `superadmin_invoices_schemas/` | Owns module-scoped schemas artifacts. | `SuperadminInvoicesApiSchemas.ts, SuperadminInvoicesContractSchemas.ts, SuperadminInvoicesManualPaymentFormSchema.test.ts, SuperadminInvoicesManualPaymentFormSchema.ts, SuperadminInvoicesV1ContractSchemas.ts` |
| `superadmin_invoices_tests/` | Owns module-scoped tests artifacts. | `SuperadminInvoicesBasic.test.tsx, SuperadminInvoicesRecoveryCenter.test.ts` |
| `superadmin_invoices_types/` | Owns module-scoped types artifacts. | `SuperadminInvoicesClientTypes.ts, SuperadminInvoicesDateFilterTypes.ts, SuperadminInvoicesEmptyStateTypes.ts, SuperadminInvoicesHeaderTypes.ts, SuperadminInvoicesLogPaymentModalTypes.ts` (+5 more) |
| `superadmin_invoices_utils/` | Owns module-scoped utils artifacts. | `SuperadminInvoicesAgingUtils.test.ts, SuperadminInvoicesAgingUtils.ts, SuperadminInvoicesDateRangeUtils.test.ts, SuperadminInvoicesDateRangeUtils.ts, SuperadminInvoicesFormatCurrency.test.ts` (+3 more) |

## Approved External Dependencies

### Application Infrastructure
- `@/app/frontend_superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Invoices Recovery Center | `/superadmin/invoices` | download; export c s v; log manual payment; resend email; select gym; share whats app | `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `superadmin_invoices_api/SuperadminInvoicesApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/invoices_recovery_center route to load the Invoices_recovery_center data context securely via TanStack Query.
2. Interact with the Invoices_recovery_center dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Invoices_recovery_center status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `superadmin_invoices`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `superadmin_invoices_hooks/useSuperadminInvoicesPage.ts`, `superadmin_invoices_hooks/useSuperadminInvoicesV1.ts`, `superadmin_invoices_hooks/useSuperadminInvoicesInvoiceActions.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `superadmin_invoices_constants/SuperadminInvoicesQueryKeys.ts`

## API Contract

- **API files:** `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `superadmin_invoices_api/SuperadminInvoicesApi.ts`
- **Detected API symbols:** `fetchInvoiceRecoveryCenter` — `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`; `fetchInvoices` — `superadmin_invoices_api/SuperadminInvoicesApi.ts`; `createManualPayment` — `superadmin_invoices_api/SuperadminInvoicesApi.ts`; `fetchInvoiceDownloadUrl` — `superadmin_invoices_api/SuperadminInvoicesApi.ts`; `exportInvoiceReport` — `superadmin_invoices_api/SuperadminInvoicesApi.ts`; `resendInvoiceEmail` — `superadmin_invoices_api/SuperadminInvoicesApi.ts`; `fetchTenants` — `superadmin_invoices_api/SuperadminInvoicesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

Source-derived mapping from current consuming components and module-owned API clients. Property names below are observed in the UI source; exact response envelopes remain authoritative at the API/schema layer and require runtime verification in the host application.

| UI Source | Observed Data Fields | Module API Source | Mock Ownership |
|---|---|---|---|
| `superadmin_invoices_components/superadmin_invoices_aging_report/SuperadminInvoicesAgingReport.tsx` | `amount`, `currency`, `count`, `invoices` | `superadmin_invoices_api/SuperadminInvoicesApi.ts`, `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts` | Module-owned fixture/handler |
| `superadmin_invoices_components/superadmin_invoices_log_payment_modal/SuperadminInvoicesLogPaymentModal.tsx` | `id`, `name`, `plan` | `superadmin_invoices_api/SuperadminInvoicesApi.ts`, `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts` | Module-owned fixture/handler |
| `superadmin_invoices_components/superadmin_invoices_table/SuperadminInvoicesTableRow.tsx` | `downloadUrl` | `superadmin_invoices_api/SuperadminInvoicesApi.ts`, `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts` | Module-owned fixture/handler |

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `superadmin_invoices_components/superadmin_invoices_empty_state/SuperadminInvoicesEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component for the invoices page. Renders the interactive client component. |
| `superadmin_invoices_components/SuperadminInvoicesDateFilterDropdown.tsx` | A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports). |
| `superadmin_invoices_components/SuperadminInvoicesV1PaymentRecoveryQueuePanel.tsx` | Renders the Superadmin invoices V1 Payment recovery queue view. |
| `superadmin_invoices_components/SuperadminInvoicesV1RecoverySummaryCards.tsx` | Renders the Superadmin invoices V1 InvoicesRecoverySummary summary cards. |
| `superadmin_invoices_components/SuperadminInvoicesMain.tsx` | Root orchestrator for the Invoices page. Composes sub-components and passes state from useSuperadminInvoicesPage. No inline business logic. |
| `superadmin_invoices_components/SuperadminInvoicesV1RecoveryAndFinancialAdjustmentsSection.tsx` | Renders the Superadmin invoices V1 Recovery schedule, Refunds, credits & write-offs view. |
| `superadmin_invoices_components/superadmin_invoices_header/SuperadminInvoicesHeader.tsx` | Renders invoice page actions and delegates export behavior to the invoice action hook. |
| `superadmin_invoices_components/superadmin_invoices_empty_state/SuperadminInvoicesEmptyState.tsx` | Renders the empty state UI for the Invoices table when no invoices exist. Shows icon, message, and CTA to log first payment. |
| `superadmin_invoices_components/superadmin_invoices_stats_bar/SuperadminInvoicesStatsBar.tsx` | Renders the Superadmin invoices summary statistics. |
| `superadmin_invoices_components/superadmin_invoices_aging_report/SuperadminInvoicesAgingReport.tsx` | Renders the aging report for unpaid invoices. |
| `superadmin_invoices_components/superadmin_invoices_log_payment_modal/SuperadminInvoicesLogPaymentModal.tsx` | Renders the SuperadminInvoicesLogPaymentModal component. |
| `superadmin_invoices_components/superadmin_invoices_table/SuperadminInvoicesTableRow.tsx` | Renders a single row in the Invoices table with WhatsApp, Email resend, and PDF download actions. |
| `superadmin_invoices_components/superadmin_invoices_table/SuperadminInvoicesTable.tsx` | Renders the SuperadminInvoicesTable component. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into superadmin_invoices_recovery_center.
- **Destructive Actions**: Any deletion or modification of superadmin_invoices_recovery_center records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for superadmin_invoices_recovery_center do not expose cross-tenant sensitive data.

- **Module API boundary:** All `invoices` server interactions must go through the module-owned API client; do not read fixtures directly from UI components or hooks.
- **Idempotency:** Mutation intents in `invoices` must generate one idempotency key and reuse it across retries; never generate a new key for the same user intent.
- **Cache ownership:** `invoices` API results remain TanStack Query server state; mutation success must intentionally reconcile the affected query keys.
- **Destructive safety:** Any destructive `invoices` action must use the approved confirmation provider and follow the required double-verification pattern.
- **Mock ownership:** `invoices` mock fixtures and MSW handlers remain inside this feature boundary; do not introduce global business mock data.
- **Tenant/resource identity:** Route identifiers, query keys, request parameters, mock lookups, and rendered records must preserve the same resource identity end-to-end.
- **Async states:** Loading, empty, error, permission-denied, and recoverable failure states must remain visible and accessible instead of silently falling back to placeholder business data.
## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.
