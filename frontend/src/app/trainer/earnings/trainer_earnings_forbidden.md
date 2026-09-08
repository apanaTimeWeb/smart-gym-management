# 🚫 FORBIDDEN IN TRAINER EARNINGS MODULE

1. **No Shared Components**: Do not import components from `manager` or `admin` modules. Keep everything isolated to the Trainer role.
2. **No Inline State for Data**: API responses and data manipulation must happen entirely inside `useTrainerEarningsLogic.ts`. Components must remain pure views.
3. **No Direct `fetch` Calls**: Always use `apiFetch` from `@/lib/api` to inherit token handling and multi-tenancy.
4. **No Tailwind Inline Colors**: Hardcoded colors like `bg-[#ff0000]` are forbidden. Use semantic CSS variables (e.g., `bg-danger`).
