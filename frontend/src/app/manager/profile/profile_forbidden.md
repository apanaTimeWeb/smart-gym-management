# Manager Profile — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No editable email or branch fields** — Email and branch assignment are always read-only. Changes require admin-level action.

2. **No salary, payroll, or HR data** — These belong to `manager/hr/`. Never fetch or display them here.

3. **No plain `<input type="password">` without eye-toggle** — All password fields MUST have Eye/EyeOff visibility toggle. Rule 23.

4. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

5. **No hardcoded API URLs** — All endpoints must be imported from `ManagerProfileUrlConfig.ts`.

6. **No `'use client'` in page.tsx** — `page.tsx` must remain a Server Component. Rule 8.

7. **No `alert()` or `window.confirm()`** — Use `useConfirm()` from `ManagerConfirmProvider` for any destructive action.
