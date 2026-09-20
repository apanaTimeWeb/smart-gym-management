"use client";
// RESPONSIBILITY: Business logic hook for the Data Export module.
// DATA FLOW: URL filters → TanStack Query → AdminDataExportApi → module-owned MSW → table rendering.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { dataExportApi } from '@/app/admin/data-export/data_export_api/AdminDataExportApi';
import { useAdminDataExportStore } from '@/app/admin/data-export/data_export_store/useAdminDataExportStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';
import { DATA_EXPORT_ITEMS_PER_PAGE } from '@/app/admin/data-export/data_export_utils/AdminDataExportSharedConstants';
import type { DataExportSortDirection, DataExportSortKey, ExportFormValues, ExportStatus } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';

/** Coordinates DataExportLogic state, data flow, and feature behavior. */
export function useAdminDataExportLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const { statusFilter, setStatusFilter, currentPage, setCurrentPage } = useAdminDataExportStore();
  const [sortKey, setSortKey] = useState<DataExportSortKey>('createdAt');
  const [sortDir, setSortDir] = useState<DataExportSortDirection>('desc');

  useAdminUrlQuerySync([
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (value) => {
      if (value === 'all' || value === 'completed' || value === 'processing' || value === 'failed') {
        useAdminDataExportStore.getState().setStatusFilter(value as ExportStatus | 'all');
      }
    } },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const jobsQuery = useQuery({
    queryKey: ['admin', 'data-export', 'jobs', { status: statusFilter, page: currentPage, limit: DATA_EXPORT_ITEMS_PER_PAGE, sortKey, sortDir }],
    queryFn: () => dataExportApi.fetchJobs({ page: currentPage, limit: DATA_EXPORT_ITEMS_PER_PAGE, status: statusFilter, sortKey, sortDir }),
    staleTime: 1000 * 30,
    refetchInterval: 10000,
  });

  const { data: kpis } = useQuery({
    queryKey: ['admin', 'data-export', 'kpis'],
    queryFn: () => dataExportApi.fetchKPIs().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (payload: ExportFormValues) => dataExportApi.createExport(payload),
    onSuccess: (response) => {
      adminToast.success(response.message, 'admin-success-4cabe2e5');
      qc.invalidateQueries({ queryKey: ['admin', 'data-export', 'jobs'] });
    },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-e59d0b4c54'),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => dataExportApi.deleteJob(id, idempotencyKey),
    onSuccess: (response, variables) => {
      idempotencyKeysRef.current.delete(`delete-export-job:${variables.id}`);
      adminToast.success(response.message, 'admin-success-abc17580ff');
      qc.invalidateQueries({ queryKey: ['admin', 'data-export', 'jobs'] });
    },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-d87a5f59fd'),
  });

  useEffect(() => {
    const maxPage = Math.max(1, jobsQuery.data?.meta?.totalPages ?? 1);
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [currentPage, jobsQuery.data?.meta?.totalPages, setCurrentPage]);

  const createExport = useCallback(async (data: ExportFormValues) => {
    try {
      await createMutation.mutateAsync(data);
      return true;
    } catch {
      return false;
    }
  }, [createMutation]);

  const deleteJob = useCallback(async (id: string) => {
    const ok = await confirm({ title: 'Delete Export', message: 'Delete this export job? This cannot be undone.', confirmText: 'Delete', type: 'danger' });
    const intentId = `delete-export-job:${id}`;
    if (!ok) { clearIntentKey(intentId); return; }
    deleteMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, deleteMutation, getIntentKey]);

  return {
    jobs: jobsQuery.data?.data ?? [],
    status: jobsQuery.status,
    kpis,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages: jobsQuery.data?.meta?.totalPages ?? 1,
    totalItems: jobsQuery.data?.meta?.total ?? 0,
    sortKey,
    sortDir,
    onSort: (key: DataExportSortKey) => {
      if (sortKey === key) setSortDir((current) => current === 'asc' ? 'desc' : 'asc');
      else { setSortKey(key); setSortDir('desc'); }
      setCurrentPage(1);
    },
    createExport,
    deleteJob,
    creating: createMutation.isPending,
  };
}
