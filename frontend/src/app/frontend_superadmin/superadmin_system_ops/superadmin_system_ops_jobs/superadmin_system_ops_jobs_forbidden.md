# Forbidden Patterns for `superadmin/jobs`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Business Logic in Presentation:** Component-private UI state is allowed, but API orchestration, business rules, complex side effects, and mutation flow MUST remain in the module hook/API layers.
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use a customized `ConfirmationDrawer` or `Modal`.
5. **No Context/Zustand for Server Data:** API responses, loading/error state, caching, pagination, and mutations MUST use TanStack Query. Zustand is reserved for module-scoped client/UI state.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Global Business Error Toasting from UI:** Presentation components must not swallow module API errors into generic global toasts. Surface backend `message` through the owning mutation/query hook using the approved deduplicated toast utility.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in custom hooks or stores.
