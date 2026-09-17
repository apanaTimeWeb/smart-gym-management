import { describe, expect, it } from 'vitest';
import { SuperadminGymsV1DataSchema } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';
import { SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsV1MockFixtures';
describe('Tenant Growth & Bulk Controls contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGymsV1DataSchema.safeParse(SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
