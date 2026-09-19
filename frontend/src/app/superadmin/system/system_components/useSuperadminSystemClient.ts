// DATA FLOW: Superadmin UI → useSuperadminSystemClient → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminSystemClient consumers.
// RESPONSIBILITY: Owns System page client-state, TanStack Query calls, mutation handling, URL-backed audit-log filters, and CSV export. The view consumes this hook and only renders the resulting state.
import { useMemo, useState } from 'react';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUrlState } from '@/hooks/useUrlState';
import { systemApi } from '@/app/superadmin/system/system_api/SuperadminSystemApi';
import type { ApiResponse } from '@/lib/api';
import { SuperadminSystemRuntimeConfig } from '@/app/superadmin/system/system_utils/SuperadminSystemRuntimeConfig';
import type { SuperadminSystemAuditLog, SuperadminSystemTenant } from '@/app/superadmin/system/system_types/superadmin_system_types';
const CURRENT_SCHEMA_VERSION = SuperadminSystemRuntimeConfig.currentSchemaVersion;
const ITEMS_PER_PAGE = SuperadminSystemRuntimeConfig.auditLogPageSize;
/**
 * Purpose: Owns System page client-state, TanStack Query calls, mutation handling, URL-backed audit-log filters, and CSV export. The view consumes this hook and only renders the resulting state.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminSystemClient() {
    const [tab, setTab] = useState<'migrations' | 'sla'>('migrations');
    const [migratingTenants, setMigratingTenants] = useState<Record<string, boolean>>({});
    const { getParam, setParam } = useUrlState();
    const logSearch = getParam('logSearch', '');
    const currentPage = Number(getParam('page', '1'));
    const queryParams = useMemo(() => {
        const params: Record<string, string> = { page: String(currentPage), limit: String(ITEMS_PER_PAGE) };
        if (logSearch)
            params.search = logSearch;
        return params;
    }, [currentPage, logSearch]);
    const queryClient = useQueryClient();
    const { confirm } = useSuperadminConfirm();
    const migrationsQuery = useQuery({ queryKey: ['superadmin', 'system-migrations'], queryFn: () => systemApi.fetchMigrations() });
    const auditQuery = useQuery({ queryKey: ['superadmin', 'auditLogs', queryParams], queryFn: () => systemApi.fetchAuditLogs(queryParams) });
    const migrationsData = migrationsQuery.data?.data;
    const tenants = migrationsData?.tenants ?? [];
    const auditData = auditQuery.data as ApiResponse<SuperadminSystemAuditLog[]> & {
        meta?: {
            total?: number;
        };
    } | undefined;
    const logs = auditData?.data ?? [];
    const totalLogs = auditData?.meta?.total ?? logs.length;
    const totalPages = Math.max(1, Math.ceil(totalLogs / ITEMS_PER_PAGE));
    const handleRunMigration = async (tenantId: string) => {
        const confirmed = await confirm({ title: 'Run Schema Migration', message: 'Run the current schema migration for this tenant? This changes tenant database state.', type: 'warning', confirmText: 'Run Migration', cancelText: 'Cancel' });
        if (!confirmed) return;
        const idempotencyKey = crypto.randomUUID();
        setMigratingTenants(prev => ({ ...prev, [tenantId]: true }));
        try {
            const response = await systemApi.startMigration(tenantId, idempotencyKey);
            queryClient.setQueryData(['superadmin', 'system-migrations'], (old: {
                data?: {
                    tenants?: SuperadminSystemTenant[];
                };
            } | undefined) => {
                if (!old?.data?.tenants)
                    return old;
                return { ...old, data: { ...old.data, tenants: old.data.tenants.map((tenant) => tenant.id === tenantId ? { ...tenant, databaseVersion: CURRENT_SCHEMA_VERSION } : tenant) } };
            });
            toast.success(response.message, { id: `superadmin-system-migration-${tenantId}` });
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : '', { id: `superadmin-system-migration-error-${tenantId}` });
        }
        finally {
            setMigratingTenants(prev => ({ ...prev, [tenantId]: false }));
        }
    };
    const handleExportCSV = () => {
        const headers = ['Timestamp', 'Target', 'Actor', 'Role', 'Action'];
        const csv = [headers.join(','), ...logs.map(log => [new Date(log.timestamp).toISOString(), `"${log.targetResource}"`, `"${log.actorName}"`, `"${log.actorRole}"`, `"${log.action}"`].join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
        
    };
    const refetch = async () => { await Promise.all([migrationsQuery.refetch(), auditQuery.refetch()]); };
    return { tab, setTab, logSearch, setLogSearch: (value: string) => { setParam('logSearch', value); setParam('page', '1'); }, currentPage, setCurrentPage: (value: number) => setParam('page', String(value)), migratingTenants, tenants, logs, totalPages, isPending: migrationsQuery.isPending || auditQuery.isPending, isError: migrationsQuery.isError || auditQuery.isError, handleRunMigration, handleExportCSV, refetch };
}
