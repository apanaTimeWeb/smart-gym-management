// RESPONSIBILITY: API client for the Admin Profile module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/admin/profile/profile_types/AdminProfileTypes';

const BASE = '/admin/profile';

import { MOCK_ADMIN_PROFILE } from '@/app/admin/profile/profile_api/AdminProfileMockData';

let mockProfile = { ...MOCK_ADMIN_PROFILE };

export const adminProfileApi = {
  fetchProfile: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: mockProfile };
  },
  updateProfile: async (body: UpdateAdminProfilePayload) => {
    await new Promise(res => setTimeout(res, 400));
    mockProfile = { ...mockProfile, ...body };
    return { success: true, message: 'Profile updated', data: mockProfile };
  },
  updatePassword: async (body: UpdateAdminPasswordPayload) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Password updated', data: undefined };
  },
};
