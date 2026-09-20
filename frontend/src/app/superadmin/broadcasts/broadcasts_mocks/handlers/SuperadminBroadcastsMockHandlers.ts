import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import type { Broadcast } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
import type { ApiResponse } from '@/lib/api';
import { BroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { MOCK_SUPERADMIN_BROADCASTS, SUPERADMIN_BROADCAST_TENANTS } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsMockFixtures';
import type { SuperadminBroadcastDeliveryResult } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastDeliveryTypes';

type SuperadminBroadcastMutationResponse = ApiResponse<Broadcast> | ApiResponse<SuperadminBroadcastDeliveryResult> | ApiResponse<null>;
const BASE_URL = '*/superadmin/broadcasts';
let mockBroadcasts = [...MOCK_SUPERADMIN_BROADCASTS];
const deliveredRecipientsByBroadcast = new Map<string, Set<string>>();
const idempotentBroadcastResponses = new Map<string, SuperadminBroadcastMutationResponse>();
export function resetSuperadminBroadcastsMockState(): void {
  mockBroadcasts = [...MOCK_SUPERADMIN_BROADCASTS];
  deliveredRecipientsByBroadcast.clear();
  idempotentBroadcastResponses.clear();
}
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
        const key = request.headers.get('Idempotency-Key');
        if (key && idempotentBroadcastResponses.has(`create:${key}`)) return HttpResponse.json(idempotentBroadcastResponses.get(`create:${key}`));
        const body = await request.json() as Partial<Broadcast>;
        const newBroadcast: Broadcast = { id: `b${Date.now()}`, title: body.title ?? 'New broadcast', content: body.content ?? 'Broadcast content', status: body.status ?? 'DRAFT', targetGymIds: body.targetGymIds ?? [], scheduledDate: body.scheduledDate ?? null, sentDate: body.status === 'SENT' ? new Date().toISOString() : null, totalRecipients: body.targetGymIds?.length ? body.targetGymIds.length * 10 : 0, deliveredCount: 0, failedCount: 0, audience: 'ALL_TENANTS' };
        mockBroadcasts = [newBroadcast, ...mockBroadcasts];
        const response: ApiResponse<Broadcast> = { success: true, message: 'Broadcast created', data: newBroadcast };
        if (key) idempotentBroadcastResponses.set(`create:${key}`, response);
        return HttpResponse.json(response);
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(300);
        const key = request.headers.get('Idempotency-Key');
        const responseKey = `update:${String(params.id)}:${key ?? 'none'}`;
        if (key && idempotentBroadcastResponses.has(responseKey)) return HttpResponse.json(idempotentBroadcastResponses.get(responseKey));
        const body = await request.json() as Partial<Broadcast>;
        let updated: Broadcast | undefined;
        mockBroadcasts = mockBroadcasts.map((b) => b.id === params.id ? (updated = { ...b, ...body, sentDate: body.status === 'SENT' && !b.sentDate ? new Date().toISOString() : b.sentDate }) : b);
        if (!updated) return HttpResponse.json({ success: false, message: 'Broadcast not found', data: null }, { status: StatusCodes.NOT_FOUND });
        const response: ApiResponse<Broadcast> = { success: true, message: 'Broadcast updated', data: updated };
        if (key) idempotentBroadcastResponses.set(responseKey, response);
        return HttpResponse.json(response);
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(250);
        const key = request.headers.get('Idempotency-Key');
        const responseKey = `delete:${String(params.id)}:${key ?? 'none'}`;
        if (key && idempotentBroadcastResponses.has(responseKey)) return HttpResponse.json(idempotentBroadcastResponses.get(responseKey));
        const exists = mockBroadcasts.some((b) => b.id === params.id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Broadcast not found', data: null }, { status: StatusCodes.NOT_FOUND });
        mockBroadcasts = mockBroadcasts.filter((b) => b.id !== params.id);
        const response: ApiResponse<null> = { success: true, message: 'Broadcast deleted', data: null };
        if (key) idempotentBroadcastResponses.set(responseKey, response);
        return HttpResponse.json(response);
    }),
    http.post(`${BASE_URL}/:id/deliveries/:recipientId`, async ({ params, request }) => {
        await delay(250);
        const key = request.headers.get('Idempotency-Key');
        const responseKey = `delivery:${String(params.id)}:${String(params.recipientId)}:${key ?? 'none'}`;
        if (key && idempotentBroadcastResponses.has(responseKey)) return HttpResponse.json(idempotentBroadcastResponses.get(responseKey));
        const broadcastId = String(params.id);
        const recipientId = String(params.recipientId);
        const broadcast = mockBroadcasts.find((item) => item.id === broadcastId);
        if (!broadcast) {
            return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Broadcast not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        if (!broadcast.targetGymIds.includes(recipientId)) {
            return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Recipient is not part of this broadcast', data: null }, { status: StatusCodes.BAD_REQUEST });
        }
        const delivered = deliveredRecipientsByBroadcast.get(broadcastId) ?? new Set<string>();
        if (delivered.has(recipientId)) {
            return HttpResponse.json<ApiResponse<SuperadminBroadcastDeliveryResult>>({
                success: true,
                message: 'Broadcast recipient already delivered',
                data: { broadcast, recipientId, deliveryStatus: 'DELIVERED', deliveredAt: broadcast.sentDate ?? new Date().toISOString() },
            });
        }
        delivered.add(recipientId);
        deliveredRecipientsByBroadcast.set(broadcastId, delivered);
        const updated: Broadcast = { ...broadcast, deliveredCount: Math.min(broadcast.totalRecipients ?? broadcast.targetGymIds.length, (broadcast.deliveredCount ?? 0) + 1) };
        mockBroadcasts = mockBroadcasts.map((item) => item.id === broadcastId ? updated : item);
        const response: ApiResponse<SuperadminBroadcastDeliveryResult> = {
            success: true,
            message: 'Broadcast recipient delivered',
            data: { broadcast: updated, recipientId, deliveryStatus: 'DELIVERED', deliveredAt: new Date().toISOString() },
        };
        if (key) idempotentBroadcastResponses.set(responseKey, response);
        return HttpResponse.json(response);
    }),
    http.get(`${BASE_URL}/recipient-count`, async () => HttpResponse.json({ success: true, message: 'Success', data: { count: 42 } })),
];
