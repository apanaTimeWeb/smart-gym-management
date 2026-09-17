// RESPONSIBILITY: Defines the runtime-validated data contract for Tenant Growth & Bulk Controls.
import { z } from 'zod';
export const SuperadminGymsV1DataSchema = z.object({ segments: z.array(z.object({ name: z.string(), count: z.number(), rule: z.string() })), filters: z.array(z.string()), bulk: z.array(z.string()), saved: z.array(z.string()), rows: z.array(z.object({ name: z.string(), status: z.string(), region: z.string(), plan: z.string(), income: z.number(), health: z.number(), usage: z.number() })) });
export const SuperadminGymsV1ResponseSchema = z.object({ data: SuperadminGymsV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminGymsV1Data = z.infer<typeof SuperadminGymsV1DataSchema>;
export type SuperadminGymsV1Response = z.infer<typeof SuperadminGymsV1ResponseSchema>;
export interface SuperadminGymsV1SectionProps {
    data: SuperadminGymsV1Data;
}
