import { ManagerReportsUrlConfig } from '@/app/manager/reports/reports_url_config';
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
import { apiFetch, type ApiResponse } from '@/lib/api';


export const reportsApi = {
  fetchSummary: async (params?: Record<string, string>): Promise<ApiResponse<ReportSummary>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerReportsUrlConfig.BACKEND_API.BASE}/summary${query ? `?${query}` : ''}`);
  },

  exportReportCSV: async (tab: string, params?: Record<string, string>): Promise<Blob> => {
    const query = new URLSearchParams({ tab, ...params }).toString();
    const res = await fetch(`/api/v1/manager/reports/export?${query}`);
    if (!res.ok) throw new Error('Failed to export report');
    return res.blob();
  },
};
