# Admin Announcements — Feature Map

## Module Purpose
The Announcements module lets gym admins compose and broadcast notices to members, trainers,
and staff across their own branches. Admins can draft announcements with a title and body,
set a target audience (everyone, members only, trainers, staff), select which of their branches
to target, schedule a publish date, set an expiry, and optionally pin the announcement to the
top of the notice board. This is strictly an outbound communication tool — admins push
announcements, members receive them via the member app. Admins cannot receive announcements
here; that belongs in Notifications. Admins cannot target "All Gyms" (superadmin-only) or
"Managers" (cross-gym concern) — only their own branch audience.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `announcements_components/AdminAnnouncementsMain/` | Root client orchestrator — renders compose CTA banner, KPIs, table, and modal | `AdminAnnouncementsMain.tsx` |
| `announcements_components/AdminAnnouncementsKPIs/` | 6 stat cards: Total, Active, Scheduled, Expired, Total Views, Pinned | `AdminAnnouncementsKPIs.tsx` |
| `announcements_components/AdminAnnouncementsTable/` | Paginated table with search/filter toolbar, status/priority badges, pin/edit/delete row actions | `AdminAnnouncementsTable.tsx` |
| `announcements_components/AdminAnnouncementsModal/` | RHF + Zod compose/edit modal — branch-scoped gym selector, audience picker, schedule dates, pin toggle | `AdminAnnouncementsModal.tsx` |
| `announcements_context/` | TanStack Query + mutation logic, filter/pagination, openCreate/openEdit handlers | `useAdminAnnouncementsLogic.ts` |
| `announcements_store/` | Zustand store for search, filters, pagination, modal open state, editing item, form values | `useAdminAnnouncementsStore.ts` |
| `announcements_api/` | Mock API client — fetchAnnouncements, fetchKPIs, createAnnouncement, updateAnnouncement, deleteAnnouncement, togglePin | `announcements_api.ts` |
| `announcements_types/` | TypeScript types: Announcement, AnnouncementFormValues, AnnouncementKPIData, FetchState, status/priority/audience unions | `announcements_types.ts` |
| `announcements_utils/` | Zod schema, all option arrays (gym filter, compose gyms, audience, priority, status), mock data, empty form defaults | `AdminAnnouncementsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Send Branch Announcement | `/admin/announcements` | Compose a new notice targeting members/trainers/staff at selected branches, set priority, schedule publish + expiry, optionally pin | `AdminAnnouncementsMain` (CTA banner), `AdminAnnouncementsModal` | `POST /admin/announcements` | ✅ Live |
| Announcement List | `/admin/announcements` | View all announcements with search, status/priority/branch filters, pagination | `AdminAnnouncementsTable` | `GET /admin/announcements` | ✅ Live |
| Edit Announcement | `/admin/announcements` | Update title, body, audience, branches, schedule, priority, pin status | `AdminAnnouncementsModal` | `PATCH /admin/announcements/:id` | ✅ Live |
| Delete Announcement | `/admin/announcements` | Permanently delete with confirm dialog | `AdminAnnouncementsTable` (row action) | `DELETE /admin/announcements/:id` | ✅ Live |
| Pin / Unpin | `/admin/announcements` | Toggle pin status — pinned announcements always show at top of notice board | `AdminAnnouncementsTable` (row action) | `PATCH /admin/announcements/:id/pin` | ✅ Live |
| KPI Overview | `/admin/announcements` | See total, active, scheduled, expired counts + total views + pinned count | `AdminAnnouncementsKPIs` | `GET /admin/announcements/kpis` | ✅ Live |

## User Flows & Interactions

### Flow 1: Send a Branch Announcement
1. Admin clicks "Send Announcement" in the compose banner (top of page) or toolbar button
2. `AdminAnnouncementsModal` opens via `useAdminAnnouncementsStore.setShowModal(true)`
3. Admin fills: Title → Body → Priority → Audience (multi-select chips) → Target Branches (multi-select chips, branch-scoped only) → Publish date → Expiry date → Pin toggle
4. On submit, `saveAnnouncement(data)` calls `announcementsApi.createAnnouncement(payload)`
5. On success: modal closes, toast shown, TanStack Query cache invalidated for list + KPIs
6. On error: form preserves data, toast error shown

### Flow 2: Edit an Existing Announcement
1. Admin clicks the edit (pencil) icon on any table row
2. `openEdit(announcement)` populates the store form with existing values and opens modal
3. Admin modifies fields → submits → `announcementsApi.updateAnnouncement(id, payload)` called
4. On success: modal closes, list cache invalidated

### Flow 3: Delete an Announcement
1. Admin clicks the delete (trash) icon on a row
2. `useAdminConfirm` dialog appears: "Delete [title]? This cannot be undone."
3. On confirm: `announcementsApi.deleteAnnouncement(id)` called, list + KPI cache invalidated

## Data and State Architecture

- **State pattern:** Zustand for UI state (filters, modal, form) + TanStack Query for server state
- **Zustand store:** `useAdminAnnouncementsStore.ts` — holds: search, statusFilter, priorityFilter, gymFilter, currentPage, showModal, editingAnnouncement, form values
- **Query keys:** `['adminAnnouncements']`, `['adminAnnouncementsKPIs']`
- **Context providers:** None — logic hook `useAdminAnnouncementsLogic` is consumed directly by components
- **Local-storage keys:** None

## API Contract

All calls go through the module's `announcementsApi` client in `announcements_api/announcements_api.ts`.

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchAnnouncements()` | GET | `/admin/announcements` | — | `Announcement[]` |
| `fetchKPIs()` | GET | `/admin/announcements/kpis` | — | `AnnouncementKPIData` |
| `createAnnouncement(payload)` | POST | `/admin/announcements` | `AnnouncementFormValues` | `Announcement` |
| `updateAnnouncement(id, payload)` | PATCH | `/admin/announcements/:id` | `AnnouncementFormValues` | `Announcement` |
| `deleteAnnouncement(id)` | DELETE | `/admin/announcements/:id` | — | `void` |
| `togglePin(id)` | PATCH | `/admin/announcements/:id/pin` | — | `Announcement` |

