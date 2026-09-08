# Admin Coupons — Feature Map

## Module Purpose
The Coupons module lets gym admins create, manage, and track promotional discount codes
for gym memberships. Admins can set discount type (flat or percentage), validity period,
usage limits, and applicable plans. Active coupons can be shared with members. Expired or
fully-redeemed coupons are auto-archived. Admins can view redemption analytics per coupon.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Coupon List | `/admin/coupons` | View all active, scheduled, expired coupons | `GET /admin/coupons` | ✅ Live |
| Create Coupon | `/admin/coupons` | New coupon with code, discount, validity, limit | `POST /admin/coupons` | ✅ Live |
| Edit Coupon | `/admin/coupons` | Update validity or usage limit | `PATCH /admin/coupons/:id` | ✅ Live |
| Delete Coupon | `/admin/coupons` | Remove a coupon — requires `useConfirm()` | `DELETE /admin/coupons/:id` | ✅ Live |
| Redemption Stats | `/admin/coupons` | View how many times a coupon was used | Inline in GET response | ✅ Live |

## Edge Cases / AI Warnings
- **KPI cards (Total Active, Total Redeemed, etc.) must be interactive filters** (Rule 70).
- **`COUPON_STATUS_STYLES`** must live in `coupons_utils/` — never inline.
- **Coupon codes are case-insensitive at apply-time** — the backend normalizes. Display in uppercase.
- **Expired coupons cannot be edited** — disable the edit button when `status === 'EXPIRED'`.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 13: This document
- [x] Rule 40: `coupons_forbidden.md` present
- [x] Rule 70: KPI cards are interactive filters
- [x] Rule 71: Delete uses `useConfirm()`
