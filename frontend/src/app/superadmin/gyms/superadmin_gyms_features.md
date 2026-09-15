# Superadmin Gyms — Feature Map

## Module Purpose
The Gyms module is the master tenant registry for the GymSmart SaaS platform. Superadmins
use it to onboard new gym branches, view all active/suspended tenants, manage their
subscription plan, and trigger Ghost Login (tenant impersonation) to inspect any gym's
admin dashboard directly. It is the entry point for all tenant lifecycle operations:
create → activate → suspend → reactivate → delete. Ghost Login is the primary support
tool — it issues a short-lived impersonation JWT, sets it as a session cookie, and
redirects the superadmin into the target gym's `/admin/dashboard` with a sticky banner
visible at all times so they can exit back cleanly.

---

## Directory Structure

| Folder / File | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point. Sets page metadata. Renders `SuperadminGymsClient`. | — |
| `loading.tsx` | Structural skeleton — 5-row table ghost layout with `motion-safe:animate-pulse` | — |
| `error.tsx` | Module-level error boundary with `reset()` retry button | — |
| `gyms.css` | Module-scoped CSS overrides (scrollbar, table hover) | — |
| `add/` | Nested route for the multi-step gym onboarding wizard | `page.tsx`, `SuperadminAddGymForm/` |
| `gyms_components/SuperadminGymsClient.tsx` | Root Client Component. Renders toolbar + table. No API calls — delegates to hook. | `SuperadminGymsClient.tsx` |
| `gyms_components/SuperadminGymsToolbar/` | Search input + status filter dropdown (ALL / ACTIVE / SUSPENDED / TRIAL). State in Zustand. | `SuperadminGymsToolbar.tsx` |
| `gyms_components/SuperadminGymsTable/` | Paginated tenant table. Consumes `useSuperadminGymsTable`. Renders all modals. | `SuperadminGymsTable.tsx`, `useSuperadminGymsTable.ts` |
| `gyms_components/SuperadminAddGymForm/` | Multi-step form for onboarding a new gym tenant | `SuperadminAddGymForm.tsx` |
| `gyms_components/SuperadminGymEditModal/` | Edit gym details inline — name, plan, status | `SuperadminGymEditModal.tsx` |
| `gyms_components/SuperadminGymDeleteModal/` | Type-to-confirm "DELETE" destructive modal | `SuperadminGymDeleteModal.tsx` |
| `gyms_components/SuperadminGymWhatsappModal/` | Compose and send a WhatsApp message to the gym owner | `SuperadminGymWhatsappModal.tsx` |
| `gyms_components/SuperadminGymsEmptyState/` | Empty state shown when 0 gyms match the active filter | `SuperadminGymsEmptyState.tsx` |
| `gyms_store/` | Zustand store for UI-only modal state and filter values | `useSuperadminGymsStore.ts` |
| `gyms_utils/` | Constants (plan colors, page size, status labels, mock data) + Zod validation schemas | `SuperadminGymsConstants.ts`, `SuperadminGymsValidationSchemas.ts` |
| `superadmin_gyms_api/` | Modularized API client — all gym CRUD + impersonation + email owner | `superadmin_gyms_api.ts` |
| `superadmin_gyms_types/` | TypeScript interfaces for `Tenant`, `TenantStatus`, `FetchState` | `superadmin_gyms_types.ts` |

---

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Gym List | `/superadmin/gyms` | View paginated table of all tenant gyms with search and status filter | `SuperadminGymsClient`, `SuperadminGymsToolbar`, `SuperadminGymsTable` | `GET /superadmin/gyms-list?search&status` | ✅ Live |
| Onboard New Gym | `/superadmin/gyms/add` | Multi-step form: gym details → owner account → plan selection | `SuperadminAddGymForm` | `POST /superadmin/gyms-list` | ✅ Live |
| Edit Gym | `/superadmin/gyms` (inline) | Update gym name, plan tier, contact details | `SuperadminGymEditModal` | `PATCH /superadmin/gyms-list/:id` | ✅ Live |
| Suspend / Reactivate | `/superadmin/gyms` (inline) | Toggle gym status ACTIVE ↔ SUSPENDED. Single-click with loading state. | `useSuperadminGymsTable` (suspendMutation) | `PATCH /superadmin/gyms-list/:id/status` | ✅ Live |
| Delete Gym | `/superadmin/gyms` (modal) | Permanent deletion — type "DELETE" to confirm | `SuperadminGymDeleteModal` | `DELETE /superadmin/gyms-list/:id` | ✅ Live |
| Ghost Login | `/superadmin/gyms` → `/admin/dashboard` | Impersonate tenant admin — issues JWT, sets cookie, redirects to admin shell with exit banner | `useSuperadminGymsTable` (impersonateMutation), `SuperadminGhostLoginBanner` | `POST /superadmin/gyms-list/:id/impersonate` | ✅ Live |
| WhatsApp Owner | `/superadmin/gyms` (modal) | Compose and send a WhatsApp message to the gym owner directly from the dashboard | `SuperadminGymWhatsappModal` | External WhatsApp deep-link or `POST /superadmin/gyms-list/:id/email` | ✅ Live |
| Email Owner | `/superadmin/gyms` (inline) | Send a direct email to the gym owner | `useSuperadminGymsTable` | `POST /superadmin/gyms-list/:id/email` | ✅ Live |
| Search + Filter | `/superadmin/gyms` | Filter by gym name / owner name (client-side debounced) and status | `SuperadminGymsToolbar`, `useSuperadminGymsStore` | — (client-side filter on cached query data) | ✅ Live |

