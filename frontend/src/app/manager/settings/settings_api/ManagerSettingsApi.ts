// RESPONSIBILITY: API client for the Manager Settings module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ManagerSettingsPreferences, UpdateManagerSettingsPayload } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';

import { MOCK_SETTINGS_PREFERENCES } from '@/app/manager/settings/settings_fixtures/ManagerSettingsMockData';

export const managerSettingsApi = {
  fetchSettings: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_SETTINGS_PREFERENCES };
  },

  updateSettings: async (body: UpdateManagerSettingsPayload) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: { ...MOCK_SETTINGS_PREFERENCES, ...body } };
  },
};
