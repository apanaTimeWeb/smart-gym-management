import { z } from 'zod';

export const SuperadminSystemSlaRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  targetSla: z.number(),
  actualUptime: z.number(),
  downtimeMinutes: z.number(),
  downtimeIncidents: z.number(),
  status: z.enum(['MET', 'WARNING', 'BREACHED']),
  creditIssued: z.boolean().optional(),
});
export type SuperadminSystemSlaRecord = z.infer<typeof SuperadminSystemSlaRecordSchema>;
