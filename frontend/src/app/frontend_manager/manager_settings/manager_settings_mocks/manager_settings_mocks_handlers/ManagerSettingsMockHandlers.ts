import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_MANAGER_SETTINGS } from '@/app/frontend_manager/manager_settings/manager_settings_mocks/manager_settings_mocks_fixtures/ManagerSettingsMockData';
import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_settings/manager_settings_schemas/ManagerSettingsSchema';
import { ManagerSettingsUrlConfig } from '@/app/frontend_manager/manager_settings/manager_settings_url_config';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes';


let settingsDb: ManagerAllSettings = structuredClone(MOCK_MANAGER_SETTINGS);

/**
 * @description Provides the ManagerSettingsMockHandlers implementation for the settings module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_settings/manager_settings_mocks/manager_settings_mocks_fixtures/ManagerSettingsMockData; @/app/frontend_manager/manager_settings/manager_settings_schemas/ManagerSettingsSchema; @/app/frontend_manager/manager_settings/manager_settings_url_config; @/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
