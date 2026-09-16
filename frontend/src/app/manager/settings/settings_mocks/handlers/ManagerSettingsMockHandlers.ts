import { http, HttpResponse } from 'msw';
import { MOCK_MANAGER_SETTINGS } from '@/app/manager/settings/settings_fixtures/ManagerSettingsMockData';
import { managerAllSettingsSchema } from '@/app/manager/settings/settings_types/ManagerSettingsSchema';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';

let settingsDb: ManagerAllSettings = structuredClone(MOCK_MANAGER_SETTINGS);
export const managerSettingsHandlers = [
  http.get('http://localhost:5000/api/v1/manager/settings', () => HttpResponse.json({ success: true, message: 'Settings fetched', data: settingsDb })),
  http.patch('http://localhost:5000/api/v1/manager/settings', async ({ request }) => {
    const raw = await request.json();
    const parsed = managerAllSettingsSchema.partial().parse(raw);
    settingsDb = managerAllSettingsSchema.parse({ ...settingsDb, ...parsed });
    return HttpResponse.json({ success: true, message: 'Settings updated successfully', data: settingsDb });
  }),
];
