// RESPONSIBILITY: Encapsulates functionality for SuperadminBackupsConstants.ts
import type { BackupRecord } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';
export const StatusColors: Record<BackupRecord['status'], string> = {
    SUCCESS: 'text-success bg-success-bg',
    IN_PROGRESS: 'text-primary bg-primary-subtle',
    FAILED: 'text-danger bg-danger-bg',
};
