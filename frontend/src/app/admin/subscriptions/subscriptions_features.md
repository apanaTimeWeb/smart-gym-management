# Admin Subscriptions — Feature Map

## Module Purpose
The Admin Subscriptions module manages the gym's own SaaS subscription and billing configuration. Admins can view the current subscription, compare available SaaS plans, initiate a plan upgrade, review paginated invoice history, manage stored payment methods, and toggle auto-renewal. This module does not manage individual member subscriptions.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `subscriptions_components/AdminSubscriptionsMain/` | Root client orchestrator, current-plan banner, tabs and auto-renew action | `AdminSubscriptionsMain.tsx` |
| `subscriptions_components/AdminSubscriptionsKPIs/` | Subscription billing KPIs | `AdminSubscriptionsKPIs.tsx` |
| `subscriptions_components/AdminSubscriptionsPlanCards/` | Current SaaS plan and upgrade choices | `AdminSubscriptionsPlanCards.tsx` |
| `subscriptions_components/AdminSubscriptionsInvoices/` | Server-paginated invoice history table | `AdminSubscriptionsInvoices.tsx` |
| `subscriptions_components/AdminSubscriptionsPaymentMethod/` | Stored payment-method list and default/remove actions | `AdminSubscriptionsPaymentMethod.tsx` |
| `subscriptions_api/` | Typed module API client | `AdminSubscriptionsApi.ts` |
| `subscriptions_context/` | TanStack Query orchestration and mutation confirmation | `useAdminSubscriptionsLogic.ts` |
| `subscriptions_store/` | UI-only state such as active tab and invoice page | `useAdminSubscriptionsStore.ts` |
| `subscriptions_types/` | API/domain types and Zod schemas | `AdminSubscriptionsTypes.ts`, `AdminSubscriptionsSchemas.ts` |
| `subscriptions_utils/` | Static UI constants and theme mappings | `AdminSubscriptionsSharedConstants.ts` |
| `subscriptions_mocks/` | Module-owned fixtures and MSW handlers | `AdminSubscriptionsMockFixtures.ts`, `AdminSubscriptionsMockHandlers.ts` |

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Subscription Overview | `/admin/subscriptions` | View current plan, billing cycle, limits and auto-renewal state | `fetchSubscription`, `fetchKPIs` | Live |
| Plan Comparison / Upgrade | `/admin/subscriptions` | Compare SaaS plans and confirm an upgrade | `fetchPlans`, `upgradePlan` | Live |
| Invoice History | `/admin/subscriptions` | Browse invoices with server-side pagination and open invoice PDF | `fetchInvoices` | Live |
| Payment Methods | `/admin/subscriptions` | View saved methods, set a default method, remove a saved method | `fetchPaymentMethods`, `setDefaultPaymentMethod`, `removePaymentMethod` | Live |
| Auto-Renewal | `/admin/subscriptions` | Turn subscription auto-renewal on/off with confirmation | `toggleAutoRenew` | Live |

## User Flows & Interactions

### Flow 1: Review Subscription and Billing
1. Admin opens `/admin/subscriptions`.
2. TanStack Query loads subscription, KPI, plan, invoice, and payment-method data through the module API client.
3. Current plan, billing cycle, next billing date, and auto-renewal state are visible.
4. Admin switches tabs to review plans, invoices, or payment methods.

### Flow 2: Upgrade SaaS Plan
1. Admin opens the Plans tab.
2. Admin selects an available plan and initiates the upgrade confirmation.
3. `useAdminSubscriptionsLogic.ts` waits for confirmation before generating the intent-scoped `Idempotency-Key`.
4. `upgradePlan(planId, idempotencyKey)` sends the confirmed mutation.
5. On success, the module reconciles relevant TanStack Query caches and displays the backend message.
6. On retry of the same confirmed intent, the same key is reused; cancel/reopen creates a new key.

### Flow 3: Browse Invoice History
1. Invoice history starts at page 1.
2. `currentInvoicePage` lives in the module store and is synchronized into the URL query state by the route logic where applicable.
3. `fetchInvoices({ page, limit })` requests only the selected page.
4. MSW returns `PaginationMeta` with `total`, `page`, `limit`, `totalPages`, `hasNextPage`, and `hasPrevPage`.
5. The table renders the current page and pagination controls; changing page causes a distinct query key/request/result.

### Flow 4: Change Auto-Renewal
1. Admin clicks Auto-renew.
2. `useAdminConfirm()` asks for confirmation before the billing-affecting mutation.
3. One intent key is generated at confirmation time.
4. `toggleAutoRenew(idempotencyKey)` is called and the mock mutates module-owned subscription state.
5. On success, the subscription query is invalidated and the new state is visible.

## Data and State Architecture
- **Server state:** TanStack Query is the sole source of truth for subscription, plans, invoices, payment methods and KPIs.
- **Module UI state:** `useAdminSubscriptionsStore.ts` owns `activeTab`, `showUpgradeConfirm`, and `currentInvoicePage`.
- **Query keys:**
  - `['admin', 'subscriptions', 'subscription']`
  - `['admin', 'subscriptions', 'plans']`
  - `['admin', 'subscriptions', 'invoices', { page, limit }]`
  - `['admin', 'subscriptions', 'payment-methods']`
  - `['admin', 'subscriptions', 'kpis']`
