// DATA FLOW: Jobs controls → mutation hook → Superadmin Jobs API → module-owned MSW state → TanStack Query → visible job state.
// RESPONSIBILITY: Coordinates Superadmin background-job mutations, confirmation-safe destructive actions, cache invalidation, and user feedback.
'use client';
import { useState } from 'react';
import type { SuperadminJobsMutationOptions } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsMutationTypes';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { jobsApi } from '@/app/superadmin/system-ops/jobs/jobs_api/SuperadminJobsApi';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

/** Executes job mutations and reconciles the owning Jobs query after each successful operation. */
export function useSuperadminJobsMutations({ setSelectedJobIds, selectedJobIds }: SuperadminJobsMutationOptions) {
    const queryClient = useQueryClient();
    const [isRetrying, setIsRetrying] = useState(false);
    const { confirm } = useConfirm();
    const invalidateJobs = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'jobs'] });

    async function handleRetryAll() {
        setIsRetrying(true);
        try {
            const response = await jobsApi.retryAllJobs();
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: 'superadmin-jobs-retry-all' });
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-retry-all-error' });
        } finally {
            setIsRetrying(false);
        }
    }

    async function handleRetryJob(id: string) {
        try {
            const response = await jobsApi.retryJob(id);
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: `superadmin-jobs-retry-${id}` });
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: `superadmin-jobs-retry-error-${id}` });
        }
    }

    async function handleCancelJob(id: string) {
        const confirmed = await confirm({ title: 'Cancel Job', message: 'Are you sure you want to cancel this running job?', type: 'warning', confirmText: 'Cancel Job' });
        if (!confirmed) return;
        try {
            const response = await jobsApi.cancelJob(id, crypto.randomUUID());
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: `superadmin-jobs-cancel-${id}` });
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: `superadmin-jobs-cancel-error-${id}` });
        }
    }

    async function handleDeleteJob(id: string) {
        const confirmed = await confirm({ title: 'Delete Job', message: 'Are you sure you want to permanently delete this job?', type: 'danger', confirmText: 'Delete Job' });
        if (!confirmed) return;
        try {
            const response = await jobsApi.deleteJob(id, crypto.randomUUID());
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: `superadmin-jobs-delete-${id}` });
            setSelectedJobIds((previous) => {
                const next = new Set(previous);
                next.delete(id);
                return next;
            });
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: `superadmin-jobs-delete-error-${id}` });
        }
    }

    async function handleClearCompleted() {
        const confirmed = await confirm({ title: 'Clear Completed Jobs', message: 'This removes all completed jobs from the Superadmin job history.', type: 'danger', confirmText: 'Clear Completed' });
        if (!confirmed) return;
        try {
            const response = await jobsApi.clearCompletedJobs(crypto.randomUUID());
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: 'superadmin-jobs-clear-completed' });
            setSelectedJobIds(new Set());
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-clear-completed-error' });
        }
    }

    async function handleBulkRetry() {
        const ids = [...selectedJobIds];
        if (!ids.length) return;
        try {
            const response = await jobsApi.bulkRetryJobs(ids);
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: 'superadmin-jobs-bulk-retry' });
            setSelectedJobIds(new Set());
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-bulk-retry-error' });
        }
    }

    async function handleBulkDelete() {
        const ids = [...selectedJobIds];
        const confirmed = await confirm({ title: 'Delete Selected Jobs', message: `Are you sure you want to permanently delete ${ids.length} selected jobs?`, type: 'danger', confirmText: 'Delete Selected' });
        if (!confirmed) return;
        if (!ids.length) return;
        try {
            const response = await jobsApi.bulkDeleteJobs(ids, crypto.randomUUID());
            if (!response.success) throw new Error(response.message);
            toast.success(response.message, { id: 'superadmin-jobs-bulk-delete' });
            setSelectedJobIds(new Set());
            await invalidateJobs();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-jobs-bulk-delete-error' });
        }
    }

    return { isRetrying, handleRetryAll, handleRetryJob, handleCancelJob, handleDeleteJob, handleClearCompleted, handleBulkRetry, handleBulkDelete };
}
