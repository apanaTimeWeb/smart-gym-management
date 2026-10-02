/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated data contract for Platform Governance.
import { z } from 'zod';export type SuperadminSettingsV1Data = z.infer<typeof SuperadminSettingsV1DataSchema>;
import { SuperadminSettingsV1DataSchema, SuperadminSettingsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_schemas/SuperadminSettingsV1ContractSchemas';
export type SuperadminSettingsV1Response = z.infer<typeof SuperadminSettingsV1ResponseSchema>;
export interface SuperadminSettingsV1SectionProps {
    data: SuperadminSettingsV1Data;
}
