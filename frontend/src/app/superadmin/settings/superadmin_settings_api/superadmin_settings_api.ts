// RESPONSIBILITY: Modularized API client for the Settings module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SettingsUrlConfig } from '@/app/superadmin/settings/settings_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { PlatformSetting } from '@/app/superadmin/superadmin_types/superadmin_types';
import { z } from "zod";

export const settingsApi = {
  fetchSettings: () => apiFetch<ApiResponse<PlatformSetting[]>>(SettingsUrlConfig.BACKEND_API.BASE, { dataSchema: z.any() }),
  updateSetting: (id: string, body: Record<string, unknown>) => apiFetch<ApiResponse<PlatformSetting>>(`${SettingsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
      dataSchema: z.any()
}),
};
