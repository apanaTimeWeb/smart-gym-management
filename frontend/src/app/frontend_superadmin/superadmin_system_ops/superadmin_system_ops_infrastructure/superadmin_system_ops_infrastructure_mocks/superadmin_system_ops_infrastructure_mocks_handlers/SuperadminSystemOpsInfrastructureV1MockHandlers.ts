// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SuperadminInfrastructureV1UrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_url_config';
import { SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_mocks/superadmin_system_ops_infrastructure_mocks_fixtures/SuperadminSystemOpsInfrastructureV1MockFixtures';

export const superadminInfrastructureV1Handlers = [
    http.get('*' + SuperadminInfrastructureV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_INFRASTRUCTURE_API_HEALTH_MOCK_FIXTURE })),
];
