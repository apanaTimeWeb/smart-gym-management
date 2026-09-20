# Admin Settings — Feature Map

## Module Purpose
The Admin Settings module manages system-wide configuration for the gym platform — gym identity
(name, logo, contact), GST/tax settings, notification preferences, payment gateways, and integrations. Settings are saved via the backend API and take effect immediately. This module has no table or list — it is a form-based module with multiple sub-tabs driven by the URL.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for settings form sections |
| `error.tsx` | Error boundary |
| `settings_components/AdminSettingsContent/AdminSettingsContent.tsx` | Root Client Component (tab orchestrator/view) |
| `settings_context/useAdminSettingsData.ts` | TanStack Query owner for settings server state |
| `settings_context/useAdminSettingsForms.ts` | RHF/Zod + mutation owner for settings section forms |
| `settings_components/AdminSettingsNav/AdminSettingsNav.tsx` | Navigation menu connecting to URL `?tab=` |
| `settings_components/AdminSettingsGymProfile/AdminSettingsGymProfile.tsx` | Gym Profile Form (RHF + Zod) |
| `settings_components/AdminSettingsNotifications/AdminSettingsNotifications.tsx` | Notifications Form (RHF + Zod) |
| `settings_components/AdminSettingsRoles/AdminSettingsRoles.tsx` | Roles List (UI only) |
| `settings_components/AdminSettingsAppIntegration/AdminSettingsAppIntegration.tsx` | App Integrations Form (RHF + Zod) |
| `settings_components/AdminSettingsGST/AdminSettingsGST.tsx` | GST & Tax Form (RHF + Zod) |
| `settings_components/AdminSettingsPaymentGateway/AdminSettingsPaymentGateway.tsx` | Payment Gateway Form (RHF + Zod) |
| `settings_components/AdminSettingsGeneral/AdminSettingsGeneral.tsx` | General Settings Form (RHF + Zod) |
| `settings_types/AdminSettings.schema.ts` | Zod schemas for all sub-sections |
| `settings_types/AdminSettingsTypes.ts` | Inferred types from Zod schemas |
| `settings_api/AdminSettingsApi.ts` | API boundary with Zod safeParse validation |
| `settings_utils/AdminSettingsSharedConstants.ts` | Shared mock and layout data |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Gym Profile | `/admin/settings?tab=profile` | Update gym name, logo, contact | `GET/POST /admin/settings` | ✅ Live |
| Notifications | `/admin/settings?tab=notifications` | Toggle alert preferences | `GET/POST /admin/settings` | ✅ Live |
| Roles | `/admin/settings?tab=roles` | Manage access control | N/A | 🏗 Mock |
| Integrations | `/admin/settings?tab=integration` | Member app, online payments | `GET/POST /admin/settings` | ✅ Live |
| GST & Tax | `/admin/settings?tab=gst` | GST number + tax rate | `GET/POST /admin/settings` | ✅ Live |
| Payment Gateway | `/admin/settings?tab=payment` | Razorpay/UPI config | `GET/POST /admin/settings` | ✅ Live |
| General | `/admin/settings?tab=general` | Timezone, language, backups | `GET/POST /admin/settings` | ✅ Live |

## Data and State Architecture
- **Server-state**: Fetched and owned by `useAdminSettingsData` through TanStack Query; `AdminSettingsContent` consumes the query result and passes section data to view components.
- **URL State**: Active tab is managed via `useSearchParams` (`?tab=profile`). No Zustand.
- **Form State**: `useAdminSettingsForms` creates the section-specific RHF/Zod form and owns mutation/loading/error/cache invalidation; each view component consumes the returned form state.
- **Unsaved Changes**: Hook `useUnsavedChangesGuard` leverages the `beforeunload` event to prevent accidental navigation when forms are dirty.

