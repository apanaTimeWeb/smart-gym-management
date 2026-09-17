# Forbidden Patterns for `manager/hr`

To maintain extreme isolation and enterprise-grade architecture in the Manager HR module, the following patterns are strictly forbidden:

## 1. UI vs State Authority
- **No Local Fallbacks for Filters:** Search, pagination, role, and month filters MUST be synced to the URL via `useManagerHrLogic`. Do not keep primary list states strictly in React state without URL mirroring.
- **No Global Shared Mutations:** HR staff and payroll mutations belong in `ManagerUseManagerHrStaffMutations.ts` and `ManagerUseManagerHrPayrollMutations.ts`. Do not place them in global API files.

## 2. Component Boundaries
- **Component File Limits:** Do not combine `ManagerHrStaffModal`, `ManagerHrPayrollModal`, and `ManagerHrPaymentModal` into one giant file. They must remain isolated in their respective folders.
- **Dumb Presentation Tables:** `ManagerHrStaffTable`, `ManagerHrPayrollTable`, and `ManagerHrLedgerTable` must remain dumb presentation components. They dispatch events to Context but do not contain heavy business logic or local data fetching.

## 3. Theming & Formatting
- **No Arbitrary Classes:** Raw Tailwind values (e.g., `text-[#FF0000]`, `bg-[var(--danger)]`) are strictly prohibited. You MUST use semantic tokens defined in `hr_theme_contract.md` (e.g., `text-danger`, `bg-warning`).
- **No Inline Currency Formatting:** Never use `.toLocaleString()` or string concatenations for currency (`₹${value}`). All monetary values MUST pass through `formatCurrency()` from `@/lib/formatters`.

## 4. Destructive Actions
- **No Direct `window.confirm`:** Changing a staff's status (suspension/firing) or deleting records must use the centralized `useConfirm()` hook.
- **Dirty Form Guards:** Modals with complex unsaved forms must employ `useUnsavedChangesGuard` to prevent accidental navigation data loss.

## 5. Type Safety
- **No `any` or Type Discarding:** All mutations and queries must have typed inputs and outputs. `unknown` is preferred over `any` when dynamic responses are unavoidable.
