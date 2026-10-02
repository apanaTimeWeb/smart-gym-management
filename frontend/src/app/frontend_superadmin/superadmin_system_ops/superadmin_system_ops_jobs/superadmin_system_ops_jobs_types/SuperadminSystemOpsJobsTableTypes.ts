// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsJobsTable.tsx; no business behavior.
import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';

export interface SuperadminJobsTableProps {
    jobs: BackgroundJob[];
    allJobsFiltered: boolean;
    selectedJobIds: Set<string>;
    toggleSelection: (id: string) => void;
    toggleAll: (ids: string[]) => void;
    onInspect: (job: BackgroundJob) => void;
    onRetry: (id: string) => void;
    onCancel: (id: string) => void;
    onDelete: (id: string) => void;
}
