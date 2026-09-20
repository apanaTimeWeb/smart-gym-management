// DATA FLOW: Inputs enter useSuperadminGlobalAuditData, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Global Audit Logs query state for the Superadmin audit route.
'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditLogsApi } from '@/app/superadmin/global-audit/global-audit_api/SuperadminGlobalAuditApi';
import type { AuditLog } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditTypes';
import type { AuditActorFilter, AuditSeverityFilter } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditFilterTypes';
/**
 * Purpose: Fetches paginated audit logs from the feature API and exposes stable Query state.
 * Inputs: URL-backed search and filter values.
 * Output: logs, pagination metadata, loading/error/refetch state.
 * Side effects: TanStack Query cache only.
 * Invariant: server filtering and pagination remain part of the API contract.
 */
export function useSuperadminGlobalAuditData(search: string, severity: AuditSeverityFilter, actorType: AuditActorFilter, currentPage: number, pageSize: number) {
  const queryParams = useMemo(() => ({
    page: String(currentPage),
    limit: String(pageSize),
    ...(search ? { search } : {}),
    ...(severity !== 'ALL' ? { severity } : {}),
    ...(actorType !== 'ALL' ? { actorType } : {}),
  }), [search, severity, actorType, currentPage, pageSize]);
  const query = useQuery({
    queryKey: ['superadmin', 'global-audit', queryParams],
    queryFn: async () => {
      const response = await auditLogsApi.fetchGlobalLogs(queryParams);
      if (!response.success || !response.data) throw new Error(response.message);
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
