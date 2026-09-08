# Superadmin Coupons — Feature Map

## Module Purpose
The Superadmin Coupons module manages discount codes for SaaS subscription plans. Superadmins
create percentage or fixed-amount coupons, set usage limits, expiry dates, and restrict
applicability to specific plans or all plans. Coupons are applied at the tenant subscription
checkout level — they reduce the SaaS invoice amount, not gym member membership fees.
Expired or fully-redeemed coupons are automatically deactivated.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 8 row placeholders |
| `error.tsx` | Error boundary with retry |
| `coupons_components/SuperadminCouponsClient.tsx` | Root Client Component — table + filter bar |
| `coupons_components/SuperadminCouponsTable.tsx` | Paginated coupon table |
| `coupons_components/SuperadminCouponsTableRow.tsx` | Single coupon row — code, type, value, usage, expiry, status |
| `coupons_components/SuperadminCouponsFilterBar.tsx` | Filter by status (ALL / ACTIVE / EXPIRED / EXHAUSTED) |
| `coupons_components/SuperadminCouponsCreateModal.tsx` | Create coupon — code, type, value, limit, expiry, plan scope |
| `coupons_components/SuperadminCouponsEditModal.tsx` | Edit coupon — limit + expiry only (code + value immutable after creation) |
| `coupons_types/SuperadminCouponsTypes.ts` | `Coupon`, `CouponType`, `CouponStatus`, `CreateCouponDto`, `UpdateCouponDto` |
| `coupons_utils/SuperadminCouponsConstants.ts` | `COUPON_STATUS_STYLES`, `COUPON_TYPE_OPTIONS` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Coupon List | `/superadmin/coupons` | All coupons with usage stats | `GET /superadmin/coupons?page=&status=` | ✅ Live |
| Create Coupon | `/superadmin/coupons` | New discount code | `POST /superadmin/coupons` | ✅ Live |
| Edit Coupon | `/superadmin/coupons` | Update limit + expiry | `PATCH /superadmin/coupons/:id` | ✅ Live |
| Deactivate Coupon | `/superadmin/coupons` | Manually deactivate active coupon | `PATCH /superadmin/coupons/:id/deactivate` | ✅ Live |
| Filter by Status | `/superadmin/coupons` | Filter ACTIVE / EXPIRED / EXHAUSTED | — (query param) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'coupons', { page, status }]`
- Mutations: `useCreateCoupon`, `useUpdateCoupon`, `useDeactivateCoupon`
- Zustand stores: None
- Context providers: None
- Local-state: `statusFilter`, `page` — local to `SuperadminCouponsClient`

## User Flows
1. Superadmin opens `/superadmin/coupons` → coupon list loads with usage counts
2. Superadmin clicks "Create Coupon" → `SuperadminCouponsCreateModal` → RHF + Zod → `POST`
3. Superadmin clicks "Edit" on active coupon → `SuperadminCouponsEditModal` (limit + expiry only) → `PATCH`
4. Superadmin clicks "Deactivate" → `useConfirm()` → `PATCH /superadmin/coupons/:id/deactivate`

## Component Responsibility Map
- `SuperadminCouponsClient` — filter + pagination state. MUST NOT contain form logic.
- `SuperadminCouponsTableRow` — display only. Discount value MUST use `formatCurrency()` for fixed-amount type.
- `SuperadminCouponsCreateModal` — full create form. MUST use RHF + Zod.
- `SuperadminCouponsEditModal` — partial edit (limit + expiry only). Code and value fields MUST be read-only.

## Permissions and Security
| Action | Required Role |
|---|---|
| View coupons | `SUPERADMIN` |
| Create coupon | `SUPERADMIN` |
| Edit coupon | `SUPERADMIN` |
| Deactivate coupon | `SUPERADMIN` |
| ❌ Delete coupons | Forbidden — deactivate only (audit trail) |
| ❌ Apply to gym member fees | Manager finance module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 8 table row skeletons
- **Empty:** "No coupons created yet" with "Create First Coupon" CTA
- **Empty (filtered):** "No coupons match your filter" with clear filter link
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Code immutability** — coupon code and discount value MUST NOT be editable after creation; edit modal must render them as read-only display fields.
- **COUPON_STATUS_STYLES** — maps `ACTIVE | EXPIRED | EXHAUSTED | DEACTIVATED` to badge classes; must live in constants.
- **Percentage vs fixed** — `CouponType.PERCENTAGE` renders as "20%" and `CouponType.FIXED` renders via `formatCurrency()`; never format inline.
- **Usage display** — show `usedCount / maxUses` (e.g. "45 / 100"); if `maxUses` is null, show "Unlimited".
- **Deactivate confirmation** — MUST use `useConfirm()` before firing deactivate mutation.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminCoupons*`
- [x] Rule 7: Type isolation — all types in `SuperadminCouponsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 26: Deactivate uses `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable coupon IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
