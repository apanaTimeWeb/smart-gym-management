import { z } from 'zod';

export const SuperadminBackupsScheduleSchema = z.object({
  cronExpression: z.string().min(1),
  retentionDays: z.number().int().min(1).max(365),
  updatedAt: z.string(),
});

export const SuperadminBackupsScheduleInputSchema = z.object({
  cronExpression: z.string().trim().min(1, 'Cron expression is required.'),
  retentionDays: z.number().int().min(1, 'Retention must be at least 1 day.').max(365, 'Retention cannot exceed 365 days.'),
});

export type SuperadminBackupsSchedule = z.infer<typeof SuperadminBackupsScheduleSchema>;
export type SuperadminBackupsScheduleInput = z.infer<typeof SuperadminBackupsScheduleInputSchema>;
