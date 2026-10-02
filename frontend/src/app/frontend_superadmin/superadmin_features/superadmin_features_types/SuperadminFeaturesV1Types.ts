import { SuperadminFeaturesV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesV1ResponseSchema';
import { SuperadminFeaturesV1DataSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesV1Schema';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Feature Rollouts & Release History.

export type SuperadminFeaturesV1Data = ZodInfer<typeof SuperadminFeaturesV1DataSchema>;
export type SuperadminFeaturesV1Response = ZodInfer<typeof SuperadminFeaturesV1ResponseSchema>;
export interface SuperadminFeaturesV1SectionProps {
    data: SuperadminFeaturesV1Data;
}
