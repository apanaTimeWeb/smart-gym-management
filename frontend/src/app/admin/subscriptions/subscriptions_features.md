# Admin Subscriptions — Feature Map

## Module Purpose
The Subscriptions module gives gym admins visibility into all active, expired, and pending
member subscription records. Admins can view subscription history, check renewal dates,
see which plan a member is on, and trigger a manual renewal reminder. This is primarily
a read-and-monitor module — bulk renewals and plan changes are handled in the Finance and
Members modules respectively. The main value is catching expiring subscriptions before
they lapse.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Subscription List | `/admin/subscriptions` | Paginated table of all subscriptions with status filter | `GET /admin/subscriptions?page&status&search` | ✅ Live |
| Renewal Reminder | `/admin/subscriptions` | Send a WhatsApp/SMS renewal reminder to a member | `POST /admin/subscriptions/:id/remind` | ✅ Live |
| Cancel Subscription | `/admin/subscriptions` | Cancel an active subscription — requires `useConfirm()` | `POST /admin/subscriptions/:id/cancel` | ✅ Live |

## Edge Cases / AI Warnings
- **Cancel is irreversible mid-cycle** — always use `useConfirm()` with explicit warning.
- **`SUBSCRIPTION_STATUS_STYLES`** must live in `subscriptions_utils/` constants.
- Server-side pagination is mandatory — never fetch all subscriptions client-side.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `subscriptions_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `subscriptions_forbidden.md` present
