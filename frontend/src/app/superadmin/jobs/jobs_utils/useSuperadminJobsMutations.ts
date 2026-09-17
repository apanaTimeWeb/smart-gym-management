'use client';
// DATA FLOW: user action → jobsApi mutation → authoritative response → TanStack Query cache → jobs view.
// RESPONSIBILITY: Owns Background Jobs mutation orchestration and selection reconciliation.
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { jobsApi } from '@/app/superadmin/jobs/superadmin_jobs_api/superadmin_jobs_api';

interface SuperadminJobsMutationsOptions {
  setSelectedJobIds: Dispatch<SetStateAction<Set<string>>>;
  selectedJobIds: Set<string>;
}

export const useSuperadminJobsMutations = ({ setSelectedJobIds, selectedJobIds }: SuperadminJobsMutationsOptions) => {
  const queryClient = useQueryClient();
  const [isRetrying, setIsRetrying] = useState(false);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });

  const handleRetryAll = async () => {
    setIsRetrying(true);
    try { const res = await jobsApi.retryAllJobs(); toast.success(res.message, { id: 'jobs-retry-all' }); await invalidate(); }
    catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Jobs retry request failed.', { id: 'jobs-retry-all' }); }
    finally { setIsRetrying(false); }
  };
  const handleRetryJob = async (id: string) => { try { const res = await jobsApi.retryJob(id); toast.success(res.message, { id: `jobs-retry-${id}` }); await invalidate(); } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Job retry request failed.', { id: `jobs-retry-${id}` }); } };
  const handleCancelJob = async (id: string) => { try { const res = await jobsApi.cancelJob(id); toast.success(res.message, { id: `jobs-cancel-${id}` }); await invalidate(); } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Job cancel request failed.', { id: `jobs-cancel-${id}` }); } };
  const handleDeleteJob = async (id: string) => { try { const res = await jobsApi.deleteJob(id); toast.success(res.message, { id: `jobs-delete-${id}` }); setSelectedJobIds((prev) => { const next = new Set(prev); next.delete(id); return next; }); await invalidate(); } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Job delete request failed.', { id: `jobs-delete-${id}` }); } };
  const handleClearCompleted = async () => { try { const res = await jobsApi.clearCompletedJobs(); toast.success(res.message, { id: 'jobs-clear-completed' }); setSelectedJobIds(new Set()); await invalidate(); } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Clear completed jobs request failed.', { id: 'jobs-clear-completed' }); } };
  const handleBulkRetry = async () => { const ids = [...selectedJobIds]; if (!ids.length) return; try { const res = await jobsApi.bulkRetryJobs(ids); toast.success(res.message, { id: 'jobs-bulk-retry' }); setSelectedJobIds(new Set()); await invalidate(); } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Bulk retry request failed.', { id: 'jobs-bulk-retry' }); } };
  const handleBulkDelete = async () => { const ids = [...selectedJobIds]; if (!ids.length) return; try { const res = await jobsApi.bulkDeleteJobs(ids); toast.success(res.message, { id: 'jobs-bulk-delete' }); setSelectedJobIds(new Set()); await invalidate(); } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Bulk delete request failed.', { id: 'jobs-bulk-delete' }); } };
  return { isRetrying, handleRetryAll, handleRetryJob, handleCancelJob, handleDeleteJob, handleClearCompleted, handleBulkRetry, handleBulkDelete };
};
