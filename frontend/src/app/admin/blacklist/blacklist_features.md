# Admin Blacklist — Feature Map

## Module Purpose
The Blacklist module allows gym admins to manage members who have been banned from one or more
branches. Admins can view the full consolidated blacklist across all branches, add new members
with a mandatory reason and scope (global or gym-specific), remove members when appropriate,
and — critically — **propagate a gym-specific ban to all branches in one click** via the
Cross-Branch View. Blacklisting a member immediately blocks their access to the affected
branches. This is a high-sensitivity operation requiring `useConfirm()` for add, remove, and
propagate actions.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `blacklist_components/AdminBlacklistMain/` | Root client orchestrator — renders KPIs, tab switcher, and conditionally the All Entries or Cross-Branch view | `AdminBlacklistMain.tsx` |
| `blacklist_components/AdminBlacklistTabs/` | Tab switcher between "All Entries" and "Cross-Branch View"; shows badge count of gym-specific bans | `AdminBlacklistTabs.tsx` |
| `blacklist_components/AdminBlacklistKPIs/` | 4 stat cards: Total Blacklisted, Global Bans, Gym-Specific Bans, Added This Month | `AdminBlacklistKPIs.tsx` |
| `blacklist_components/AdminBlacklistToolbar/` | Search input + Scope filter + Gym filter + "Blacklist Member" CTA | `AdminBlacklistToolbar.tsx` |
| `blacklist_components/AdminBlacklistTable/` | Paginated table of all blacklist entries with toggle and remove actions | `AdminBlacklistTable.tsx` |
| `blacklist_components/AdminBlacklistCrossGymView/` | Consolidated view of gym-specific bans only; "Propagate to All" upgrades to global ban | `AdminBlacklistCrossGymView.tsx` |
| `blacklist_components/AdminBlacklistModal/` | RHF+Zod form to add a member to the blacklist — scope selector, gym chips | `AdminBlacklistModal.tsx` |
| `blacklist_components/AdminBlacklistEmptyState/` | Empty state shown when table has zero rows | `AdminBlacklistEmptyState.tsx` |
| `blacklist_api/` | Mock API with full CRUD + propagate | `blacklist_api.ts` |
| `blacklist_context/` | Business logic hook — queries, mutations, filtered/paginated data | `useAdminBlacklistLogic.ts` |
| `blacklist_store/` | Zustand store — activeTab, modal, search, filters, pagination | `useAdminBlacklistStore.ts` |
| `blacklist_types/` | TypeScript types: `BlacklistedMember`, `BlacklistFormValues`, `BlacklistKPIData`, `FetchState`, `BlacklistScope` | `blacklist_types.ts` |
| `blacklist_utils/` | Constants, Zod schema, mock data, tab options | `AdminBlacklistSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| All Entries Table | `/admin/blacklist` (tab: All Entries) | View all blacklisted members with search, scope filter, gym filter, pagination; toggle active/inactive; remove | `AdminBlacklistTable`, `AdminBlacklistToolbar` | `GET /admin/blacklist` | ✅ Live |
| Add to Blacklist | `/admin/blacklist` | Blacklist a member — fill ID, name, phone, email, reason, scope (global/specific), gym chips | `AdminBlacklistModal` | `POST /admin/blacklist` | ✅ Live |
| Remove from Blacklist | `/admin/blacklist` | Restore a member's access — requires `useConfirm()` | `AdminBlacklistTable` | `DELETE /admin/blacklist/:id/remove` | ✅ Live |
| Toggle Active Status | `/admin/blacklist` | Temporarily deactivate/reactivate a ban without deleting it | `AdminBlacklistTable` | `PATCH /admin/blacklist/:id` | ✅ Live |
| Cross-Branch View | `/admin/blacklist` (tab: Cross-Branch View) | See all gym-specific bans consolidated in one table; identify members banned at only some branches | `AdminBlacklistCrossGymView`, `AdminBlacklistTabs` | `GET /admin/blacklist` (filtered client-side) | ✅ Live |
| Propagate to All Branches | `/admin/blacklist` (Cross-Branch View) | Upgrade a gym-specific ban to a global ban across all branches — requires `useConfirm()` | `AdminBlacklistCrossGymView` | `PATCH /admin/blacklist/:id/propagate` | ✅ Live |

## User Flows & Interactions

### Flow 1: View Cross-Branch Consolidated Blacklist
1. Admin navigates to `/admin/blacklist`
2. Clicks "Cross-Branch View" tab in `AdminBlacklistTabs` — badge shows count of gym-specific bans
3. `AdminBlacklistCrossGymView` renders — shows only `scope === 'specific'` active entries
4. Warning banner explains how many gym-specific bans exist and what "Propagate to All" does
5. Each row shows which branches the ban applies to as colored chips

### Flow 2: Propagate a Gym-Specific Ban to All Branches
1. Admin is in Cross-Branch View, sees a member banned at only "Powai" branch
2. Clicks "Propagate to All" button on that row
3. `useConfirm()` dialog opens: "Upgrade [Name]'s gym-specific ban to a GLOBAL ban? This will block them from every branch immediately."
4. Admin confirms → `propagateToAllBranches(id)` called → `PATCH /admin/blacklist/:id/propagate`
5. On success: toast "Ban propagated to all branches", query cache invalidated, entry disappears from Cross-Branch View (now global)

### Flow 3: Add a New Blacklist Entry
1. Admin clicks "Blacklist Member" in toolbar
2. `AdminBlacklistModal` opens — fills member ID, name, phone, email, reason
3. Selects scope: "Global (All Gyms)" or "Specific Gyms" → gym chips appear for specific
4. Submits → `addToBlacklist(payload)` → `POST /admin/blacklist`
5. On success: modal closes, table refreshes, toast shown

## Data and State Architecture

- **State pattern:** Zustand for UI state (activeTab, modal, filters, pagination) + TanStack Query for server state
- **Zustand store:** `useAdminBlacklistStore.ts` — holds: `activeTab`, `showModal`, `form`, `search`, `scopeFilter`, `gymFilter`, `currentPage`
- **TanStack Query keys:** `['adminBlacklist']`, `['adminBlacklistKPIs']`
- **Cross-branch data:** Derived client-side in `useAdminBlacklistLogic` as `gymSpecificEntries = data.filter(m => m.scope === 'specific' && m.isActive)` — no separate API call needed
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `blacklistApi` in `blacklist_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchBlacklist()` | GET | `/admin/blacklist` | — | `BlacklistedMember[]` |
| `fetchKPIs()` | GET | `/admin/blacklist/kpis` | — | `BlacklistKPIData` |
| `addToBlacklist(dto)` | POST | `/admin/blacklist` | `BlacklistFormValues` | `BlacklistedMember` |
| `removeFromBlacklist(id)` | DELETE | `/admin/blacklist/:id/remove` | — | `null` |
| `toggleBlacklist(id)` | PATCH | `/admin/blacklist/:id` | — | `BlacklistedMember` |
| `propagateToAllBranches(id)` | PATCH | `/admin/blacklist/:id/propagate` | — | `BlacklistedMember` (scope upgraded to `global`) |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Destructive actions and their guards:**
  - Add to blacklist → `useConfirm()` not required (form modal is the confirmation)
  - Remove from blacklist → `useConfirm()` with message "Remove [Name] from the blacklist? They will regain access to assigned gyms."
  - Propagate to all branches → `useConfirm()` with message "Upgrade [Name]'s gym-specific ban to a GLOBAL ban? This will block them from every branch immediately."
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking KPI cards + toolbar + table | N/A | `error.tsx` — module-branded error with Retry |
| All Entries table | `AdminTableSkeleton` (5 rows, 8 cols) | `AdminBlacklistEmptyState.tsx` — icon + "No blacklisted members" | Inline via TanStack Query `isError` |
| Cross-Branch View | `AdminTableSkeleton` (4 rows, 7 cols) | Inline empty state — globe icon + "No gym-specific bans" message | Shared with main query |

## Edge Cases and AI Warnings

- **Propagate is irreversible:** Once a gym-specific ban is upgraded to global, it cannot be downgraded back to specific via the UI. The confirm dialog must make this clear. Do not soften the warning.
- **Cross-Branch View is client-side filtered:** `gymSpecificEntries` is derived from the same `['adminBlacklist']` query — do NOT add a separate API call for it. The filter is `scope === 'specific' && isActive`.
- **Tab badge count uses `gymSpecificEntries.length`:** This is passed from `useAdminBlacklistLogic` to `AdminBlacklistTabs` via the hook — do not re-derive it in the tab component.
- **`propagating` flag disables all "Propagate to All" buttons simultaneously:** Since `propagateMutation.isPending` is a single boolean, all buttons disable while any propagation is in flight. This is intentional to prevent double-propagation.
- **Scope badge colors:** Global = `bg-danger-bg text-danger`, Gym-specific = `bg-warning-bg text-warning`. Never inline these — they live in `AdminBlacklistTable.tsx` and `AdminBlacklistCrossGymView.tsx` using design system tokens.
- **`assignedGymNames` must be resolved at write time:** When `addToBlacklist` is called, gym names are resolved from `BLACKLIST_GYM_OPTIONS` in the API layer — not stored as raw IDs. The `propagateToAllBranches` API sets `assignedGymNames: ['All Gyms']`.

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminBlacklistMain.tsx` | Root orchestrator. Reads `activeTab` from logic hook, conditionally renders All Entries or Cross-Branch view. No direct API calls. |
| `AdminBlacklistTabs.tsx` | Tab switcher UI. Reads `activeTab` + `gymSpecificEntries.length` from logic hook. Calls `setActiveTab`. |
| `AdminBlacklistKPIs.tsx` | 4 read-only stat cards. Reads `kpis` from logic hook. |
| `AdminBlacklistToolbar.tsx` | Search + filters + "Blacklist Member" CTA. Reads/writes store directly for filters; calls `openAdd()` from logic hook. |
| `AdminBlacklistTable.tsx` | Paginated table of all entries. Calls `toggleBlacklist` and `removeFromBlacklist` from logic hook. |
| `AdminBlacklistCrossGymView.tsx` | Consolidated gym-specific bans table. Calls `propagateToAllBranches` and `removeFromBlacklist`. Shows warning banner with count. |
| `AdminBlacklistModal.tsx` | RHF+Zod add form. Calls `saveBlacklist` on submit. Scope toggle shows/hides gym chips. |
| `AdminBlacklistEmptyState.tsx` | Empty state for the All Entries table. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, file size ceiling respected
- [x] Rule 2: Total Role Isolation — zero cross-role imports verified
- [x] Rule 3: Hyper-descriptive naming — role prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX
- [x] Rule 5: Smart State Management — Zustand for UI state, TanStack Query for server state
- [x] Rule 6: Logic/UI Separation — `useAdminBlacklistLogic` extracts all logic
- [x] Rule 7: Type Isolation — all types in `blacklist_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: `blacklist_url_config.ts` present with propagate endpoint
- [x] Rule 13: This document
- [x] Rule 40: `blacklist_forbidden.md` present
- [x] Rule 71: Remove and Propagate both use `useConfirm()`
- [x] Rule 72: API functions follow verb contract (`propagateToAllBranches`)
