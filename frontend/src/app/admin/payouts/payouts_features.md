# Admin Payouts — Feature Map

## Module Purpose
The Payouts module gives gym admins a read-only view of staff salary disbursements and
trainer payout records. Admins can see payout history per staff member, filter by month,
and verify payment status. Write operations (creating or approving payouts) belong to the
Manager role. This module exists so admins can audit payroll without needing Manager access.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Payout List | `/admin/payouts` | View all staff payouts with status and amount | `GET /admin/payouts` | ✅ Live |
| Payout Detail | `/admin/payouts` | Inspect a single payout record | `GET /admin/payouts/:id` | ✅ Live |
| Monthly Summary | `/admin/payouts` | View total payout spend for a given month | `GET /admin/payouts/summary` | ✅ Live |

## Edge Cases / AI Warnings
- **Admins are read-only** — never add approve/reject/create payout buttons.
- **Amount formatting** must use the Indian Numbering System `₹1,23,456`. Use `formatCurrency()` from `@/lib/formatters`.
- **`PAYOUT_STATUS_STYLES`** constant must live in `payouts_utils/` — never inline.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `payouts_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `payouts_forbidden.md` present
