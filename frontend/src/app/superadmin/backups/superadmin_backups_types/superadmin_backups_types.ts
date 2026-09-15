// RESPONSIBILITY: Encapsulates functionality for superadmin_backups_types.ts
import { z } from 'zod';

export const BackupRecordSchema = z.object({
  id: z.string(),
  tenantName: z.string(),
  databaseName: z.string(),
  sizeMB: z.number(),
  status: z.enum(['SUCCESS', 'FAILED', 'IN_PROGRESS']),
  timestamp: z.string()
});
export type BackupRecord = z.infer<typeof BackupRecordSchema>;
