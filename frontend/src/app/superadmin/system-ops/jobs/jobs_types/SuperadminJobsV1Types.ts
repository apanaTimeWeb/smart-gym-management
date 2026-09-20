// RESPONSIBILITY: Defines the runtime-validated data contract for Background Job Queue Health.
import { z } from 'zod';
export const SuperadminJobsV1DataSchema = z.object({ summary: z.object({ waiting: z.number(), running: z.number(), failed24h: z.number(), deadLetter: z.number(), oldestWaitingMinutes: z.number() }), queues: z.array(z.object({ name: z.string(), waiting: z.number(), running: z.number(), failed24h: z.number(), deadLetter: z.number() })), recentFailures: z.array(z.object({ job: z.string(), tenant: z.string(), time: z.string(), reason: z.string() })) });
export const SuperadminJobsV1ResponseSchema = z.object({ data: SuperadminJobsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminJobsV1Data = z.infer<typeof SuperadminJobsV1DataSchema>;
export type SuperadminJobsV1Response = z.infer<typeof SuperadminJobsV1ResponseSchema>;
export interface SuperadminJobsV1SectionProps {
    data: SuperadminJobsV1Data;
}
