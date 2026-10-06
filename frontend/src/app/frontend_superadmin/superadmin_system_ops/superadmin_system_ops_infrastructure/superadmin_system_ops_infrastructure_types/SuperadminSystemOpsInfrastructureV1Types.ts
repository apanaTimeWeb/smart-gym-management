import { SuperadminSystemOpsInfrastructureV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureV1ResponseSchema';
import { SuperadminInfrastructureV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureV1Schema';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Platform API Health.

export type SuperadminInfrastructureV1Data = ZodInfer<typeof SuperadminInfrastructureV1DataSchema>;
export type SuperadminInfrastructureV1Response = ZodInfer<typeof SuperadminSystemOpsInfrastructureV1ResponseSchema>;
export interface SuperadminInfrastructureV1SectionProps {
    data: SuperadminInfrastructureV1Data;
}
