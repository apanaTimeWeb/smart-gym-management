import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminAnalyticsV1DataSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsV1Schema';

export const SuperadminAnalyticsV1ResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminAnalyticsV1DataSchema);
