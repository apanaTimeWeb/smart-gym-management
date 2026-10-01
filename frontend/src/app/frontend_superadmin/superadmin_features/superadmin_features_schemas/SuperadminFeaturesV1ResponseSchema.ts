import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminFeaturesV1DataSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesV1Schema';

export const SuperadminFeaturesV1ResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminFeaturesV1DataSchema);
