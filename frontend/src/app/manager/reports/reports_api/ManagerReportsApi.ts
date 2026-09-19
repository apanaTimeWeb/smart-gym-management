import { ManagerReportsUrlConfig } from '@/app/manager/reports/reports_url_config';
import { managerReportSummarySchema } from '@/app/manager/reports/reports_schemas/ManagerReportsSchema';
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
import { downloadManagerReportsBinary } from '@/app/manager/reports/reports_api/ManagerReportsBinaryDownload';
import { apiFetch, type ApiResponse } from '@/lib/api';


export const reportsApi = {
  fetchSummary: async (params?: Record<string, string>): Promise<ApiResponse<ReportSummary>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerReportsUrlConfig.BACKEND_API.SUMMARY}${query ? `?${query}` : ''}`, { dataSchema: managerReportSummarySchema });
  },

  exportReportsReport: async (tab: string, params?: Record<string, string>): Promise<Blob> => {
    const query = new URLSearchParams({ tab, ...params }).toString();
    return downloadManagerReportsBinary(`${ManagerReportsUrlConfig.BACKEND_API.EXPORT}?${query}`);
  } };
