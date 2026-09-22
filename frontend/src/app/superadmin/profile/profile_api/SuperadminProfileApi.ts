import { SuperadminProfileDataSchema } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
// RESPONSIBILITY: API client for the Superadmin Profile module.
// All endpoints sourced from SuperadminProfileUrlConfig — no hardcoded strings.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { ProfileUrlConfig } from '@/app/superadmin/profile/superadmin_profile_url_config';
import type { SuperadminProfileData, UpdateSuperadminProfilePayload, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
import { z } from "zod";
export const superadminProfileApi = {
    fetchProfile: () => apiFetch<ApiResponse<SuperadminProfileData>>(ProfileUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminProfileDataSchema }),
    updateProfile: (payload: UpdateSuperadminProfilePayload, idempotencyKey?: string) => apiFetch<ApiResponse<SuperadminProfileData>>(ProfileUrlConfig.BACKEND_API.BASE, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SuperadminProfileDataSchema
    }),
    updatePassword: (payload: UpdateSuperadminPasswordPayload, idempotencyKey?: string) => apiFetch<ApiResponse<void>>(ProfileUrlConfig.BACKEND_API.PASSWORD, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: z.object({}).passthrough()
    }),
    updateTwoFactor: (payload: Toggle2FAPayload, idempotencyKey?: string) => apiFetch<ApiResponse<SuperadminProfileData>>(ProfileUrlConfig.BACKEND_API.TWO_FACTOR, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
        dataSchema: SuperadminProfileDataSchema
    }),
};