---

## User Flows & Interactions

### Flow 1: Ghost Login (Tenant Impersonation)
1. Superadmin hovers a gym row → action buttons appear (`opacity-100 lg:opacity-0 lg:group-hover:opacity-100`)
2. Superadmin clicks the **LogIn icon** button → `onGhostLoginClick(e, gymId, gymName)` in `useSuperadminGymsTable`
3. `impersonateMutation` fires: `POST /superadmin/gyms-list/:id/impersonate` → returns `{ token: string }`
4. On success: frontend POSTs to `AuthUrlConfig.PROXY_API.SET_COOKIE` to write the token as an HTTP-only cookie
5. `startGhostLogin({ id, name, plan, adminEmail })` is called on `useSuperadminGhostLoginStore` — populates the sticky banner
6. Hard redirect: `window.location.href = AuthUrlConfig.PAGES.ADMIN_DASHBOARD` (`/admin/dashboard`)
7. Superadmin is now inside the target gym's admin shell. `SuperadminGhostLoginBanner` is visible at the top of every superadmin page (rendered by `SuperadminLayout.tsx`)
8. Superadmin clicks **"Exit Ghost Login"** on the banner → `exitGhostLogin()` clears `ghostTenant` state and hard-redirects to `/superadmin/gyms`

### Flow 2: Suspend a Gym
1. Superadmin hovers gym row → clicks the **Ban icon** button
2. `onSuspendClick(e, gymId, gymName, currentStatus)` — determines new status (`ACTIVE` → `SUSPENDED`)
3. `suspendMutation` fires: `PATCH /superadmin/gyms-list/:id/status { status: 'SUSPENDED' }`
4. On success: TanStack Query invalidates `['superadmin', 'gyms']` → table re-fetches
5. Row status badge updates to red "Suspended". Button icon switches to `PlayCircle` (reactivate)

### Flow 3: Delete a Gym
1. Superadmin clicks **Trash icon** → `openDeleteModal(gym)` in `useSuperadminGymsStore`
2. `SuperadminGymDeleteModal` opens — shows gym name + warning text
3. User must type **"DELETE"** into the input field to enable the confirm button (type-to-confirm, Rule 71)
4. On confirm: `DELETE /superadmin/gyms-list/:id` → TanStack Query invalidates + row disappears

### Flow 4: Onboard a New Gym
1. Superadmin clicks **"Onboard New Gym"** → navigates to `/superadmin/gyms/add`
2. `SuperadminAddGymForm` renders a multi-step form (details → owner account → plan)
3. On final submit: `POST /superadmin/gyms-list` → on success, navigate back to `/superadmin/gyms`

---

## Data and State Architecture

- **State pattern:** TanStack Query for server state + Zustand for UI-only state (modals, filter values)
- **TanStack Query keys:**
  - `['superadmin', 'gyms']` — paginated gym list (staleTime: 60s via `SuperadminQueryProvider`)
  - `['superadmin', 'gyms', gymId]` — individual gym detail (fetched on-demand)
- **Zustand store:** `useSuperadminGymsStore.ts` — holds: `search`, `statusFilter`, `selectedGym`, `gymToDelete`, `isEditModalOpen`, `isWhatsappModalOpen`, `isDeleteModalOpen`
- **Ghost login store:** `useSuperadminGhostLoginStore.ts` (in `superadmin_components/SuperadminLayout/`) — holds: `ghostTenant: GhostTenant | null`. Separate from the gyms store — mounted at the layout level so the banner persists across route changes.
- **Local state:** `currentPage` in `SuperadminGymsTable.tsx` (resets on filter change)
- **Local-storage keys:** None
- **MSW handler file:** Not yet configured

