import { AdminReportsUrlConfig } from '@/app/admin/reports/admin_reports_url_config';
import { reportDataSchema } from '@/app/admin/reports/reports_types/reports_schemas';
// RESPONSIBILITY: API client for the Reports module. All network calls for report data.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ReportData } from '@/app/admin/reports/reports_types/reports_types';
import { z } from "zod";

export const reportsApi = {
  fetchReportData: async (params?: { dateRange?: string; gymId?: string; startDate?: string; endDate?: string }) => {
    return apiFetch<ApiResponse<ReportData>>(`${AdminReportsUrlConfig.api.base}/fetchReportData`, { method: 'GET', dataSchema: z.unknown() });
  },
  exportReport: async (_params?: { tab?: string; format?: string }) => {
    return apiFetch<ApiResponse<{ url: string; fileName?: string }>>(`${AdminReportsUrlConfig.api.base}/exportReport`, { method: 'POST', body: JSON.stringify(_params), dataSchema: z.unknown() });
  },
};
