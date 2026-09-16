# Forbidden Patterns — `admin/payouts`

## 1. No Create / Approve / Reject Payout Operations
**FORBIDDEN:** Any write operation on payouts. Admins are read-only viewers.
**ALLOWED:** `GET /admin/payouts` and `GET /admin/payouts/:id` only.

## 2. No Raw Currency Values
**FORBIDDEN:** Rendering `payout.amount` directly in JSX.
**ALLOWED:** Always format via `formatCurrency()` from `@/lib/formatters`.

## 3. No Hardcoded Status Styles
**FORBIDDEN:** Inline ternaries for payout status badge colors.
**ALLOWED:** `PAYOUT_STATUS_STYLES` from `payouts_utils/`.

## 4. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
