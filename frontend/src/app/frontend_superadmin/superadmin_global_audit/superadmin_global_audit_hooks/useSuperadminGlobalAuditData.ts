'use client';// DATA FLOW: Inputs enter useSuperadminGlobalAuditData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
import { SUPERADMIN_AUDIT_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditConstants';

// RESPONSIBILITY: Owns Global Audit Logs query state for the Superadmin audit route.
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { auditLogsApi } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditApi';
import { SUPERADMIN_AUDIT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditQueryKeys';

import type { AuditActorFilter, AuditSeverityFilter } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditFilterTypes';
import type { AuditLog } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes';


/**
 * Purpose: Fetches paginated audit logs from the feature API and exposes stable Query state.
 * Inputs: URL-backed search and filter values.
 * Output: logs, pagination metadata, loading/error/refetch state.
 * Side effects: TanStack Query cache only.
 * Invariant: server filtering and pagination remain part of the API contract.
 */
/**
 * @description Manages global audit state, queries, and UI interactions for useSuperadminGlobalAuditData.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGlobalAuditData → consuming feature component.
export function useSuperadminGlobalAuditData(search: string, severity: AuditSeverityFilter, actorType: AuditActorFilter, currentPage: number, pageSize: number) {
  const t = useTranslations('superadmin_global_audit');
  const queryParams = useMemo(() => ({
    page: String(currentPage),
    limit: String(pageSize),
    ...(search ? { search } : {}),
    ...(severity !== SUPERADMIN_AUDIT_FILTER_ALL ? { severity } : {}),
    ...(actorType !== SUPERADMIN_AUDIT_FILTER_ALL ? { actorType } : {}),
  }), [search, severity, actorType, currentPage, pageSize]);
  const query = useQuery({
    queryKey: SUPERADMIN_AUDIT_QUERY_KEYS.list(queryParams),
    queryFn: async () => {
      const response = await auditLogsApi.fetchGlobalLogs(queryParams);
      if (!response.success || !response.data) throw new Error(t('ui.global_audit_logs_unavailable_repair'));
      return response;
    },
  });
  const logs: AuditLog[] = query.data?.data ?? [];
  const total = query.data?.meta?.total ?? logs.length;
  return {
    queryParams,
    logs,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    isPending: query.isPending,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