## Permissions and Security

- **Required role:** `ADMIN` — enforced by `middleware.ts`
- **Branch scoping:** Admin can only target their own branches. `ANNOUNCEMENT_COMPOSE_GYM_OPTIONS` never includes "All Gyms" (superadmin-only). This is enforced at the constants level — the compose modal imports `ANNOUNCEMENT_COMPOSE_GYM_OPTIONS`, not `ANNOUNCEMENT_GYM_OPTIONS`.
- **Audience scoping:** "Managers" audience option is excluded — cross-gym manager targeting is superadmin-only.
- **Destructive actions:** Delete uses `useAdminConfirm()` with explicit warning message.
- **Cross-role isolation:** Zero imports from `/manager`, `/trainer`, `/superadmin`.

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking compose banner + 6 KPI cards + table | N/A | `error.tsx` — module-branded error with Retry button |
| Announcements table | `AdminTableSkeleton` (6 rows, 7 cols) while `fetchState === 'loading'` | Inline empty state with Megaphone icon + "Send First Announcement" CTA | Inline error card with danger icon |

## Edge Cases and AI Warnings

- **Never add "All Gyms" to `ANNOUNCEMENT_COMPOSE_GYM_OPTIONS`:** That option is superadmin-only. The compose modal uses `ANNOUNCEMENT_COMPOSE_GYM_OPTIONS` (branch list only). The filter toolbar uses `ANNOUNCEMENT_GYM_OPTIONS` (includes "All My Branches" for filtering). These are two separate constants — do not merge them.
- **Never add "Managers" back to `ANNOUNCEMENT_AUDIENCE_OPTIONS`:** Managers are a cross-gym concern managed by superadmin. Admin announcements target members, trainers, and staff at their own branches only.
- **`createdBy` must always be `'Admin'`:** The API client hardcodes this. Do not change it to `'Super Admin'` — that breaks the admin identity model.
- **Scheduled announcements run server-side:** The frontend only sends `publishedAt` as an ISO string. Never use `setTimeout` to trigger publish on the frontend.
- **Deletion is permanent:** The confirm dialog must use `useAdminConfirm()` — never `window.confirm()`.
- **All URLs must come from `AdminAnnouncementsUrlConfig`:** Never hardcode `/admin/announcements` strings in components or hooks.

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, component files under 300 lines
- [x] Rule 2: Total Role Isolation — zero cross-role imports
- [x] Rule 3: Hyper-descriptive naming — Admin prefix on all files
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX
- [x] Rule 5: Smart State Management — Zustand for UI state, TanStack Query for server state
- [x] Rule 6: Logic/UI Separation — `useAdminAnnouncementsLogic` hook extracts all logic
- [x] Rule 7: Type Isolation — all types in `announcements_types/`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component, `*Main.tsx` = Client
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: `announcements_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 15B: Modal form uses React Hook Form + Zod
- [x] Rule 26: `Loader2` spinner on submit button while saving
- [x] Rule 29: `motion-safe:` prefix on all transitions and animations
- [x] Rule 40: `announcements_forbidden.md` present
- [x] Rule 64: Mobile-first — `flex-col sm:flex-row` on toolbar
- [x] Rule 71: Delete uses `useAdminConfirm()` double-verification
- [x] Design §7: Primary buttons use `bg-primary text-black` (gold with black text)
- [x] Design §12: Modals at `z-40`, toasts at `z-50`
- [x] Design §28: Modal uses `bg-overlay` surface elevation token
- [x] Design §29: `motion-safe:` prefix on all transitions
