// RESPONSIBILITY: API client for the Reports module. All network calls for report data.
import { apiFetch, ApiResponse } from '@/lib/api';
import type { ReportData } from '@/app/admin/reports/reports_types/reports_types';

export const reportsApi = {
  fetchReportData: async (params?: { dateRange?: string; gymId?: string; startDate?: string; endDate?: string }): Promise<ApiResponse<ReportData>> => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return apiFetch<ApiResponse<ReportData>>(`/api/admin/reports/data${q}`);
  },
  exportReport: async (_params?: { tab?: string; format?: string }): Promise<ApiResponse<{ url: string }>> => {
    return { success: true, message: 'Export ready', data: { url: '#' } };
  },
};
