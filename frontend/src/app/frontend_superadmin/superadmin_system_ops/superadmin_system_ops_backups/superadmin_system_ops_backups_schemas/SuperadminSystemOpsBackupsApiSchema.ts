import { z } from 'zod';

import { BackupRecordSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsSchema';

export const SuperadminBackupsListDataSchema = z.array(BackupRecordSchema);
export const SuperadminBackupsNullDataSchema = z.null();
export const SuperadminBackupDownloadDataSchema = z.object({ downloadUrl: z.string().min(1) });
