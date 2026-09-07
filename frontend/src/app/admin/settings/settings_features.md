# Admin Settings — Feature Map

## Module Purpose
The Admin Settings module manages system-wide configuration for the gym platform — gym identity
(name, logo, contact), GST/tax settings, notification preferences, and integration toggles
(WhatsApp, payment gateway). Settings are saved via PATCH and take effect immediately. This
module has no table or list — it is a form-only module.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Skeleton for settings form sections |
| `error.tsx` | Error boundary |
| `settings_components/AdminSettingsMain.tsx` | Root Client Component |
| `settings_components/AdminSettingsGymProfile.tsx` | Gym name, logo, address, contact form section |
| `settings_components/AdminSettingsTaxConfig.tsx` | GST number, tax rate configuration |
| `settings_components/AdminSettingsNotifications.tsx` | Toggle notification preferences |
| `settings_components/AdminSettingsIntegrations.tsx` | WhatsApp / payment gateway toggles |
| `settings_types/AdminSettingsTypes.ts` | `GymSettings`, `UpdateSettingsDto` types |
| `settings_api/AdminSettingsApi.ts` | API wrappers |
| `settings_utils/AdminSettingsUrlConfig.ts` | Centralized URL constants |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Gym Profile | `/admin/settings` | Update gym name, logo, contact | `GET/PATCH /admin/settings/profile` | ✅ Live |
| Tax Config | `/admin/settings` | GST number + tax rate | `GET/PATCH /admin/settings/tax` | ✅ Live |
| Notifications | `/admin/settings` | Toggle alert preferences | `GET/PATCH /admin/settings/notifications` | ✅ Live |
| Integrations | `/admin/settings` | WhatsApp / payment toggles | `GET/PATCH /admin/settings/integrations` | ✅ Live |

## Data and State Architecture
- Server-state: Fetched on mount inside each settings section component
- Zustand stores: None
- Context providers: `AdminSettingsProvider` — holds current settings, dirty state
- Local-storage keys: None
- MSW handler: Not yet configured

## User Flows
1. Admin opens `/admin/settings` → all sections load with current values pre-filled
2. Admin edits a field → form becomes dirty → "Save Changes" button activates
3. Admin clicks "Save" → `PATCH` → success toast from `response.message` → form resets dirty state
4. Admin uploads logo → file validated (type + size) → uploaded to storage → URL saved via PATCH

## Component Responsibility Map
- `AdminSettingsMain` — layout + tab/section navigation. MUST NOT contain form state.
- Each section component — owns its own React Hook Form instance + Zod schema.
- `AdminSettingsProvider` — tracks global dirty state to warn on unsaved navigation.

## Permissions and Security
| Action | Required Role |
|---|---|
| View settings | `SUPERADMIN` |
| Update settings | `SUPERADMIN` |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — form field skeletons per section
- **Empty:** N/A — settings always have default values
- **Error:** `error.tsx` with retry; save errors shown as toast from `response.message`

## Edge Cases / AI Warnings
- **Unsaved changes warning** — if admin navigates away with dirty form, show browser `beforeunload` warning (Rule 46).
- **Logo upload** — file must be validated for MIME type (image only) and size (<2MB) before upload. Never pass raw `File` object to the API wrapper.
- **Tax rate** — stored and transmitted as a decimal (e.g., `0.18` for 18% GST), not as a percentage integer. Display as percentage in UI.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization — module-prefixed files
- [x] Rule 6: Logic/UI Separation — form logic in section components, not in Main
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 14: Backend-driven messages — save success/error uses `response.message`
- [x] Rule 16: Forms use React Hook Form + Zod
- [x] Rule 46: Unsaved changes warning on navigation
