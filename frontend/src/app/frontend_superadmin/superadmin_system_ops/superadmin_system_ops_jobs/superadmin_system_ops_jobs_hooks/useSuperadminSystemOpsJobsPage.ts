'use client';
/**

 * @description Owns custom hook responsibility for useSuperadminSystemOpsJobsPage, keeping feature-specific state and orchestration isolated inside `superadmin_system_ops`.
 * @dependencies Uses only approved application infrastructure plus module-owned APIs, schemas, types, and query/state primitives.
 * @edge-case Preserves loading/error/retry and resource identity semantics defined by the owning feature contract.
 */
// DATA FLOW: Superadmin UI → useSuperadminSystemOpsJobsPage → Superadmin module API/state → consuming component
// RESPONSIBILITY: Logic hook for the Background Jobs page. Owns all data-fetching, filter state,
// pagination, and action handlers. Exposes a clean interface to SuperadminSystemOpsJobsView (view only).
// No JSX — pure logic (Rule 6, Rule 56).
//
// DATA FLOW: jobsApi.fetchJobs() → useSuperadminSystemOpsJobsPage → SuperadminSystemOpsJobsView → Sub-components
import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi';
import { SUPERADMIN_JOBS_STATUS_CODES, SUPERADMIN_JOBS_FILTER_STATUS_CODES, SUPERADMIN_JOBS_FILTER_QUEUE_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsConstants';
import { SUPERADMIN_JOBS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsQueryKeys';
import { useSuperadminSystemOpsJobsMutations } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsMutations';
import { useSuperadminSystemOpsJobsSelection } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsSelection';

import type { SuperadminJobsPageReturn } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsPageTypes';
import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';



/**
 * Logic hook for the Background Jobs page.
 * Returns job data, filter state, pagination, selection state, and all action handlers.
 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsJobsPage(): SuperadminJobsPageReturn {
    const { getParam, setParam } = useUrlState();
    const statusFilter = getParam('statusFilter', SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL);
    const queueFilter = getParam('queueFilter', SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL);
    const currentPage = Number(getParam('page', '1'));
    const ITEMS_PER_PAGE = 10;
    const setStatusFilter = (v: string) => { setParam('statusFilter', v); setParam('page', '1'); };
    const setQueueFilter = (v: string) => { setParam('queueFilter', v); setParam('page', '1'); };
    const setCurrentPage = (page: number) => setParam('page', String(page));
    const { selectedJobIds, setSelectedJobIds, inspectJob, setInspectJob, toggleSelection, toggleAll } = useSuperadminSystemOpsJobsSelection();
    const queryParams: Record<string, string> = {
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(statusFilter !== SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL && { status: statusFilter }),
        ...(queueFilter !== SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL && { queue: queueFilter }),
    };
    const { data: fetchRes, isPending, isError, refetch } = useQuery({
        queryKey: SUPERADMIN_JOBS_QUERY_KEYS.list(queryParams),
        queryFn: () => jobsApi.fetchJobs(queryParams),
    });
    const rawJobs: BackgroundJob[] = fetchRes?.data ?? [];
    const allJobs = rawJobs;
    const total = (fetchRes as {
        meta?: {
            total?: number;
        };
    } | undefined)?.meta?.total ?? rawJobs.length;
    const metrics = {
        activeJobs: allJobs.filter(j => j.status === SUPERADMIN_JOBS_STATUS_CODES.ACTIVE).length,
        completed24h: allJobs.filter(j => j.status === SUPERADMIN_JOBS_STATUS_CODES.COMPLETED).length,
        failed24h: allJobs.filter(j => j.status === SUPERADMIN_JOBS_STATUS_CODES.FAILED).length,
        delayed: allJobs.filter(j => j.status === SUPERADMIN_JOBS_STATUS_CODES.DELAYED).length,
    };
    // Server-side filtering applied — no client-side filter needed
    const filteredJobs = allJobs;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
    const paginatedJobs = allJobs; // Server-side pagination applied
    const mutations = useSuperadminSystemOpsJobsMutations({ setSelectedJobIds, selectedJobIds });
    return {
        isPending,
        isError,
        refetch,
        filteredJobs,
        paginatedJobs,
        currentPage,
        totalPages,
        total,
        setCurrentPage,
        statusFilter,
        setStatusFilter,
        queueFilter,
        setQueueFilter,
        selectedJobIds,
        toggleSelection,
        toggleAll,
        inspectJob,
        setInspectJob,
        ...mutations,
        metrics,
    };
}
