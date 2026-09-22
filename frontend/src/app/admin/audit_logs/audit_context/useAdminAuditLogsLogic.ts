"use client";
import { format } from 'date-fns';
// RESPONSIBILITY: Coordinates Audit Logs filter state with the module API; export logic consumes the currently query-scoped data.
// DATA FLOW: URL/store filters → Audit API query params → Zod/MSW → TanStack Query → table/export.
import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '@/app/admin/audit_logs/audit_api/AdminAuditLogsApi';
import { useAdminAuditLogsStore } from '@/app/admin/audit_logs/audit_store/useAdminAuditLogsStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import { AUDIT_ITEMS_PER_PAGE } from '@/app/admin/audit_logs/audit_utils/AdminAuditLogsSharedConstants';
import type { AuditLog, AdminAuditLogsQueryParams, AuditSeverity, AuditModule } from '@/app/admin/audit_logs/audit_types/AdminAuditLogsTypes';

/** Coordinates AuditLogsLogic state, data flow, and feature behavior. */
export function useAdminAuditLogsLogic() {
  const { search, severityFilter, moduleFilter, branchFilter, dateFrom, dateTo, currentPage, setCurrentPage } = useAdminAuditLogsStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminAuditLogsStore.getState().setSearch },
    { key: 'severity', value: severityFilter, defaultValue: 'all', setValue: useAdminAuditLogsStore.getState().setSeverityFilter },
    { key: 'module', value: moduleFilter, defaultValue: 'all', setValue: useAdminAuditLogsStore.getState().setModuleFilter },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminAuditLogsStore.getState().setBranchFilter },
    { key: 'dateFrom', value: dateFrom, defaultValue: '', setValue: useAdminAuditLogsStore.getState().setDateFrom },
    { key: 'dateTo', value: dateTo, defaultValue: '', setValue: useAdminAuditLogsStore.getState().setDateTo },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const params: AdminAuditLogsQueryParams = {
    page: currentPage,
    limit: AUDIT_ITEMS_PER_PAGE,
    search: search || undefined,
    severity: severityFilter === 'all' ? undefined : (severityFilter as AuditSeverity),
    module: moduleFilter === 'all' ? undefined : (moduleFilter as AuditModule),
    branchId: branchFilter === 'all' ? undefined : branchFilter,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  };
  const logsQuery = useQuery({ queryKey: ['admin', 'audit-logs', 'list', params], queryFn: () => auditLogsApi.fetchLogs(params), staleTime: 1000 * 60 * 2 });
  const { data: kpis } = useQuery({ queryKey: ['admin', 'audit-logs', 'kpis'], queryFn: () => auditLogsApi.fetchKPIs(), staleTime: 1000 * 60 * 5 });
  const paginated = logsQuery.data?.data ?? [];
  const totalItems = logsQuery.data?.meta?.total ?? paginated.length;

  function exportCSV(rows: AuditLog[]) {
    const headers = ['Timestamp', 'Action', 'Module', 'User', 'Branch', 'Details', 'Severity', 'IP', 'User Agent'];
    const csvRows = rows.map((log) => [format(new Date(log.timestamp), 'dd MMM yyyy, hh:mm a'), log.action, log.module, log.user, log.branchId, `"${log.details.replace(/"/g, '""')}"`, log.severity, log.ip, log.userAgent ?? '']);
    const csv = [headers, ...csvRows].map((row) => row.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`; anchor.click(); URL.revokeObjectURL(url);
  }

  return { paginated, filtered: paginated, status: logsQuery.status, kpis: kpis?.data ?? null, currentPage, setCurrentPage, totalPages: Math.max(1, Math.ceil(totalItems / AUDIT_ITEMS_PER_PAGE)), totalItems };
}
