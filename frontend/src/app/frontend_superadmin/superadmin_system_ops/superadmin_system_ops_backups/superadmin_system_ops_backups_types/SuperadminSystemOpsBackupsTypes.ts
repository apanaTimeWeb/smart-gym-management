import type { infer as ZodInfer } from 'zod';
import { BackupRecordSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_schemas/SuperadminSystemOpsBackupsSchema';
// RESPONSIBILITY: Encapsulates functionality for superadmin_backups_types.ts
export type BackupRecord = ZodInfer<typeof BackupRecordSchema>;
