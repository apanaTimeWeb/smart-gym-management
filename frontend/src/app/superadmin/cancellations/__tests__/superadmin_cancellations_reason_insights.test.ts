import { describe, expect, it } from 'vitest';
import { SuperadminCancellationsV1DataSchema } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsV1Types';
import { SUPERADMIN_CANCELLATIONS_REASON_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/cancellations/cancellations_mocks/fixtures/SuperadminCancellationsV1MockFixtures';
describe('Why Gyms Leave contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminCancellationsV1DataSchema.safeParse(SUPERADMIN_CANCELLATIONS_REASON_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
