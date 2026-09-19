// RESPONSIBILITY: Encapsulates functionality for SuperadminBackupsConstants.ts
import type { BackupRecord } from '@/app/superadmin/backups/backups_types/SuperadminBackupsTypes';
export const StatusColors: Record<BackupRecord['status'], string> = {
    SUCCESS: 'text-success bg-success/10',
    IN_PROGRESS: 'text-primary bg-primary/10',
    FAILED: 'text-danger bg-danger-bg/10',
};
