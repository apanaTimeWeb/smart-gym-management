import { AdminUsageUrlConfig } from '@/app/admin/usage/admin_usage_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { adminUsageDataSchema } from '@/app/admin/usage/usage_types/AdminUsageSchemas';
import { adminUsageUpgradeRequestSchema } from '@/app/admin/usage/usage_types/AdminUsageUpgradeSchemas';
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';
import type { AdminUsageUpgradeRequest } from '@/app/admin/usage/usage_types/AdminUsageUpgradeTypes';

export const adminUsageApi = {
  fetchMyUsage: async () =>
    apiFetch<ApiResponse<AdminUsageData>>(AdminUsageUrlConfig.BACKEND_API.MY_USAGE, {
      method: 'GET',
      dataSchema: adminUsageDataSchema,
    }),

  requestUpgrade: async (planName: string, idempotencyKey?: string) =>
    apiFetch<ApiResponse<AdminUsageUpgradeRequest>>(AdminUsageUrlConfig.BACKEND_API.UPGRADE_REQUEST, {
      method: 'POST',
      body: JSON.stringify({ planName }),
      dataSchema: adminUsageUpgradeRequestSchema,
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
    }),
};
