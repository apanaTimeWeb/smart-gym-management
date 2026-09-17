// RESPONSIBILITY: Defines the runtime-validated data contract for Audit Investigation.
import { z } from 'zod';
export const SuperadminGlobalAuditV1DataSchema = z.object({ changes: z.array(z.object({ time: z.string(), actor: z.string(), action: z.string(), resource: z.string(), before: z.string(), after: z.string(), risk: z.string() })), anomalies: z.array(z.object({ title: z.string(), detail: z.string(), severity: z.string() })), filters: z.array(z.string()) });
export const SuperadminGlobalAuditV1ResponseSchema = z.object({ data: SuperadminGlobalAuditV1DataSchema, message: z.string(), success: z.boolean() });
export type SuperadminGlobalAuditV1Data = z.infer<typeof SuperadminGlobalAuditV1DataSchema>;
export type SuperadminGlobalAuditV1Response = z.infer<typeof SuperadminGlobalAuditV1ResponseSchema>;
export interface SuperadminGlobalAuditV1SectionProps {
    data: SuperadminGlobalAuditV1Data;
}
