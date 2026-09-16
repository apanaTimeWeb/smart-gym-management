"use client";
// RESPONSIBILITY: Custom hook managing async fetching and state for the Reports module.
// DATA FLOW: page.tsx → AdminReportsMain → useAdminReportsLogic → reportsApi

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { reportsApi } from '@/app/admin/reports/reports_api/AdminReportsApi';
import { useAdminReportsStore } from '@/app/admin/reports/reports_store/useAdminReportsStore';
import type { ReportDateRange } from '@/app/admin/reports/reports_types/AdminReportsTypes';

export function useAdminReportsLogic() {
  const searchParams = useSearchParams();
  const dateRange = (searchParams.get('range') as ReportDateRange) || 'this_month';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const { selectedGymId } = useAdminReportsStore();

  const reportQuery = useQuery({
    queryKey: ['admin', 'reports', 'list', dateRange, startDate, endDate, selectedGymId],
    queryFn: () => reportsApi.fetchReportData({ dateRange, gymId: selectedGymId, startDate, endDate }).then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const status = reportQuery.status;
  const data = reportQuery.data;

  return { reportData: data ?? null, status };
}