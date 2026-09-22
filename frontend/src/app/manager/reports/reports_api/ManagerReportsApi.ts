import { apiFetch } from '@/lib/api';
import { managerReportSummarySchema } from '@/app/manager/reports/reports_schemas/ManagerReportsSchema';
import { ManagerReportsUrlConfig } from '@/app/manager/reports/reports_url_config';
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
import type { ApiResponse } from '@/lib/api';




/** Downloads the binary export endpoint; raw fetch is intentionally isolated here because the approved global transport returns JSON contracts. */
export async function downloadManagerReportsBinary(url: string): Promise<Blob> {
  const response = await fetch(url, { credentials: 'include', headers: { Accept: 'text/csv, application/octet-stream' } });
  if (!response.ok) {
    let message = 'Unable to export the report. Please try again.';
    try {
      const payload: unknown = await response.clone().json();
      if (typeof payload === 'object' && payload !== null && 'message' in payload) {
        const candidate = (payload as { message?: unknown }).message;
        if (typeof candidate === 'string' && candidate.trim()) message = candidate;
      }
    } catch {
      // Safe fallback when the response body is not JSON.
    }
    throw new Error(message);
  }
  return response.blob();
}

export const reportsApi = {
  fetchReportsSummary: async (params?: Record<string, string>): Promise<ApiResponse<ReportSummary>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${ManagerReportsUrlConfig.BACKEND_API.SUMMARY}${query ? `?${query}` : ''}`, { dataSchema: managerReportSummarySchema });
  } };
