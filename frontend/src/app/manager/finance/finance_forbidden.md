# Forbidden Patterns for `manager/finance`

To maintain extreme isolation and enterprise-grade architecture in the Manager Finance module, the following patterns are strictly forbidden:

## 1. UI vs State Authority
- **No Local Fallbacks for Filters:** Search, pagination, date ranges, and status filters MUST be synced to the URL via `useRouter` in `ManagerUseManagerFinanceLogic`. Do not keep primary list states strictly in React state without URL mirroring.
- **No Mutations:** The Finance module is strictly an analytics read-only view. Do not implement payment collection or refund creation logic here. Those belong in Members or HR modules.

## 2. Theming & Formatting
- **No Arbitrary Classes:** Raw Tailwind values (e.g., `text-[#EF4444]`, `bg-green-500`) are strictly prohibited in React components. You MUST use semantic tokens defined in `finance_theme_contract.md` (e.g., `text-danger`, `bg-success/10`).
- **Chart Exceptions:** Passing exact hex values (like `#EF4444`) directly to the ApexCharts configuration object is permitted since Canvas/SVG libraries do not reliably resolve all Tailwind variable classes.
- **No Inline Currency Formatting:** Never use `.toLocaleString()` or string concatenations for currency (`₹${value}`). All monetary values MUST pass through `formatCurrencyFromMinorUnits()` or `formatKPI()` from `@/lib/formatters`.

## 3. Component Boundaries
- **Dumb Presentation Tables:** `ManagerFinanceTable` must remain a dumb presentation component. It receives data from the Context but does not contain heavy business logic or local data fetching.

## 4. Type Safety
- **No `any` or Type Discarding:** All queries must have typed inputs and outputs. `unknown` is preferred over `any` when dynamic responses are unavoidable. Do not cast responses wildly `(res.data as any)`.
