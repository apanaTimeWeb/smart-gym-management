// RESPONSIBILITY: Modularized API client for the Settings module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { PlatformSetting } from '@/app/superadmin/settings/settings_types/SuperadminSettingsTypes';
import { z } from "zod";
import { PlatformSettingSchema } from '@/app/superadmin/settings/settings_types/SuperadminSettingsTypes';
export const settingsApi = {
    fetchSettings: () => apiFetch<ApiResponse<PlatformSetting[]>>(SettingsUrlConfig.BACKEND_API.BASE, { dataSchema: z.array(PlatformSettingSchema) }),
    updateSetting: (id: string, body: Record<string, unknown>, idempotencyKey?: string) => apiFetch<ApiResponse<PlatformSetting>>(`${SettingsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: PlatformSettingSchema
    }),
};
