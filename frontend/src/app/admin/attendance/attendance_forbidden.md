# Forbidden Patterns — Admin Attendance Module

Future AI sessions: read this file before touching ANY file in `admin/attendance/`.

1. **NEVER add a check-in button, QR scanner, or any write operation here.** This module is strictly read-only for the Admin role. Manual check-in belongs exclusively in `/manager/attendance`. Adding any mutation here violates the role permission contract and will break the permissions model.

2. **NEVER import from `/manager`, `/trainer`, or `/superadmin`.** Zero cross-role imports. This module must be 100% self-contained.

3. **NEVER use `var(--primary)` or CSS custom properties inside ApexCharts options objects.** ApexCharts cannot resolve CSS variables at runtime. Use the hex values defined in `web_global_design.md` directly (`#FACC15`, `#A1A1AA`, etc.) inside chart config only.

4. **NEVER use bare `animate-pulse` on skeleton elements.** Always use `motion-safe:animate-pulse` per Design §29 and Frontend Rule 29.

5. **NEVER calculate duration from a null `checkOutTime`.** The `computeDuration` utility in `AdminAttendanceSharedConstants.ts` already handles this — it returns `'—'` when either value is missing. Do not inline duration logic in the table component.

6. **NEVER add a "View Member Profile" navigation from this table.** Admin attendance is a read-only analytics view. Member profile navigation belongs in `/admin/members`. Do not add `cursor-pointer` row clicks that navigate to member profiles from here.

7. **NEVER hardcode API endpoint strings in `attendance_api.ts`.** When replacing mock functions with real `apiFetch` calls, import endpoint strings from `attendance_url_config.ts`.
