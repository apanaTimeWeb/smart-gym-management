import { resetSuperadminOnboardingMockState } from '@/app/superadmin/onboarding/onboarding_mocks/handlers/SuperadminOnboardingMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminOnboardingV1DataSchema } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types';
import { SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/onboarding/onboarding_mocks/fixtures/SuperadminOnboardingV1MockFixtures';
beforeEach(() => {
  resetSuperadminOnboardingMockState();
});

describe('Trial Activation & Conversion contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminOnboardingV1DataSchema.safeParse(SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