---

## API Contract

All calls go through `apiFetch` at `@/lib/api`. Response envelope: `{ success, message, data: T | null }`

| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchGyms(params?)` | GET | `/superadmin/gyms-list` | `{ search?, status? }` | `Tenant[]` |
| `fetchGymById(id)` | GET | `/superadmin/gyms-list/:id` | — | `Tenant` |
| `createGym(body)` | POST | `/superadmin/gyms-list` | `Partial<Tenant>` | `Tenant` |
| `updateGym(id, body)` | PATCH | `/superadmin/gyms-list/:id` | `Partial<Tenant>` | `Tenant` |
| `changeGymStatus(id, status)` | PATCH | `/superadmin/gyms-list/:id/status` | `{ status: string }` | `Tenant` |
| `impersonateTenant(id)` | POST | `/superadmin/gyms-list/:id/impersonate` | — | `{ token: string }` |
| `deleteGym(id)` | DELETE | `/superadmin/gyms-list/:id` | — | `void` |
| `fetchGymStats()` | GET | `/superadmin/gyms-list/stats` | — | `unknown` (to be typed) |
| `emailGymOwner(id, body)` | POST | `/superadmin/gyms-list/:id/email` | `{ subject, message }` | `void` |

Both `superadmin_gyms_api.ts` (module-scoped) and `superadmin_api.ts` (central client `superadminApi.gyms.*`) define identical methods. Prefer the module-scoped file inside the gyms module; the central client is used by cross-module consumers (e.g., `useSuperadminInvoicesStore`).

---

## Permissions and Security

- **Required role:** `SUPERADMIN` — enforced by `middleware.ts` checking the session cookie
- **Ghost Login guards:** `impersonateTenant` requires `SUPERADMIN` role server-side. The issued token is scoped to `ADMIN` role for the target tenant only. The cookie is HTTP-only.
- **Destructive actions:**
  - Delete gym → `SuperadminGymDeleteModal` requires typing `"DELETE"` to enable the confirm button
  - Suspend gym → single-click (no extra confirm), but status is reversible via reactivate
- **Sensitive data:** Gym owner phone numbers use `maskSensitiveData()` in the list view
- **Cross-role isolation:** Zero imports from `/admin`, `/manager`, `/trainer`. `gyms_forbidden.md` enforces this.

---

## Loading, Empty, and Error States

| Section | Loading State | Empty State | Error State |
|---|---|---|---|
| Full page | `loading.tsx` — skeleton mimicking toolbar + 5-row table with ghost cells | N/A | `error.tsx` — module-branded error card with "Try Again" button calling `reset()` |
| Gyms table | Inline skeleton (7 columns × 5 rows) rendered in `SuperadminGymsTable.tsx` when `fetchState === 'loading'` | `SuperadminGymsEmptyState.tsx` — icon + "No gyms found" message. If filtered: "No gyms match your search". | Inline `text-danger` message centered in the table area |
| Action buttons | `Loader2` spinner replaces all action buttons for the row where `actionLoadingId === gym.id` | N/A | Toast error from `useSuperadminGymsTable` onError handlers |

---

## Edge Cases and AI Warnings

- **Delete is permanent and irreversible.** `SuperadminGymDeleteModal` MUST use the type-to-confirm pattern with exact string `"DELETE"`. Never use `window.confirm()` — it is blocked in iframes and breaks the design system. Never soften the warning message.
- **Ghost Login sets a real HTTP-only cookie.** Failure to call `AuthUrlConfig.PROXY_API.SET_COOKIE` after impersonation will result in the superadmin landing on `/admin/dashboard` with no valid session and being immediately redirected to login. The `try/catch` around the cookie call must be preserved — it is intentionally non-fatal but the error should be logged.
- **`exitGhostLogin` uses `window.location.href`, not `router.push`.** This is intentional — a hard redirect ensures a full session reset, clearing any admin-role state that was loaded during the impersonation session. Do not replace it with Next.js router navigation.
- **`GYMS_PLAN_COLORS` is the single source of truth for plan badge styling.** Never inline badge color classes in JSX. `SuperadminGymsTable.tsx` uses `getPlanBadgeClasses(gym.plan)` which reads from this constant. Adding a new plan tier requires only a new key in `SuperadminGymsConstants.ts`.
- **`MOCK_GYMS` is a development fallback only.** It is used when the API returns an empty array (not an error). This means a truly empty tenant list will display mock data in development. Remove or gate this fallback behind `process.env.NODE_ENV === 'development'` before production release.
- **Client-side filtering is a temporary fallback.** `useSuperadminGymsTable` filters `search` and `statusFilter` client-side on the cached TanStack Query result. Server-side filtering via query params must be implemented when the dataset exceeds ~200 gyms.
- **`gymId` is a UUID, not a sequential integer.** Never use array index as a row key. `key={gym.id}` is mandatory.
- **Status toggle is a single-click action.** Unlike delete, suspend/reactivate has no confirmation modal. If product requirements change to require a reason for suspension, add a `SuperadminGymSuspendModal` and update this flow.

---

## Component Responsibility Map

| Component File | Responsibility |
|---|---|
| `SuperadminGymsClient.tsx` | Root client orchestrator. Renders toolbar + table card. No API calls. No local state beyond layout. |
| `SuperadminGymsToolbar.tsx` | Search input (debounced 300ms) + status filter dropdown. Writes to `useSuperadminGymsStore`. |
| `SuperadminGymsTable.tsx` | Renders paginated rows. Manages `currentPage` state. Mounts all modals. Consumes `useSuperadminGymsTable`. |
| `useSuperadminGymsTable.ts` | All data fetching (TanStack Query), impersonation mutation, suspend mutation, action handlers. No JSX. |
| `SuperadminGymEditModal.tsx` | Edit gym details form. Reads `selectedGym` from Zustand. Calls `updateGym()`. Closes on success. |
| `SuperadminGymDeleteModal.tsx` | Type-to-confirm deletion modal. Calls `deleteGym()`. Requires exact string "DELETE" before enabling confirm. |
| `SuperadminGymWhatsappModal.tsx` | Compose WhatsApp message to gym owner. Reads `selectedGym` from Zustand. |
| `SuperadminGymsEmptyState.tsx` | Empty state UI for zero-result queries. Shows icon + message + optional "Onboard First Gym" CTA. |
| `SuperadminAddGymForm.tsx` | Multi-step onboarding form. Lives at `/superadmin/gyms/add`. Calls `createGym()`. |
| `useSuperadminGymsStore.ts` | Zustand store for modal visibility, selected gym, and filter values. Pure UI state — no API data. |
| `SuperadminGymsConstants.ts` | `GYMS_PLAN_COLORS`, `GYMS_STATUS_LABELS`, `GYMS_TABLE_PAGE_SIZE`, `MOCK_GYMS`. Single source of truth for all magic values. |

---

## Rule Compliance Checklist

- [x] Rule 1: Micro-modularization — module-prefixed subfolders, 300-line ceiling
- [x] Rule 2: Total Role Isolation — zero cross-role imports verified
- [x] Rule 3: Hyper-descriptive naming — `SuperadminGyms*` prefix on all files
- [x] Rule 3B: Centralized data — `GYMS_PLAN_COLORS`, `GYMS_STATUS_LABELS` in constants; `getPlanBadgeClasses()` in table
- [x] Rule 4: Theme Independence — no hardcoded hex/Tailwind colors in JSX
- [x] Rule 5: Smart State Management — TanStack Query for server state, Zustand for UI state
- [x] Rule 6: Logic/UI Separation — `useSuperadminGymsTable.ts` extracts all query/mutation logic
- [x] Rule 7: Type Isolation — all types in `superadmin_gyms_types.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` is Server Component, `SuperadminGymsClient` is Client
- [x] Rule 9: `loading.tsx` + `error.tsx` present with non-generic content
- [x] Rule 11: Centralized URL Config — `SuperadminUrlConfig.BACKEND_API.GYMS_BASE` used everywhere
- [x] Rule 13: Feature Map — this document
- [x] Rule 14: Backend-driven messages — toasts display `res.message` from API
- [x] Rule 19: Clickable table rows — `cursor-pointer` on all `<tr>`, no View/Eye button
- [x] Rule 26: Loading button states — `Loader2` spinner replaces actions when `actionLoadingId === gym.id`
- [x] Rule 32: No barrel files — direct named imports only
- [x] Rule 40: `gyms_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable `gym.id` UUID used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 71: Delete uses type-to-confirm modal; suspend is single-click (reversible)
- [x] Rule 73: `import type` used for all type-only imports
- [x] Design §12: Z-index scale respected in modals (`z-40`) and ghost banner (`z-50`)
- [x] Design §29: `motion-safe:` prefix on all transitions and animations
- [x] Design §64: Action buttons use `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` for mobile visibility
