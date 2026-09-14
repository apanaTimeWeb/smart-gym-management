// RESPONSIBILITY: API client for the Reports module. All network calls for report data.
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { ReportData } from '@/app/admin/reports/reports_types/reports_types';
import { z } from "zod";

export const reportsApi = {
  fetchReportData: async (params?: { dateRange?: string; gymId?: string; startDate?: string; endDate?: string }) => {
            return apiFetch('/api/admin/reports/fetchReportData', { method: 'GET', dataSchema: z.unknown() });
        },
  exportReport: async (_params?: { tab?: string; format?: string }) => {
            return apiFetch('/api/admin/reports/exportReport', { method: 'POST', body: JSON.stringify(_params), dataSchema: z.unknown() });
        },
};
