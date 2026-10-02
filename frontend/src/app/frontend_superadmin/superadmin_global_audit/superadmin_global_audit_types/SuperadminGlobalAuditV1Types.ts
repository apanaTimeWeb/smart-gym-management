/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated data contract for Audit Investigation.
import { z } from 'zod';export type SuperadminGlobalAuditV1Data = z.infer<typeof SuperadminGlobalAuditV1DataSchema>;
import { SuperadminGlobalAuditV1DataSchema, SuperadminGlobalAuditV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_schemas/SuperadminGlobalAuditV1ContractSchemas';
export type SuperadminGlobalAuditV1Response = z.infer<typeof SuperadminGlobalAuditV1ResponseSchema>;
export interface SuperadminGlobalAuditV1SectionProps {
    data: SuperadminGlobalAuditV1Data;
}
