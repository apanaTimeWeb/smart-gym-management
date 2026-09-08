# Admin Gym Health Alerts — Feature Map

## Module Purpose
The Gym Health Alerts module gives gym admins a real-time dashboard of operational warnings
and issues that need attention — members with expiring subscriptions, attendance anomalies,
overdue fee payments, equipment maintenance flags, and system-level alerts from the platform.
Each alert has a severity level (critical, warning, info), a description, and an action link
that deep-links to the relevant module. Admins can dismiss individual alerts once resolved.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Alert Feed | `/admin/gym-health-alerts` | View all active alerts sorted by severity | `GET /admin/gym-health-alerts` | ✅ Live |
| Alert Summary | `/admin/gym-health-alerts` | KPI counts: Critical / Warning / Info | `GET /admin/gym-health-alerts/summary` | ✅ Live |
| Dismiss Alert | `/admin/gym-health-alerts` | Mark an alert as resolved | `POST /admin/gym-health-alerts/:id/dismiss` | ✅ Live |

## Edge Cases / AI Warnings
- **KPI cards must function as interactive filters** (Rule 70) — clicking "Critical" filters the list.
- **Alert severity colors map to design tokens** — Critical → `text-danger`, Warning → `text-warning`, Info → `text-info`. These must come from `GYM_HEALTH_ALERT_SEVERITY_STYLES` in `gym-health-alerts_utils/` constants.
- **Auto-refresh every 60 seconds** using `refetchInterval: 60_000` in TanStack Query — never use `setInterval`.
- **Dismiss is immediate** — use a pessimistic update pattern: remove from list on API success, re-add on error.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `gym-health-alerts_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `gym-health-alerts_forbidden.md` present
- [x] Rule 70: KPI cards are interactive severity filters
