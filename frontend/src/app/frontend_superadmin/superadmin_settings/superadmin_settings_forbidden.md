# Forbidden Patterns for `superadmin/settings`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix `useEffect` or state hooks inside UI components. All heavy logic MUST reside in the adjacent custom hook.
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/frontend_superadmin/superadmin_settings/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use a customized `ConfirmationDrawer` or `Modal`.
5. **No Context for Async Data:** Do not use React Context for API/server data. Keep server state in TanStack Query; use module-scoped Zustand only for UI/client state.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** UI components should not intercept API errors to show toasts; let the API interceptor or Zustand store handle notifications and state updates.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in custom hooks or stores.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.
