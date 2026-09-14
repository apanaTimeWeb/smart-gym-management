// RESPONSIBILITY: Modularized API client for the Settings module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminSettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { PlatformSetting } from '@/app/superadmin/superadmin_types/superadmin_types';

export const settingsApi = {
  fetchSettings: () => apiFetch<ApiResponse<PlatformSetting[]>>(SuperadminSettingsUrlConfig.BACKEND_API.SETTINGS_BASE),
  updateSetting: (id: string, body: Record<string, unknown>) => apiFetch<ApiResponse<PlatformSetting>>(`${SuperadminSettingsUrlConfig.BACKEND_API.SETTINGS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
};
