// DATA FLOW: feature API/schema → hook/context → useSuperadminSystemClient consumers.

'use client';
// RESPONSIBILITY: Owns System page client-state, TanStack Query calls, mutation handling, URL-backed audit-log filters, and CSV export. The view consumes this hook and only renders the resulting state.
import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { systemApi } from '@/app/superadmin/system/system_api/superadmin_system_api';
import type { ApiResponse } from '@/lib/api';
import type { SuperadminSystemAuditLog, SuperadminSystemTenant } from '@/app/superadmin/system/system_types/superadmin_system_types';

const CURRENT_SCHEMA_VERSION = process.env.NEXT_PUBLIC_CURRENT_SCHEMA_VERSION || 'v2.4.1';
const ITEMS_PER_PAGE = 10;

export function useSuperadminSystemClient() {
  const [tab, setTab] = useState<'migrations' | 'sla'>('migrations');
  const [migratingTenants, setMigratingTenants] = useState<Record<string, boolean>>({});
  const { getParam, setParam } = useSuperadminUrlState();
  const logSearch = getParam('logSearch', '');
  const currentPage = Number(getParam('page', '1'));
  const queryParams = useMemo(() => {
    const params: Record<string, string> = { page: String(currentPage), limit: String(ITEMS_PER_PAGE) };
    if (logSearch) params.search = logSearch;
    return params;
  }, [currentPage, logSearch]);
  const queryClient = useQueryClient();
  const migrationsQuery = useQuery({ queryKey: ['superadmin', 'system-migrations'], queryFn: () => systemApi.fetchMigrations() });
  const auditQuery = useQuery({ queryKey: ['superadmin', 'auditLogs', queryParams], queryFn: () => systemApi.fetchAuditLogs(queryParams) });
  const migrationsData = migrationsQuery.data?.data;
  const tenants = migrationsData?.tenants ?? [];
  const auditData = auditQuery.data as ApiResponse<SuperadminSystemAuditLog[]> & { meta?: { total?: number } } | undefined;
  const logs = auditData?.data ?? [];
  const totalLogs = auditData?.meta?.total ?? logs.length;
  const totalPages = Math.max(1, Math.ceil(totalLogs / ITEMS_PER_PAGE));
  const handleRunMigration = async (tenantId: string) => {
    setMigratingTenants(prev => ({ ...prev, [tenantId]: true }));
    try {
      const response = await systemApi.startMigration(tenantId);
      queryClient.setQueryData(['superadmin', 'system-migrations'], (old: { data?: { tenants?: SuperadminSystemTenant[] } } | undefined) => {
        if (!old?.data?.tenants) return old;
        return { ...old, data: { ...old.data, tenants: old.data.tenants.map((tenant) => tenant.id === tenantId ? { ...tenant, databaseVersion: CURRENT_SCHEMA_VERSION } : tenant) } };
      });
      toast.success(response.message || 'Migration completed successfully', { id: 'successfully-migrated-database-for-tenant-tenantid' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Migration failed', { id: 'migration-failed-please-check-logs' });
    } finally {
      setMigratingTenants(prev => ({ ...prev, [tenantId]: false }));
    }
  };
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Target', 'Actor', 'Role', 'Action'];
    const csv = [headers.join(','), ...logs.map(log => [new Date(log.timestamp).toISOString(), `"${log.targetResource}"`, `"${log.actorName}"`, `"${log.actorRole}"`, `"${log.action}"`].join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`; link.click(); URL.revokeObjectURL(link.href);
    toast.success('Audit logs exported successfully', { id: 'audit-logs-exported-successfully' });
  };
  return { tab, setTab, logSearch, setLogSearch: (value: string) => { setParam('logSearch', value); setParam('page', '1'); }, currentPage, setCurrentPage: (value: number) => setParam('page', String(value)), migratingTenants, tenants, logs, totalPages, isLoading: migrationsQuery.isLoading || auditQuery.isLoading, isError: migrationsQuery.isError || auditQuery.isError, handleRunMigration, handleExportCSV };
}
