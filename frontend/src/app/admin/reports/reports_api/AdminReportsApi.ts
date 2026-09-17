// RESPONSIBILITY: Owns typed HTTP access for Admin report data and report-export requests.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminReportsUrlConfig } from '@/app/admin/reports/admin_reports_url_config';
import { reportDataSchema } from '@/app/admin/reports/reports_types/AdminReportsSchemas';
import type { AdminReportsExportFormat, AdminReportsExportResponse, AdminReportsQueryParams, ReportData } from '@/app/admin/reports/reports_types/AdminReportsTypes';

function buildQuery(params?: AdminReportsQueryParams): string {
  const q = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value) q.set(key, value); });
  return q.toString() ? `?${q.toString()}` : '';
}

export const reportsApi = {
  fetchReportData: async (params?: AdminReportsQueryParams) => apiFetch<ApiResponse<ReportData>>(`${AdminReportsUrlConfig.api.base}/fetchReportData${buildQuery(params)}`, { method: 'GET', dataSchema: reportDataSchema }),
  exportReport: async (params?: { tab?: string; format?: AdminReportsExportFormat }) => apiFetch<ApiResponse<AdminReportsExportResponse>>(`${AdminReportsUrlConfig.api.base}/exportReport`, { method: 'POST', body: JSON.stringify(params ?? {}), dataSchema: z.object({ url: z.string(), fileName: z.string().optional() }) }),
};
