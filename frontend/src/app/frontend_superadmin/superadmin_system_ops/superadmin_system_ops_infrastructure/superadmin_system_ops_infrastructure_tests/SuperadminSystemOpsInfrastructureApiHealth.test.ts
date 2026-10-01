import { describe, expect, it } from 'vitest';

import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureV1MockFixtures';
import { SuperadminInfrastructureV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_schemas/SuperadminSystemOpsInfrastructureV1Schema';

describe('Platform API Health contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminInfrastructureV1DataSchema.safeParse(SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
