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
