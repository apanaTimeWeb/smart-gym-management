# Manager Settings — Feature Map

## Module Purpose
The Settings module lets managers configure branch-level operational settings for their gym. This includes general settings (gym name, timezone, currency), notification preferences, security settings (session timeout, 2FA), and third-party integrations (WhatsApp, payment gateway). Managers can only configure settings for their own branch — they cannot change platform-level or billing settings (those belong to Admin/Superadmin).

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `settings_components/ManagerSettingsMain/` | Root client component with tab navigation | `ManagerSettingsMain.tsx` |
| `settings_api/` | API calls for fetching and saving settings | `ManagerSettingsApi.ts` |
| `settings_types/` | TypeScript interfaces for settings sections | `ManagerSettingsTypes.ts` |
| `settings_context/` | Logic hook for settings form state and save handlers | `useManagerSettingsLogic.ts` |
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
- [x] Rule 11: `ManagerSettingsUrlConfig.ts` present
- [x] Rule 29: `motion-safe:` prefix on all animations
- [x] Rule 2: Zero cross-role imports
