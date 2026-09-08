# Forbidden Patterns — `admin/coupons`

## 1. No Editing Expired Coupons
**FORBIDDEN:** Allowing edit on coupons with `status === 'EXPIRED'`.
**ALLOWED:** Disable or hide the edit button when a coupon is expired.

## 2. No Inline Status Styles
**FORBIDDEN:** Ternary color logic in JSX for coupon status.
**ALLOWED:** `COUPON_STATUS_STYLES[coupon.status]` from constants file.

## 3. No Non-Interactive KPI Cards
**FORBIDDEN:** Purely decorative KPI stat cards.
**ALLOWED:** Each KPI card filters the table below (Rule 70).

## 4. No Single-Click Delete
**FORBIDDEN:** Calling DELETE on button click without `useConfirm()`.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
