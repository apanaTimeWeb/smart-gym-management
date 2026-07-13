// RESPONSIBILITY: Custom hook for AuditTable. Reads filters from the URL, fetches logs from the backend, and handles pagination.
// DATA FLOW: URL Search Params -> useAuditTable -> apiFetch -> AuditTable UI
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { AuditLog, AuditLogResponse } from '@/app/erp/audit/audit_types/audit_types';
import { auditApi } from '@/app/erp/audit/audit_api/audit_api';

export const useAuditTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10;
  const entityType = searchParams.get('entityType') || '';
  const actorId = searchParams.get('actorId') || '';

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      if (entityType) queryParams.append('entityType', entityType);
      if (actorId) queryParams.append('actorId', actorId);

      const data = await auditApi.getLogs(Object.fromEntries(queryParams));
      
      // If the backend wraps in { data: AuditLog[], meta: { total: number } } 
      // instead of the new AuditLogResponse, we handle both defensively.
      const responseData = data.data as unknown as { data: AuditLog[], meta: { total: number } } | AuditLogResponse;
      
      if ('logs' in responseData) {
        setLogs(responseData.logs || []);
        setTotalCount(responseData.total || 0);
      } else {
        setLogs(responseData.data || []);
        setTotalCount(responseData.meta?.total || 0);
      }
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [page, limit, entityType, actorId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const setCurrentPage = (newPage: number) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set('page', newPage.toString());
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return {
    logs,
    loading,
    error,
    page,
    limit,
    totalCount,
    setCurrentPage,
  };
};
