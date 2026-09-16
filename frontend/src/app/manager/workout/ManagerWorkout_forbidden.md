# Forbidden Patterns for `manager/workout`

1. **No Inline Styling Violations:** Do not use `text-green-500`, `bg-[#123456]`, or raw CSS variable expressions (`var(--workout-highlight)`) in JSX `style` tags. Use semantic Tailwind variables defined in `ManagerManager_workout_theme_contract.md`.
2. **No Unsafe Type Casting:** `any` and `as any` are strictly forbidden. Narrow types properly or use `unknown`.
3. **No Direct Formatting:** Never use `.toLocaleString()` or string concatenation for numbers/currency. ALWAYS import formatters from `@/lib/formatters`.
4. **No Relative Imports:** Use `@/app/manager/workout/...` rather than `../` or `./`.
5. **URL is the Source of Truth:** Do not introduce hidden filter states in `useState` that do not sync to the URL. If you filter workouts or exercises, update the URL params using the context helpers.
6. **No Unprotected Forms:** Complex forms must use React Hook Form + Zod and must include `useUnsavedChangesGuard` to prevent accidental navigation loss.
