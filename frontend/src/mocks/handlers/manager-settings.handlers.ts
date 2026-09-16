import { http, HttpResponse } from 'msw';
import { MOCK_MANAGER_SETTINGS } from '@/app/manager/settings/settings_fixtures/ManagerSettingsMockData';
import type { ManagerSettingsPreferences, UpdateManagerSettingsPayload } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';

let settingsDb: ManagerSettingsPreferences = { ...MOCK_MANAGER_SETTINGS.preferences };

export const managerSettingsHandlers = [
  http.get('http://localhost:5000/api/v1/manager/settings', () => {
    return HttpResponse.json({
      success: true,
      message: 'Settings fetched',
      data: settingsDb
    });
  }),

  http.patch('http://localhost:5000/api/v1/manager/settings', async ({ request }) => {
    const body = await request.json() as UpdateManagerSettingsPayload;
    settingsDb = { ...settingsDb, ...body };
    return HttpResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: settingsDb
    });
  })
];
