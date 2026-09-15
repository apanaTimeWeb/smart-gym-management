# Usage Meters Feature Map

## Module Purpose
Provides the Superadmin with a read-only dashboard view of per-tenant resource consumption: API call counts, storage usage, active-member bandwidth, and bandwidth-utilisation percentage. Alerts on approaching or exceeding plan limits.

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|
| View Tenant Usage Meters | `/superadmin/usage-meters` | Display per-tenant current usage vs. plan limits | `GET /superadmin/usage-meters` → `fetchUsageMeters()` | Superadmin |
| Export Usage CSV | `/superadmin/usage-meters` | Download CSV of all tenant usage metrics | `GET /superadmin/usage-meters/export` → `exportUsageMetersCSV()` | Superadmin |

## Data and State Architecture
- Server-state query keys: `['superadmin', 'usage-meters']`
- Zustand stores: None — all state managed by TanStack Query
- Context providers: None
- Local-storage keys: None
- MSW handler file: `src/mocks/handlers/superadmin-usage-meters.handlers.ts`

## API Contract
- `usageMetersApi.fetchUsageMeters(params?: Record<string, string>)` → `ApiResponse<TenantUsageMeter[]>`
- `usageMetersApi.exportUsageMetersCSV()` → `ApiResponse<{ downloadUrl: string }>`

## Permissions and Security
- **Role:** `SUPERADMIN` only — protected by Next.js middleware role check
- **Risk:** Tenant usage data is PII-adjacent — endpoint must be rate-limited server-side

## Loading, Empty, Error States
- **Loading:** `loading.tsx` skeleton with animated rows matching usage table
- **Empty:** "No tenant usage data" empty state shown when API returns empty array
- **Error:** `error.tsx` typed React Error Boundary catches network failures

## Edge Cases / AI Warnings
- Usage counts update on a delay (15-minute cache on backend) — do not display as real-time
- Always render the plan limit even when current usage is 0 — do not hide the column
- `exportUsageMetersCSV()` returns a signed URL — open in new tab, never iframe
- Exceeding-limit rows should be visually distinct (color token, not arbitrary inline style)

---

## Edge Cases and AI Warnings

- **Delete Usage-meter is permanent and irreversible:** Never use `window.confirm()` for Usage-meter deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Usage-meters Table Row Clicks:** The `Usage-meters` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Usage-meters:** Do not allow a single failed API fetch in Usage-meters to unmount the entire page. Major components (like the Usage-meters data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Usage-meters Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Usage-meters.
- **No Client-Side Pagination for Usage-meters:** If the dataset grows large, do not fetch all Usage-meters and paginate on the client. Always implement robust server-side pagination, sorting, and filtering via query parameters.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export interface UsageMeter {
  id: string;
  tenantId: string;
  tenantName: string;
  smsSent: number;
  smsLimit: number;
  whatsappMessagesSent: number;
  whatsappLimit: number;
  emailsSent: number;
  emailLimit: number;
  apiCallsCount: number;
  apiCallsLimit?: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  // ... truncated
```
