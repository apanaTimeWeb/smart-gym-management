// RESPONSIBILITY: Encapsulates functionality for superadmin_reports_api.ts
import { RevenueRowSchema, CancellationsRecordSchema, TenantHealthScoreSchema } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { MOCK_SUPERADMIN_REPORTS_REVENUE, MOCK_SUPERADMIN_REPORTS_CANCELLATIONS, MOCK_SUPERADMIN_REPORTS_HEALTH } from '@/app/superadmin/reports/reports_mocks/handlers/SuperadminReportsMockHandlers';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';
import { z } from "zod";

export const superadminReportsApi = {
  fetchRevenueData: () =>
    apiFetch<ApiResponse<RevenueRow[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/revenue`, { dataSchema: z.array(RevenueRowSchema) })
      .catch(() => ({ success: true, message: 'Fallback to mock', data: MOCK_SUPERADMIN_REPORTS_REVENUE as any })),
  fetchCancellationsData: () =>
    apiFetch<ApiResponse<CancellationsRecord[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/cancellations`, { dataSchema: z.array(CancellationsRecordSchema) })
      .catch(() => ({ success: true, message: 'Fallback to mock', data: MOCK_SUPERADMIN_REPORTS_CANCELLATIONS as any })),
  fetchHealthData: () =>
    apiFetch<ApiResponse<TenantHealthScore[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/health`, { dataSchema: z.array(TenantHealthScoreSchema) })
      .catch(() => ({ success: true, message: 'Fallback to mock', data: MOCK_SUPERADMIN_REPORTS_HEALTH as any })),
};
