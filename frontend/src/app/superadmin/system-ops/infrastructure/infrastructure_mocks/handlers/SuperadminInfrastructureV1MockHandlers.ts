// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminInfrastructureV1UrlConfig } from '@/app/superadmin/system-ops/infrastructure/superadmin_infrastructure_api_health_url_config';
import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/superadmin/system-ops/infrastructure/infrastructure_mocks/fixtures/SuperadminInfrastructureV1MockFixtures';
export const superadminInfrastructureV1Handlers = [
    http.get('*' + SuperadminInfrastructureV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE })),
];
