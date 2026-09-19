// RESPONSIBILITY: Defines the API/runtime contract for historical platform uptime points.
import { z } from 'zod';
export const SuperadminInfrastructureUptimePointSchema = z.object({
  timestamp: z.string(),
  uptimePercent: z.number().min(0).max(100),
});
export type SuperadminInfrastructureUptimePoint = z.infer<typeof SuperadminInfrastructureUptimePointSchema>;
