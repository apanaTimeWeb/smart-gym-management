// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsJobsJobInspectModal.tsx; no business behavior.
import type { BackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_types/SuperadminSystemOpsJobsTypes';

export interface SuperadminJobInspectModalProps {
    job: BackgroundJob;
    onClose: () => void;
}
