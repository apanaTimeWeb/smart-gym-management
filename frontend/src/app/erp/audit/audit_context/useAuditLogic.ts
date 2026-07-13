// RESPONSIBILITY: useAuditLogic.ts handles the central logic and UI state for the Audit module.
import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { AuditLog, AuditLogResponse } from '@/app/erp/audit/audit_types/audit_types';
import { auditApi } from '@/app/erp/audit/audit_api/audit_api';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { AUDIT_ENTITY_TYPES } from '@/app/erp/audit/audit_utils/AuditSharedConstants';

export function useAuditLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10;
  const entityType = searchParams.get('entityType') || '';
  const actorId = searchParams.get('actorId') || '';
  
  const debouncedActorId = useDebounce(actorId, 300);

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const setCurrentPage = useCallback((newPage: number) => setUrlParam('page', newPage.toString()), [setUrlParam]);
  const handleEntityTypeChange = useCallback((val: string | number) => setUrlParam('entityType', String(val)), [setUrlParam]);
  const handleActorIdChange = useCallback((val: string) => setUrlParam('actorId', val), [setUrlParam]);

  const fetchLogs = useCallback(async () => {
    setFetchState('loading');
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      if (entityType) queryParams.append('entityType', entityType);
      if (debouncedActorId) queryParams.append('actorId', debouncedActorId);

      const data = await auditApi.getLogs(Object.fromEntries(queryParams));
      
      const responseData = data.data as unknown as { data: AuditLog[], meta: { total: number } } | AuditLogResponse;
      
      if ('logs' in responseData) {
        setLogs(responseData.logs || []);
        setTotalCount(responseData.total || 0);
      } else {
        setLogs(responseData.data || []);
        setTotalCount(responseData.meta?.total || 0);
      }
      setFetchState('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setFetchState('error');
    }
  }, [page, limit, entityType, debouncedActorId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    fetchState,
    error,
    page,
    limit,
    totalCount,
    setCurrentPage,
    filters: { entityType, actorId },
    handleEntityTypeChange,
    handleActorIdChange,
    entityTypes: AUDIT_ENTITY_TYPES,
  };
}

export type AuditContextType = ReturnType<typeof useAuditLogic>;
