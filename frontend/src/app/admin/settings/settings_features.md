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
| `settings_components/AdminSettingsContent/AdminSettingsContent.tsx` | Root Client Component (tab orchestrator) |
| `settings_components/AdminSettingsNav/AdminSettingsNav.tsx` | Navigation menu connecting to URL `?tab=` |
| `settings_components/AdminSettingsGymProfile/AdminSettingsGymProfile.tsx` | Gym Profile Form (RHF + Zod) |
| `settings_components/AdminSettingsNotifications/AdminSettingsNotifications.tsx` | Notifications Form (RHF + Zod) |
| `settings_components/AdminSettingsRoles/AdminSettingsRoles.tsx` | Roles List (UI only) |
| `settings_components/AdminSettingsAppIntegration/AdminSettingsAppIntegration.tsx` | App Integrations Form (RHF + Zod) |
| `settings_components/AdminSettingsGST/AdminSettingsGST.tsx` | GST & Tax Form (RHF + Zod) |
| `settings_components/AdminSettingsPaymentGateway/AdminSettingsPaymentGateway.tsx` | Payment Gateway Form (RHF + Zod) |
| `settings_components/AdminSettingsGeneral/AdminSettingsGeneral.tsx` | General Settings Form (RHF + Zod) |
| `settings_types/settings.schema.ts` | Zod schemas for all sub-sections |
| `settings_types/settings_types.ts` | Inferred types from Zod schemas |
| `settings_api/settings_api.ts` | API boundary with Zod safeParse validation |
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
- **Server-state**: Fetched by TanStack Query in `AdminSettingsContent` and passed down as `initialData`.
- **URL State**: Active tab is managed via `useSearchParams` (`?tab=profile`). No Zustand.
- **Form State**: Each sub-component manages its own `react-hook-form` and tracks `isDirty` state independently.
- **Unsaved Changes**: Hook `useUnsavedChangesGuard` leverages the `beforeunload` event to prevent accidental navigation when forms are dirty.

## User Flows
1. Admin opens `/admin/settings` → `AdminSettingsContent` reads `?tab=profile` and TanStack Query fetches settings.
2. `AdminSettingsGymProfile` mounts with `initialData` injected into `react-hook-form`.
3. Admin edits a field → form becomes dirty.
4. If Admin attempts to close tab, browser warns them of unsaved changes.
5. Admin clicks "Save Changes" → Component calls `settingsApi.updateSettings` → TanStack Query invalidate → Toast success message driven by backend.

## Edge Cases / AI Warnings
- **Unsaved changes warning** — standard `beforeunload` is implemented. Custom App Router interception for soft navigation is a known limitation of Next.js and requires specialized hooks.
- **Mock Data Handling** — Because the backend may not yet return all subsections, `settings.schema.ts` explicitly defines `.optional().default({...})` fallbacks for `notifications`, `integration`, `gst`, `payment`, and `general` to prevent frontend crashes on validation.
- **No Global Forms** — Avoid merging the forms into a "God State". Keep forms isolated to their respective sub-components.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — form logic in section components, not in Main
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, accurately reflecting the new RHF split
- [x] Rule 14: Backend-driven messages — save success/error uses `response.message`
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 46: Unsaved changes warning on navigation (via `beforeunload`)
