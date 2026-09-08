# Superadmin Migrations — Feature Map

## Module Purpose
The Migrations module is the database schema rollout control panel for the GymSmart SaaS platform.
Superadmins use it to track which schema versions have been applied across all tenant instances,
trigger new schema deployments, and diagnose failed migrations. Because GymSmart uses a
database-per-tenant architecture, every schema change must be rolled out to potentially hundreds
of individual tenant databases. This module provides visibility into that rollout status and
an emergency mechanism to re-trigger failed deployments. It is strictly read-and-trigger only —
no manual SQL editing is permitted from the UI.

---

## Directory Structure

| Folder / File | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point. Sets page metadata. Renders `SuperadminMigrationsClient`. | — |
| `loading.tsx` | Structural skeleton — 3 card ghost rows with `motion-safe:animate-pulse` | — |
| `error.tsx` | Module-level error boundary with `reset()` retry button | — |
| `migrations_components/` | All client UI for the migrations page | `SuperadminMigrationsClient.tsx` |
| `migrations_utils/` | Module constants — mock migration data for dev/fallback | `SuperadminMigrationsConstants.ts` |
| `superadmin_migrations_api/` | API client for fetching migration logs and triggering deployments | `superadmin_migrations_api.ts` |
| `superadmin_migrations_types/` | TypeScript types for `MigrationLog`, `MigrationStatus` | `superadmin_migrations_types.ts` |

---

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Migration Log Table | `/superadmin/migrations` | View all schema versions with status (PENDING / IN_PROGRESS / COMPLETED / FAILED / ROLLED_BACK), target tenant scope, applied date, and error log | `SuperadminMigrationsClient` | `GET /superadmin/migrations` | ✅ Live (mock fallback active) |
| Deploy New Schema | `/superadmin/migrations` | Trigger a new schema rollout across all active tenant instances | `SuperadminMigrationsClient` (Deploy button) | `POST /superadmin/migrations/trigger` | ⚠️ Stub (simulated locally) |
| Error Log Inspect | `/superadmin/migrations` | View inline error log for FAILED migrations | `SuperadminMigrationsClient` (inline row) | — (data from GET response) | ✅ Live |

---

## User Flows & Interactions

### Flow 1: View Migration History
1. Superadmin opens `/superadmin/migrations`
2. `useQuery(['superadmin', 'migrations'])` fires `migrationsApi.fetchMigrations()`
3. If API returns data, the migration log table populates with real records
4. If API returns empty / is unavailable, `MOCK_MIGRATIONS` from `SuperadminMigrationsConstants.ts` is used as a fallback
5. FAILED rows show an inline `AlertTriangle` icon and the `errorLog` text below the description

### Flow 2: Trigger a Schema Deployment
1. Superadmin clicks **"Deploy New Schema"**
2. `handleRollout(version)` fires in `SuperadminMigrationsClient`
3. A new `MigrationLog` row is optimistically prepended with `status: 'IN_PROGRESS'`
4. `migrationsApi.triggerMigration(version, targetTenants)` is called
5. On success: toast shows backend `message`; TanStack Query invalidates `['superadmin', 'migrations']`
6. On error: the optimistic row must be removed or updated to `status: 'FAILED'`

> ⚠️ **Current stub status:** `migrationsApi.triggerMigration` resolves locally without hitting
> the backend. The `handleRollout` handler uses a `setTimeout` to simulate completion.
> Real API wiring is required before production.

---

## Data and State Architecture

- **State pattern:** TanStack Query for server state. Local `useState` for the migration list during optimistic updates.
- **TanStack Query keys:**
  - `['superadmin', 'migrations']` — migration log list
- **Zustand stores:** None
- **Context providers:** Inherits `SuperadminQueryProvider` and `SuperadminConfirmProvider` from root layout
- **Local state:** `migrations: MigrationLog[]` in `SuperadminMigrationsClient` — managed via `useState` and synced from query data via `useEffect`
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured — `src/mocks/handlers/superadmin-migrations.handlers.ts` (planned)

---

## API Contract

All calls go through `apiFetch` at `@/lib/api` (when wired). Response envelope: `{ success, message, data: T | null }`

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `migrationsApi.fetchMigrations()` | GET | `/superadmin/migrations` | — | `MigrationLog[]` |
| `migrationsApi.triggerMigration(version, targetTenants)` | POST | `/superadmin/migrations/trigger` | `{ version: string, targetTenants: string }` | `null` (fire-and-forget) |

Also accessible via the central client:
- `superadminApi.migrations.fetchMigrations(params?)` → `GET /superadmin/migrations?{params}`

---

## TypeScript Types

Defined in `superadmin_migrations_types/superadmin_migrations_types.ts`:

