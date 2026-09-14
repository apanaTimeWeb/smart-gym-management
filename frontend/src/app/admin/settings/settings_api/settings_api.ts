// RESPONSIBILITY: Provides strongly-typed network calls for the settings module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/admin/settings/settings_url_config';
import { AdminSettingsResponseSchema } from '@/app/admin/settings/settings_types/settings.schema';
import type { AdminSettingsResponse } from '@/app/admin/settings/settings_types/settings_types';
import { logErrorToMonitoring } from '@/app/admin/admin_utils/monitoring';
import { z } from "zod";
export const settingsApi = {
  fetchSettings: async () => {
            return apiFetch('/api/admin/settings/fetchSettings', { method: 'GET', dataSchema: z.unknown() });
        },
  updateSettings: async (body: Record<string, unknown>) => {
            return apiFetch('/api/admin/settings/updateSettings', { method: 'POST', body: JSON.stringify(body), dataSchema: z.unknown() });
        }
};
