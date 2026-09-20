// RESPONSIBILITY: Type contract extracted from SuperadminBackupsRestoreModal.tsx; no business behavior.
import type { BackupRecord } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsTypes';

export interface SuperadminBackupsRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBackup: BackupRecord | null;
  restoreConfirmText: string;
  setRestoreConfirmText: (value: string) => void;
}
