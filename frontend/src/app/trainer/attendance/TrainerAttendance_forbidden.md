# Forbidden Patterns — `trainer/attendance`

1. **No Mixed UI and Logic:** Do not add `useEffect`, `useState`, or API calls inside UI components. All data logic MUST reside in `useAttendanceLogic.ts`.

2. **No Relative Imports:** Never use `./` or `../../`. Always use absolute paths starting with `@/app/trainer/attendance/...`.

3. **No Barrel Files:** Do not create `index.ts` files. Import files directly by full path.

4. **No Direct `window.confirm`:** Use `TrainerAttendanceModal` or `TrainerConfirmModal` for destructive confirmations.

5. **No Direct `apiFetch` in Components:** UI components must never call `apiFetch` directly. Trigger actions via `useAttendanceContext()` which delegates to `attendance_api.ts`.

6. **No Arbitrary Tailwind Values:** Never use `bg-[#123456]` or `p-[15px]`. Use design system tokens only (`bg-card`, `text-primary`, `p-4`).

7. **No Hardcoded API Strings:** Never write `/trainer/attendance` as a string literal in components or hooks. Always import from `AttendanceUrlConfig` in `attendance_url_config.ts`.

8. **No Cross-Staff Data:** The "My Attendance" tab MUST always filter by `staffId === user.id`. Never render another trainer's or staff member's records in this module.

9. **No Write Operations on Summary Card:** `TrainerAttendanceSummaryCard` is strictly derived/computed from `records` already in context. Never add a separate API call inside it.

10. **No Modal Outside Main:** `TrainerAttendanceModal` must only be mounted once, inside `TrainerAttendanceMain`. Never render it inside toolbar or table components.
