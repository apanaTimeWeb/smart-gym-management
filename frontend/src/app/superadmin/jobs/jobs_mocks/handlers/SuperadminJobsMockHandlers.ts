// RESPONSIBILITY: Owns module-specific MSW handlers for Superadmin background-job list and mutation scenarios.
import { delay, http, HttpResponse } from 'msw';
import { JobsUrlConfig } from '@/app/superadmin/jobs/superadmin_jobs_url_config';
import { MOCK_BACKGROUND_JOBS } from '@/app/superadmin/jobs/jobs_mocks/fixtures/SuperadminJobsMockData';

const BASE_URL = `*${JobsUrlConfig.BACKEND_API.BASE}`;
let mockJobs = [...MOCK_BACKGROUND_JOBS];

const getPagedResponse = (jobs: typeof mockJobs, request: Request) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const status = url.searchParams.get('status');
    const queue = url.searchParams.get('queue');
    let filtered = [...jobs];
    if (status && status !== 'ALL') filtered = filtered.filter((job) => job.status === status);
    if (queue && queue !== 'ALL') filtered = filtered.filter((job) => job.queueName === queue);
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

const jsonSuccess = <T>(message: string, data: T) => HttpResponse.json({ success: true, message, data });

export const superadminJobsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(250);
        const result = getPagedResponse(mockJobs, request);
        return HttpResponse.json({ success: true, message: 'Jobs loaded.', data: result.data, meta: result.meta });
    }),
    http.post(`${BASE_URL}/retry-all`, async () => {
        await delay(300);
        const failedBefore = mockJobs.filter((job) => job.status === 'FAILED').length;
        mockJobs = mockJobs.map((job) => job.status === 'FAILED' ? { ...job, status: 'ACTIVE' } : job);
        return jsonSuccess(`Queued ${failedBefore} failed jobs for retry.`, { queuedCount: failedBefore });
    }),
    http.post(`${BASE_URL}/:id/retry`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const index = mockJobs.findIndex((job) => job.id === id);
        if (index < 0) return HttpResponse.json({ success: false, message: 'Job not found.', data: null }, { status: 404 });
        const job = mockJobs[index]!;
        mockJobs[index] = { ...job, status: 'ACTIVE', attempts: job.attempts + 1 };
        return jsonSuccess('Job queued for retry.', mockJobs[index]);
    }),
    http.post(`${BASE_URL}/:id/cancel`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const index = mockJobs.findIndex((job) => job.id === id);
        if (index < 0) return HttpResponse.json({ success: false, message: 'Job not found.', data: null }, { status: 404 });
        const job = mockJobs[index]!;
        mockJobs[index] = { ...job, status: 'CANCELLED' };
        return jsonSuccess('Job cancelled.', mockJobs[index]);
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const exists = mockJobs.some((job) => job.id === id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Job not found.', data: null }, { status: 404 });
        mockJobs = mockJobs.filter((job) => job.id !== id);
        return jsonSuccess('Job deleted.', null);
    }),
    http.post(`${BASE_URL}/clear-completed`, async () => {
        await delay(250);
        const completedCount = mockJobs.filter((job) => job.status === 'COMPLETED').length;
        mockJobs = mockJobs.filter((job) => job.status !== 'COMPLETED');
        return jsonSuccess(`Cleared ${completedCount} completed jobs.`, { affectedCount: completedCount });
    }),
    http.post(`${BASE_URL}/bulk-retry`, async ({ request }) => {
        await delay(300);
        const body = await request.json() as { ids?: unknown };
        const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string') : [];
        let affectedCount = 0;
        mockJobs = mockJobs.map((job) => {
            if (ids.includes(job.id) && job.status === 'FAILED') {
                affectedCount += 1;
                return { ...job, status: 'ACTIVE', attempts: job.attempts + 1 };
            }
            return job;
        });
        return jsonSuccess(`Queued ${affectedCount} selected jobs for retry.`, { affectedCount });
    }),
    http.post(`${BASE_URL}/bulk-delete`, async ({ request }) => {
        await delay(300);
        const body = await request.json() as { ids?: unknown };
        const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string') : [];
        const before = mockJobs.length;
        mockJobs = mockJobs.filter((job) => !ids.includes(job.id));
        const affectedCount = before - mockJobs.length;
        return jsonSuccess(`Deleted ${affectedCount} selected jobs.`, { affectedCount });
    }),
];
