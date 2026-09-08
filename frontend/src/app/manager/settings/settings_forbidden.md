# Manager Settings — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No native `<select>` for timezone, currency, or any large dataset** — Always use `SearchableDropdown` from `manager_components/ManagerShared/`. Rule 20.

2. **No `transition-opacity` or any animation without `motion-safe:` prefix** — Rule 29. Every `transition-*`, `animate-*`, `hover:-translate-*` must be prefixed with `motion-safe:`.

3. **No platform-level or billing settings** — Subscription plan changes, feature flag toggles, and billing configuration belong to Admin or Superadmin. Never add those controls here.

4. **No hardcoded API keys or secrets** — Integration keys must use placeholder strings (`'<API_KEY>'`). Never commit real credentials. Rule 74.

5. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

6. **No hardcoded API URLs** — All endpoints must be imported from `ManagerSettingsUrlConfig.ts`.

7. **No `'use client'` in page.tsx** — `page.tsx` must remain a Server Component. All interactivity lives in `ManagerSettingsMain.tsx`. Rule 8.
