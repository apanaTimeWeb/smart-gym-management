/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated data contract for Audience Segmentation.
import { z } from 'zod';export type SuperadminBroadcastsV1Data = z.infer<typeof SuperadminBroadcastsV1DataSchema>;
import { SuperadminBroadcastsV1DataSchema, SuperadminBroadcastsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsV1ContractSchemas';
export type SuperadminBroadcastsV1Response = z.infer<typeof SuperadminBroadcastsV1ResponseSchema>;
export interface SuperadminBroadcastsV1SectionProps {
    data: SuperadminBroadcastsV1Data;
}
