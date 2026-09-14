# Settings Feature Map

## Module Purpose
Manages superadmin-level platform-wide configuration: platform name / branding, default subscription trial period, maintenance-mode toggle, default timezone, and inter-service connectivity settings (SMTP relay, S3 bucket, WhatsApp API key).

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Owner |
|---|---|---|---|---|
| View Platform Settings | `/superadmin/settings` | Fetch and display current platform config | `GET /superadmin/settings` → `settingsApi.fetchSettings()` | Superadmin |
| Update General Settings | `/superadmin/settings` | Patch platform name, trial period, timezone | `PATCH /superadmin/settings` → `settingsApi.updateSettings(payload)` | Superadmin |
| Toggle Maintenance Mode | `/superadmin/settings` | Enable/disable maintenance banner globally | `PATCH /superadmin/settings/maintenance` → `settingsApi.toggleMaintenanceMode(enabled)` | Superadmin |
| Update Integration Keys | `/superadmin/settings` | Save SMTP / S3 / WhatsApp secrets | `PATCH /superadmin/settings/integrations` → `settingsApi.updateIntegrations(payload)` | Superadmin |

## Data and State Architecture
- Server-state query keys: `['superadmin', 'settings']`
- Form state: `useForm<PlatformSettingsFormData>` with `zodResolver(PlatformSettingsSchema)` — no local state mutations
- Zustand stores: None
- Context providers: None
- Local-storage keys: None
- MSW handler file: `src/mocks/handlers/superadmin-settings.handlers.ts`

## API Contract
- `settingsApi.fetchSettings()` → `ApiResponse<PlatformSettings>`
- `settingsApi.updateSettings(payload: UpdatePlatformSettingsPayload)` → `ApiResponse<PlatformSettings>`
- `settingsApi.toggleMaintenanceMode(enabled: boolean)` → `ApiResponse<void>`
- `settingsApi.updateIntegrations(payload: IntegrationSettingsPayload)` → `ApiResponse<void>`

## Permissions and Security
- **Role:** `SUPERADMIN` only — settings endpoint is protected by server middleware
- **Risk:** Integration keys (SMTP password, WhatsApp API key) must never be logged — mask on display, submit via HTTPS body only
- **Risk:** Maintenance mode affects all tenants immediately — require explicit confirmation dialog before toggling on

## Loading, Empty, Error States
- **Loading:** `loading.tsx` skeleton with input placeholders
- **Empty:** Not applicable — settings always have a default config response
- **Error:** `error.tsx` boundary shows "Failed to load settings" with a retry button

## Edge Cases / AI Warnings
- Integration key fields should use `type="password"` inputs — do not auto-fill or store in query cache beyond the initial load
- `toggleMaintenanceMode(true)` should only be callable after a confirmation modal with the text "This will affect ALL active tenant sessions"
- `updateSettings()` must use optimistic updates then revert on failure — do not invalidate the query before confirming server success
