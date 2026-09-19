# Forbidden Patterns for `manager/attendance`

To maintain enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix data fetching logic inside UI components. All async logic MUST reside in `ManagerUseManagerAttendanceLogic.ts` via TanStack Query.
2. **No Relative Imports:** Never use `./` or `../`. Always use absolute paths starting with `@/app/manager/attendance/...`.
3. **No Direct Formatting:** Do NOT use `.toLocaleString()`, `.toFixed()`, or string concatenation for currencies. All numeric formatting MUST go through `@/lib/formatters`.
4. **No Client-Side Server Data Filtering:** Do not sort/filter/paginate fetched attendance records in the hook or JSX when the API/MSW contract supports those parameters.
5. **No Context for Async Cache:** Do not store API responses manually in React Context state. Let TanStack Query manage the cache, and keep documented URL-backed data-view state in the URL. React Context is reserved for stable cross-tree application concerns.
6. **No Local State for Filters:** The search, date, and status filters MUST sync to the URL. Do not keep them only in `useState` or `Zustand`.
7. **No Arbitrary Colors:** Do not use `bg-green-500`, `text-[var(--primary)]`, or raw hex codes in JSX. Follow `attendance_theme_contract.md`.
