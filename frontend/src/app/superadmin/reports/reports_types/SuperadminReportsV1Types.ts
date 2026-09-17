// RESPONSIBILITY: Defines the runtime-validated data contract for Report Comparison.
import { z } from 'zod';
export const SuperadminReportsV1DataSchema = z.object({ periods: z.array(z.string()), segments: z.array(z.string()), metrics: z.array(z.object({ name: z.string(), current: z.number(), previous: z.number(), change: z.number() })), planComparison: z.array(z.object({ name: z.string(), income: z.number(), gyms: z.number() })), regionComparison: z.array(z.object({ name: z.string(), current: z.number(), previous: z.number() })) });
export const SuperadminReportsV1ResponseSchema = z.object({ data: SuperadminReportsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminReportsV1Data = z.infer<typeof SuperadminReportsV1DataSchema>;
export type SuperadminReportsV1Response = z.infer<typeof SuperadminReportsV1ResponseSchema>;
export interface SuperadminReportsV1SectionProps {
    data: SuperadminReportsV1Data;
}
