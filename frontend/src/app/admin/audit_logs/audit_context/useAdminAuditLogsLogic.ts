"use client";
// DATA FLOW: feature API/schema → hook/context → useAdminAuditLogsLogic consumers.
// RESPONSIBILITY: Business logic hook for Audit Logs — filtering, pagination, CSV export.

import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '@/app/admin/audit_logs/audit_api/AdminAuditApi';
import { useAdminAuditLogsStore } from '@/app/admin/audit_logs/audit_store/useAdminAuditLogsStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { AUDIT_ITEMS_PER_PAGE } from '@/app/admin/audit_logs/audit_utils/AdminAuditLogsSharedConstants';
import type { AuditLog } from '@/app/admin/audit_logs/audit_types/AdminAuditTypes';

export function useAdminAuditLogsLogic() {
  const {
    search, severityFilter, moduleFilter, branchFilter,
    dateFrom, dateTo, currentPage, setCurrentPage,
  } = useAdminAuditLogsStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminAuditLogsStore.getState().setSearch },
    { key: 'severity', value: severityFilter, defaultValue: 'all', setValue: useAdminAuditLogsStore.getState().setSeverityFilter },
    { key: 'module', value: moduleFilter, defaultValue: 'all', setValue: useAdminAuditLogsStore.getState().setModuleFilter },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminAuditLogsStore.getState().setBranchFilter },
    { key: 'dateFrom', value: dateFrom, defaultValue: '', setValue: useAdminAuditLogsStore.getState().setDateFrom },
    { key: 'dateTo', value: dateTo, defaultValue: '', setValue: useAdminAuditLogsStore.getState().setDateTo },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const logsQuery = useQuery({
    queryKey: ['admin', 'audit-logs', 'list'],
    queryFn: () => auditLogsApi.fetchLogs().then((r) => r.data || []),
    staleTime: 1000 * 60 * 2,
  });
  
  const logs = logsQuery.data || [];

  const { data: kpis } = useQuery({
    queryKey: ['admin', 'audit-logs', 'kpis'],
    queryFn: () => auditLogsApi.fetchKPIs().then((r) => r.data || null),
    staleTime: 1000 * 60 * 5,
  });

  const status = logsQuery.status;

  const filtered = logs.filter((log: AuditLog) => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      log.details.toLowerCase().includes(q) ||
      log.user.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.ip.includes(q);
    const matchSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchBranch = branchFilter === 'all' || log.branchId === branchFilter || log.branchId === 'all';
    const logDate = new Date(log.timestamp);
    const matchFrom = !dateFrom || logDate >= new Date(dateFrom);
    const matchTo = !dateTo || logDate <= new Date(dateTo + 'T23:59:59');
    return matchSearch && matchSeverity && matchModule && matchBranch && matchFrom && matchTo;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / AUDIT_ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * AUDIT_ITEMS_PER_PAGE, currentPage * AUDIT_ITEMS_PER_PAGE);

  function exportCSV(rows: AuditLog[]) {
    const headers = ['Timestamp', 'Action', 'Module', 'User', 'Branch', 'Details', 'Severity', 'IP', 'User Agent'];
    const csvRows = rows.map(l => [
      new Date(l.timestamp).toLocaleString('en-IN'),
      l.action,
      l.module,
      l.user,
      l.branchId,
      `"${l.details.replace(/"/g, '""')}"`,
      l.severity,
      l.ip,
      l.userAgent ?? '',
    ]);
    const csv = [headers, ...csvRows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    paginated, filtered, status, kpis,
    currentPage, setCurrentPage, totalPages, totalItems: filtered.length,
    exportCSV,
  };
}