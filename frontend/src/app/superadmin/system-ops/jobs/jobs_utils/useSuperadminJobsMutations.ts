// DATA FLOW: Jobs controls → TanStack Query mutations → Superadmin Jobs API → module-owned MSW state → Jobs query cache → visible result.
// RESPONSIBILITY: Coordinates Superadmin background-job mutations, confirmation-safe destructive actions, cache invalidation, loading state, and user feedback.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { jobsApi } from '@/app/superadmin/system-ops/jobs/jobs_api/SuperadminJobsApi';
import type { SuperadminJobsMutationOptions } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsMutationTypes';

/** Executes job mutations and reconciles the owning Jobs query after each successful operation. */
export function useSuperadminJobsMutations({ setSelectedJobIds, selectedJobIds }: SuperadminJobsMutationOptions) {
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const invalidateJobs = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
  const getKey = (scope: string) => {
    const existing = idempotencyKeysRef.current.get(scope);
    if (existing) return existing;
    const next = crypto.randomUUID();
    idempotencyKeysRef.current.set(scope, next);
    return next;
  };
  const clearKey = (scope: string) => idempotencyKeysRef.current.delete(scope);

  const retryAllMutation = useMutation({
    mutationFn: () => jobsApi.retryAllJobs(),
    onSuccess: async (response) => { toast.success(response.message, { id: 'superadmin-jobs-retry-all' }); await invalidateJobs(); },
    onError: (error: unknown) => toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-retry-all-error' }),
  });
  const retryJobMutation = useMutation({
    mutationFn: (id: string) => jobsApi.retryJob(id),
    onSuccess: async (response, id) => { toast.success(response.message, { id: `superadmin-jobs-retry-${id}` }); await invalidateJobs(); },
    onError: (error: unknown, id) => toast.error(error instanceof Error ? error.message : '', { id: `superadmin-jobs-retry-error-${id}` }),
  });
  const cancelJobMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => jobsApi.cancelJob(id, idempotencyKey),
    onSuccess: async (response, variables) => { clearKey(`cancel:${variables.id}`); toast.success(response.message, { id: `superadmin-jobs-cancel-${variables.id}` }); await invalidateJobs(); },
    onError: (error: unknown, variables) => toast.error(error instanceof Error ? error.message : '', { id: `superadmin-jobs-cancel-error-${variables.id}` }),
  });
  const deleteJobMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => jobsApi.deleteJob(id, idempotencyKey),
    onSuccess: async (response, variables) => { clearKey(`delete:${variables.id}`); toast.success(response.message, { id: `superadmin-jobs-delete-${variables.id}` }); setSelectedJobIds((previous) => { const next = new Set(previous); next.delete(variables.id); return next; }); await invalidateJobs(); },
    onError: (error: unknown, variables) => toast.error(error instanceof Error ? error.message : '', { id: `superadmin-jobs-delete-error-${variables.id}` }),
  });
  const clearCompletedMutation = useMutation({
    mutationFn: (idempotencyKey: string) => jobsApi.clearCompletedJobs(idempotencyKey),
    onSuccess: async (response) => { clearKey('clear-completed'); toast.success(response.message, { id: 'superadmin-jobs-clear-completed' }); setSelectedJobIds(new Set()); await invalidateJobs(); },
    onError: (error: unknown) => toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-clear-completed-error' }),
  });
  const bulkRetryMutation = useMutation({
    mutationFn: (ids: string[]) => jobsApi.bulkRetryJobs(ids),
    onSuccess: async (response) => { toast.success(response.message, { id: 'superadmin-jobs-bulk-retry' }); setSelectedJobIds(new Set()); await invalidateJobs(); },
    onError: (error: unknown) => toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-bulk-retry-error' }),
  });
  const bulkDeleteMutation = useMutation({
    mutationFn: ({ ids, idempotencyKey }: { ids: string[]; idempotencyKey: string }) => jobsApi.bulkDeleteJobs(ids, idempotencyKey),
    onSuccess: async (response) => { clearKey('bulk-delete'); toast.success(response.message, { id: 'superadmin-jobs-bulk-delete' }); setSelectedJobIds(new Set()); await invalidateJobs(); },
    onError: (error: unknown) => toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-bulk-delete-error' }),
  });

  async function handleRetryAll() { if (!retryAllMutation.isPending) await retryAllMutation.mutateAsync(); }
  async function handleRetryJob(id: string) { if (!retryJobMutation.isPending) await retryJobMutation.mutateAsync(id); }
  async function handleCancelJob(id: string) {
    const confirmed = await confirm({ title: 'Cancel Job', message: 'Are you sure you want to cancel this running job?', type: 'warning', confirmText: 'Cancel Job' });
    if (!confirmed || cancelJobMutation.isPending) return;
    await cancelJobMutation.mutateAsync({ id, idempotencyKey: getKey(`cancel:${id}`) });
  }
  async function handleDeleteJob(id: string) {
    const confirmed = await confirm({ title: 'Delete Job', message: 'Are you sure you want to permanently delete this job?', type: 'danger', confirmText: 'Delete Job' });
    if (!confirmed || deleteJobMutation.isPending) return;
    await deleteJobMutation.mutateAsync({ id, idempotencyKey: getKey(`delete:${id}`) });
  }
  async function handleClearCompleted() {
    const confirmed = await confirm({ title: 'Clear Completed Jobs', message: 'This removes all completed jobs from the Superadmin job history.', type: 'danger', confirmText: 'Clear Completed' });
    if (!confirmed || clearCompletedMutation.isPending) return;
    await clearCompletedMutation.mutateAsync(getKey('clear-completed'));
  }
  async function handleBulkRetry() { const ids = [...selectedJobIds]; if (!ids.length || bulkRetryMutation.isPending) return; await bulkRetryMutation.mutateAsync(ids); }
  async function handleBulkDelete() {
    const ids = [...selectedJobIds];
    if (!ids.length) return;
    const confirmed = await confirm({ title: 'Delete Selected Jobs', message: `Are you sure you want to permanently delete ${ids.length} selected jobs?`, type: 'danger', confirmText: 'Delete Selected' });
    if (!confirmed || bulkDeleteMutation.isPending) return;
    await bulkDeleteMutation.mutateAsync({ ids, idempotencyKey: getKey('bulk-delete') });
  }
  const isRetrying = retryAllMutation.isPending || bulkRetryMutation.isPending;
  const isJobActionPending = (id: string) => retryJobMutation.isPending && retryJobMutation.variables === id || cancelJobMutation.isPending && cancelJobMutation.variables?.id === id || deleteJobMutation.isPending && deleteJobMutation.variables?.id === id;

  return { isRetrying, isJobActionPending, handleRetryAll, handleRetryJob, handleCancelJob, handleDeleteJob, handleClearCompleted, handleBulkRetry, handleBulkDelete };
}
