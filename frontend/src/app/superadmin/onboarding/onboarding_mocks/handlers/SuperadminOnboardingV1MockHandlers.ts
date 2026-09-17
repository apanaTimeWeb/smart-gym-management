// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminOnboardingV1UrlConfig } from '@/app/superadmin/onboarding/superadmin_onboarding_activation_insights_url_config';
import { SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/onboarding/onboarding_mocks/fixtures/SuperadminOnboardingV1MockFixtures';
export const superadminOnboardingV1Handlers = [
    http.get('*' + SuperadminOnboardingV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE })),
];
