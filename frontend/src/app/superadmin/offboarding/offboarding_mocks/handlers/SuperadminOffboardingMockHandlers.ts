import { http, HttpResponse } from 'msw';
import { SuperadminOffboardingUrlConfig } from '@/app/superadmin/offboarding/superadmin_offboarding_url_config';
import { SUPERADMIN_OFFBOARDING_MOCK_FIXTURE } from '@/app/superadmin/offboarding/offboarding_mocks/fixtures/SuperadminOffboardingMockFixtures';
export const superadminOffboardingHandlers = [http.get('*' + SuperadminOffboardingUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_OFFBOARDING_MOCK_FIXTURE }))];
