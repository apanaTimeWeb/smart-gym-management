// RESPONSIBILITY: Type contract extracted from SuperadminBackupsTable.tsx; no business behavior.
import type { BackupRecord } from '@/app/superadmin/backups/backups_types/SuperadminBackupsTypes';

export interface SuperadminBackupsTableProps {
    paginatedBackups: BackupRecord[];
    filteredLength: number;
    handleDownload: (id: string) => void | Promise<void>;
    handleRestoreClick: (backup: BackupRecord) => void;
}
