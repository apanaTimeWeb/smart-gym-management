import { z } from 'zod';

export const SuperadminSystemOpsHealthStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'DOWN']);

export const SuperadminSystemOpsJobStatusSchema = z.enum(['IDLE', 'PENDING', 'FAILED']);

export const SuperadminSystemOpsBackupStatusSchema = z.enum(['HEALTHY', 'DEGRADED', 'FAILED']);

export const SuperadminSystemOpsMigrationStatusSchema = z.enum(['UP_TO_DATE', 'PENDING', 'FAILED']);

export const SuperadminSystemOpsSummarySchema = z.object({
  infrastructureStatus: SuperadminSystemOpsHealthStatusSchema,
  pendingJobs: z.number().int().nonnegative(),
  lastBackupAt: z.string().datetime().nullable(),
  backupStatus: SuperadminSystemOpsBackupStatusSchema,
  migrationStatus: SuperadminSystemOpsMigrationStatusSchema,
});
