# Admin V1 Acceptance Notes

## Scope
This V1 package repairs the Admin module only. The primary focus of this pass was data visibility and interactive table behavior that was previously incomplete in several Admin pages.

## Functional/Data Repairs
- Data Export history now sends status, page, limit, sort key, and sort direction through the Admin API client to the Admin-owned MSW handler; the handler filters, sorts, and paginates the fixture data.
- Payout Summary and P&L tables now expose functional ascending/descending sort indicators and server-backed sort parameters; P&L has a dedicated empty state.
- Plan Revenue now sends search, pagination, sort key, and sort direction to the Admin API/MSW path and renders real pagination controls.
- Dashboard Branch Leaderboard now sorts by branch, revenue, and active members and supports keyboard/click row selection.
- Reports Attendance Summary now sorts by all applicable columns; the heatmap reads an API-backed `attendanceHeatmap` response field rather than synthesizing day cells from the component.
- HR Staff Profile branch assignment data now comes through an API/query hook instead of an inline hardcoded branch map, and the branch column is sortable.
- HR Staff, Payroll, Finance Payments, HR Ledger, Sales Membership Report, and Reports Revenue tables now expose visible sortable arrows and functional sort controls.
- Payout month filter options were aligned to the current 2026 MSW fixture periods so selecting a listed period does not intentionally produce an empty result.

## Static Verification Performed
- TypeScript/TSX parser diagnostics: 0 across 540 Admin source files.
- Relative imports under `src/app/admin`: 0.
- Client-marked Next `page.tsx`: 0.
- Raw `<img>` under Admin: 0.
- `console.*` under Admin: 0.
- Admin `index.ts`/`index.js` barrel files: 0.
- User-browsable Admin tables inspected after repair: every table with applicable sortable columns now exposes visible sort direction indicators; the Settings Notifications matrix remains a configuration matrix with event-row ordering rather than an entity dataset.

## Runtime Verification Limitation
The isolated package does not include installed project dependencies. A dependency-backed Next production build, Vitest/RTL suite, and Playwright browser suite could not be executed in this isolated environment. Those are therefore not marked as passed here.
