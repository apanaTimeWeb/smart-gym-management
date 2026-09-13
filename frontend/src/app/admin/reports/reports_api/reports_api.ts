// RESPONSIBILITY: API client for the Reports module. All network calls for report data.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ReportData } from '@/app/admin/reports/reports_types/reports_types';

import { MOCK_ADMIN_REPORTS } from '@/app/admin/reports/reports_api/AdminReportsMockData';

export const reportsApi = {
  fetchReportData: async (params?: { dateRange?: string; gymId?: string; startDate?: string; endDate?: string }): Promise<ApiResponse<ReportData>> => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_REPORTS };
  },
  exportReport: async (_params?: { tab?: string; format?: string }): Promise<ApiResponse<{ url: string }>> => {
    await new Promise(res => setTimeout(res, 600));
    return { success: true, message: 'Export ready', data: { url: '#' } };
  },
};
