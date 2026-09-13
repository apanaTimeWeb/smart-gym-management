// RESPONSIBILITY: Provides strongly-typed network calls for the settings module.
import { apiFetch } from '@/lib/api';
import { SettingsUrlConfig } from '@/app/admin/settings/settings_url_config';
import { AdminSettingsResponseSchema } from '@/app/admin/settings/settings_types/settings.schema';
import type { AdminSettingsResponse } from '@/app/admin/settings/settings_types/settings_types';
import { logErrorToMonitoring } from '@/app/admin/admin_utils/monitoring';

import { MOCK_ADMIN_SETTINGS } from '@/app/admin/settings/settings_api/AdminSettingsMockData';

let mockSettingsData = { ...MOCK_ADMIN_SETTINGS };

export const settingsApi = {
  fetchSettings: async (): Promise<AdminSettingsResponse> => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: mockSettingsData };
  },
  updateSettings: async (body: Record<string, unknown>) => {
    await new Promise(res => setTimeout(res, 400));
    
    // Find section from URL or infer from body payload if needed
    // In our mock, we assume 'body' has keys mapping to the settings sections.
    Object.keys(body).forEach(section => {
      if (section in mockSettingsData) {
        // @ts-expect-error - Mock dynamic update
        mockSettingsData[section] = { ...mockSettingsData[section], ...body[section] };
      }
    });

    return { message: 'Settings updated' };
  }
};
