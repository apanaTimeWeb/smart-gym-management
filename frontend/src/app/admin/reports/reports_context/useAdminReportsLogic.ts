"use client";
// RESPONSIBILITY: Owns Reports server queries and export mutations while the page components remain view-only.
// DATA FLOW: URL/store filters → TanStack Query → report API → typed data; export action → mutation → feedback/file.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { reportsApi } from '@/app/admin/reports/reports_api/AdminReportsApi';
import { useAdminReportsStore } from '@/app/admin/reports/reports_store/useAdminReportsStore';
import type { AdminReportsExportFormat, AdminReportsExportResponse, ReportDateRange } from '@/app/admin/reports/reports_types/AdminReportsTypes';

/** Coordinates ReportsLogic state, data flow, and feature behavior. */
export function useAdminReportsLogic() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const dateRange = (searchParams.get('range') as ReportDateRange) || 'this_month';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const { activeTab, selectedGymId } = useAdminReportsStore();

  const reportQuery = useQuery({
    queryKey: ['admin', 'reports', 'list', dateRange, startDate, endDate, selectedGymId],
    queryFn: () => reportsApi.fetchReportData({ dateRange, gymId: selectedGymId, startDate, endDate }).then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const exportMutation = useMutation<AdminReportsExportResponse, Error, AdminReportsExportFormat>({
    mutationFn: async (format) => {
      const response = await reportsApi.exportReport({ tab: activeTab, format });
      if (!response.data?.url || response.data.url === '#') {
        throw new Error('Export service did not provide a downloadable file.');
      }
      return response.data;
    },
    onSuccess: (response, format) => {
      const extension = format === 'excel' ? 'xlsx' : 'pdf';
      const fileName = response.fileName ?? `report-${activeTab}-${dateRange}.${extension}`;
      const link = document.createElement('a');
      link.href = response.url;
      link.download = fileName;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      adminToast.success('Export completed successfully', 'admin-reports-export');
      void queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] });
    },
    onError: (error) => {
      adminToast.error(error.message, 'admin-reports-export');
    },
  });

  return {
    reportData: reportQuery.data ?? null,
    status: reportQuery.status,
    exportReport: exportMutation.mutate,
    isExporting: exportMutation.isPending,
  };
}
