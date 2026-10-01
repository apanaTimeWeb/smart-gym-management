import type { infer as ZodInfer } from 'zod';
import { SuperadminInfrastructureUptimePointSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureUptimeSchema';
// RESPONSIBILITY: Defines the API/runtime contract for historical platform uptime points.
export type SuperadminInfrastructureUptimePoint = ZodInfer<typeof SuperadminInfrastructureUptimePointSchema>;
