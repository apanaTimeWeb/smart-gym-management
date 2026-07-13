// RESPONSIBILITY: useAuditTable.ts handles the logic and UI for its corresponding feature.
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuditContext } from '@/app/erp/audit/audit_context/AuditContext';
import { AuditLog, AuditLogResponse } from '@/app/erp/audit/audit_types/audit_types';
import { AUDIT_URLS } from '@/app/erp/audit/audit_url_config';
import { apiFetch } from '@/lib/api';

export const useAuditTable = () => {
  const { filters, setFilters } = useAuditContext();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', filters.page.toString());
      queryParams.append('limit', filters.limit.toString());
      if (filters.entityType) queryParams.append('entityType', filters.entityType);
      if (filters.actorId) queryParams.append('actorId', filters.actorId);

      const data = await apiFetch<AuditLogResponse>(
        `${AUDIT_URLS.BACKEND_API.BASE}?${queryParams.toString()}`
      );
      
      setLogs(data.data || []);
      setTotalCount(data.meta?.total || 0);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleNextPage = () => {
    if (filters.page * filters.limit < totalCount) {
      setFilters({ page: filters.page + 1 });
    }
  };

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters({ page: filters.page - 1 });
    }
  };

  return {
    logs,
    loading,
    error,
    page: filters.page,
    limit: filters.limit,
    totalCount,
    handleNextPage,
    handlePrevPage,
  };
};
