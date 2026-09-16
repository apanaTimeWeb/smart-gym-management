# Forbidden Patterns for `manager/expenses`

To maintain enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** All URL manipulation and modal state logic MUST reside in `ManagerExpensesContext.tsx`. UI components should only consume the context.
2. **No Relative Imports:** Never use `./` or `../`. Always use absolute paths starting with `@/app/manager/expenses/...`.
3. **No Direct Formatting:** Do NOT use `.toLocaleString()`, `.toFixed()`, or string concatenation for currencies. All numeric formatting MUST go through `@/lib/formatters`.
4. **No Recharts or Chart.js:** The only allowed charting library is `react-apexcharts`.
5. **No Context for Async Cache:** Do not store API responses manually in React Context state. Let TanStack Query manage the cache within individual components (like `ManagerExpensesTable`), while Context distributes the active filter states.
6. **No Local State for Filters:** The search, status, and page filters MUST sync to the URL. Do not keep them only in `useState` or `Zustand`.
7. **No Arbitrary Colors:** Do not use `bg-green-500`, `text-[var(--primary)]`, or raw hex codes in JSX (except within ApexCharts config objects where canvas rendering requires hex). Follow `ManagerManager_expenses_theme_contract.md`.
