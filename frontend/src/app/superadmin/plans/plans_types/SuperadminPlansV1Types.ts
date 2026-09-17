// RESPONSIBILITY: Defines the runtime-validated data contract for Plan Comparison & Pricing Control.
import { z } from 'zod';
export const SuperadminPlansV1DataSchema = z.object({ plans: z.array(z.object({ name: z.string(), monthly: z.number(), members: z.number(), storage: z.number(), branches: z.number() })), versions: z.array(z.object({ plan: z.string(), version: z.string(), effective: z.string(), monthly: z.number(), change: z.string() })), addons: z.array(z.object({ name: z.string(), price: z.number() })), migration: z.object({ from: z.string(), to: z.string(), tenants: z.number(), monthlyChange: z.number(), limitConflicts: z.number() }) });
export const SuperadminPlansV1ResponseSchema = z.object({ data: SuperadminPlansV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminPlansV1Data = z.infer<typeof SuperadminPlansV1DataSchema>;
export type SuperadminPlansV1Response = z.infer<typeof SuperadminPlansV1ResponseSchema>;
export interface SuperadminPlansV1SectionProps {
    data: SuperadminPlansV1Data;
}
