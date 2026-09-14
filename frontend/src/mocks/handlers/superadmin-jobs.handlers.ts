import { http, HttpResponse, delay } from 'msw';
import { MOCK_BACKGROUND_JOBS } from '@/app/superadmin/jobs/jobs_utils/SuperadminJobsConstants';
const BASE_URL = '*/superadmin/jobs';

let mockJobs = [...MOCK_BACKGROUND_JOBS];

export const superadminJobsHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json({ success: true, message: 'Success', data: mockJobs });
  }),
  http.post(`${BASE_URL}/retry-all`, async () => {
    await delay(600);
    mockJobs = mockJobs.map(j => j.status === 'FAILED' ? { ...j, status: 'ACTIVE' } : j);
    return HttpResponse.json({ success: true, message: 'Jobs retried', data: { queuedCount: mockJobs.filter(j => j.status === 'ACTIVE').length } });
  }),
];
