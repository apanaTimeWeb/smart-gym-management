// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminJobsV1UrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_queue_health_url_config';
import { SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE } from '@/app/superadmin/jobs/jobs_mocks/fixtures/SuperadminJobsV1MockFixtures';
export const superadminJobsV1Handlers = [
    http.get('*' + SuperadminJobsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_JOBS_QUEUE_HEALTH_MOCK_FIXTURE })),
];
