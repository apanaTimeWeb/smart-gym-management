// RESPONSIBILITY: Defines the runtime-validated data contract for Platform API Health.
import { z } from 'zod';
export const SuperadminInfrastructureV1DataSchema = z.object({ summary: z.object({ requestsPerMinute: z.number(), errorsPercent: z.number(), p50: z.number(), p95: z.number(), p99: z.number() }), endpoints: z.array(z.object({ name: z.string(), p50: z.number(), p95: z.number(), p99: z.number(), errors: z.number() })), incidents: z.array(z.object({ title: z.string(), impact: z.string(), started: z.string(), status: z.string() })) });
export const SuperadminInfrastructureV1ResponseSchema = z.object({ data: SuperadminInfrastructureV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminInfrastructureV1Data = z.infer<typeof SuperadminInfrastructureV1DataSchema>;
export type SuperadminInfrastructureV1Response = z.infer<typeof SuperadminInfrastructureV1ResponseSchema>;
export interface SuperadminInfrastructureV1SectionProps {
    data: SuperadminInfrastructureV1Data;
}
