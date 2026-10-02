/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
import { z } from 'zod';export type SuperadminComplianceResponse = z.infer<typeof SuperadminComplianceResponseSchema>;
import { SuperadminComplianceResponseSchema } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_schemas/SuperadminComplianceContractSchemas';

export interface SuperadminComplianceSectionProps {
    data: SuperadminComplianceResponse;
}
