
// RESPONSIBILITY: Provides strongly-typed network calls for the settings module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/admin/settings/admin_settings_url_config';
import { AdminSettingsResponseSchema } from '@/app/admin/settings/settings_types/AdminSettings.schema';
import type { AdminSettingsResponse } from '@/app/admin/settings/settings_types/AdminSettingsTypes';
import { logErrorToMonitoring } from '@/app/admin/admin_layout/admin_utils/AdminMonitoring';
import { type z } from "zod";
export const settingsApi = {
  fetchSettings: async () => {
            return apiFetch<z.infer<typeof AdminSettingsResponseSchema>>(`${SettingsUrlConfig.BACKEND_API.BASE}/fetchSettings`, { method: 'GET', responseSchema: AdminSettingsResponseSchema });
        },
  updateSettings: async (body: Record<string, unknown>) => {
            return apiFetch<z.infer<typeof AdminSettingsResponseSchema>>(`${SettingsUrlConfig.BACKEND_API.BASE}/updateSettings`, { method: 'POST', body: JSON.stringify(body), responseSchema: AdminSettingsResponseSchema });
        }
};
