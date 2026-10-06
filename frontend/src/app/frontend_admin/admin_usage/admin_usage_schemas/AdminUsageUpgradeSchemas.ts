import { z } from 'zod';

export const adminUsageUpgradeRequestSchema = z.object({
  requestId: z.string(),
  planName: z.string(),
  status: z.literal('pending'),
  requestedAt: z.string(),
});
