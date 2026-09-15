// RESPONSIBILITY: Encapsulates functionality for useSuperadminJobsMutations.ts
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { jobsApi } from '@/app/superadmin/jobs/superadmin_jobs_api/superadmin_jobs_api';

export const useSuperadminJobsMutations = ({ setSelectedJobIds, selectedJobIds }: { setSelectedJobIds: (val: unknown) => void, selectedJobIds: Set<string> }) => {
  const queryClient = useQueryClient();
  const [isRetrying, setIsRetrying] = useState(false);

  function handleRetryAll() {
    setIsRetrying(true);
    toast.promise(
      jobsApi.retryAllJobs().then((res) => {
        if (!res.success) throw new Error(res.message || 'Failed to retry jobs.');
        return res.data;
      }),
      {
        loading: 'Retrying all failed jobs...',
        success: (data) => `Successfully queued ${data?.queuedCount ?? 'all'} failed jobs for retry.`,
        error: (err: Error) => err.message,
      }
    ).then(() => {
      void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
    }).finally(() => setIsRetrying(false));
  }

  function handleRetryJob(id: string) {
    toast.success(`Job ${id} queued for retry.`, { id: 'job-id-queued-for-retry' });
    void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
  }

  function handleCancelJob(id: string) {
    toast.success(`Job ${id} cancelled successfully.`, { id: 'job-id-cancelled-successfully' });
    void queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });
  }

  function handleDeleteJob(id: string) {
    toast.success(`Job ${id} deleted.`, { id: 'job-id-deleted' });
    setSelectedJobIds((prev: Set<string>) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function handleClearCompleted() {
    toast.success('Cleared all completed jobs.', { id: 'cleared-all-completed-jobs' });
    setSelectedJobIds(new Set());
  }

  function handleBulkRetry() {
    toast.success(`Queued ${selectedJobIds.size} jobs for retry.`, { id: 'queued-selectedjobids-size-jobs-for-retry' });
    setSelectedJobIds(new Set());
  }

  function handleBulkDelete() {
    toast.success(`Deleted ${selectedJobIds.size} jobs.`, { id: 'deleted-selectedjobids-size-jobs' });
    setSelectedJobIds(new Set());
  }

  return {
    isRetrying,
    handleRetryAll,
    handleRetryJob,
    handleCancelJob,
    handleDeleteJob,
    handleClearCompleted,
    handleBulkRetry,
    handleBulkDelete,
  };
};