```ts
export type MigrationStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'ROLLED_BACK';

export interface MigrationLog {
  id: string;
  version: string;
  description: string;
  appliedAt: string | null;       // ISO 8601 UTC — null if not yet applied
  status: MigrationStatus;
  targetTenants: string;          // e.g. 'ALL', 'V1.4_ONLY', 'ALL_ACTIVE'
  durationMs: number | null;      // null while IN_PROGRESS or PENDING
  errorLog: string | null;        // populated only on FAILED status
}
```

---

## Permissions and Security

- **Required role:** `SUPERADMIN` — enforced by `middleware.ts`
- **Trigger action guard:** Deploying a new schema affects ALL tenant databases simultaneously. The "Deploy New Schema" button MUST use `useConfirm()` with a message explicitly stating: *"This will apply the schema change to all active tenant databases. This cannot be undone. Continue?"*
- **No SQL editing allowed:** The UI must never expose a raw SQL input. Only pre-defined versioned migrations managed by the backend are permitted.
- **Cross-role isolation:** Zero imports from `/admin`, `/manager`, `/trainer`.

---

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — 3 ghost card rows with `bg-skeleton-base` + `motion-safe:animate-pulse` | N/A | `error.tsx` — module-branded error with "Try Again" calling `reset()` |
| Migrations table | Inline skeleton when `fetchState === 'loading'` | Centered `Database` icon + "No schema rollouts found." message (inline in `<tbody>`) | TanStack Query `isError` — show error message in table area |

---

## Edge Cases and AI Warnings

- **`triggerMigration` is currently a stub.** `superadmin_migrations_api.ts` resolves with a mock response without calling `apiFetch`. Before production, replace the mock `Promise.resolve` with a real `apiFetch` call to `POST /superadmin/migrations/trigger`. Do NOT leave the stub in production.
- **Optimistic UI for IN_PROGRESS must be cleaned up on error.** `handleRollout` currently prepends an `IN_PROGRESS` row optimistically and resolves it via `setTimeout`. When wired to a real API, the optimistic row must be removed or marked `FAILED` if the API call throws. Do not leave dangling ghost rows.
- **`MOCK_MIGRATIONS` is a dev fallback only.** The query falls back to mock data when the API returns empty. Gate this with `process.env.NODE_ENV === 'development'` before production release.
- **Schema deploy affects ALL tenants — never soften the confirm dialog.** The `useConfirm()` message must explicitly say "all active tenant databases". An AI agent MUST NOT change this to a generic "Are you sure?" prompt.
- **`appliedAt` is UTC ISO 8601 — always display in local time.** Use `date-fns` or `dayjs` to convert before rendering. Never render raw `mig.appliedAt` directly.
- **`MigrationStatus` is a string union, not an enum.** The `getStatusBadge` helper in `SuperadminMigrationsClient` uses a `switch` statement. Adding a new status requires updating the switch AND the `MigrationStatus` type simultaneously.
- **Status badge uses inline `switch` in the client component.** This violates Rule 3B (magic values should live in constants). Move `MIGRATION_STATUS_BADGE_STYLES` to `SuperadminMigrationsConstants.ts` when refactoring.
- **`size={18} strokeWidth={2}` on all Lucide icons.** The current client uses varied sizes (`size={14}` in status badges, `size={32}` in empty state). Standardize to `size={18}` per Design §9a.

---

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `SuperadminMigrationsClient.tsx` | Root client orchestrator. Fetches migration list via TanStack Query. Manages local `migrations` state for optimistic updates. Renders toolbar + table + status badges. Handles `handleRollout` action. |
| `SuperadminMigrationsConstants.ts` | `MOCK_MIGRATIONS` dev fallback data. Move status badge styles here when refactoring. |
| `superadmin_migrations_api.ts` | API client — `fetchMigrations()` (GET) and `triggerMigration()` (POST stub). Both methods need real `apiFetch` wiring before production. |
| `superadmin_migrations_types.ts` | `MigrationLog` interface + `MigrationStatus` union type. |

---

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — subfolders with module prefix
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — `SuperadminMigrations*` prefix
- [x] Rule 7: Type isolation — `MigrationLog`, `MigrationStatus` in `superadmin_migrations_types.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` is Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: URL config — `SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE` in API client
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `migrations_forbidden.md` present
- [ ] Rule 3B: Status badge styles are inline in the component — move to `SuperadminMigrationsConstants.ts`
- [ ] Rule 6: Logic/UI not fully separated — `handleRollout` and `getStatusBadge` live inside the Client Component; extract to `useSuperadminMigrationsPage.ts`
- [ ] Rule 14: `triggerMigration` stub uses a hardcoded success toast — wire to real `res.message`
- [ ] Rule 15A: No test files present
- [ ] Rule 26: "Deploy New Schema" button has no loading state (spinner) while the mutation is pending
- [ ] Rule 71: `handleRollout` fires immediately on click — add `useConfirm()` before deployment
- [ ] Rule 75: MSW handler not yet configured
