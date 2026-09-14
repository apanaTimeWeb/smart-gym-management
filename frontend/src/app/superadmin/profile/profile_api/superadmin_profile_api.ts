// RESPONSIBILITY: API client for the Superadmin Profile module.
// All endpoints sourced from SuperadminProfileUrlConfig — no hardcoded strings.

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { ProfileUrlConfig } from '@/app/superadmin/profile/profile_url_config';
import type {
  SuperadminProfileData,
  UpdateSuperadminProfilePayload,
  UpdateSuperadminPasswordPayload,
  Toggle2FAPayload,
} from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';
import { z } from "zod";

export const superadminProfileApi = {
  fetchProfile: () =>
    apiFetch<ApiResponse<SuperadminProfileData>>(ProfileUrlConfig.BACKEND_API.BASE, { dataSchema: SuperadminProfileDataSchema }),

  updateProfile: (payload: UpdateSuperadminProfilePayload) =>
    apiFetch<ApiResponse<SuperadminProfileData>>(ProfileUrlConfig.BACKEND_API.BASE, {
      method: 'PATCH',
      body: JSON.stringify(payload),
        dataSchema: SuperadminProfileDataSchema
    }),

  updatePassword: (payload: UpdateSuperadminPasswordPayload) =>
    apiFetch<ApiResponse<void>>(ProfileUrlConfig.BACKEND_API.PASSWORD, {
      method: 'PATCH',
      body: JSON.stringify(payload),
        dataSchema: z.any()
    }),

  toggle2FA: (payload: Toggle2FAPayload) =>
    apiFetch<ApiResponse<SuperadminProfileData>>(ProfileUrlConfig.BACKEND_API.TWO_FACTOR, {
      method: 'PATCH',
      body: JSON.stringify(payload),
        dataSchema: SuperadminProfileDataSchema
    }),
};
