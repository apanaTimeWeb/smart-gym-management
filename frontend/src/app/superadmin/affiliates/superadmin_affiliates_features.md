# Affiliates Feature Map

## Module Purpose
Manages affiliate partners who refer gym tenants to the platform. Superadmins can create, edit, suspend, activate, and delete affiliates. Each affiliate has a unique referral code and earns commission tracked against their account.

## Directory Structure
- `affiliates_components/`: Root orchestrator (`SuperadminAffiliatesClient`) + isolated sub-components (Header, StatsBar, Table, TableRow, StatusBadge, Modal, EmptyState)
- `superadmin_affiliates_types/`: TypeScript definitions — `Affiliate`, `AffiliateStatus`, `AffiliateFormValues`
- `affiliates_utils/`: Page hook (`useSuperadminAffiliatesPage`), data hook (`useSuperadminAffiliatesData`), mutation hook (`useSuperadminAffiliatesMutation`)
- `superadmin_affiliates_api/`: API layer — `superadmin_affiliates_api.ts`

## Feature Inventory
| Feature | Component | Purpose | API Call | Status |
|---|---|---|---|---|
| List affiliates | `SuperadminAffiliatesTable` | Paginated table of all affiliates with status badge, referral code, commission | `fetchAffiliates()` | ✅ Live |
| Search & filter | `SuperadminAffiliatesHeader` | Search by name/email, filter by status (ALL / ACTIVE / SUSPENDED) | Client-side filter | ✅ Live |
| Stats bar | `SuperadminAffiliatesStatsBar` | Total affiliates count + total commission earned | Derived from query data | ✅ Live |
| Add affiliate | `SuperadminAffiliateModal` | Create new affiliate with name, email, referral code (React Hook Form + Zod) | `createAffiliate(dto)` | ✅ Live |
| Edit affiliate | `SuperadminAffiliateModal` (edit mode) | Update affiliate name, email, referral code | `updateAffiliate(id, dto)` | ✅ Live |
| Toggle status | `SuperadminAffiliatesTableRow` | Suspend or activate an affiliate | `suspendAffiliate(id)` / `activateAffiliate(id)` | ✅ Live |
| Delete affiliate | `SuperadminAffiliatesTableRow` | Permanently remove an affiliate record | `deleteAffiliate(id)` | ✅ Live |
| Empty state | `SuperadminAffiliatesEmptyState` | Shown when no affiliates exist or search returns zero results | — | ✅ Live |

## Data and State Architecture
- Server-state query key: `['superadmin', 'affiliates']`
- Mutations invalidate: `['superadmin', 'affiliates']` on success
- Zustand stores: None — all UI state in `useSuperadminAffiliatesPage` via `useState`
- Form state: React Hook Form + Zod (`AffiliateFormValues` schema in types file)
- Context providers: None
- Local-storage keys: None

## API Contract
All functions live in `superadmin_affiliates_api.ts` and return `ApiResponse<T>`:
- `fetchAffiliates(params?)` → `ApiResponse<Affiliate[]>`
- `createAffiliate(dto: AffiliateFormValues)` → `ApiResponse<Affiliate>`
- `updateAffiliate(id: string, dto: Partial<AffiliateFormValues>)` → `ApiResponse<Affiliate>`
- `deleteAffiliate(id: string)` → `ApiResponse<void>`
- `suspendAffiliate(id: string)` → `ApiResponse<Affiliate>`
- `activateAffiliate(id: string)` → `ApiResponse<Affiliate>`

## Permissions and Security
- Only `SUPERADMIN` role can access this module
- All mutations require confirmation via `useSuperadminConfirm()` for destructive actions (delete, suspend)

## Loading, Empty, Error States
- **Loading:** Structural skeleton — header bar + 2 stat card skeletons + table skeleton (Rule 9)
- **Empty:** `<SuperadminAffiliatesEmptyState />` with CTA to add first affiliate (Rule 48)
- **Error:** `error.tsx` React Error Boundary + inline `text-danger` fallback in client component

## Edge Cases / AI Warnings
- Do not add a second affiliates panel to `/superadmin/settings` — this module is the single source of truth
- Referral codes must be unique — the API enforces this; surface the error message from `res.message` via `toast.error`
- Do not use `useEffect` to sync query data into local state — consume `queryData` directly (Rule 15C)
- Status toggle is optimistic — update query cache immediately, revert on error

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export type AffiliateStatus = 'ACTIVE' | 'INACTIVE';

/** Filter tabs for the Affiliates status dropdown. */

export type AffiliateStatusFilter = 'ALL' | AffiliateStatus;

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  referralCode: string;
  totalReferred: number;
  commissionEarned: number;
  commissionRate?: number;
  pendingPayout?: number;
  bankDetails?: string;
  status: AffiliateStatus;
  joinedAt: string;
  referralCount?: number;
  conversionRate?: number;
  // ... truncated

export type AffiliateFormData = z.infer<typeof AffiliateSchema>;
```

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — each sub-component in its own folder
- [x] Rule 4: No inline colors — status badge uses `SuperadminAffiliateStatusBadge` with token classes
- [x] Rule 7: Type isolation — all types in `superadmin_affiliates_types.ts`
- [x] Rule 8: Server/client boundary — `page.tsx` is Server Component, client logic in `*Client.tsx`
- [x] Rule 9: Structural skeleton loading state, not a spinner
- [x] Rule 10: Absolute imports only (`@/app/superadmin/...`)
- [x] Rule 14: No hardcoded toast messages — uses `res.message` from API response
- [x] Rule 15C: No `useEffect` anti-pattern — TanStack Query data consumed directly
- [x] Rule 71: Destructive actions (delete, suspend) gated by `useSuperadminConfirm()`

---

## Edge Cases and AI Warnings

- **Delete Affiliate is permanent and irreversible:** Never use `window.confirm()` for Affiliate deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Affiliates Table Row Clicks:** The `Affiliates` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Affiliates:** Do not allow a single failed API fetch in Affiliates to unmount the entire page. Major components (like the Affiliates data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Affiliates Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Affiliates.
- **No Client-Side Pagination for Affiliates:** If the dataset grows large, do not fetch all Affiliates and paginate on the client. Always implement robust server-side pagination, sorting, and filtering via query parameters.
