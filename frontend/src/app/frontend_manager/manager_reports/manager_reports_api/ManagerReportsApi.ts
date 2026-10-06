// RESPONSIBILITY: Owns Manager Reports summary transport only; manager-role report export is intentionally not implemented.
import { apiFetch } from '@/lib/api';
import { managerReportSummarySchema } from '@/app/frontend_manager/manager_reports/manager_reports_schemas/ManagerReportsSchema';
import { ManagerReportsUrlConfig } from '@/app/frontend_manager/manager_reports/manager_reports_url_config';
import type { ReportSummary } from '@/app/frontend_manager/manager_reports/manager_reports_types/ManagerReportsTypes';
import type { ApiResponse } from '@/lib/api';

/**
 * @description Retrieves the server-owned Manager Reports summary for the selected range.
 * @dependencies Uses only the global apiFetch transport and Manager Reports schema/types/URL configuration.
 * @edge-case Returns the normalized API envelope and allows the owning query hook to expose loading/error/retry state.
 */
export const ManagerReportsApi = {
  fetchReportsSummary: async (params?: Record<string, string>): Promise<ApiResponse<ReportSummary>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerReportsUrlConfig.BACKEND_API.SUMMARY}${query ? `?${query}` : ''}`, { dataSchema: managerReportSummarySchema });
  },
};
