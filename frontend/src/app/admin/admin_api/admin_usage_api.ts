// RESPONSIBILITY: Legacy global-level usage API stub. The canonical implementation is
// usage/usage_api/AdminUsageApi.ts. This file is kept only for backward-compat imports
// from AdminHeader/AdminUsageAlert. Do NOT add new types or logic here.
// Rule 7: AdminUsageData type lives in usage/usage_types/AdminUsageTypes.ts
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { AdminUsageUrlConfig } from '@/app/admin/usage/usage_url_config';

export type { AdminUsageData };

import { MOCK_ADMIN_USAGE_DATA } from '@/app/admin/usage/usage_api/AdminUsageMockData';

export const adminUsageApi = {
  fetchMyUsage: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_USAGE_DATA };
  }
};
