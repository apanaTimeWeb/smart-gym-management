"use client";
// RESPONSIBILITY: Orchestrates Audit Logs server state, shareable filters, detail loading, and CSV export.
// DATA FLOW: module API / client state → useAdminAuditLogsLogic → consuming Admin feature component.
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { ADMIN_AUDIT_LOGS_QUERY_KEYS } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_constants/AdminAuditLogsQueryKeys';
import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAdminAuditLogsStore } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_store/useAdminAuditLogsStore';
import { AdminAuditLogsApi } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_api/AdminAuditLogsApi';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { AUDIT_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_constants/AdminAuditLogsConstants';
import { useAdminAuditLogsMutations } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_hooks/useAdminAuditLogsMutations';
/**
 * @description useAdminAuditLogsLogic: Orchestrates Audit Logs server state, shareable filters, detail loading, and CSV export.
 * @dependencies Consumes AdminAuditLogsQueryKeys, useAdminAuditLogsStore, AdminAuditLogsApi, useAdminLayoutUrlQuerySync, AdminAuditLogsConstants, useAdminAuditLogsMutations.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminAuditLogsLogic() {
  const store = useAdminAuditLogsStore();
  const queryClient = useQueryClient();
  useAdminLayoutUrlQuerySync([
    { key: 'actor', value: store.actorFilter, defaultValue: 'all', setValue: (val) => store.setActorFilter(val as string) },
    { key: 'action', value: store.actionFilter, defaultValue: 'all', setValue: (val) => store.setActionFilter(val as string) },
    { key: 'entity', value: store.entityFilter, defaultValue: 'all', setValue: (val) => store.setEntityFilter(val as string) },
    { key: 'from', value: store.dateFrom, defaultValue: '', setValue: (val) => store.setDateFrom(val as string) },
    { key: 'to', value: store.dateTo, defaultValue: '', setValue: (val) => store.setDateTo(val as string) },
    { key: 'page', value: store.currentPage, defaultValue: 1, setValue: (value) => store.setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const queryParams = useMemo(() => ({
    page: store.currentPage,
    limit: AUDIT_ITEMS_PER_PAGE,
    actor: store.actorFilter === 'all' ? undefined : store.actorFilter,
    action: store.actionFilter === 'all' ? undefined : store.actionFilter,
    from: store.dateFrom || undefined,
    to: store.dateTo || undefined,
    entityType: store.entityFilter === 'all' ? undefined : store.entityFilter,
  }), [store.actionFilter, store.actorFilter, store.currentPage, store.dateFrom, store.dateTo, store.entityFilter]);

  const logsQuery = useQuery({
    queryKey: ADMIN_AUDIT_LOGS_QUERY_KEYS.key('list', queryParams),
    queryFn: () => AdminAuditLogsApi.fetchAuditLogs(queryParams),
    placeholderData: (previous) => previous,
  });
  const kpiQuery = useQuery({ queryKey: ADMIN_AUDIT_LOGS_QUERY_KEYS.key('kpis'), queryFn: () => AdminAuditLogsApi.fetchAuditKPIs(), staleTime: 300_000 });
  const actorsQuery = useQuery({ queryKey: ADMIN_AUDIT_LOGS_QUERY_KEYS.key('actors'), queryFn: () => AdminAuditLogsApi.fetchActors(), staleTime: 300_000 });
  const detailQuery = useQuery({
    queryKey: ADMIN_AUDIT_LOGS_QUERY_KEYS.key('detail', store.selectedLogId),
    queryFn: () => AdminAuditLogsApi.fetchAuditLogById(store.selectedLogId as string),
    enabled: Boolean(store.selectedLogId),
  });

  const { exportMutation } = useAdminAuditLogsMutations();

  const openDetail = useCallback((id: string) => store.setSelectedLogId(id), [store]);
  const closeDetail = useCallback(() => store.setSelectedLogId(null), [store]);

  const totalItems = logsQuery.data?.meta?.total ?? logsQuery.data?.data?.length ?? 0;
  return {
    logs: logsQuery.data?.data ?? [],
    actors: actorsQuery.data?.data?.actors ?? [],
    kpis: kpiQuery.data?.data ?? null,
    status: logsQuery.status,
    detailStatus: detailQuery.status,
    detail: detailQuery.data?.data ?? null,
    detailError: getAdminBackendMessage(detailQuery.error),
    retryDetail: detailQuery.refetch,
    selectedLogId: store.selectedLogId,
    openDetail,
    closeDetail,
    actorFilter: store.actorFilter,
    setActorFilter: store.setActorFilter,
    actionFilter: store.actionFilter,
    setActionFilter: store.setActionFilter,
    entityFilter: store.entityFilter,
    setEntityFilter: store.setEntityFilter,
    dateFrom: store.dateFrom,
    setDateFrom: store.setDateFrom,
    dateTo: store.dateTo,
    setDateTo: store.setDateTo,
    currentPage: store.currentPage,
    setCurrentPage: store.setCurrentPage,
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / AUDIT_ITEMS_PER_PAGE)),
    isExporting: exportMutation.isPending,
    exportAuditLogs: () => exportMutation.mutate({ actor: queryParams.actor, action: queryParams.action, from: queryParams.from, to: queryParams.to, entityType: queryParams.entityType }),
    retryList: logsQuery.refetch,
    invalidateLogs: () => queryClient.invalidateQueries({ queryKey: ADMIN_AUDIT_LOGS_QUERY_KEYS.key('list') }),
  };
}
