/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated data contract for Plan Comparison & Pricing Control.
import { z } from 'zod';export type SuperadminPlansV1Data = z.infer<typeof SuperadminPlansV1DataSchema>;
import { SuperadminPlansV1DataSchema, SuperadminPlansV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_schemas/SuperadminPlansV1ContractSchemas';
export type SuperadminPlansV1Response = z.infer<typeof SuperadminPlansV1ResponseSchema>;
export interface SuperadminPlansV1SectionProps {
    data: SuperadminPlansV1Data;
}
