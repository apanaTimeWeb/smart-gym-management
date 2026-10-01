// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SuperadminJobsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_url_config';
import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_mocks/superadmin_system_ops_jobs_mocks_fixtures/SuperadminSystemOpsJobsV1MockFixtures';

export const superadminJobsV1Handlers = [
    http.get('*' + SuperadminJobsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE })),
];
