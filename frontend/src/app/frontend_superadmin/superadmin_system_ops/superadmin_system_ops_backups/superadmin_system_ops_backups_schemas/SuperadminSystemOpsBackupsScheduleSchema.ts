/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsScheduleSchema owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminSystemOpsBackupsScheduleSchema = z.object({
  cronExpression: z.string().min(1),
  retentionDays: z.number().int().min(1).max(365),
  updatedAt: z.string(),
});

export const SuperadminBackupsScheduleInputSchema = z.object({
  cronExpression: z.string().trim().min(1, 'Cron expression is required.'),
  retentionDays: z.number().int().min(1, 'Retention must be at least 1 day.').max(365, 'Retention cannot exceed 365 days.'),
});
