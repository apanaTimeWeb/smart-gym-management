// RESPONSIBILITY: Strongly-typed API calls for the Manager Reports module (mock until backend ready).
import type { ReportSummary } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
import { apiFetch } from '@/lib/api';
import { ManagerReportsUrlConfig } from '@/app/manager/reports/ManagerReportsUrlConfig';

import { MOCK_REPORT_SUMMARY } from '@/app/manager/reports/reports_fixtures/ManagerReportsMockData';

export const reportsApi = {
  fetchSummary: async (params?: Record<string, string>): Promise<ReportSummary> => {
    await new Promise(res => setTimeout(res, 300));
    return MOCK_REPORT_SUMMARY;
  },

  exportReportCSV: async (tab: string, params?: Record<string, string>): Promise<Blob> => {
    await new Promise(res => setTimeout(res, 300));
    return new Blob(['Mock CSV content'], { type: 'text/csv' });
  },
};
