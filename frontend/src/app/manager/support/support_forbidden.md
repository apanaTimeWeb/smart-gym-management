# Manager Support — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No raw SVG icons** — All icons must use lucide-react. Never paste raw `<svg>` markup. Rule 9b.

2. **No native `<select>` for issue category or priority** — Always use `SearchableDropdown` from `manager_components/ManagerShared/`. Rule 20.

3. **No hardcoded mock ticket data** — Never hardcode ticket IDs like `#TKT-1042`, names, or dates inline in components. All data comes from the API or MSW handlers in `src/mocks/`.

4. **No `transition-opacity` without `motion-safe:` prefix** — All animations must use `motion-safe:` prefix. Rule 29.

5. **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

6. **No hardcoded API URLs** — All endpoints must be imported from `ManagerSupportUrlConfig.ts`.

7. **No member-facing support flows** — This module is for manager-to-platform tickets only. Member complaint handling belongs to `manager/members/` or a dedicated complaints module.
