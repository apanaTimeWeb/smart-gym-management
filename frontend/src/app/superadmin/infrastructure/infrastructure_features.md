# Superadmin Infrastructure — Feature Map

## Module Purpose
The Superadmin Infrastructure module provides visibility into the platform's technical
health — server status, database connection pools, queue depths, cache hit rates, and
active worker counts. Superadmins use this module to monitor system performance, identify
bottlenecks, and trigger manual interventions (cache flush, queue drain). This is an
operations-focused module; it does not expose tenant business data.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Status card grid skeleton |
| `error.tsx` | Error boundary with retry |
| `infrastructure_components/SuperadminInfrastructureClient.tsx` | Root Client Component — status grid + actions |
| `infrastructure_components/SuperadminInfrastructureStatusGrid.tsx` | Grid of service health cards |
| `infrastructure_components/SuperadminInfrastructureServiceCard.tsx` | Single service card — name, status, latency, uptime |
| `infrastructure_components/SuperadminInfrastructureMetricsPanel.tsx` | DB pool, queue depth, cache hit rate metrics |
| `infrastructure_components/SuperadminInfrastructureActionsPanel.tsx` | Manual actions — flush cache, drain queue |
| `infrastructure_components/SuperadminInfrastructureAlertsBanner.tsx` | Active infrastructure alerts banner |
| `infrastructure_types/SuperadminInfrastructureTypes.ts` | `ServiceStatus`, `InfraMetrics`, `ServiceHealth`, `InfraAction` |
| `infrastructure_utils/SuperadminInfrastructureConstants.ts` | `SERVICE_STATUS_STYLES`, `HEALTH_THRESHOLD` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Service Health Grid | `/superadmin/infrastructure` | All service statuses | `GET /superadmin/infrastructure/health` | ✅ Live |
| Infrastructure Metrics | `/superadmin/infrastructure` | DB pool, queue, cache metrics | `GET /superadmin/infrastructure/metrics` | ✅ Live |
| Active Alerts | `/superadmin/infrastructure` | Current infrastructure alerts | `GET /superadmin/infrastructure/alerts` | ✅ Live |
| Flush Cache | `/superadmin/infrastructure` | Manually flush Redis cache | `POST /superadmin/infrastructure/cache/flush` | ✅ Live |
| Drain Queue | `/superadmin/infrastructure` | Manually drain job queue | `POST /superadmin/infrastructure/queue/drain` | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'infrastructure', 'health']`, `['superadmin', 'infrastructure', 'metrics']`, `['superadmin', 'infrastructure', 'alerts']`
- Query refetch interval: 30 seconds for health + metrics (live monitoring)
- Mutations: `useFlushCache`, `useDrainQueue`
- Zustand stores: None
- Context providers: None

## User Flows
1. Superadmin opens `/superadmin/infrastructure` → health, metrics, and alerts queries fire in parallel
2. Queries auto-refetch every 30 seconds — live monitoring without manual refresh
3. Superadmin clicks "Flush Cache" → `useConfirm()` with warning → `POST /cache/flush`
4. Superadmin clicks "Drain Queue" → `useConfirm()` with warning about job loss → `POST /queue/drain`

## Component Responsibility Map
- `SuperadminInfrastructureClient` — layout orchestrator. MUST NOT contain metric logic.
- `SuperadminInfrastructureServiceCard` — display only. Status color from `SERVICE_STATUS_STYLES`.
- `SuperadminInfrastructureActionsPanel` — action buttons only. MUST use `useConfirm()` before any mutation.
- `SuperadminInfrastructureMetricsPanel` — metrics display only. MUST NOT contain action logic.

## Permissions and Security
| Action | Required Role |
|---|---|
| View infrastructure health | `SUPERADMIN` |
| View metrics | `SUPERADMIN` |
| Flush cache | `SUPERADMIN` |
| Drain queue | `SUPERADMIN` |
| ❌ Modify server configuration | DevOps only — not from UI |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — service card grid skeleton + metrics panel placeholder
- **Empty alerts:** "No active infrastructure alerts" with green checkmark
- **Error:** `error.tsx` with retry; individual service card shows "Unknown" status on query error

## Edge Cases / AI Warnings
- **Auto-refetch** — health + metrics queries MUST use `refetchInterval: 30000`. Never use `setInterval` in a component.
- **Flush cache warning** — cache flush affects ALL tenants simultaneously; confirmation must state this explicitly.
- **Drain queue warning** — draining the queue may cause in-flight jobs to fail; confirmation must warn about data loss risk.
- **SERVICE_STATUS_STYLES** — maps `UP | DEGRADED | DOWN | UNKNOWN` to color classes; must live in constants.
- **HEALTH_THRESHOLD** — named constants for degraded/down thresholds (e.g. latency > 500ms = DEGRADED); never inline numbers.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminInfrastructure*`
- [x] Rule 7: Type isolation — all types in `SuperadminInfrastructureTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 26: Cache flush + queue drain use `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable service name keys used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports
