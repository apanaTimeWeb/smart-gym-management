"use client";

// DATA FLOW: Report export action → mutation hook → AdminReportsApi → browser download/cache refresh → report UI.
// RESPONSIBILITY: Owns Admin Reports export transport and download behavior.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { AdminReportsApi } from '@/app/frontend_admin/admin_reports/admin_reports_api/AdminReportsApi';
import { ADMIN_REPORTS_QUERY_KEYS } from '@/app/frontend_admin/admin_reports/admin_reports_constants/AdminReportsQueryKeys';
import type { AdminReportsExportFormat, AdminReportsExportParams } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsTypes';

/**
 * @description useAdminReportsMutations: Owns Admin Reports export transport and download behavior.
 * @dependencies Consumes AdminReportsApi, AdminReportsQueryKeys, AdminReportsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminReportsMutations() {
  const locale = useLocale();
  const queryClient = useQueryClient();
  const exportMutation = useMutation({
    mutationFn: (params: AdminReportsExportParams) => AdminReportsApi.exportReport(params, locale),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_REPORTS_QUERY_KEYS.key('list') });
    },
  });
  const exportReport = async (params: AdminReportsExportParams): Promise<void> => {
    const blob = await exportMutation.mutateAsync(params);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `admin-${params.type}.${params.format as AdminReportsExportFormat}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return { exportMutation, exportReport };
}
