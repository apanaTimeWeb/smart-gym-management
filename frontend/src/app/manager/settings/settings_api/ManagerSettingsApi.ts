// RESPONSIBILITY: API client for the Manager Settings module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ManagerSettingsPreferences, UpdateManagerSettingsPayload } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';

const BASE = '/manager/settings';

export const managerSettingsApi = {
  fetchSettings: () =>
    apiFetch<ApiResponse<ManagerSettingsPreferences>>(BASE),

  updateSettings: (body: UpdateManagerSettingsPayload) =>
    apiFetch<ApiResponse<ManagerSettingsPreferences>>(BASE, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};
