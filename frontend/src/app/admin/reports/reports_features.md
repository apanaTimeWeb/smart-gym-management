# Admin Reports — Feature Map

## Module Purpose
The Reports module provides gym admins with financial and operational reports across all
branches they have access to. Reports include revenue summaries, attendance trends, member
growth, plan-wise distribution, and staff performance. All reports can be filtered by date
range and branch. PDF and CSV export is supported. Charts use ApexCharts exclusively.
This module is read-only analytics — no mutations are performed here.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Revenue Report | `/admin/reports` | Monthly revenue breakdown by plan and payment mode | `GET /admin/reports/revenue?from&to&branchId` | ✅ Live |
| Attendance Report | `/admin/reports` | Daily/weekly attendance trends per branch | `GET /admin/reports/attendance?from&to` | ✅ Live |
| Member Growth Report | `/admin/reports` | New vs churned members over time | `GET /admin/reports/members?from&to` | ✅ Live |
| Export Report | `/admin/reports` | Download any report as PDF or CSV | `GET /admin/reports/export?type&format` | ✅ Live |

## Edge Cases / AI Warnings
- **ApexCharts is mandatory** — never use Recharts or Chart.js.
- **All charts must have `motion-safe:` prefix on animations** (Design §29).
- **Date range picker** must use the shared `AdminDateRangePicker` component if it exists, never a native date input for ranges.
- **No mutations** — never add edit/delete/create to this module.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 13: This document
- [x] Rule 40: `reports_forbidden.md` present
