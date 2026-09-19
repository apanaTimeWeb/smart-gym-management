// RESPONSIBILITY: Type contract extracted from SuperadminJobsTable.tsx; no business behavior.
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsTypes';

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
