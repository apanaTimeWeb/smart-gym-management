import { http, HttpResponse, delay } from 'msw';
import type { Broadcast } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import type { ApiResponse } from '@/lib/api';
import { BroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { MOCK_SUPERADMIN_BROADCASTS, SUPERADMIN_BROADCAST_TENANTS } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsMockFixtures';
const BASE_URL = '*/superadmin/broadcasts';
let mockBroadcasts = [...MOCK_SUPERADMIN_BROADCASTS];
export const superadminBroadcastsHandlers = [
    http.get(BroadcastsUrlConfig.BACKEND_API.TENANTS, async () => HttpResponse.json({ success: true, message: 'Success', data: SUPERADMIN_BROADCAST_TENANTS })),
    http.get(BASE_URL, async ({ request }) => {
        await delay(350);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page') || '1');
        const limit = Number(url.searchParams.get('limit') || '10');
        const search = (url.searchParams.get('search') || '').toLowerCase();
        const status = url.searchParams.get('status') || 'ALL';
        let filtered = [...mockBroadcasts];
        if (search)
            filtered = filtered.filter((b) => b.title.toLowerCase().includes(search) || b.content.toLowerCase().includes(search));
        if (status !== 'ALL' && status !== 'FAILED')
            filtered = filtered.filter((b) => b.status === status);
        if (status === 'FAILED')
            filtered = filtered.filter((b) => (b.failedCount ?? 0) > 0);
        const total = filtered.length;
        const data = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<Broadcast[]>>({ success: true, message: 'Success', data, meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) } });
    }),
    http.post(BASE_URL, async ({ request }) => {
        await delay(300);
        const body = await request.json() as Partial<Broadcast>;
        const newBroadcast: Broadcast = { id: `b${Date.now()}`, title: body.title ?? 'New broadcast', content: body.content ?? 'Broadcast content', status: body.status ?? 'DRAFT', targetGymIds: body.targetGymIds ?? [], scheduledDate: body.scheduledDate ?? null, sentDate: body.status === 'SENT' ? new Date().toISOString() : null, totalRecipients: body.targetGymIds?.length ? body.targetGymIds.length * 10 : 0, deliveredCount: 0, failedCount: 0, audience: 'ALL_TENANTS' };
        mockBroadcasts = [newBroadcast, ...mockBroadcasts];
        return HttpResponse.json<ApiResponse<Broadcast>>({ success: true, message: 'Broadcast created', data: newBroadcast });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(300);
        const body = await request.json() as Partial<Broadcast>;
        let updated: Broadcast | undefined;
        mockBroadcasts = mockBroadcasts.map((b) => b.id === params.id ? (updated = { ...b, ...body, sentDate: body.status === 'SENT' && !b.sentDate ? new Date().toISOString() : b.sentDate }) : b);
        if (!updated)
            return HttpResponse.json({ success: false, message: 'Broadcast not found', data: null }, { status: 404 });
        return HttpResponse.json<ApiResponse<Broadcast>>({ success: true, message: 'Broadcast updated', data: updated });
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(250);
        mockBroadcasts = mockBroadcasts.filter((b) => b.id !== params.id);
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Broadcast deleted', data: null });
    }),
    http.get(`${BASE_URL}/recipient-count`, async () => HttpResponse.json({ success: true, message: 'Success', data: { count: 42 } })),
];
