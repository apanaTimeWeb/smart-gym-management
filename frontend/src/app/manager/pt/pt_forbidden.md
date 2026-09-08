# Manager PT — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No "Start Session" or "Conduct Session" actions** — Managers oversee PT, they do not conduct it. Session execution belongs to the Trainer role.

2. **No native `<select>` for trainer/member dropdowns** — Always use `SearchableDropdown` from `manager_components/ManagerShared/`. Rule 20.

3. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

4. **No hardcoded API URLs** — All endpoints must be imported from `ManagerPtUrlConfig.ts`.

5. **No `alert()` or `window.confirm()`** — Use `useConfirm()` from `ManagerConfirmProvider` for all destructive actions.

6. **No trainer personal data exposure** — Do not display trainer salary, attendance, or HR data in this module. That belongs to `manager/hr/`.
