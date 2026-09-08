# Trainer Profile — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No editable email field** — Email is always read-only in this module. Email changes require a separate verification flow. Never make the email input editable.

2. **No salary, payroll, or HR data** — Salary details, payroll history, and leave management belong to the Manager HR module. Never fetch or display financial/HR data here.

3. **No `TrainerHeader` import** — `TrainerProfileMain.tsx` must NEVER import `TrainerHeader`. The layout handles it.

4. **No cross-role imports** — Zero imports from `/admin`, `/manager`, or `/superadmin`.

5. **No hardcoded API URLs** — All endpoints must be imported from `TrainerProfileUrlConfig.ts`.

6. **No plain `<input type="password">` without eye-toggle** — All password fields MUST have an Eye/EyeOff visibility toggle button (Rule 23).

7. **No logic in the root-level `TrainerProfileMain.tsx`** — The root-level file is a re-export shim only. All logic and UI lives in `profile_components/TrainerProfileMain/TrainerProfileMain.tsx`.

8. **No `window.confirm()` or `alert()`** — Any destructive action must use `useConfirm()` from `TrainerConfirmProvider`.
