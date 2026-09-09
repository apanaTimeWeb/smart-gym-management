// RESPONSIBILITY: Strongly-typed API calls for the Manager Reports module (mock until backend ready).
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
export const reportsApi = {
  fetchSummary: async (params?: Record<string, string>): Promise<ReportSummary> => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`/api/manager/reports/summary?${qs}`);
    if (!res.ok) throw new Error('Failed to fetch summary');
    return res.json();
  },

  exportReportCSV: async (tab: string, params?: Record<string, string>): Promise<Blob> => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`/api/manager/reports/export?tab=${tab}&${qs}`);
    if (!res.ok) throw new Error('Failed to export CSV');
    return res.blob();
  },
};
