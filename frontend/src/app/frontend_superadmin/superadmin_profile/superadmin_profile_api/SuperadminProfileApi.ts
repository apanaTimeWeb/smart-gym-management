import { SuperadminProfilePasswordResponseDataSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminProfileDataSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileTypesSchemas';
import { SuperadminProfileUrlConfig } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';

import type { SuperadminProfileData, UpdateSuperadminProfilePayload, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';
import type { ApiResponse } from '@/lib/api';

export const superadminProfileApi = {
    fetchProfile: () => apiFetch<ApiResponse<SuperadminProfileData>>(SuperadminProfileUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminProfileDataSchema }),
    updateProfile: (payload: UpdateSuperadminProfilePayload, idempotencyKey: string) => apiFetch<ApiResponse<SuperadminProfileData>>(SuperadminProfileUrlConfig.BACKEND_API.BASE, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminProfileDataSchema
    }),
    updatePassword: (payload: UpdateSuperadminPasswordPayload, idempotencyKey: string) => apiFetch<ApiResponse<void>>(SuperadminProfileUrlConfig.BACKEND_API.PASSWORD, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminProfilePasswordResponseDataSchema
    }),
    updateTwoFactor: (payload: Toggle2FAPayload, idempotencyKey: string) => apiFetch<ApiResponse<SuperadminProfileData>>(SuperadminProfileUrlConfig.BACKEND_API.TWO_FACTOR, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminProfileDataSchema
    }),
};
