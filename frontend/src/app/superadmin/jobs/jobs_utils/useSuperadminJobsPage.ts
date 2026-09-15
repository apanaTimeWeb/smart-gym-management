// RESPONSIBILITY: Logic hook for the Background Jobs page. Owns all data-fetching, filter state,
// pagination, and action handlers. Exposes a clean interface to SuperadminJobsView (view only).
// No JSX — pure logic (Rule 6, Rule 56).
//
// DATA FLOW: jobsApi.fetchJobs() → useSuperadminJobsPage → SuperadminJobsView → Sub-components

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '@/app/superadmin/jobs/superadmin_jobs_api/superadmin_jobs_api';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';

import { useSuperadminJobsMutations } from '@/app/superadmin/jobs/jobs_utils/useSuperadminJobsMutations';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

export interface UseJobsPageReturn {
  isLoading: boolean;
  isError: boolean;
  filteredJobs: BackgroundJob[];
  paginatedJobs: BackgroundJob[];
  currentPage: number;
  totalPages: number;
  total: number;
  setCurrentPage: (page: number) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  queueFilter: string;
  setQueueFilter: (v: string) => void;
  selectedJobIds: Set<string>;
  toggleSelection: (id: string) => void;
  toggleAll: (visibleIds: string[]) => void;
  inspectJob: BackgroundJob | null;
  setInspectJob: (job: BackgroundJob | null) => void;
  isRetrying: boolean;
  handleRetryAll: () => void;
  handleRetryJob: (id: string) => void;
  handleCancelJob: (id: string) => void;
  handleDeleteJob: (id: string) => void;
  handleClearCompleted: () => void;
  handleBulkRetry: () => void;
  handleBulkDelete: () => void;
  metrics: { activeJobs: number; completed24h: number; failed24h: number; delayed: number };
}

/**
 * Logic hook for the Background Jobs page.
 * Returns job data, filter state, pagination, selection state, and all action handlers.
 */
export function useSuperadminJobsPage(): UseJobsPageReturn {
  const { getParam, setParam } = useSuperadminUrlState();

  const statusFilter = getParam('statusFilter', 'ALL');
  const queueFilter = getParam('queueFilter', 'ALL');
  const currentPage = Number(getParam('page', '1'));
  const ITEMS_PER_PAGE = 10;

  const setStatusFilter = (v: string) => { setParam('statusFilter', v); setParam('page', '1'); };
  const setQueueFilter = (v: string) => { setParam('queueFilter', v); setParam('page', '1'); };
  const setCurrentPage = (page: number) => setParam('page', String(page));

  const [selectedJobIds, setSelectedJobIds] = useState<Set<string>>(new Set());
  const [inspectJob, setInspectJob] = useState<BackgroundJob | null>(null);

  const queryParams: Record<string, string> = {
    page: String(currentPage),
    limit: String(ITEMS_PER_PAGE),
    ...(statusFilter !== 'ALL' && { status: statusFilter }),
    ...(queueFilter !== 'ALL' && { queue: queueFilter }),
  };

  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'jobs', queryParams],
    queryFn: () => jobsApi.fetchJobs(queryParams),
  });

  const rawJobs: BackgroundJob[] = fetchRes?.data ?? [];
  const allJobs = rawJobs;
  const total = (fetchRes as { meta?: { total?: number } } | undefined)?.meta?.total ?? rawJobs.length;
  const metrics = {
    activeJobs:    allJobs.filter(j => j.status === 'ACTIVE').length,
    completed24h:  allJobs.filter(j => j.status === 'COMPLETED').length,
    failed24h:     allJobs.filter(j => j.status === 'FAILED').length,
    delayed:       allJobs.filter(j => j.status === 'DELAYED').length,
  };

  // Server-side filtering applied — no client-side filter needed
  const filteredJobs = allJobs;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = allJobs; // Server-side pagination applied

  const mutations = useSuperadminJobsMutations({ setSelectedJobIds, selectedJobIds });

  function toggleSelection(id: string) {
    setSelectedJobIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll(visibleIds: string[]) {
    if (selectedJobIds.size === visibleIds.length && visibleIds.length > 0) {
      setSelectedJobIds(new Set());
    } else {
      setSelectedJobIds(new Set(visibleIds));
    }
  }

  return {
    isLoading,
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