## User Flows
1. Admin opens `/admin/settings` → `AdminSettingsContent` reads `?tab=profile` and TanStack Query fetches settings.
2. `AdminSettingsGymProfile` mounts with `initialData` injected into `react-hook-form`.
3. Admin edits a field → form becomes dirty.
4. If Admin attempts to close tab, browser warns them of unsaved changes.
5. Admin clicks "Save Changes" → Component calls `settingsApi.updateSettings` → TanStack Query invalidate → Toast success message driven by backend.

## Edge Cases / AI Warnings
- **Unsaved changes warning** — standard `beforeunload` is implemented. Custom App Router interception for soft navigation is a known limitation of Next.js and requires specialized hooks.
- **Mock Data Handling** — Because the backend may not yet return all subsections, `AdminSettings.schema.ts` explicitly defines `.optional().default({...})` fallbacks for `notifications`, `integration`, `gst`, `payment`, and `general` to prevent frontend crashes on validation.
- **No Global Forms** — Avoid merging the forms into a "God State". Keep forms isolated to their respective sub-components.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — server query and form/mutation logic are owned by Settings context hooks
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, accurately reflecting the new RHF split
- [x] Rule 14: Backend-driven messages — save success/error uses `response.message`
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 46: Unsaved changes warning on navigation (via `beforeunload`)


## User Flows & Interactions
1. Enter the `/admin/settings` route and load the module UI.
2. Use the module controls/forms/tables provided by the documented components.
3. Submit supported mutations through the module API layer and reconcile the TanStack Query cache.
4. On failure, preserve user input where applicable and render the module-specific error state.


## API Contract
| API file | Endpoint literal observed |
|---|---|
| API client | `AdminSettingsApi.ts` | Module-owned typed API boundary; exact endpoint constants are defined in the feature URL configuration and consumed by the API client. |

## UI Data Requirements
- Every data-driven table, KPI, chart, filter, dropdown and detail field must map to a typed API response field and be represented in module-owned fixtures where mocked.
- Verify each rendered data field against the module API schema before changing the UI.

## Permissions and Security
- Required role: documented owning role for this module (`ADMIN`).
- Restricted/destructive actions must remain behind the module's existing permission/confirmation guards.
- Frontend permission checks are UI behavior only; backend authorization remains authoritative.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` where present, using skeleton layout rather than full-page generic spinners.
- Route failure: `error.tsx` where present, with module-specific recovery via `reset()`.
- Entity lists: use the feature's dedicated empty-state component; query failures remain inline unless explicitly configured to throw.

## Edge Cases and AI Warnings
- Do not introduce cross-role or cross-business-module imports.
- Do not move server/API data into Zustand or Context.
- Do not bypass the module API client or read fixtures directly from UI code.
- Do not introduce hardcoded business records or hardcoded API URLs.
- Preserve destructive-action confirmation and backend-driven messages.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `settings_components/AdminSettingsAppIntegration/AdminSettingsAppIntegration.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsBanner/AdminSettingsBanner.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsContent/AdminSettingsContent.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsGST/AdminSettingsGST.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsGeneral/AdminSettingsGeneral.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsGymProfile/AdminSettingsGymProfile.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsMain/AdminSettingsMain.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsNav/AdminSettingsNav.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsNotifications/AdminSettingsNotifications.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsPaymentGateway/AdminSettingsPaymentGateway.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsRoles/AdminSettingsRoles.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |
| `settings_components/AdminSettingsShared/AdminSettingsToggleSwitch.tsx` | Renders/orchestrates this module's documented UI section; no direct business API logic unless explicitly designated by the module architecture. |


## Module-Owned MSW Fixtures

All Admin frontend-first API fixtures and MSW transport handlers are owned by `admin/settings/settings_mocks/fixtures/AdminSettingsMockFixtures.ts` and `admin/settings/settings_mocks/handlers/AdminSettingsMockHandlers.ts`. These files provide populated success responses and are the only module-owned mock transport source for Admin. Global MSW bootstrap may register these handlers, but must not contain Admin business data.
