// RESPONSIBILITY: Modularized API client for the Superadmin Settings module.
// Covers fetching and updating platform-wide configuration settings.
// DATA FLOW: SuperadminSettingsApi → superadmin_api.ts (re-exported) → UI hooks

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { PlatformSetting, UpdateSettingPayload } from '@/app/superadmin/settings/settings_types/settings_types';

/**
 * Fetches all platform-level settings grouped by category.
 */
export function fetchSettings() {
  return apiFetch<ApiResponse<PlatformSetting[]>>(SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE);
}

/**
 * Updates a single platform setting by its ID.
 */
export function updateSetting(id: string, body: UpdateSettingPayload) {
  return apiFetch<ApiResponse<PlatformSetting>>(
    `${SuperadminUrlConfig.BACKEND_API.SETTINGS_BASE}/${id}`,
    { method: 'PATCH', body: JSON.stringify(body) }
  );
}
