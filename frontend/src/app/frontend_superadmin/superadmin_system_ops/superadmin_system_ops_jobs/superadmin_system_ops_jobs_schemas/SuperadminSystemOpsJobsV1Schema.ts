import { z } from 'zod';

export const SuperadminJobsV1DataSchema = z.object({ summary: z.object({ waiting: z.number(), running: z.number(), failed24h: z.number(), deadLetter: z.number(), oldestWaitingMinutes: z.number() }), queues: z.array(z.object({ name: z.string(), waiting: z.number(), running: z.number(), failed24h: z.number(), deadLetter: z.number() })), recentFailures: z.array(z.object({ job: z.string(), tenant: z.string(), time: z.string(), reason: z.string() })) });
