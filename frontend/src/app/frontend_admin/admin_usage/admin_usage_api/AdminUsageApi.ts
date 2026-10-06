import { ADMIN_USAGE_API } from '@/app/frontend_admin/admin_usage/admin_usage_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { adminUsageDataSchema } from '@/app/frontend_admin/admin_usage/admin_usage_schemas/AdminUsageSchemas';
import { adminUsageUpgradeRequestSchema } from '@/app/frontend_admin/admin_usage/admin_usage_schemas/AdminUsageUpgradeSchemas';
import type { AdminUsageData } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageTypes';
import type { AdminUsageUpgradeRequest } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageUpgradeTypes';

export const AdminUsageApi = {
  fetchMyUsage: async () =>
    apiFetch<ApiResponse<AdminUsageData>>(ADMIN_USAGE_API.myUsage, {
      method: 'GET',
      dataSchema: adminUsageDataSchema,
    }),

  requestUpgrade: async (planName: string, idempotencyKey: string) =>
    apiFetch<ApiResponse<AdminUsageUpgradeRequest>>(ADMIN_USAGE_API.upgradeRequest, {
      method: 'POST',
      body: JSON.stringify({ planName }),
      dataSchema: adminUsageUpgradeRequestSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
};
