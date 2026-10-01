import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';
import type { Dispatch, SetStateAction } from 'react';

export interface SuperadminJobsPageMetrics {
  activeJobs: number;
  completed24h: number;
  failed24h: number;
  delayed: number;
}

export interface SuperadminJobsPageReturn {
  isPending: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
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
