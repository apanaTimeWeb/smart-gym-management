# Admin Members — Feature Map

## Module Purpose
The Members module gives gym admins a comprehensive read-focused view of all gym members
across their branches. Admins can search, filter, and inspect member profiles including
subscription status, attendance summary, and payment history. Write operations (adding
members, renewals, recording payments) are strictly the Manager's responsibility — this
module is intentionally read-only for the Admin role. Admins can export the member list
for compliance and reporting purposes.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `members_components/AdminMembersMain/` | Root client orchestrator — renders KPIs, toolbar, table, and profile drawer | `AdminMembersMain.tsx` |
| `members_components/AdminMembersKPIs/` | 4 stat cards: Total Members, Active, Expired, Due Today | `AdminMembersKPIs.tsx` |
| `members_components/AdminMembersToolbar/` | Search input + status filter + branch filter + export button | `AdminMembersToolbar.tsx` |
| `members_components/AdminMembersTable/` | Paginated, clickable member rows with masked phone numbers and status badges | `AdminMembersTable.tsx` |
| `members_components/AdminMembersProfileDrawer/` | Slide-in drawer showing full member profile: personal info, plan, attendance, payment history | `AdminMembersProfileDrawer.tsx` |
| `members_components/AdminMembersEmptyState/` | Empty state when no members match filters | `AdminMembersEmptyState.tsx` |
| `members_api/` | API client for member list, member detail, export | `AdminMembersApi.ts` |
| `members_context/` | Data logic hook — fetches, filters, paginates, opens profile | `useAdminMembersLogic.ts` |
| `members_store/` | Zustand store for search, filters, pagination, selected member, drawer state | `useAdminMembersStore.ts` |
| `members_types/` | TypeScript interfaces for Member, MemberDetail, MemberStats | `AdminMembersTypes.ts` |
| `members_utils/` | Constants: status options, filter presets, table headers, status badge styles | `AdminMembersSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Member List | `/admin/members` | Browse paginated, searchable, filterable member directory with status badges | `AdminMembersTable`, `AdminMembersToolbar` | `GET /admin/members?page&limit&search&status&branchId` | ✅ Live |
| Member Profile | `/admin/members` | View full profile: personal info, active plan, attendance summary, payment history | `AdminMembersProfileDrawer` | `GET /admin/members/:id` | ✅ Live |
| KPI Overview | `/admin/members` | See total, active, expired, and due-today member counts | `AdminMembersKPIs` | `GET /admin/members/stats` | ✅ Live |
| Export Members | `/admin/members` | Download filtered member list as CSV | `AdminMembersToolbar` | `GET /admin/members/export` | ✅ Live |

## User Flows & Interactions

### Flow 1: Browse and Find a Member
1. Admin navigates to `/admin/members` — page loads with all members, default pagination
2. Admin types in search box (debounced 300ms) → table filters by name/phone
3. Admin selects a status filter (Active / Expired / Pending) → table re-fetches with filter param
4. Admin clicks any row → `AdminMembersProfileDrawer` slides in with full member detail

### Flow 2: View Member Profile
1. Admin clicks a member row — `selectedMemberId` set in `useAdminMembersStore`
2. `AdminMembersProfileDrawer` opens, fetches `GET /admin/members/:id`
3. Drawer shows: personal info, current plan, attendance summary, recent payments
4. Admin closes drawer via Escape key or close button — `selectedMemberId` cleared

### Flow 3: Export Member List
1. Admin applies desired filters (status, branch, date range)
2. Clicks "Export CSV" in toolbar → `exportMembers(filters)` called
3. Browser triggers file download via anchor with `download` attribute
4. Toast shows backend message on success or error

## Data and State Architecture

- **State pattern:** Zustand for UI state (filters, pagination, drawer) + TanStack Query for server state
- **Zustand store:** `useAdminMembersStore.ts` — holds: `search`, `statusFilter`, `branchFilter`, `currentPage`, `selectedMemberId`, `isDrawerOpen`
- **Query keys:** `['adminMembers', filters]`, `['adminMembers', 'detail', memberId]`, `['adminMembers', 'stats']`
- **Logic hook:** `useAdminMembersLogic.ts` — orchestrates queries, mutations, and store interactions
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

## API Contract

All calls go through `AdminMembersApi.ts`. Response envelope: `{ success, message, data: T | null, meta?: PaginationMeta }`

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchMembers(params)` | GET | `/admin/members` | `{ page, limit, search, status, branchId }` | `Member[]` + `PaginationMeta` |
| `fetchMemberById(id)` | GET | `/admin/members/:id` | — | `MemberDetail` |
| `fetchMemberStats()` | GET | `/admin/members/stats` | — | `MemberStats` |
| `exportMembers(filters)` | GET | `/admin/members/export` | `{ search, status, branchId }` | `Blob` (CSV) |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts` checking `gymsmart_token` cookie
- **Read-only enforcement:** Zero write operations. No Add, Edit, Renew, or Delete buttons exist anywhere in this module.
- **Sensitive data handling:** Phone numbers masked in list view via `maskSensitiveData()` from `@/lib/utils` (`98****2310` pattern). Full number visible only in `AdminMembersProfileDrawer`.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`. Enforced in `members_forbidden.md`.

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking 4 KPI cards + toolbar + 8 table rows | N/A | `error.tsx` — module-branded error with Retry button |
| Members table | Skeleton rows while query is loading | `AdminMembersEmptyState.tsx` — icon + contextual message + filter reset CTA | Inline error banner via TanStack Query `isError` |
| Profile drawer | Skeleton lines for personal info + plan + payment rows | N/A | Inline "Failed to load profile" with retry |

