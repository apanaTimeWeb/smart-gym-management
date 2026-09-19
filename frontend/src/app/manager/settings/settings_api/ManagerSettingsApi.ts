import { ManagerSettingsUrlConfig } from '@/app/manager/settings/settings_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ManagerAllSettings } from '@/app/manager/settings/settings_types/ManagerSettingsTypes';
import { managerAllSettingsSchema } from '@/app/manager/settings/settings_schemas/ManagerSettingsSchema';

export const managerSettingsApi = {
  fetchSettings: async (): Promise<ApiResponse<ManagerAllSettings>> => apiFetch(ManagerSettingsUrlConfig.BACKEND_API.BASE, { dataSchema: managerAllSettingsSchema }),
  updateSettings: async (body: Partial<ManagerAllSettings>): Promise<ApiResponse<ManagerAllSettings>> => apiFetch(ManagerSettingsUrlConfig.BACKEND_API.BASE, { method: 'PATCH', body: JSON.stringify(body), dataSchema: managerAllSettingsSchema }) };
