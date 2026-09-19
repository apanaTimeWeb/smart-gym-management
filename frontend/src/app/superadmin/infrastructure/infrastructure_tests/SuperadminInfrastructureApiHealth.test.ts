import { describe, expect, it } from 'vitest';
import { SuperadminInfrastructureV1DataSchema } from '@/app/superadmin/infrastructure/infrastructure_types/SuperadminInfrastructureV1Types';
import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/superadmin/infrastructure/infrastructure_mocks/fixtures/SuperadminInfrastructureV1MockFixtures';
describe('Platform API Health contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminInfrastructureV1DataSchema.safeParse(SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
