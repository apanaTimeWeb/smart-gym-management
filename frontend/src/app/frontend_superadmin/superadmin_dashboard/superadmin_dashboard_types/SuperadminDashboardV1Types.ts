import { SuperadminDashboardV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardV1ResponseSchema';
import type { infer as ZodInfer } from 'zod';
import { SuperadminDashboardV1DataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardV1Schema';
// RESPONSIBILITY: Defines the runtime-validated data contract for Business Overview.

export type SuperadminDashboardV1Data = ZodInfer<typeof SuperadminDashboardV1DataSchema>;
export type SuperadminDashboardV1Response = ZodInfer<typeof SuperadminDashboardV1ResponseSchema>;
export interface SuperadminDashboardV1SectionProps {
    data: SuperadminDashboardV1Data;
}
