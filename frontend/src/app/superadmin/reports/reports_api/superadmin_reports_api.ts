import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueRow, ChurnRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/reports_types';
import { ReportsUrlConfig } from '@/app/superadmin/reports/reports_url_config';
import { z } from "zod";

export const superadminReportsApi = {
  fetchRevenueData: () =>
    apiFetch<ApiResponse<RevenueRow[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/revenue`, { dataSchema: z.unknown() }),
  fetchChurnData: () =>
    apiFetch<ApiResponse<ChurnRecord[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/churn`, { dataSchema: z.unknown() }),
  fetchHealthData: () =>
    apiFetch<ApiResponse<TenantHealthScore[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/health`, { dataSchema: z.unknown() }),
};
