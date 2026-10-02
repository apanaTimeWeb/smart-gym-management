# Superadmin Invoices â€” Feature Map

## Module Purpose
superadmin_invoices_features is a Superadmin-facing business feature module for the workflow implemented at ``/superadmin/invoices``. Authenticated Superadmin users can download; export c s v; log manual payment; resend email; select gym; share whats app. The module owns its UI, state orchestration, validation, API contract, mocks, and tests; it does not own backend implementation, unrelated sibling-feature business logic, or role-wide shared business state. The primary API boundary evidenced by the repository is ``superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `superadmin_invoices_api/SuperadminInvoicesApi.ts``.


## Routes

- Primary feature route: `/superadmin/saas-billing/invoices`
- Route ownership remains inside `superadmin_invoices`; framework-reserved `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` remain physically owned by this feature.

## User Flows

- Canonical workflow definitions are maintained in the `User Flows & Interactions` section above. They are the source for start → action → state/result → recovery expectations within this module.

## Component Tree

- Route entry: `page.tsx` → primary module composition.
- Module-owned component surface: `SuperadminInvoicesAgingReport.tsx`, `SuperadminInvoicesDateFilterDropdown.tsx`, `SuperadminInvoicesEmptyState.tsx`, `SuperadminInvoicesHeader.tsx`, `SuperadminInvoicesLogPaymentModal.tsx`, `SuperadminInvoicesMain.tsx`, `SuperadminInvoicesStatsBar.tsx`, `SuperadminInvoicesTable.tsx`.
- Child component folders remain feature-prefixed and isolated to this module.

## API Contract Summary

- Current module-owned API symbols observed in source: `createManualPayment`, `exportInvoiceReport`, `fetchInvoiceDownloadUrl`, `fetchInvoices`, `fetchTenants`, `resendInvoiceEmail`.
- URL paths remain centralized in `superadmin_invoices_url_config.ts`; response validation stays in module-owned schema files where defined.

## State Map

- Server state: TanStack Query where API-backed data is present.
- URL state: module URL/query state where present.
- UI-local state: component-local or module-owned store state only where documented.
- Mutation reconciliation: module query-key ownership and cache invalidation/update logic.

## Permissions

- Role scope: `frontend_superadmin` / Superadmin.
- Feature-specific permission constraints and forbidden operations are governed by `superadmin_invoices_forbidden.md`; frontend checks do not replace backend authorization.

## External Dependencies

- Approved infrastructure and zero-business UI dependencies are documented in the `Approved External Dependencies` section above.
- Business behavior remains inside this feature module; sibling business modules are not a required dependency boundary.

## Known Forbidden Patterns

- Canonical forbidden patterns: `superadmin_invoices_forbidden.md`.
- This feature must preserve the documented no-relative-import, no-business-globalization, no-duplicate-feature, and no-unverified-contract shortcuts applicable to the supplied architecture/design rules.

## Dependency Manifest

Documented technologies evidenced by module-owned source:
- @hookform/resolvers
- Lucide React
- MSW
- Next.js
- React
- React Hook Form
- React Testing Library
- TanStack Query
- Vitest
- Zod
- http-status-codes
- next-intl
- sonner

## Feature Lifecycle Contract

Lifecycle capabilities below are derived only from current module-owned API source symbols; no backend capability is inferred.
- **Create / Trigger:** `createManualPayment`
- **Read:** `exportInvoiceReport`, `fetchInvoiceDownloadUrl`, `fetchInvoiceRecoveryCenter`, `fetchInvoices`, `fetchTenants`
- **Update / Action:** `resendInvoiceEmail`
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
- `@/components/ui/Feedback/ConfirmProvider`
- `@/components/ui/Pagination`
- `@/components/ui/SearchableDropdown`
- `@/hooks/useDateRangeSuffix`
- `@/hooks/useUrlState`
- `@/lib/api`
- `@/lib/formatters`
- `@/lib/logger`
- `@/lib/whatsapp_formatter`

### Business Feature Dependencies
- None.

### Role-Level Business/Infrastructure Dependencies
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton`
- `@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard`

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Invoices | `/superadmin/invoices` | download; export c s v; log manual payment; resend email; select gym; share whats app | `superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi.ts`, `superadmin_invoices_api/SuperadminInvoicesApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions
### Flow 1 — Load the primary invoices view
1. Enter `/superadmin/saas-billing/invoices`; the route-level `page.tsx` remains a thin server entry point and delegates UI ownership to `SuperadminInvoicesMain.tsx`.
2. `useSuperadminInvoicesPage.test.ts` owns the query lifecycle and consumes the module API/query-key contract rather than fetching from presentation components.
3. The view renders the authoritative loading, populated, empty, and retryable-error states from that query result; fixtures/MSW mirror the same response shape.

### Flow 2 — Search/filter and preserve shareable state
1. Change the module's documented search/filter/sort controls in the main view.
2. URL/query state is normalized before it reaches the query-key registry, so the same view can be refreshed or shared without losing filter context.
3. The query hook requests the filtered server dataset and the table/chart/detail surface re-renders from TanStack Query data; zero-match results resolve to the module empty state.

### Flow 3 — Execute a supported server mutation
1. Submit the supported action through `useSuperadminInvoicesInvoiceActions.ts` (not directly through an API client from JSX).
2. The feature API sends the same idempotency key for retries of one user intent and surfaces the backend response message through the approved toast path.
3. Mutation success reconciles the affected module query keys before the UI presents the resulting authoritative state; failure preserves the retryable path and does not fabricate a success state.

### Flow 4 — Recover from a failed request
1. A rejected request enters the feature's error boundary/state instead of rendering stale success data.
2. The visible Retry/reload affordance reuses the owning query hook or refetch callback, preserving the module's current UI state where documented.
3. The success path is reached only after a new authoritative response arrives; stale cached data is reconciled through the module query-key contract.

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
- **Strict Isolation**: Never import admin or manager components into invoices.
- **Destructive Actions**: Any deletion or modification of invoices records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for invoices do not expose cross-tenant sensitive data.

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