## Edge Cases and AI Warnings

- **Admins are strictly read-only:** Never add Add Member, Edit Member, Renew, Record Payment, or Delete buttons to this module. Those operations belong exclusively to the Manager role.
- **Phone masking applies to list view only:** `AdminMembersTable` uses `maskSensitiveData()`. `AdminMembersProfileDrawer` shows the full number. Do not add masking to the profile drawer.
- **Row click opens profile drawer — no View/Eye button:** The entire `<tr>` is clickable with `cursor-pointer`. Do not add a separate View icon button (Rule 19).
- **Server-side pagination is mandatory:** Never fetch all members and paginate client-side. Always pass `page` + `limit` to the API.
- **Export uses anchor download, not fetch streaming:** `exportMembers()` returns a URL or triggers a download link — do not use `fetch()` to stream CSV bytes without Blob handling.
- **`AdminMembersTypes.ts` is the canonical member type for this module:** Do not import `Member` or `Branch` types from other modules. Duplicate if needed (Rule 2).

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `AdminMembersMain.tsx` | Root client orchestrator. Renders KPIs, toolbar, table card, and profile drawer. No direct API calls. |
| `AdminMembersKPIs.tsx` | 4 read-only stat cards. Reads `stats` from logic hook. Pure display. |
| `AdminMembersToolbar.tsx` | Search + status filter + branch filter + export button. Writes to store. Calls `exportMembers` on export click. |
| `AdminMembersTable.tsx` | Paginated member rows. Row click sets `selectedMemberId` in store. Renders masked phone + status badge. |
| `AdminMembersProfileDrawer.tsx` | Slide-in drawer. Receives `memberId` from store, fetches own detail data. Shows full profile. |
| `AdminMembersEmptyState.tsx` | Empty state UI. Receives `hasFilters` prop to show contextual message with filter reset CTA. |

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, 300-line ceiling
- [x] Rule 2: Total Role Isolation — zero cross-role imports verified
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX
- [x] Rule 5: Smart State Management — Zustand for UI state, TanStack Query for server state
- [x] Rule 6: Logic/UI Separation — `useAdminMembersLogic` extracts all fetch/filter logic
- [x] Rule 7: Type Isolation — all types in `members_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component, `*Main.tsx` = Client
- [x] Rule 9: Loading/error/not-found — `loading.tsx` + `error.tsx` + `not-found.tsx` present
- [x] Rule 11: Centralized URL Config — `members_url_config.ts` present, no hardcoded URLs
- [x] Rule 13: Feature Map — this document
- [x] Rule 19: Clickable table rows — `cursor-pointer` on all `<tr>` elements, no View/Eye button
- [x] Rule 40: `members_forbidden.md` present and specific
- [x] Rule 43: Sensitive data masking — `maskSensitiveData()` used in list view
- [x] Rule 55: No `key={index}` on member rows
- [x] Rule 64: Mobile-first — responsive breakpoints on toolbar and table
