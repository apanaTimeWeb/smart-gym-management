# Forbidden Patterns for `manager/dashboard`

To maintain enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix data fetching logic inside UI components. All async logic MUST reside in `useManagerDashboardLogic.ts` via TanStack Query.
2. **No Relative Imports:** Never use `./` or `../`. Always use absolute paths starting with `@/app/manager/dashboard/...`.
3. **No Direct Formatting:** Do NOT use `.toLocaleString()`, `.toFixed()`, or string concatenation for currencies (`₹` + value) in components. All formatting MUST go through `@/lib/formatters` (`formatCurrency`, `formatKPI`).
4. **No Recharts or Chart.js:** The only allowed charting library is `react-apexcharts`.
5. **No Context for Async Cache:** Do not store API responses manually in React Context state. Let TanStack Query manage the cache, and keep documented URL-backed data-view state in the URL. React Context is reserved for stable cross-tree application concerns.
6. **No Local State for Date Filter:** The date range filter MUST sync to the URL (`?range=`). Do not keep it only in `useState` or `Zustand`.
7. **No Arbitrary Colors:** Do not use `bg-green-500`, `text-[var(--primary)]`, or raw hex codes in JSX (except within ApexCharts config objects where canvas rendering requires hex). Follow `dashboard_theme_contract.md`.
