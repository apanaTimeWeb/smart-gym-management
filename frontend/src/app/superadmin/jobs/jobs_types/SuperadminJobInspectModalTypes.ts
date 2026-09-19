// RESPONSIBILITY: Type contract extracted from SuperadminJobInspectModal.tsx; no business behavior.
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsTypes';

export interface SuperadminJobInspectModalProps {
    job: BackgroundJob;
    onClose: () => void;
}
