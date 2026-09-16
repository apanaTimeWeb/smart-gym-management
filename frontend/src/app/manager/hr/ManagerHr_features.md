# Manager HR — Feature Map

## Module Purpose
The Manager HR module handles staff lifecycle management, payroll calculation, advance payment tracking, and ledger monitoring. It heavily utilizes URL-backed state for list navigation and filters, and handles complex multi-step state mutations spanning staff profiles and payroll records.

## Exact Routes
- `/manager/hr`: The single entry point containing the dashboard view, staff list, payroll records, and financial ledgers, navigable via tabs.

## Actual Feature Behavior
- **Staff List**: Paginated, filterable table. Syncs search string, current page, and role filters with URL.
- **Staff Profile Modal**: Read-only profile drawer detailing contact info, join date, current advance balance, and outstanding dues.
- **Staff Edit/Add Modal**: Form for registering or modifying staff details, validated with Zod/RHF and protected by dirty-state guards.
- **Payroll Table**: List of payroll records generated for a selected month (synced via URL). Includes payroll generation for the selected month and printable payslip downloads.
- **Payroll Modal**: Form calculating net payable amount dynamically based on base salary, attendance deductions, and advance adjustments.
- **Ledger/Advance Tables**: Specialized views for tracking the flow of staff payments, credits, debits, and balance history.

## Actual Component Files
- `page.tsx`: Server Component — auth guard and layout wrapper.
- `loading.tsx`: Next.js suspense loading fallback.
- `error.tsx`: Section-level error boundary.
- `hr_context/ManagerHrContext.tsx`: React Context provider wrapping the entire feature state.
- `hr_context/ManagerUseManagerHrLogic.ts`: Core state orchestration, data fetching (`loadAll`), and URL syncing hook.
- `hr_context/ManagerUseManagerHrUIState.ts`: Isolated hook managing all modal and transient UI view states.
- `hr_components/ManagerHrMain/*`: Tab layout orchestrator and primary dashboard view.
- `hr_components/ManagerHrKPIs/*`: Top metric cards dynamically reflecting filtered context stats.
- `hr_components/ManagerHrStaffTable/*`: Presentation table for staff members.
- `hr_components/ManagerHrPayrollTable/*`: Presentation table for payroll records.
- `hr_components/ManagerHrStaffModal/*`: Add/Edit staff form.
- `hr_components/ManagerHrPayrollModal/*`: Payroll record generation form.

## Actual State Model
- **UI State**: Handled natively by `ManagerUseManagerHrUIState.ts` (modals, IDs, dirty state).
- **Domain State**: Handled by `ManagerUseManagerHrLogic.ts`, persisting primary filters to `useSearchParams`.
- **Form State**: Managed using `react-hook-form` tied with `zodResolver`.

## Actual Fixture/Data Layer
- `hr_utils/ManagerHrSharedConstants.ts`: Centralized schemas, table headers, default values, and Zod definitions.
- Uses `ManagerHrApi.ts` as the bridge client for frontend API operations.

## Actual API Files
- `hr_api/ManagerHrApi.ts`: Client functions for CRUD on staff and payrolls.

## Actual Loading State
- Global layout loading uses `loading.tsx`. Local data re-fetches use TanStack Query's native `isFetching`/`isPending` state and render table-shaped skeletons. Form submissions trigger `saving` state, disabling interactive buttons.

## Actual Empty State
- Relies on `ManagerEmptyState` shared component with tailored imagery for empty staff, payroll, or ledger results.

## Actual Error State
- Unhandled render errors fall to `error.tsx`. API errors surface via the global toast notification system integrated in `ManagerUseManagerHrLogic.ts`.

## Actual Security Rules
- Protected under the `manager` route group. Action buttons such as "Delete" or "Suspend" demand secondary verification via `useConfirm`.

## Feature-Specific AI Warnings
1. **Never use `any`**: Ensure API payloads and component props are strictly typed to the domains in `ManagerHrTypes.ts`.
2. **Never inline format currency**: Always import `formatCurrency` from `@/lib/formatters`. Do not use `.toLocaleString()`.
3. **Never embed hardcoded colors**: Follow `ManagerHr_theme_contract.md`. E.g., `text-success`, not `text-[var(--success)]`.
4. **Never create local-only filter state**: Changes to search strings or pagination must invoke URL router pushes.
5. **Never merge split files**: The `useManagerHrLogic` hook was split explicitly due to strict file size policies. Do not bundle UI state back into domain logic.
