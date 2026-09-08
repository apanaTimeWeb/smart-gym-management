# Admin Gym Comparison — Feature Map

## Module Purpose
The Gym Comparison module lets admins with access to multiple branches view side-by-side
performance metrics across branches — revenue, attendance rate, new members, churn, and
staff efficiency. It provides a quick visual diff to identify underperforming branches
and surface them to the manager. This module is read-only analytics.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Branch Comparison Grid | `/admin/gym-comparison` | Side-by-side KPI cards for 2-4 branches | `GET /admin/branches/comparison?ids=...` | ✅ Live |
| Metric Charts | `/admin/gym-comparison` | Revenue and attendance trend charts per branch | `GET /admin/branches/comparison/charts` | ✅ Live |

## Edge Cases / AI Warnings
- **ApexCharts is the canonical chart library** — never use Recharts or Chart.js.
- **Branch selection uses a multi-select** — implement with a custom popover, never a native `<select multiple>`.
- **Data is aggregate only** — no member-level data is exposed here.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 13: This document
- [x] Rule 40: `gym-comparison_forbidden.md` present
