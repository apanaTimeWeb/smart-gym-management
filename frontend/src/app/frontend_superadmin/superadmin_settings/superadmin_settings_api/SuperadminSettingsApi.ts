import { z } from 'zod';
import { PlatformSettingSchema } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_schemas/SuperadminSettingsContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSettingsApi owned by the superadmin_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_settings/superadmin_settings_url_config, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsTypes, zod, @/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Settings module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SUPERADMIN_SETTINGS_API } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_url_config';

import type { PlatformSetting } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_types/SuperadminSettingsTypes';
import type { ApiResponse } from '@/lib/api';


export const settingsApi = {
    fetchSettings: () => apiFetch<ApiResponse<PlatformSetting[]>>(SUPERADMIN_SETTINGS_API.BASE, { dataSchema: z.array(PlatformSettingSchema) }),
    updateSetting: (id: string, body: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<PlatformSetting>>(`${SUPERADMIN_SETTINGS_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: PlatformSettingSchema
    }),
};
