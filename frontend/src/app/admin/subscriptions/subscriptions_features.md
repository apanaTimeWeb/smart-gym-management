# Admin Subscriptions — Feature Map

## Module Purpose
The Subscriptions module gives gym admins visibility into all active, expired, and pending
member subscription records. Admins can view subscription history, check renewal dates, see
which plan a member is on, send renewal reminders, and cancel active subscriptions. The primary
value is catching expiring subscriptions before they lapse. Bulk renewals and plan changes are
handled in Finance and Members modules respectively. Cancel is irreversible mid-cycle and
requires `useConfirm()` double-verification.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `subscriptions_components/AdminSubscriptionsMain/` | Root client orchestrator — renders KPIs, plan cards, invoices, payment method | `AdminSubscriptionsMain.tsx` |
| `subscriptions_components/AdminSubscriptionsKPIs/` | Stat cards: Total Active, Expiring Soon, Expired, Revenue This Month | `AdminSubscriptionsKPIs.tsx` |
| `subscriptions_components/AdminSubscriptionsPlanCards/` | Current plan info + available upgrade tiers | `AdminSubscriptionsPlanCards.tsx` |
| `subscriptions_components/AdminSubscriptionsInvoices/` | Paginated invoice history table | `AdminSubscriptionsInvoices.tsx` |
| `subscriptions_components/AdminSubscriptionsPaymentMethod/` | Current payment method display + update CTA | `AdminSubscriptionsPaymentMethod.tsx` |
| `subscriptions_api/` | API client for subscription endpoints | `subscriptions_api.ts` |
| `subscriptions_context/` | Data logic hook — fetches subscriptions, handles remind/cancel mutations | `useAdminSubscriptionsLogic.ts` |
| `subscriptions_store/` | Zustand store — search, statusFilter, currentPage | `useAdminSubscriptionsStore.ts` |
| `subscriptions_types/` | TypeScript types: Subscription, SubscriptionStatus, Invoice, PlanCard | `subscriptions_types.ts` |
| `subscriptions_utils/` | Constants: status styles, plan tier options | `AdminSubscriptionsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Subscription Overview | `/admin/subscriptions` | View current plan, billing cycle, usage limits, invoice history | `AdminSubscriptionsPlanCards`, `AdminSubscriptionsInvoices` | `GET /admin/subscriptions/overview` | ✅ Live |
| Invoice History | `/admin/subscriptions` | Paginated table of all past invoices with download links | `AdminSubscriptionsInvoices` | `GET /admin/subscriptions/invoices?page&limit` | ✅ Live |
| Renewal Reminder | `/admin/subscriptions` | Send WhatsApp/SMS renewal reminder to a member | `AdminSubscriptionsInvoices` (row action) | `POST /admin/subscriptions/:id/remind` | ✅ Live |
| Cancel Subscription | `/admin/subscriptions` | Cancel an active subscription — requires `useConfirm()` | `AdminSubscriptionsPlanCards` | `POST /admin/subscriptions/:id/cancel` | ✅ Live |
| Update Payment Method | `/admin/subscriptions` | Update the gym's billing payment method | `AdminSubscriptionsPaymentMethod` | `PATCH /admin/subscriptions/payment-method` | ✅ Live |

## User Flows & Interactions

### Flow 1: View Subscription Status
1. Admin navigates to `/admin/subscriptions`
2. KPI cards show active count, expiring soon, expired, and monthly revenue
3. Plan cards show current tier with usage bars and available upgrade options
4. Invoice table shows paginated billing history

### Flow 2: Cancel a Subscription
1. Admin clicks "Cancel" on the active plan card
2. `useAdminConfirm()` dialog: "Cancel subscription? This is irreversible mid-cycle. Access continues until [date]."
3. On confirm: `subscriptionsApi.cancelSubscription(id)` called
4. On success: plan card updates to cancelled state, toast shows backend message

## Data and State Architecture

- **State pattern:** Zustand for UI state + TanStack Query for server state
- **Zustand store:** `useAdminSubscriptionsStore.ts` — holds: `search`, `statusFilter`, `currentPage`
- **Query keys:** `['adminSubscriptionsOverview']`, `['adminSubscriptionsInvoices', { page }]`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `subscriptionsApi` in `subscriptions_api/subscriptions_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchOverview()` | GET | `/admin/subscriptions/overview` | — | `SubscriptionOverview` |
| `fetchInvoices(params)` | GET | `/admin/subscriptions/invoices` | `{ page, limit }` | `Invoice[]` + `PaginationMeta` |
| `sendReminder(id)` | POST | `/admin/subscriptions/:id/remind` | — | `null` |
| `cancelSubscription(id)` | POST | `/admin/subscriptions/:id/cancel` | — | `null` |
| `updatePaymentMethod(dto)` | PATCH | `/admin/subscriptions/payment-method` | `PaymentMethodDto` | `null` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Destructive actions:** Cancel uses `useAdminConfirm()` with explicit mid-cycle warning
- **`SUBSCRIPTION_STATUS_STYLES`** lives in `subscriptions_utils/` — never inline status badge colors
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton: KPI cards + plan cards + invoice table | N/A | `error.tsx` — module-branded with Retry |
| Invoice table | Skeleton rows while loading | Inline "No invoices found" | Inline via TanStack Query `isError` |

## Edge Cases and AI Warnings

- **Cancel is irreversible mid-cycle** — always use `useAdminConfirm()` with explicit warning stating the access end date. Never soften the message.
- **`SUBSCRIPTION_STATUS_STYLES` is the single source of truth** — never add inline color ternaries for subscription status.
- **Server-side pagination is mandatory** — never fetch all invoices and paginate client-side.
- **Reminder sends a real WhatsApp/SMS** — the confirm dialog must make this clear to avoid accidental spam.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminSubscriptionsMain.tsx` | Root orchestrator. Renders KPIs, plan cards, invoices, payment method. No direct API calls. |
| `AdminSubscriptionsKPIs.tsx` | 4 read-only stat cards. Reads from logic hook. |
| `AdminSubscriptionsPlanCards.tsx` | Current plan + upgrade tiers. Cancel CTA calls `useAdminConfirm`. |
| `AdminSubscriptionsInvoices.tsx` | Paginated invoice table. Reminder row action. Download link per row. |
| `AdminSubscriptionsPaymentMethod.tsx` | Current payment method display + update CTA. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded colors in JSX
- [x] Rule 5: Smart State Management — Zustand + TanStack Query
- [x] Rule 6: Logic/UI Separation — `useAdminSubscriptionsLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `subscriptions_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: `subscriptions_url_config.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `subscriptions_forbidden.md` present
- [x] Rule 71: Cancel uses `useAdminConfirm()`
- [ ] Rule 15A: Tests — not yet configured
- [ ] Rule 75: MSW handler — not yet configured
