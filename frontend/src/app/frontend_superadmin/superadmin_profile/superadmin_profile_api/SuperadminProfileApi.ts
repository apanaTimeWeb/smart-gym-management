import { SuperadminProfileDataSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileTypesSchemas';
import { SuperadminProfilePasswordResponseDataSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminProfileApi owned by the superadmin_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileApiSchema, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileTypesSchemas, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_PROFILE_API } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';

import type { SuperadminProfileData, UpdateSuperadminProfilePayload, UpdateSuperadminPasswordPayload, Toggle2FAPayload, } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_types/SuperadminProfileTypes';
import type { ApiResponse } from '@/lib/api';



export const superadminProfileApi = {
    fetchProfile: () => apiFetch<ApiResponse<SuperadminProfileData>>(SUPERADMIN_PROFILE_API.BASE, { dataSchema: SuperadminProfileDataSchema }),
    updateProfile: (payload: UpdateSuperadminProfilePayload, idempotencyKey: string) => apiFetch<ApiResponse<SuperadminProfileData>>(SUPERADMIN_PROFILE_API.BASE, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminProfileDataSchema
    }),
    updatePassword: (payload: UpdateSuperadminPasswordPayload, idempotencyKey: string) => apiFetch<ApiResponse<void>>(SUPERADMIN_PROFILE_API.PASSWORD, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminProfilePasswordResponseDataSchema
    }),
    updateTwoFactor: (payload: Toggle2FAPayload, idempotencyKey: string) => apiFetch<ApiResponse<SuperadminProfileData>>(SUPERADMIN_PROFILE_API.TWO_FACTOR, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminProfileDataSchema
    }),
};
