# Manager Settings — Feature Map

## Module Purpose
Manager Settings configures branch preferences, gym profile, operating hours, membership policy, and notification templates. Platform-level subscription and security infrastructure remain outside this module.
## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `settings_components/ManagerSettingsMain/` | Root client component with tab navigation | `ManagerSettingsMain.tsx` |
| `settings_api/` | API calls for fetching and saving settings | `ManagerSettingsApi.ts` |
| `settings_types/` | TypeScript interfaces for settings sections | `ManagerSettingsTypes.ts` |
| `settings_context/` | Logic hook for settings form state and save handlers | `ManagerUseManagerSettingsLogic.ts` |
| `settings_utils/` | Centralized constants: tab definitions, timezone/currency options | `ManagerSettingsSharedConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| General Settings | `/manager/settings` | Update gym name, timezone, currency, operating hours | `ManagerSettingsMain` | `GET/PATCH /api/v1/manager/settings/general` | 🔧 Stub |
| Notification Prefs | `/manager/settings` | Toggle email/SMS/WhatsApp notification preferences | `ManagerSettingsMain` | `GET/PATCH /api/v1/manager/settings/notifications` | 🔧 Stub |
| Security Settings | `/manager/settings` | Set session timeout, enable 2FA | `ManagerSettingsMain` | `GET/PATCH /api/v1/manager/settings/security` | 🔧 Stub |
| Integrations | `/manager/settings` | Configure WhatsApp Business API, payment gateway keys | `ManagerSettingsMain` | `GET/PATCH /api/v1/manager/settings/integrations` | 🔧 Stub |

## Edge Cases and AI Warnings
- **No native `<select>` for timezone or currency** — Use `SearchableDropdown`. Rule 20.
- **No `transition-opacity` without `motion-safe:` prefix** — All animations must use `motion-safe:`. Rule 29.
- **No platform-level settings** — Managers cannot change subscription plans, billing, or platform feature flags. Those belong to Admin/Superadmin.
- **No hardcoded API keys in constants** — Integration API keys must use placeholder strings like `'<WHATSAPP_API_KEY>'`. Never commit real keys.
- **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.

## Rule Compliance Checklist
- [x] Rule 8: page.tsx = Server Component
- [x] Rule 20: SearchableDropdown for timezone/currency
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `Manager_url_config.ts` present
- [x] Rule 29: `motion-safe:` prefix on all animations
- [x] Rule 2: Zero cross-role imports


## User Flows & Interactions
1. Open the `settings` route and load the feature Query state.
2. Use the visible filters/tabs or action controls to choose a workflow.
3. Submit through the owning Manager form/query/mutation layer.
4. On success, consume the backend response message and reconcile the relevant TanStack Query cache; on failure, preserve user-entered data and show the backend error message.


## API Contract
| API file | Functions | Endpoints |
|---|---|---|
| `ManagerUseManagerSettingsQuery.ts` | API declarations | See URL config expressions |
| `ManagerSettingsApi.ts` | `getAll`, `updateAll` | See URL config expressions |


## UI Data Requirements
| UI/API field | Source |
|---|---|
| `address` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `allowFreeze` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `autoSuspendAfterDays` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `autoSuspendOnExpiry` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `body` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `channel` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `city` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `closeTime` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `day` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `email` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `emailDailyReports` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `gracePeriodDays` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `gstin` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `gymName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `gymProfile` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `id` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `isActive` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `isOpen` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `language` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `logoUrl` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `maxFreezeDaysPerYear` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `membershipSettings` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `notificationTemplates` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `openTime` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `operatingHours` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `phone` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `pincode` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `preferences` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `pushNotificationsEnabled` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `reminderDaysBefore` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `state` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `subject` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `timezone` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `type` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `variables` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `website` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |


## Permissions and Security
- **Required role:** `MANAGER` for `/manager/settings`.
- **UI boundary:** `ManagerPermissionGate` enforces the Manager workspace capability before rendering the module shell.
- **Cross-role isolation:** feature code must not import business artifacts from Admin, Superadmin, Trainer, or another Manager feature; module infrastructure is the documented exception.
- **Sensitive mutations:** destructive/financial actions use the Manager confirmation flow before mutation.


## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `settings_components/ManagerSettingsMain/ManagerSettingsMain.tsx` | Renders the `settings`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
