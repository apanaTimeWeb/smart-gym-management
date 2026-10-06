"use client";

// DATA FLOW: Audit export action → mutation hook → AdminAuditLogsApi → browser download/cache refresh → user feedback.
// RESPONSIBILITY: Owns the Admin Audit Logs export mutation and binary-download lifecycle.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { AdminAuditLogsApi } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_api/AdminAuditLogsApi';
import type { AuditLogExportFilters } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_types/AdminAuditLogsTypes';
import { ADMIN_AUDIT_LOGS_QUERY_KEYS } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_constants/AdminAuditLogsQueryKeys';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';

/**
 * @description useAdminAuditLogsMutations: Owns the Admin Audit Logs export mutation and binary-download lifecycle.
 * @dependencies Consumes AdminAuditLogsApi, AdminAuditLogsQueryKeys, AdminLayoutToastService, AdminLayoutBackendMessage.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminAuditLogsMutations() {
  const locale = useLocale();
  const queryClient = useQueryClient();
  const exportMutation = useMutation({
    mutationFn: (params: AuditLogExportFilters) => AdminAuditLogsApi.exportAuditLogs(params, locale),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      const exportMessage = getAdminBackendMessage(blob);
      if (exportMessage) adminToast.success(exportMessage, 'admin-audit-export-success');
      void queryClient.invalidateQueries({ queryKey: ADMIN_AUDIT_LOGS_QUERY_KEYS.key('list') });
    },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin-audit-export-error'); },
  });
  return { exportMutation };
}
