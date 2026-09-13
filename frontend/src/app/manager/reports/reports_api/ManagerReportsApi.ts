// RESPONSIBILITY: Strongly-typed API calls for the Manager Reports module (mock until backend ready).
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
import { apiFetch } from '@/lib/api';
import { ManagerReportsUrlConfig } from '@/app/manager/reports/ManagerReportsUrlConfig';

export const reportsApi = {
  fetchSummary: async (params?: Record<string, string>): Promise<ReportSummary> => {
    const qs = new URLSearchParams(params).toString();
    const q = qs ? `?${qs}` : '';
    const res = await apiFetch<any>(`${ManagerReportsUrlConfig.BACKEND_API.SUMMARY}${q}`);
    return res.data || res;
  },

  exportReportCSV: async (tab: string, params?: Record<string, string>): Promise<Blob> => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}${ManagerReportsUrlConfig.BACKEND_API.EXPORT}?tab=${tab}&${qs}`);
    if (!res.ok) throw new Error('Failed to export CSV');
    return res.blob();
  },
};
