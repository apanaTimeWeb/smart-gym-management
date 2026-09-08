// RESPONSIBILITY: API client for the Superadmin Profile module.
// All endpoints sourced from SuperadminProfileUrlConfig — no hardcoded strings.

import { apiFetch } from '@/lib/api';
import { SuperadminProfileUrlConfig } from '@/app/superadmin/profile/profile_utils/SuperadminProfileUrlConfig';
import type {
  SuperadminProfileData,
  UpdateSuperadminProfilePayload,
  UpdateSuperadminPasswordPayload,
  Toggle2FAPayload,
} from '@/app/superadmin/profile/profile_types/SuperadminProfileTypes';

export const superadminProfileApi = {
  fetchProfile: () =>
    apiFetch<SuperadminProfileData>(SuperadminProfileUrlConfig.BACKEND_API.BASE),

  updateProfile: (payload: UpdateSuperadminProfilePayload) =>
    apiFetch<SuperadminProfileData>(SuperadminProfileUrlConfig.BACKEND_API.BASE, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  updatePassword: (payload: UpdateSuperadminPasswordPayload) =>
    apiFetch<void>(SuperadminProfileUrlConfig.BACKEND_API.PASSWORD, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  toggle2FA: (payload: Toggle2FAPayload) =>
    apiFetch<SuperadminProfileData>(SuperadminProfileUrlConfig.BACKEND_API.TWO_FACTOR, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};
