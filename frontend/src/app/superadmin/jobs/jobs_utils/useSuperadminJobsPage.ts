// DATA FLOW: Superadmin UI → useSuperadminJobsPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Logic hook for the Background Jobs page. Owns all data-fetching, filter state,
// pagination, and action handlers. Exposes a clean interface to SuperadminJobsView (view only).
// No JSX — pure logic (Rule 6, Rule 56).
//
// DATA FLOW: jobsApi.fetchJobs() → useSuperadminJobsPage → SuperadminJobsView → Sub-components
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '@/app/superadmin/jobs/jobs_api/SuperadminJobsApi';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsTypes';
import type { SuperadminJobsPageReturn } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsPageTypes';
import { useSuperadminJobsSelection } from '@/app/superadmin/jobs/jobs_utils/useSuperadminJobsSelection';
import { useSuperadminJobsMutations } from '@/app/superadmin/jobs/jobs_utils/useSuperadminJobsMutations';
import { useUrlState } from '@/hooks/useUrlState';
/**
 * Logic hook for the Background Jobs page.
 * Returns job data, filter state, pagination, selection state, and all action handlers.
 */
export function useSuperadminJobsPage(): SuperadminJobsPageReturn {
    const { getParam, setParam } = useUrlState();
    const statusFilter = getParam('statusFilter', 'ALL');
    const queueFilter = getParam('queueFilter', 'ALL');
    const currentPage = Number(getParam('page', '1'));
    const ITEMS_PER_PAGE = 10;
    const setStatusFilter = (v: string) => { setParam('statusFilter', v); setParam('page', '1'); };
    const setQueueFilter = (v: string) => { setParam('queueFilter', v); setParam('page', '1'); };
    const setCurrentPage = (page: number) => setParam('page', String(page));
    const { selectedJobIds, setSelectedJobIds, inspectJob, setInspectJob, toggleSelection, toggleAll } = useSuperadminJobsSelection();
    const queryParams: Record<string, string> = {
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(queueFilter !== 'ALL' && { queue: queueFilter }),
    };
    const { data: fetchRes, isPending, isError } = useQuery({
        queryKey: ['superadmin', 'jobs', queryParams],
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
        activeJobs: allJobs.filter(j => j.status === 'ACTIVE').length,
        completed24h: allJobs.filter(j => j.status === 'COMPLETED').length,
        failed24h: allJobs.filter(j => j.status === 'FAILED').length,
        delayed: allJobs.filter(j => j.status === 'DELAYED').length,
    };
    // Server-side filtering applied — no client-side filter needed
    const filteredJobs = allJobs;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
    const paginatedJobs = allJobs; // Server-side pagination applied
    const mutations = useSuperadminJobsMutations({ setSelectedJobIds, selectedJobIds });
    return {
        isPending,
        isError,
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
