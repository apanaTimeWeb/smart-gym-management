# Superadmin Global Audit — Feature Map

## Module Purpose
The Superadmin Global Audit module provides an immutable, cross-tenant audit log of all
significant actions performed across the entire platform. Every destructive mutation,
authentication event, financial transaction, and admin action is recorded here. The audit
log is read-only — no record can be edited or deleted. Superadmins use this module for
compliance, incident investigation, and security monitoring.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 15 row placeholders |
| `error.tsx` | Error boundary with retry |
| `global-audit_components/SuperadminGlobalAuditClient.tsx` | Root Client Component — table + filter bar |
| `global-audit_components/SuperadminGlobalAuditTable.tsx` | Paginated audit log table |
| `global-audit_components/SuperadminGlobalAuditTableRow.tsx` | Single audit row — actor, action, target, tenant, timestamp |
| `global-audit_components/SuperadminGlobalAuditFilterBar.tsx` | Filter by tenant, action type, actor, date range |
| `global-audit_components/SuperadminGlobalAuditDetailDrawer.tsx` | Full audit entry — before/after payload diff |
| `global-audit_components/SuperadminGlobalAuditExportButton.tsx` | Export filtered log as CSV |
| `global-audit_types/SuperadminGlobalAuditTypes.ts` | `AuditEntry`, `AuditAction`, `AuditFilter`, `AuditPayloadDiff` |
| `global-audit_utils/SuperadminGlobalAuditConstants.ts` | `AUDIT_ACTION_STYLES`, `AUDIT_ACTION_LABELS` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Audit Log | `/superadmin/global-audit` | All platform audit entries, paginated | `GET /superadmin/audit?page=&tenantId=&action=&from=&to=` | ✅ Live |
| View Entry Detail | `/superadmin/global-audit` | Full entry with before/after diff | `GET /superadmin/audit/:id` | ✅ Live |
| Filter by Tenant | `/superadmin/global-audit` | Scope log to a specific tenant | — (query param) | ✅ Live |
| Filter by Action | `/superadmin/global-audit` | Scope by action type | — (query param) | ✅ Live |
| Filter by Date Range | `/superadmin/global-audit` | Scope by time window | — (query params) | ✅ Live |
| Export CSV | `/superadmin/global-audit` | Download filtered log as CSV | `GET /superadmin/audit/export?format=csv&...` | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'audit', { page, tenantId, action, from, to }]`, `['superadmin', 'audit', entryId]`
- Mutations: None — audit log is read-only
- Zustand stores: None
- Context providers: None
- Local-state: `tenantFilter`, `actionFilter`, `dateRange`, `page` — local to `SuperadminGlobalAuditClient`

## User Flows
1. Superadmin opens `/superadmin/global-audit` → full audit log loads, newest first
2. Superadmin filters by tenant → log scoped to that tenant's actions
3. Superadmin filters by action type (e.g. `GYM_DELETED`) → log scoped to that action
4. Superadmin clicks audit row → `SuperadminGlobalAuditDetailDrawer` → before/after payload diff
5. Superadmin clicks "Export CSV" → `GET /superadmin/audit/export` with current filters → browser download

## Component Responsibility Map
- `SuperadminGlobalAuditClient` — filter + pagination state. MUST NOT contain table logic.
- `SuperadminGlobalAuditTable` — renders rows. MUST NOT manage filter state.
- `SuperadminGlobalAuditDetailDrawer` — read-only diff display. MUST NOT allow any mutations.
- `SuperadminGlobalAuditExportButton` — triggers download only. MUST pass current filter state as query params.

## Permissions and Security
| Action | Required Role |
|---|---|
| View audit log | `SUPERADMIN` |
| View entry detail | `SUPERADMIN` |
| Export audit log | `SUPERADMIN` |
| ❌ Edit audit entries | Forbidden — immutable by design |
| ❌ Delete audit entries | Forbidden — compliance requirement |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 15 table row skeletons (audit logs are dense)
- **Empty:** "No audit entries match your filters" with clear filter link
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Immutability** — this module MUST have zero mutation operations. No edit, delete, or update buttons anywhere.
- **AUDIT_ACTION_STYLES** — maps action types to badge color classes; must live in constants, never inlined.
- **Before/after diff** — payload diff in detail drawer should render as a structured diff view, not raw JSON dump.
- **Date range validation** — `from` must be before `to`; validate client-side before firing query.
- **Export with filters** — CSV export MUST include all currently active filters as query params; never export unfiltered full log without explicit confirmation.
- **Pagination reset** — page resets to 1 when any filter changes.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole?: 'SUPERADMIN' | 'ADMIN' | 'STAFF' | 'MEMBER';
  tenantId?: string;
  tenantName?: string;
  actorType?: 'SUPERADMIN' | 'SYSTEM' | 'TENANT';
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  sessionId?: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  // ... truncated

export type GlobalAuditLog = z.infer<typeof GlobalAuditLogSchema>;
```

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminGlobalAudit*`
- [x] Rule 7: Type isolation — all types in `SuperadminGlobalAuditTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable audit entry IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports

---

## Edge Cases and AI Warnings

- **Delete Global audit is permanent and irreversible:** Never use `window.confirm()` for Global audit deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Global audit Table Row Clicks:** The `Global audit` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Global audit:** Do not allow a single failed API fetch in Global audit to unmount the entire page. Major components (like the Global audit data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Global audit Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Global audit.
- **No Client-Side Pagination for Global audit:** If the dataset grows large, do not fetch all Global audit and paginate on the client. Always implement robust server-side pagination, sorting, and filtering via query parameters.
