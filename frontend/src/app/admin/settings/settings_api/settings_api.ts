// RESPONSIBILITY: Provides strongly-typed network calls for the settings module.
import { apiFetch } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/admin/settings/settings_url_config';
import { AdminSettingsResponseSchema } from '@/app/admin/settings/settings_types/settings.schema';
import type { AdminSettingsResponse } from '@/app/admin/settings/settings_types/settings_types';
import { logErrorToMonitoring } from '@/app/admin/admin_utils/monitoring';

export const settingsApi = {
  fetchSettings: async (): Promise<AdminSettingsResponse> => {
    const res = await apiFetch<unknown>(SettingsUrlConfig.BACKEND_API.BASE);
    const parsed = AdminSettingsResponseSchema.safeParse(res);
    if (!parsed.success) {
      logErrorToMonitoring(new Error('Settings API schema mismatch'), { module: 'settings' });
      throw new Error('Invalid response structure from settings API');
    }
    return parsed.data;
  },
  updateSettings: (body: Record<string, unknown>) =>
    apiFetch<{ message?: string }>(SettingsUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
};
