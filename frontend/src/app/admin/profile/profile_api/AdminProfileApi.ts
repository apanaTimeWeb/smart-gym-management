import { AdminProfileUrlConfig } from '@/app/admin/profile/admin_profile_url_config';
import { adminProfileDataSchema } from '@/app/admin/profile/profile_types/AdminProfile_schemas';
// RESPONSIBILITY: API client for the Admin Profile module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/admin/profile/profile_types/AdminProfileTypes';
import { z } from "zod";

const BASE = AdminProfileUrlConfig.api.base;
export const adminProfileApi = {
  fetchProfile: async () => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>('/admin/adminProfile/fetchProfile', { method: 'GET', dataSchema: adminProfileDataSchema });
        },
  updateProfile: async (body: UpdateAdminProfilePayload) => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>('/admin/adminProfile/updateProfile', { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema });
        },
  updatePassword: async (body: UpdateAdminPasswordPayload) => {
          return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>('/admin/adminProfile/updatePassword', { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema });
      },
};
