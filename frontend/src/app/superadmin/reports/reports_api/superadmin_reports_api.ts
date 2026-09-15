import { RevenueRowSchema, CancellationsRecordSchema, TenantHealthScoreSchema } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';
import { z } from "zod";

export const superadminReportsApi = {
  fetchRevenueData: () =>
    apiFetch<ApiResponse<RevenueRow[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/revenue`, { dataSchema: z.array(RevenueRowSchema) }),
  fetchCancellationsData: () =>
    apiFetch<ApiResponse<CancellationsRecord[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/cancellations`, { dataSchema: z.array(CancellationsRecordSchema) }),
  fetchHealthData: () =>
    apiFetch<ApiResponse<TenantHealthScore[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/health`, { dataSchema: z.array(TenantHealthScoreSchema) }),
};
