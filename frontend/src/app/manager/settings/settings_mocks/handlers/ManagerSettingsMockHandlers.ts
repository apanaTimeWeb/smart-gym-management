// RESPONSIBILITY: Provides the feature-owned mutable MSW transport for Manager Settings.
import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_MANAGER_SETTINGS } from '@/app/manager/settings/settings_fixtures/ManagerSettingsMockData';
import { managerAllSettingsSchema } from '@/app/manager/settings/settings_schemas/ManagerSettingsSchema';
import { ManagerSettingsUrlConfig } from '@/app/manager/settings/settings_url_config';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';


let settingsDb: ManagerAllSettings = structuredClone(MOCK_MANAGER_SETTINGS);

export function resetManagerSettingsMockState(): void {
  settingsDb = structuredClone(MOCK_MANAGER_SETTINGS);
}

export const managerSettingsHandlers = [
  http.get(managerMockApiUrl(ManagerSettingsUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: true, message: 'Settings fetched', data: settingsDb })),
  http.patch(managerMockApiUrl(ManagerSettingsUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const raw: unknown = await request.json();
    const parsed = managerAllSettingsSchema.partial().parse(raw);
    settingsDb = managerAllSettingsSchema.parse({ ...settingsDb, ...parsed });
    return HttpResponse.json({ success: true, message: 'Settings updated successfully', data: settingsDb });
  }),
];
