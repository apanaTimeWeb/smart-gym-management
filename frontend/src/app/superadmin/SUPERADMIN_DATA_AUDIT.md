# Superadmin Data & UI Audit

## Scope
This package repairs the Superadmin role module only, with emphasis on data visibility, filterable/sortable/paginated list behavior, API response shape alignment, and module-owned MSW data.

## Data-visibility repairs
- Broadcast list: 12 varied records with server search/status/pagination.
- Backups: module-owned 12-record fixture plus list/status/type/pagination handlers.
- Branches: 12 varied records and server search/status/pagination.
- Cancellations: 8 varied risk/action records with server filters and KPI response.
- Coupons: 10 records across active/inactive/expired/depleted states, with search/status/date/KPI filtering.
- Franchises: 10 varied records with pagination.
- Global audit: 12 records with severity/actor/search/pagination coverage.
- Infrastructure: 8 nodes including HEALTHY/DEGRADED/DOWN states.
- Invoices: 12 records across PAID/PENDING/FAILED/OVERDUE and date ranges.
- Jobs: 12 records across all supported queues/statuses, with server filters/pagination.
- Messaging: 8 messages + 4 notifications + 8 tenant choices.
- Onboarding: 10 records spanning September/August 2026 and supported trial/onboarding states.
- Plans: 6 schema-complete plans, including archived state.
- Reports: July/August/September revenue plus current cancellation/health datasets.
- Tickets: 10 records spanning OPEN/IN_PROGRESS/WAITING/RESOLVED/CLOSED and multiple priorities.

## Verification performed
- Production TS/TSX parser diagnostics: 0.
- Production relative imports: 0.
- Production raw `<img>` tags: 0.
- Production `console.*`: 0.
- 28 route `page.tsx` files remain framework boundary files.
- ZIP is rebuilt from the isolated Superadmin directory only.

## Runtime limitation
The full project dependency tree was not installable in the verification environment because the npm cache did not contain all locked packages. Therefore `next build`, full TypeScript module-resolution typecheck, Vitest/RTL, and Playwright were not claimed as passing.

The host application also owns the global MSW bootstrap. The module package contains its own feature handlers/fixtures, but any newly added handler must be registered by the host's approved global MSW bootstrap to execute in demo MSW mode. Existing host fallback infrastructure may still cover some routes.
