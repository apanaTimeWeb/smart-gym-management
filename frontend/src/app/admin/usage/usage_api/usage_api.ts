import { adminUsageDataSchema } from '@/app/admin/usage/usage_types/AdminUsage_schemas';
// RESPONSIBILITY: Legacy global-level usage API stub. The canonical implementation is
// usage/usage_api/AdminUsageApi.ts. This file is kept only for backward-compat imports
// from AdminHeader/AdminUsageAlert. Do NOT add new types or logic here.
// Rule 7: AdminAdminUsageData type lives in usage/usage_types/AdminUsageTypes.ts
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';
import { z } from "zod";

export const usageApi = {
  fetchMyUsage: async () => {
      return apiFetch<ApiResponse<any>>('/api/admin/adminUsage/fetchMyUsage', { method: 'GET', dataSchema: z.any() });
  },
};
