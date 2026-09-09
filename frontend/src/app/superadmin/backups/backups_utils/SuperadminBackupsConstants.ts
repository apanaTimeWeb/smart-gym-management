import type { BackupRecord } from '@/app/superadmin/backups/superadmin_backups_types/superadmin_backups_types';

export const StatusColors: Record<BackupRecord['status'], string> = {
  SUCCESS: 'text-success bg-success/10',
  IN_PROGRESS: 'text-primary bg-primary/10',
  FAILED: 'text-danger bg-danger-bg/10',
};
