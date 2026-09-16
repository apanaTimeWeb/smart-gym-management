import { http, HttpResponse, delay } from 'msw';
import { MOCK_BACKGROUND_JOBS } from '@/app/superadmin/jobs/jobs_utils/SuperadminJobsConstants';

const BASE_URL = '*/superadmin/jobs';
let mockJobs = [...MOCK_BACKGROUND_JOBS];

export const superadminJobsHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const status = url.searchParams.get('status');
    const queue = url.searchParams.get('queue');
    let filtered = [...mockJobs];
    if (status && status !== 'ALL') filtered = filtered.filter((job) => job.status === status);
    if (queue && queue !== 'ALL') filtered = filtered.filter((job) => job.queueName === queue);
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return HttpResponse.json({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  }),
  http.post(`${BASE_URL}/retry-all`, async () => {
    await delay(400);
    mockJobs = mockJobs.map((job) => job.status === 'FAILED' ? { ...job, status: 'ACTIVE' } : job);
    return HttpResponse.json({ success: true, message: 'Jobs retried', data: { queuedCount: mockJobs.filter((job) => job.status === 'ACTIVE').length } });
  }),
];
