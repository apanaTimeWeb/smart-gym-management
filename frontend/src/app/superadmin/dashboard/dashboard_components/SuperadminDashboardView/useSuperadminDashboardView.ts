// DATA FLOW: URL search params → useSuperadminDashboardView.ts → TanStack Query → SuperadminDashboardView → Dashboard child components
// RESPONSIBILITY: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { superadminDashboardApi } from '@/app/superadmin/dashboard/dashboard_api/superadmin_dashboard_api';
import type { TimeRange, SuperadminDashboardApiData } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';

export function useSuperadminDashboardView() {
  const searchParams = useSearchParams();

  const timeRange = (searchParams.get('range') as TimeRange) ?? 'this_month';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'dashboard', timeRange, startDate, endDate],
    queryFn: () => {
      const params: Record<string, string> = { range: timeRange };
      if (timeRange === 'custom') {
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
      }
      return superadminDashboardApi.fetchDashboardData(params);
    },
  });


  const apiData = fetchRes?.data;

  return {
    isLoading,
    isError,
    apiData,
    timeRange
  };
}
