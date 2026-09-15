// RESPONSIBILITY: Logic hook for the Background Jobs page. Owns all data-fetching, filter state,
// pagination, and action handlers. Exposes a clean interface to SuperadminJobsView (view only).
// No JSX — pure logic (Rule 6, Rule 56).
//
// DATA FLOW: jobsApi.fetchJobs() → useSuperadminJobsPage → SuperadminJobsView → Sub-components

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '@/app/superadmin/jobs/superadmin_jobs_api/superadmin_jobs_api';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';
import type { FetchState } from '@/app/superadmin/superadmin_utils/superadmin_shared_types';
import { useSuperadminJobsMutations } from '@/app/superadmin/jobs/jobs_utils/useSuperadminJobsMutations';

const ITEMS_PER_PAGE = 10;

export interface UseJobsPageReturn {
  fetchState: FetchState;
  filteredJobs: BackgroundJob[];
  paginatedJobs: BackgroundJob[];
  currentPage: number;
  totalPages: number;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [queueFilter, setQueueFilter] = useState<string>('ALL');
  const [selectedJobIds, setSelectedJobIds] = useState<Set<string>>(new Set());
  const [inspectJob, setInspectJob] = useState<BackgroundJob | null>(null);

  const { data: fetchRes, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'jobs'],
    queryFn: () => jobsApi.fetchJobs(),
  });

  const rawJobs = (fetchRes?.data as BackgroundJob[]) ?? [];
  const allJobs: BackgroundJob[] = rawJobs;
  const metrics = {
    activeJobs:    allJobs.filter(j => j.status === 'ACTIVE').length,
    completed24h:  allJobs.filter(j => j.status === 'COMPLETED').length,
    failed24h:     allJobs.filter(j => j.status === 'FAILED').length,
    delayed:       allJobs.filter(j => j.status === 'DELAYED').length,
  };

  const filteredJobs = allJobs.filter(job => {
    if (statusFilter !== 'ALL' && job.status !== statusFilter) return false;
    if (queueFilter !== 'ALL' && job.queueName !== queueFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const mutations = useSuperadminJobsMutations({ setSelectedJobIds: setSelectedJobIds as any, selectedJobIds });

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
    fetchState: isLoading ? 'loading' : isError ? 'error' : 'success',
    filteredJobs,
    paginatedJobs,
    currentPage,
    totalPages,
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
