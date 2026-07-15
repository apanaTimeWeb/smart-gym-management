# Forbidden Patterns for `superadmin/gyms`

To maintain extreme isolation and enterprise-grade architecture in this module, the following are strictly forbidden:

1. **No Mixed UI and Logic:** Do not mix `useEffect` or state hooks inside `GymsTable.tsx` or `AddGymForm.tsx`. All heavy logic MUST reside in the adjacent custom hook (`useGymsTable.ts`, `useAddGymForm.ts`, etc.).
2. **No Relative Imports:** Never use `./` or `../../` in any file. Always use absolute paths starting with `@/app/superadmin/gyms/...`.
3. **No Barrel Files:** Do not create `index.ts` files inside `gyms_components`. Import files directly.
4. **No Direct `window.confirm`:** (Exception: MVP logic, but should eventually migrate to a customized `ConfirmationDrawer` or `Modal`).
5. **No Context for Async Data:** Do not use React Context for gyms API data. Always use the central `useGymsStore.ts` Zustand store.
6. **No Arbitrary Tailwind Values:** Do not use values like `bg-[#123456]` or `p-[15px]`. Use design system tokens (`bg-card`, `p-4`).
7. **No Hardcoded Toasts from UI:** UI components should not intercept API errors to show toasts; let `useGymsStore.ts` or `api.ts` handle notifications and state updates.
8. **No Localized API Calls:** UI components should never call `apiFetch` directly. They must trigger actions in `useGymsStore.ts` or `useAddGymForm.ts`, which then communicate with `superadminApi`.
