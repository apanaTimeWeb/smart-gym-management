import { describe, expect, it } from 'vitest';
import { SuperadminFeaturesV1DataSchema } from '@/app/superadmin/features/features_types/SuperadminFeaturesV1Types';
import { SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/features/features_mocks/fixtures/SuperadminFeaturesV1MockFixtures';
describe('Feature Rollouts & Release History contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminFeaturesV1DataSchema.safeParse(SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
