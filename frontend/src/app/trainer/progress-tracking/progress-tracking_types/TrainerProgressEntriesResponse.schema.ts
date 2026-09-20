// RESPONSIBILITY: Validates the paginated server response used by the Trainer Progress table.
import { z } from 'zod';
import { ProgressEntrySchema } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgress.schema';

export const TrainerProgressEntriesResponseSchema = z.object({
  entries: z.array(ProgressEntrySchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});
