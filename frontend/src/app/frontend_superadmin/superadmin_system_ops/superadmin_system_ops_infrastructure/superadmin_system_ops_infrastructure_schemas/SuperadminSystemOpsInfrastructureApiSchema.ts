import { z } from 'zod';

import { InfrastructureNodeSchema, RedisTelemetrySchema, SuperadminInfrastructureTenantSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureSchema';
import { SuperadminInfrastructureUptimePointSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureUptimeSchema';

export const SuperadminInfrastructureNodesDataSchema = z.array(InfrastructureNodeSchema);
export const SuperadminInfrastructureUptimeDataSchema = z.array(SuperadminInfrastructureUptimePointSchema);
export const SuperadminInfrastructureNullDataSchema = z.null();
export const SuperadminInfrastructureTenantListDataSchema = z.array(SuperadminInfrastructureTenantSchema);
export { RedisTelemetrySchema, SuperadminInfrastructureTenantSchema };
