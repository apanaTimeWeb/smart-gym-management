import { SuperadminAnalyticsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsV1ResponseSchema';
import { SuperadminAnalyticsV1DataSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsV1Schema';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Customer Retention & Growth Insights.

export type SuperadminAnalyticsV1Data = ZodInfer<typeof SuperadminAnalyticsV1DataSchema>;
export type SuperadminAnalyticsV1Response = ZodInfer<typeof SuperadminAnalyticsV1ResponseSchema>;
export interface SuperadminAnalyticsV1SectionProps {
    data: SuperadminAnalyticsV1Data;
}
