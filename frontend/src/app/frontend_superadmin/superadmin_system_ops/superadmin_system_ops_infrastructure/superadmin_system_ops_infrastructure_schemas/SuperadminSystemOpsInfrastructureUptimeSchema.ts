import { z } from 'zod';

export const SuperadminInfrastructureUptimePointSchema = z.object({
  timestamp: z.string(),
  uptimePercent: z.number().min(0).max(100),
});
