# Superadmin Backups — Feature Map

## Module Purpose
The Superadmin Backups module manages platform-level database backup operations. Superadmins
can view backup history, trigger manual backups, monitor backup health, and initiate restore
operations. Backups are scoped at the platform level (full database) and at the tenant level
(per-gym data export). Restore operations are the most destructive action in the platform
and require multi-step confirmation. This module is critical infrastructure — all actions
are logged in the global audit trail.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Backup list skeleton + status card placeholders |
| `error.tsx` | Error boundary with retry |
| `backups_components/SuperadminBackupsClient.tsx` | Root Client Component — status + history + actions |
| `backups_components/SuperadminBackupsStatusRow.tsx` | Last backup status cards — platform + per-tenant summary |
| `backups_components/SuperadminBackupsHistoryTable.tsx` | Paginated backup history table |
| `backups_components/SuperadminBackupsHistoryRow.tsx` | Single backup row — type, size, duration, status, timestamp |
| `backups_components/SuperadminBackupsTriggerModal.tsx` | Trigger manual backup — type selection + confirmation |
| `backups_components/SuperadminBackupsRestoreModal.tsx` | Restore from backup — multi-step confirmation |
| `backups_components/SuperadminBackupsDownloadButton.tsx` | Download backup file |
| `backups_types/SuperadminBackupsTypes.ts` | `Backup`, `BackupType`, `BackupStatus`, `TriggerBackupDto`, `RestoreBackupDto` |
| `backups_utils/SuperadminBackupsConstants.ts` | `BACKUP_STATUS_STYLES`, `BACKUP_TYPE_LABELS` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Backup Status | `/superadmin/backups` | Last backup health summary | `GET /superadmin/backups/status` | ✅ Live |
| Backup History | `/superadmin/backups` | All backups, paginated | `GET /superadmin/backups?page=&type=` | ✅ Live |
| Trigger Manual Backup | `/superadmin/backups` | Start a backup immediately | `POST /superadmin/backups/trigger` | ✅ Live |
| Download Backup | `/superadmin/backups` | Download backup file | `GET /superadmin/backups/:id/download` | ✅ Live |
| Restore from Backup | `/superadmin/backups` | Restore database — multi-step confirm | `POST /superadmin/backups/:id/restore` | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'backups', 'status']`, `['superadmin', 'backups', { page, type }]`
- Mutations: `useTriggerBackup`, `useRestoreBackup`
- Zustand stores: None
- Context providers: None
- Local-state: `typeFilter`, `page` — local to `SuperadminBackupsClient`

## User Flows
1. Superadmin opens `/superadmin/backups` → status summary + history table load
2. Superadmin clicks "Trigger Backup" → `SuperadminBackupsTriggerModal` → type selection → `useConfirm()` → `POST`
3. Superadmin clicks "Download" on completed backup → `GET /superadmin/backups/:id/download` → browser download
4. Superadmin clicks "Restore" → `SuperadminBackupsRestoreModal` → 3-step confirmation (type name, acknowledge data loss, final confirm) → `POST`

## Component Responsibility Map
- `SuperadminBackupsClient` — layout + filter state. MUST NOT contain backup logic.
- `SuperadminBackupsRestoreModal` — MUST implement 3-step confirmation. MUST NOT allow single-click restore.
- `SuperadminBackupsTriggerModal` — type selection + confirmation. MUST use `useConfirm()`.
- `SuperadminBackupsDownloadButton` — download trigger only. MUST NOT fetch binary into state.

## Permissions and Security
| Action | Required Role |
|---|---|
| View backup history | `SUPERADMIN` |
| Trigger manual backup | `SUPERADMIN` |
| Download backup | `SUPERADMIN` |
| Restore from backup | `SUPERADMIN` |
| ❌ Delete backup records | Forbidden — immutable audit trail |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — status card skeletons + 8 history row skeletons
- **Empty:** "No backups found" — trigger first backup CTA
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Restore is catastrophic** — `SuperadminBackupsRestoreModal` MUST require the superadmin to type the backup ID or a confirmation phrase before enabling the final confirm button. Never allow single-click restore.
- **BACKUP_STATUS_STYLES** — maps `COMPLETED | RUNNING | FAILED | PENDING` to badge classes; must live in constants.
- **Download** — use anchor with `download` attribute or `window.open`; never fetch binary into React state.
- **Trigger backup** — MUST use `useConfirm()` even for manual trigger (affects production data).
- **Restore audit** — restore action MUST be logged in global audit trail; backend enforces this but frontend must not suppress the confirmation flow.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export type BackupRecord = z.infer<typeof BackupRecordSchema>;
```

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminBackups*`
- [x] Rule 7: Type isolation — all types in `SuperadminBackupsTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 26: Trigger + Restore use `useConfirm()` (restore uses 3-step)
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable backup IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports

---

## Edge Cases and AI Warnings

- **Delete Backup is permanent and irreversible:** Never use `window.confirm()` for Backup deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Backups Table Row Clicks:** The `Backups` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Backups:** Do not allow a single failed API fetch in Backups to unmount the entire page. Major components (like the Backups data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Backups Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Backups.
- **No Client-Side Pagination for Backups:** If the dataset grows large, do not fetch all Backups and paginate on the client. always implement robust server-side pagination, sorting, and filtering via query parameters using useSuperadminUrlState.


## API Contract
All calls are isolated to `superadmin_backups_api.ts`.

- `return apiFetch<ApiResponse<BackupRecord[]>>(`${BackupsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(BackupRecordSchema) });`
- `return apiFetch<ApiResponse<null>>(`${BackupsUrlConfig.BACKEND_API.BASE}/trigger`, {`
- `return apiFetch<ApiResponse<null>>(`${BackupsUrlConfig.BACKEND_API.BASE}/${id}/restore`, {`


## State Architecture
- Server State: TanStack Query
- UI State: React `useState` or Zustand
