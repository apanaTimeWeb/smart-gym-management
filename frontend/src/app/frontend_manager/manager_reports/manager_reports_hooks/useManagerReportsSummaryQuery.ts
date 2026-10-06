'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerReportsApi } from '@/app/frontend_manager/manager_reports/manager_reports_api/ManagerReportsApi';
import { ManagerReportsQueryKeys } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsQueryKeys';

/**
 * @description Owns the Manager Reports summary server-state query for a selected date range.
 * @dependencies Uses ManagerReportsApi and ManagerReportsQueryKeys only.
 * @edge-case Query identity changes with the date range so switching ranges cannot reuse stale summary data.
 */
export function useManagerReportsSummaryQuery(dateRange: string) {
  return useQuery({
    queryKey: ManagerReportsQueryKeys.summary({ range: dateRange }),
    queryFn: async () => (await ManagerReportsApi.fetchReportsSummary({ range: dateRange })).data ?? null,
  });
}
