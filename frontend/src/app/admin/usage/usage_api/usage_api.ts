import { z } from 'zod';
// RESPONSIBILITY: API boundary for Admin usage server data.
import { AdminUsageUrlConfig } from '@/app/admin/usage/usage_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { adminUsageDataSchema } from '@/app/admin/usage/usage_types/AdminUsage_schemas';
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';

const usageResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: adminUsageDataSchema.nullable(),
  meta: z.unknown().optional(),
  error: z.unknown().optional(),
  statusCode: z.number().optional(),
});

export const usageApi = {
  fetchMyUsage: async (): Promise<ApiResponse<AdminUsageData>> =>
    apiFetch<ApiResponse<AdminUsageData>>(`${AdminUsageUrlConfig.BACKEND_API.MY_USAGE}`, {
      method: 'GET',
      responseSchema: usageResponseSchema,
    }),
};
