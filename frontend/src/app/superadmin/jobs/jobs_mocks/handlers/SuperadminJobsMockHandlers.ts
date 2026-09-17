import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/superadmin_jobs_types';
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
    http.post(`${BASE_URL}/:id/retry`, async ({ params }) => { await delay(250); const id = String(params.id); let updated: BackgroundJob | null = null; mockJobs = mockJobs.map((job) => { if (job.id !== id) return job; updated = { ...job, status: 'ACTIVE' }; return updated; }); if (!updated) return HttpResponse.json({ success: false, message: 'Job not found', data: null }, { status: StatusCodes.NOT_FOUND }); return HttpResponse.json({ success: true, message: 'Job retried', data: updated }); }),
  http.post(`${BASE_URL}/:id/cancel`, async ({ params }) => { await delay(250); const id = String(params.id); let updated: BackgroundJob | null = null; mockJobs = mockJobs.map((job) => { if (job.id !== id) return job; updated = { ...job, status: 'COMPLETED' }; return updated; }); if (!updated) return HttpResponse.json({ success: false, message: 'Job not found', data: null }, { status: StatusCodes.NOT_FOUND }); return HttpResponse.json({ success: true, message: 'Job cancelled', data: updated }); }),
  http.delete(`${BASE_URL}/:id`, async ({ params }) => { await delay(250); const id = String(params.id); const before = mockJobs.length; mockJobs = mockJobs.filter((job) => job.id !== id); if (mockJobs.length === before) return HttpResponse.json({ success: false, message: 'Job not found', data: null }, { status: StatusCodes.NOT_FOUND }); return HttpResponse.json({ success: true, message: 'Job deleted', data: null }); }),
  http.delete(`${BASE_URL}/completed`, async () => { await delay(250); const before = mockJobs.length; mockJobs = mockJobs.filter((job) => job.status !== 'COMPLETED'); return HttpResponse.json({ success: true, message: 'Completed jobs cleared', data: { deletedCount: before - mockJobs.length } }); }),
  http.post(`${BASE_URL}/bulk-retry`, async ({ request }) => { await delay(250); const body = await request.json() as { ids?: string[] }; const ids = new Set(body.ids ?? []); let queuedCount = 0; mockJobs = mockJobs.map((job) => { if (!ids.has(job.id)) return job; queuedCount += 1; return { ...job, status: 'ACTIVE' }; }); return HttpResponse.json({ success: true, message: 'Selected jobs retried', data: { queuedCount } }); }),
  http.post(`${BASE_URL}/bulk-delete`, async ({ request }) => { await delay(250); const body = await request.json() as { ids?: string[] }; const ids = new Set(body.ids ?? []); const before = mockJobs.length; mockJobs = mockJobs.filter((job) => !ids.has(job.id)); return HttpResponse.json({ success: true, message: 'Selected jobs deleted', data: { deletedCount: before - mockJobs.length } }); }),
  http.post(`${BASE_URL}/retry-all`, async () => {
    await delay(400);
    mockJobs = mockJobs.map((job) => job.status === 'FAILED' ? { ...job, status: 'ACTIVE' } : job);
    return HttpResponse.json({ success: true, message: 'Jobs retried', data: { queuedCount: mockJobs.filter((job) => job.status === 'ACTIVE').length } });
  }),
];
