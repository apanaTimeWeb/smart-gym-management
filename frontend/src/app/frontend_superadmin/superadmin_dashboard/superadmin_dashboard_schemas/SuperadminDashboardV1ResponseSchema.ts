import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminDashboardV1DataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardV1Schema';

export const SuperadminDashboardV1ResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminDashboardV1DataSchema);
