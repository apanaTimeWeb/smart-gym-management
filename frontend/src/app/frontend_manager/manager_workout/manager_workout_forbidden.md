# Forbidden Patterns for `frontend_manager/manager_workout`

1. **No Inline Styling Violations:** Do not use `text-green-500`, `bg-[#123456]`, or raw CSS variable expressions (`var(--workout-highlight)`) in JSX `style` tags. Use semantic Tailwind variables defined in `workout_theme_contract.md`.
2. **No Unsafe Type Casting:** `any` and `as any` are strictly forbidden. Narrow types properly or use `unknown`.
3. **No Direct Formatting:** Never use `.toLocaleString()` or string concatenation for numbers/currency. ALWAYS import formatters from `the module-local `ManagerWorkoutFormatters.ts` in `manager_workout_utils/``.
4. **No Relative Imports:** Use `@/app/frontend_manager/manager_workout/...` rather than `../` or `./`.
5. **URL is the Source of Truth:** Do not introduce hidden filter states in `useState` that do not sync to the URL. If you filter workouts or exercises, update the URL params using the context helpers.
6. **No Unprotected Forms:** Complex forms must use React Hook Form + Zod and must include `useUnsavedChangesGuard` to prevent accidental navigation loss.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