- **Local-storage keys:** None.
- **MSW handler:** `subscriptions_mocks/handlers/AdminSubscriptionsMockHandlers.ts`.
- **MSW fixture:** `subscriptions_mocks/fixtures/AdminSubscriptionsMockFixtures.ts`.
- **External infrastructure:** `@/lib/api`, `@/lib/formatters`, `@/components/ui`, shared Admin confirmation/toast infrastructure.
- **Business feature dependencies:** None.
- **Role-level business dependencies:** None.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchSubscription()` | GET | `/admin/subscriptions/fetchSubscription` | — | `CurrentSubscription` |
| `fetchPlans()` | GET | `/admin/subscriptions/fetchPlans` | — | `SaaSPlan[]` |
| `fetchInvoices(params)` | GET | `/admin/subscriptions/fetchInvoices?page&limit` | `{ page, limit }` | `Invoice[]` + `PaginationMeta` |
| `fetchPaymentMethods()` | GET | `/admin/subscriptions/fetchPaymentMethods` | — | `PaymentMethod[]` |
| `fetchKPIs()` | GET | `/admin/subscriptions/fetchKPIs` | — | `SubscriptionKPIData` |
| `upgradePlan(planId, idempotencyKey)` | POST | `/admin/subscriptions/upgradePlan` | `planId` | `null` |
| `toggleAutoRenew(idempotencyKey)` | POST | `/admin/subscriptions/toggleAutoRenew` | — | `null` |
| `setDefaultPaymentMethod(id)` | POST | `/admin/subscriptions/setDefaultPaymentMethod` | `id` | `null` |
| `removePaymentMethod(id, idempotencyKey)` | DELETE | `/admin/subscriptions/removePaymentMethod` | `id` | `null` |

## Permissions and Security
- **Required role:** `ADMIN` according to the module route/security contract.
- **Financial mutations:** Plan upgrade and auto-renewal changes use `useAdminConfirm()` and an intent-scoped `Idempotency-Key`; payment-method removal is also protected by confirmation and idempotency.
- **Backend authorization:** Frontend visibility is not a replacement for backend authorization.
- **Sensitive payment data:** UI renders tokenized/last-four metadata supplied by the API; secrets are not persisted in browser storage.
- **Cross-role isolation:** No business imports from `/manager`, `/trainer`, `/superadmin`, sibling Admin feature modules, or role-wide business buckets.

## Loading, Empty, and Error States
| Section | Loading | Empty | Error / Recovery |
|---|---|---|---|
| Full route | `loading.tsx` skeleton matching KPI/plan/invoice surfaces | N/A | `error.tsx` with module-specific Retry |
| Subscription banner | Query pending state with stable layout; button loading preserves its label | N/A | Subscription query error is surfaced through route/section error strategy |
| Invoice table | Table-shaped skeleton | No invoices state with pagination hidden/disabled as appropriate | Inline query error with retry through approved pattern |
| Payment methods | Section skeleton | No saved payment methods message | Inline error/retry |

## UI Data Requirements
- Current plan: `planName`, `tier`, `monthlyPrice`, `annualPrice`, `billingCycle`, `nextBillingDate`, `autoRenew`.
- Limits: `gymCount`, `memberLimit`, `staffLimit`, `storageGb`.
- Invoice table: `invoiceNo`, `date`, `planName`, `billingCycle`, `amount`, `status`, `pdfUrl`.
- Invoice pagination: `meta.total`, `meta.page`, `meta.limit`, `meta.totalPages`, `meta.hasNextPage`, `meta.hasPrevPage`.
- Payment methods: `type`, `last4`, `brand`, `upiId`, `bankName`, `expiryMonth`, `expiryYear`, `isDefault`.
- KPI data: `currentPlan`, `monthlySpend`, `totalInvoices`, `nextBillingAmount`, `daysUntilRenewal`, `savedWithAnnual`.

## Edge Cases / AI Warnings
- **Never add member-subscription behavior here:** this module is SaaS subscription billing for the gym account.
- **Never regenerate an idempotency key during retry:** reuse the same key for the same confirmed financial intent.
- **Cancel confirmation must clear an unsent key:** cancellation/reopen represents a new user intent and therefore a new key.
- **Invoice pagination is server-side:** never fetch the full invoice history and paginate only in React.
- **Mock mutations must mutate visible state:** returning a success message without changing `subscriptionState` is forbidden.
- **API response contracts are exact:** upgrade, auto-renew and payment-method mutations return `data: null`; do not return convenience objects that violate the Zod schema.
- **Do not resurrect stale endpoints:** `sendReminder`, `cancelSubscription`, and `updatePaymentMethod` are not part of the current API contract and must not be documented or implemented without an explicit product requirement.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `AdminSubscriptionsMain.tsx` | Root client orchestrator; current-plan banner, tabs, auto-renew action. |
| `AdminSubscriptionsKPIs.tsx` | Read-only KPI presentation. |
| `AdminSubscriptionsPlanCards.tsx` | Displays available SaaS plans and starts upgrade flow. |
| `AdminSubscriptionsInvoices.tsx` | Displays paginated invoice table and invoice PDF actions. |
| `AdminSubscriptionsPaymentMethod.tsx` | Displays stored payment methods and guarded actions. |

## Rule Compliance Checklist
- [x] Feature self-containment and no sibling business dependencies
- [x] Module-prefixed structure and descriptive naming
- [x] TanStack Query owns server state
- [x] Invoice pagination is server-side and reflected in query key/API/mock/UI
- [x] Financial mutations use confirmation + intent-scoped `Idempotency-Key`
- [x] Mock mutation state changes are visible after success
- [x] API mutation response schemas match mock responses
- [x] Canonical pagination metadata includes `hasNextPage` / `hasPrevPage`
- [x] Feature map reflects the actual API surface
- [ ] Full browser/typecheck/lint/E2E execution — NOT VERIFIED until the consuming app is present

## Module-Owned MSW Fixtures
`AdminSubscriptionsMockFixtures.ts` and `AdminSubscriptionsMockHandlers.ts` are the only business-data mock sources for this module. Global MSW bootstrap may register them but must not own subscription business data.
