import { http, HttpResponse, delay } from 'msw';
import { SuperadminJobsUrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_url_config';
import { MOCK_BACKGROUND_JOBS } from '@/app/superadmin/jobs/jobs_utils/SuperadminJobsConstants';

let mockJobs = [...MOCK_BACKGROUND_JOBS];

export const superadminJobsHandlers = [
  http.get(SuperadminJobsUrlConfig.BACKEND_API.JOBS_BASE, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockJobs });
  }),
  http.post(`${SuperadminJobsUrlConfig.BACKEND_API.JOBS_BASE}/retry-all`, async () => {
    await delay(600);
    mockJobs = mockJobs.map(j => j.status === 'FAILED' ? { ...j, status: 'ACTIVE' } : j);
    return HttpResponse.json({ success: true, message: 'Jobs retried', data: { queuedCount: mockJobs.filter(j => j.status === 'ACTIVE').length } });
  }),
];
