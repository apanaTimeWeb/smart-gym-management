# Forbidden Patterns for `frontend_manager/manager_dashboard`

To maintain enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix data fetching logic inside UI components. All async logic MUST reside in `useManagerDashboardLogic.ts` via TanStack Query.
2. **No Relative Imports:** Never use `./` or `../`. Always use absolute paths starting with `@/app/frontend_manager/manager_dashboard/...`.
3. **No Direct Formatting:** Do NOT use `.toLocaleString()`, `.toFixed()`, or string concatenation for currencies (`₹` + value) in components. All formatting MUST go through `the module-local `ManagerDashboardFormatters.ts` in `manager_dashboard_utils/`` (`formatCurrency`, `formatKPI`).
4. **No Recharts or Chart.js:** The only allowed charting library is `react-apexcharts`.
5. **No Context for Async Cache:** Do not store API responses manually in React Context state. Let TanStack Query manage the cache, and keep documented URL-backed data-view state in the URL. React Context is reserved for stable cross-tree application concerns.
6. **No Local State for Date Filter:** The date range filter MUST sync to the URL (`?range=`). Do not keep it only in `useState` or `Zustand`.
7. **No Arbitrary Colors:** Do not use `bg-green-500`, `text-[var(--primary)]`, or raw hex codes in JSX (except within ApexCharts config objects where canvas rendering requires hex). Follow `dashboard_theme_contract.md`.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
