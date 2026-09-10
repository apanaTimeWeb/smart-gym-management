// RESPONSIBILITY: Legacy global-level usage API stub. The canonical implementation is
// usage/usage_api/AdminUsageApi.ts. This file is kept only for backward-compat imports
// from AdminHeader/AdminUsageAlert. Do NOT add new types or logic here.
// Rule 7: AdminUsageData type lives in usage/usage_types/AdminUsageTypes.ts
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { AdminUsageUrlConfig } from '@/app/admin/usage/usage_url_config';

export type { AdminUsageData };

export const adminUsageApi = {
  fetchMyUsage: (): Promise<ApiResponse<AdminUsageData>> =>
    apiFetch<ApiResponse<AdminUsageData>>(AdminUsageUrlConfig.BACKEND_API.MY_USAGE),
};
