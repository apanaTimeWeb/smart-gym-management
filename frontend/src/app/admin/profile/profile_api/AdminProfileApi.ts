import { AdminProfileUrlConfig } from '@/app/admin/profile/admin_profile_url_config';
import { adminProfileDataSchema } from '@/app/admin/profile/profile_types/AdminProfileSchemas';
// RESPONSIBILITY: API client for the Admin Profile module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { AdminProfileData, UpdateAdminProfilePayload, UpdateAdminPasswordPayload } from '@/app/admin/profile/profile_types/AdminProfileTypes';
import { type z } from "zod";

const BASE = AdminProfileUrlConfig.api.base;
export const adminProfileApi = {
  fetchProfile: async () => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>(`${AdminProfileUrlConfig.api.fetchProfile}`, { method: 'GET', dataSchema: adminProfileDataSchema });
        },
  updateProfile: async (body: UpdateAdminProfilePayload) => {
            return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>(`${AdminProfileUrlConfig.api.updateProfile}`, { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema });
        },
  updatePassword: async (body: UpdateAdminPasswordPayload) => {
          return apiFetch<ApiResponse<z.infer<typeof adminProfileDataSchema>>>(`${AdminProfileUrlConfig.api.updatePassword}`, { method: 'POST', body: JSON.stringify(body), dataSchema: adminProfileDataSchema });
      },
};
