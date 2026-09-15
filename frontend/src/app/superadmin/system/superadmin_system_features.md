# System Feature Map

## Module Purpose
Provides the Superadmin with a live health overview of the SaaS infrastructure: per-tenant SLA compliance table, overall platform uptime percentage, downtime-incident count, and a health-probe status check for backend connectivity.

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|
| View Tenant SLA Table | `/superadmin/system` | Display per-tenant uptime, SLA status (MET/WARNING/BREACHED), downtime minutes | `GET /superadmin/system` → `systemApi.fetchSystemInfo()` | Superadmin |
| View Health Probe Status | `/superadmin/system` | Ping backend health endpoint and display live status | `GET /superadmin/system/health` → `systemApi.fetchHealthProbe()` | Superadmin |

## Data and State Architecture
- Server-state query keys:
  - `['superadmin', 'system', 'info']` — SLA data, 60s refetch interval
  - `['superadmin', 'system', 'health']` — health probe, 30s refetch interval
- Zustand stores: None
- Context providers: None
- Local-storage keys: None
- MSW handler file: `src/mocks/handlers/superadmin-system.handlers.ts`

## API Contract
- `systemApi.fetchSystemInfo()` → `ApiResponse<SuperadminTenantSla[]>`
  - Response: `[{ id, name, targetSla, actualUptime, downtimeIncidents, downtimeMinutes, status }]`
- `systemApi.fetchHealthProbe()` → `ApiResponse<{ status: string; timestamp?: string; checks?: Record<string, unknown> }>`

## Permissions and Security
- **Role:** `SUPERADMIN` only — protected by Next.js middleware
- **Risk:** SLA breach data may contain sensitive tenant operational info — do not expose to Admin or Trainer roles
- **Risk:** Health probe result must not be cached for more than 30 seconds client-side — stale data could mask an actual outage

## Loading, Empty, Error States
- **Loading:** `loading.tsx` animates a placeholder SLA table with pulsing rows
- **Empty:** "All tenants meeting SLA targets" rendered when array is empty
- **Error:** `error.tsx` boundary displays "Unable to fetch system status" with a manual retry button; also reports the HTTP status code from the failed request

## Edge Cases / AI Warnings
- A tenant with `downtimeIncidents: 0` and `status: 'MET'` should show a green badge, NOT an empty cell
- SLA status `'BREACHED'` must be rendered with a distinct error color token — not an arbitrary `bg-[#...]` class
- Do not auto-navigate away from this page on a health probe failure — show inline alert instead
- Polling must use `refetchInterval` on the query, not `setInterval` + manual fetch
- If the backend returns no `checks` object, gracefully omit that section rather than throwing

---

## Edge Cases and AI Warnings

- **Delete System is permanent and irreversible:** Never use `window.confirm()` for System deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **System Table Row Clicks:** The `System` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in System:** Do not allow a single failed API fetch in System to unmount the entire page. Major components (like the System data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for System Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting System.
- **No Client-Side Pagination for System:** If the dataset grows large, do not fetch all System and paginate on the client. Always implement robust server-side pagination, sorting, and filtering via query parameters.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export type SuperadminSystemSlaStatus = 'MET' | 'BREACHED' | 'WARNING';

export interface SuperadminTenantSla {
  id: string;
  name: string;
  targetSla: number;
  actualUptime: number;
  downtimeIncidents: number;
  downtimeMinutes: number;
  status: SuperadminSystemSlaStatus;
}
```
