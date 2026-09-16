"use client";
// RESPONSIBILITY: Business logic hook for the Data Export module.
// DATA FLOW: API → useAdminDataExportLogic → components

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { dataExportApi } from '@/app/admin/data-export/data_export_api/AdminDataExportApi';
import { useAdminDataExportStore } from '@/app/admin/data-export/data_export_store/useAdminDataExportStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { DATA_EXPORT_ITEMS_PER_PAGE } from '@/app/admin/data-export/data_export_utils/AdminDataExportSharedConstants';
import type { ExportFormValues } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';

export function useAdminDataExportLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const { statusFilter, setStatusFilter, currentPage, setCurrentPage } = useAdminDataExportStore();
  useAdminUrlQuerySync([
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: useAdminDataExportStore.getState().setStatusFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const jobsQuery = useQuery({
    queryKey: ['admin', 'data-export', 'jobs'],
    queryFn: () => dataExportApi.fetchJobs().then((r) => r.data ?? []),
    staleTime: 1000 * 30,
    refetchInterval: 10000, // Poll every 10s to catch processing → completed transitions
  });

  const { data: kpis } = useQuery({
    queryKey: ['admin', 'data-export', 'kpis'],
    queryFn: () => dataExportApi.fetchKPIs().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const jobs = jobsQuery.data ?? [];
  const status = jobsQuery.status;

  const filtered = jobs.filter((j) => statusFilter === 'all' || j.status === statusFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / DATA_EXPORT_ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * DATA_EXPORT_ITEMS_PER_PAGE, currentPage * DATA_EXPORT_ITEMS_PER_PAGE);

  const createMutation = useMutation({
    mutationFn: (payload: ExportFormValues) => dataExportApi.createExport(payload),
    onSuccess: (response) => { toast.success(response.message, { id: 'admin-success-4cabe2e5' });
      qc.invalidateQueries({ queryKey: ['admin', 'data-export', 'jobs'] });
    },
    onError: (err) => toast.error((err as Error).message, { id: 'admin-error-e59d0b4c54' }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => dataExportApi.deleteJob(id),
    onSuccess: (response) => { toast.success(response.message, { id: 'admin-success-abc17580ff' }); qc.invalidateQueries({ queryKey: ['admin', 'data-export', 'jobs'] }); },
    onError: (err) => toast.error((err as Error).message, { id: 'admin-error-d87a5f59fd' }),
  });

  const createExport = useCallback((data: ExportFormValues) => { createMutation.mutate(data); }, [createMutation]);

  const deleteJob = useCallback(async (id: string) => {
    const ok = await confirm({ title: 'Delete Export', message: 'Delete this export job? This cannot be undone.', confirmText: 'Delete', type: 'danger' });
    if (!ok) return;
    deleteMutation.mutate(id);
  }, [confirm, deleteMutation]);

  return {
    jobs: paginated, allJobs: filtered, status, kpis,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    totalPages, totalItems: filtered.length,
    createExport, deleteJob,
    creating: createMutation.isPending,
  };
}
