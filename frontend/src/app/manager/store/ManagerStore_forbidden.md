# Forbidden Patterns for `manager/store`

1. **No Inline Styling Violations:** Do not use `text-green-500`, `bg-[#123456]`, or raw CSS variable expressions (`var(--store-highlight)`) in JSX `style` tags. Use semantic Tailwind variables defined in `ManagerManager_store_theme_contract.md`.
2. **No Unsafe Type Casting:** `any` and `as any` are strictly forbidden. Narrow types properly or use `unknown`.
3. **No Direct Formatting:** Never use `.toLocaleString()` or string concatenation for currency values (e.g. `Rs. ${val}`). ALWAYS import `formatCurrency` from `@/lib/formatters`.
4. **No Relative Imports:** Use `@/app/manager/store/...` rather than `../` or `./`.
5. **URL is the Source of Truth:** Do not introduce hidden filter states in `useState` that do not sync to the URL. If you filter products or orders, update the URL params.
