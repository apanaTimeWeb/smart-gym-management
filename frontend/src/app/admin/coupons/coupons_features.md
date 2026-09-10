# Admin Coupons — Feature Map

## Module Purpose
The Coupons module lets gym admins create, manage, and track promotional discount codes for
gym memberships. Admins set discount type (flat or percentage), validity period, usage limits,
and applicable plans. Active coupons can be shared with members. Expired or fully-redeemed
coupons are auto-archived. Admins can view per-coupon redemption analytics. Coupon codes are
case-insensitive at apply-time (backend normalizes) but always displayed in uppercase in the UI.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `coupons_components/AdminCouponsMain/` | Root client orchestrator — renders KPIs, toolbar, table, modal | `AdminCouponsMain.tsx` |
| `coupons_components/AdminCouponsKPIs/` | 4 interactive stat cards: Total Active, Total Redeemed, Expiring Soon, Total Savings | `AdminCouponsKPIs.tsx` |
| `coupons_components/AdminCouponsToolbar/` | Search + status filter + "Create Coupon" CTA | `AdminCouponsToolbar.tsx` |
| `coupons_components/AdminCouponsTable/` | Paginated table with status badges, redemption count, edit/delete row actions | `AdminCouponsTable.tsx` |
| `coupons_components/AdminCouponsModal/` | RHF + Zod create/edit modal — code, discount type, amount, validity, usage limit, plans | `AdminCouponsModal.tsx` |
| `coupons_components/AdminCouponsEmptyState/` | Empty state when no coupons exist | `AdminCouponsEmptyState.tsx` |
| `coupons_api/` | Mock API — fetchCoupons, fetchKPIs, createCoupon, updateCoupon, deleteCoupon, toggleCoupon | `coupons_api.ts` |
| `coupons_context/` | Business logic hook — queries, mutations, filter/pagination | `useAdminCouponsLogic.ts` |
| `coupons_store/` | Zustand store — search, statusFilter, modal state, editing coupon, currentPage | `useAdminCouponsStore.ts` |
| `coupons_types/` | TypeScript types: Coupon, CouponFormValues, CouponKPIData, CouponStatus, DiscountType | `coupons_types.ts` |
| `coupons_utils/` | Constants: status styles, discount type options, plan options, Zod schema | `AdminCouponsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Coupon List | `/admin/coupons` | View all active/scheduled/expired coupons with search and status filter | `AdminCouponsTable`, `AdminCouponsToolbar` | `GET /admin/coupons?page&limit&search&status` | ✅ Live |
| Create Coupon | `/admin/coupons` | New coupon: code, discount type/amount, validity dates, usage limit, applicable plans | `AdminCouponsModal` | `POST /admin/coupons` | ✅ Live |
| Edit Coupon | `/admin/coupons` | Update validity or usage limit — disabled for expired coupons | `AdminCouponsModal` | `PATCH /admin/coupons/:id` | ✅ Live |
| Delete Coupon | `/admin/coupons` | Permanently remove — requires `useConfirm()` | `AdminCouponsTable` | `DELETE /admin/coupons/:id` | ✅ Live |
| Toggle Active | `/admin/coupons` | Enable/disable without deleting | `AdminCouponsTable` | `PATCH /admin/coupons/:id/toggle` | ✅ Live |
| KPI Overview | `/admin/coupons` | See total active, redeemed, expiring soon, total savings — each card filters the table | `AdminCouponsKPIs` | `GET /admin/coupons/kpis` | ✅ Live |

## User Flows & Interactions

### Flow 1: Create a New Coupon
1. Admin clicks "Create Coupon" in toolbar → `AdminCouponsModal` opens
2. Fills: Code (auto-uppercased) → Discount Type → Amount → Valid From/To → Usage Limit → Plans
3. On submit: `couponsApi.createCoupon(payload)` called
4. On success: modal closes, list + KPI cache invalidated, toast shown with backend message

### Flow 2: Delete a Coupon
1. Admin clicks delete icon on a row
2. `useAdminConfirm()` dialog: "Delete coupon [CODE]? This cannot be undone."
3. On confirm: `couponsApi.deleteCoupon(id)` → cache invalidated

### Flow 3: Filter by KPI Card
1. Admin clicks a KPI card (e.g. "Expiring Soon")
2. `statusFilter` in store set to `'expiring'` → table re-fetches with filter

## Data and State Architecture

- **State pattern:** Zustand for UI state + TanStack Query for server state
- **Zustand store:** `useAdminCouponsStore.ts` — holds: `search`, `statusFilter`, `showModal`, `editingCoupon`, `currentPage`
- **Query keys:** `['adminCoupons', { search, statusFilter, currentPage }]`, `['adminCouponsKPIs']`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `couponsApi` in `coupons_api/coupons_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchCoupons(params)` | GET | `/admin/coupons` | `{ page, limit, search, status }` | `Coupon[]` + `PaginationMeta` |
| `fetchKPIs()` | GET | `/admin/coupons/kpis` | — | `CouponKPIData` |
| `createCoupon(dto)` | POST | `/admin/coupons` | `CouponFormValues` | `Coupon` |
| `updateCoupon(id, dto)` | PATCH | `/admin/coupons/:id` | `CouponFormValues` | `Coupon` |
| `deleteCoupon(id)` | DELETE | `/admin/coupons/:id` | — | `null` |
| `toggleCoupon(id)` | PATCH | `/admin/coupons/:id/toggle` | — | `Coupon` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Destructive actions:** Delete uses `useAdminConfirm()` — never `window.confirm()`
- **Expired coupon guard:** Edit button disabled when `coupon.status === 'EXPIRED'`
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton: 4 KPI cards + toolbar + table | N/A | `error.tsx` — module-branded with Retry |
| Coupons table | `AdminTableSkeleton` while loading | `AdminCouponsEmptyState.tsx` — tag icon + "Create your first coupon" CTA | Inline via TanStack Query `isError` |

## Edge Cases and AI Warnings

- **KPI cards are interactive filters (Rule 70):** Each card sets `statusFilter` in the store. Never make them purely decorative.
- **`COUPON_STATUS_STYLES` is the single source of truth:** Never add inline color ternaries for coupon status. Add new statuses to the constants map.
- **Coupon codes always uppercase in UI:** The form auto-uppercases on input. Never lowercase a coupon code.
- **Expired coupons cannot be edited:** Disable the edit button when `status === 'EXPIRED'`. The modal must not open for expired coupons.
- **Delete is permanent:** Always use `useAdminConfirm()` with explicit warning.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminCouponsMain.tsx` | Root orchestrator. Renders KPIs, toolbar, table, modal. No direct API calls. |
| `AdminCouponsKPIs.tsx` | 4 interactive stat cards. Each click sets a status filter. |
| `AdminCouponsToolbar.tsx` | Search + status filter + "Create Coupon" CTA. Writes to store. |
| `AdminCouponsTable.tsx` | Paginated rows. Edit disabled for expired. Delete calls `useAdminConfirm`. |
| `AdminCouponsModal.tsx` | RHF + Zod create/edit form. Calls `saveCoupon` on submit. |
| `AdminCouponsEmptyState.tsx` | Empty state with "Create Coupon" CTA. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, 300-line ceiling
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded colors in JSX
- [x] Rule 5: Smart State Management — Zustand + TanStack Query
- [x] Rule 6: Logic/UI Separation — `useAdminCouponsLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `coupons_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: `coupons_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Modal uses React Hook Form + Zod
- [x] Rule 40: `coupons_forbidden.md` present
- [x] Rule 70: KPI cards are interactive filters
- [x] Rule 71: Delete uses `useAdminConfirm()`
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured
