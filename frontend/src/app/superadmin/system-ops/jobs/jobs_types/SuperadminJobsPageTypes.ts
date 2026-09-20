import type { Dispatch, SetStateAction } from 'react';
import type { BackgroundJob } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsTypes';

export interface SuperadminJobsPageMetrics {
  activeJobs: number;
  completed24h: number;
  failed24h: number;
  delayed: number;
}

export interface SuperadminJobsPageReturn {
  isPending: boolean;
  isError: boolean;
  filteredJobs: BackgroundJob[];
  paginatedJobs: BackgroundJob[];
  currentPage: number;
  totalPages: number;
  total: number;
  setCurrentPage: (page: number) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  queueFilter: string;
  setQueueFilter: (value: string) => void;
  selectedJobIds: Set<string>;
  toggleSelection: (id: string) => void;
  toggleAll: (visibleIds: string[]) => void;
  inspectJob: BackgroundJob | null;
  setInspectJob: Dispatch<SetStateAction<BackgroundJob | null>>;
  isRetrying: boolean;
  handleRetryAll: () => void;
  handleRetryJob: (id: string) => void;
  handleCancelJob: (id: string) => void;
  handleDeleteJob: (id: string) => void;
  handleClearCompleted: () => void;
  handleBulkRetry: () => void;
  handleBulkDelete: () => void;
  metrics: SuperadminJobsPageMetrics;
}
