/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated data contract for Payment Recovery & Billing Adjustments.
import { z } from 'zod';export type SuperadminInvoicesV1Data = z.infer<typeof SuperadminInvoicesV1DataSchema>;
import { SuperadminInvoicesV1DataSchema, SuperadminInvoicesV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesV1ContractSchemas';
export type SuperadminInvoicesV1Response = z.infer<typeof SuperadminInvoicesV1ResponseSchema>;
export interface SuperadminInvoicesV1SectionProps {
    data: SuperadminInvoicesV1Data;
}
