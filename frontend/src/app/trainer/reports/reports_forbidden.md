# Trainer Reports — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No `TrainerHeader` import** — `TrainerReportsMain.tsx` must NEVER import `TrainerHeader`. The layout renders it. This was a pre-existing bug — do not re-introduce it.

2. **No gym-wide financial data** — This module shows only trainer-scoped member data. Never fetch or display revenue, payroll, or expense data here. Those belong to Admin/Manager.

3. **No cross-role imports** — Zero imports from `/admin`, `/manager`, or `/superadmin`.

4. **No hardcoded API URLs** — All endpoints must be imported from `TrainerReportsUrlConfig.ts`.

5. **No client-side trainer filtering** — Never filter report data by trainer ID on the frontend. The backend enforces data scoping. Adding a client-side filter creates a false sense of security.

6. **No direct navigation to export URL** — CSV export returns a `Blob`. Always use `URL.createObjectURL()` and a programmatic `<a>` click to trigger the download. Never use `window.location.href = exportUrl`.
