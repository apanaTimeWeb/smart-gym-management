import { describe, expect, it } from 'vitest';
import { SuperadminOnboardingV1DataSchema } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types';
import { SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/onboarding/onboarding_mocks/fixtures/SuperadminOnboardingV1MockFixtures';
describe('Trial Activation & Conversion contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminOnboardingV1DataSchema.safeParse(SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
