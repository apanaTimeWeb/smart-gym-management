# Admin Final Data / Interaction Repair Status

This verification targets the uploaded `web_frontend_development_instruction.md` and the Admin role only.

## Data path verified

UI → Admin API contract → Admin type/Zod boundary → module-owned MSW fixtures → module-owned MSW handlers → TanStack Query → Admin UI rendering.

## Data visibility repairs

- Expanded module-owned list fixtures for members, attendance, staff, payroll, payments, blacklist, coupons, exports, and gym-health alerts.
- Added current 2026 dates to date-sensitive Admin fixtures so default/current-period filters do not render empty because of stale demo dates.
- Added server-side mock filtering/pagination for members, coupons, finance payments, attendance, HR staff/payroll, blacklist, exports, and gym-health alerts.
- Added membership gender/plan query parameters and matching Admin MSW filtering.
- Added coupon date-range state/query support and matching MSW filtering.
- Corrected plan filtering to use `isActive`.
- Corrected payment method normalization and demo payment statuses to match Admin Zod contracts.
- Made gym-health resolve/dismiss mutations stateful in MSW.
- Made subscription upgrade/default/remove payment-method demo mutations stateful.
- Removed dashboard hardcoded attendance/expiring-membership demo arrays; both now render API-backed dashboard fixture data.
- Replaced Settings Roles mock constants with the Admin Permissions API + TanStack Query data source.

## Interaction repairs

- Removed dead Admin controls that had no supported Admin API/workflow (unsupported member quick actions and unsupported payment-method add control).
- Wired Admin Usage upgrade/contact buttons to the supported subscription route.
- Wired Dashboard "View All Alerts" to the supported Admin audit route.
- Wired HR bulk payroll control to the payroll modal and payslip action to a downloadable artifact.
- Wired Data Export completed-job download control.
- Wired Members CSV/PDF controls to export/print behavior.

## Mechanical gates

- Admin TS/TSX transpile diagnostics: 0
- Relative imports in Admin production code: 0
- Client-marked `page.tsx`: 0
- Raw `<img>`: 0
- `console.*`: 0
- `.toFixed()`: 0
- `key={index}`: 0
- Dead `<button>` controls without an action/submit/disabled state: 0
- ZIP integrity: PASS

## Runtime boundary note

The project uses `NEXT_PUBLIC_DEMO_MODE=true`. The approved global API transport file `src/lib/api.ts` is included in this package because demo mode must allow browser requests to reach the globally registered Admin MSW handlers. The Admin fixture/handler business data remains physically inside `src/app/admin`.

Full dependency-backed Next build, Vitest/RTL execution, Playwright execution, and CI gates could not be executed in the isolated environment because project dependencies were not installed.

## Follow-up repair — Demo transport vs. module-owned MSW (data-endpoint alignment)

**Symptom reported:** with `npm run dev` and `NEXT_PUBLIC_DEMO_MODE=true`, most Admin pages rendered generic/incorrect data, mismatched row counts (e.g. 20 rows while the footer said “Showing 1 to 10 of 20”), or empty sections.

**Root causes found and fixed**

1. `src/lib/api.ts` short-circuited in demo mode and returned `getMockResponse(path)` (the global `src/lib/mock_data.ts` path-substring table) **before** any request was issued, so the module-owned MSW handlers/fixtures were never used. Demo mode now performs the request so the globally registered MSW handlers answer it; `getMockResponse` remains only as a last-resort fallback for paths that no handler/backend can serve (network error or 5xx).
2. `src/proxy.ts` redirected `GET /mockServiceWorker.js` to `/auth/login` for unauthenticated visitors, so the browser refused to register MSW (“The script resource is behind a redirect, which is disallowed”). `/mockServiceWorker.js` is now an explicit public route and returns `200` with or without a session cookie.
3. Three module endpoints did not match their module-owned MSW handler path, so they fell through to the global fallback with the wrong shape:
   - `usage`: handler served `*/admin/usage/fetchMyUsage`, API calls `AdminUsageUrlConfig.BACKEND_API.MY_USAGE` (`/admin/usage`). Handler aligned to `/admin/usage`.
   - `finance` P&L: handler served `*/admin/finance/pnl/comparison`, API calls `FinanceUrlConfig.BACKEND_API.PNL_COMPARISON` (`/admin/finance/pnl`). Handler aligned to `/admin/finance/pnl`.
   - `sales`: handlers served `fetchOverview` / `fetchMembershipReport` / `fetchPendingPayments` / `fetchAllMemberships`, while `SalesUrlConfig.BACKEND_API` owns `/admin/sales/overview`, `/admin/sales/membership-report`, `/admin/sales/pending-payments`, `/admin/sales/all-memberships`. Handler paths aligned, and payloads now match the validated shapes (`{ monthlyRevenue }`, `{ report, totals }`, `{ members, total }`); `pending-payments`/`all-memberships` also honour `page`/`limit`/`search` server-side and `AdminSalesApi` now forwards those params.
4. `data-export` fixture expansion used uppercase `PROCESSING`/`COMPLETED`, which violated `exportStatusSchema` (`completed | processing | failed`) and produced a boundary Zod error on every load. Values normalized to lowercase.

**Verification performed (running dev server, demo mode on, Admin session)**

- Endpoint probe with MSW active: `/admin/usage`, `/admin/finance/pnl`, `/admin/sales/overview`, `/admin/sales/membership-report`, `/admin/sales/pending-payments`, `/admin/sales/all-memberships` all return the module-owned fixture payloads for the paths the UI actually calls.
- All 25 Admin routes visited (`dashboard, members, attendance, plans, plans/revenue, sales (+3 tabs), finance, finance/pnl, reports, hr, hr/performance, branches, payouts, announcements, permissions, blacklist, coupons, gym-health-alerts, audit_logs, subscriptions, usage, data-export, notifications, settings, profile`): every route renders populated data with no empty/error/retry state. `/admin/members` now shows 24 total across 3 pages with 10 rows per page; `/admin/data-export` loads without Zod boundary errors.

