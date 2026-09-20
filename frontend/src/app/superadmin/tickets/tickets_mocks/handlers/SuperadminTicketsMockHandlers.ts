import { http, HttpResponse, delay } from 'msw';
import type { SupportTicket } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
import { MOCK_TICKETS } from '@/app/superadmin/tickets/tickets_mocks/fixtures/SuperadminTicketsMockData';
import type { ApiResponse } from '@/lib/api';
import { TicketsUrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_url_config';
import { StatusCodes } from 'http-status-codes';
import { replySchema, TicketAssigneeInputSchema } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
const BASE_URL = `*${TicketsUrlConfig.BACKEND_API.BASE}`;
let mockTickets = [...MOCK_TICKETS];
export function resetSuperadminTicketsMockState(): void {
    mockTickets = [...MOCK_TICKETS];
}

export const superadminTicketsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status');
        const priority = url.searchParams.get('priority');
        let filtered = [...mockTickets];
        if (search) {
            filtered = filtered.filter(t => t.tenantName?.toLowerCase().includes(search) ||
                t.subject?.toLowerCase().includes(search) ||
                t.id?.toLowerCase().includes(search));
        }
        if (status) {
            filtered = filtered.filter(t => t.status === status);
        }
        if (priority) {
            filtered = filtered.filter(t => t.priority === priority);
        }
        const total = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<SupportTicket[]>>({
            success: true,
            message: 'Success',
            data: paginated,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    }),
    http.get(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(300);
        const id = params.id as string;
        const ticket = mockTickets.find(t => t.id === id);
        if (!ticket) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null as unknown as SupportTicket }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<SupportTicket>>({
            success: true,
            message: 'Success',
            data: ticket,
        });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = (await request.json()) as Partial<SupportTicket>;
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map(t => {
            if (t.id === id) {
                updated = { ...t, ...body, lastUpdated: new Date().toISOString() };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null as unknown as SupportTicket }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<SupportTicket>>({
            success: true,
            message: 'Updated',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/:id/close`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map(t => {
            if (t.id === id) {
                updated = { ...t, status: 'CLOSED', lastUpdated: new Date().toISOString() };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null as unknown as SupportTicket }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<SupportTicket>>({
            success: true,
            message: 'Closed',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/:id/reply`, async ({ params, request }) => {
        await delay(400);
        const id = params.id as string;
        const parsed = replySchema.safeParse(await request.json());
        if (!parsed.success) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Reply text is required', data: null as unknown as SupportTicket }, { status: StatusCodes.BAD_REQUEST });
        }
        const replyText = parsed.data.replyText.trim();
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map((ticket) => {
            if (ticket.id !== id) return ticket;
            const existingMessages = ticket.messages ?? [];
            const reply = {
                id: `msg-${Date.now()}`,
                senderId: 'superadmin',
                senderName: 'Superadmin',
                senderRole: 'SUPERADMIN' as const,
                content: replyText,
                createdAt: new Date().toISOString(),
            };
            updated = { ...ticket, messages: [...existingMessages, reply], status: ticket.status === 'CLOSED' ? 'CLOSED' : 'IN_PROGRESS', firstResponseAt: ticket.firstResponseAt ?? reply.createdAt, lastUpdated: reply.createdAt };
            return updated;
        });
        if (!updated) return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null as unknown as SupportTicket }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<SupportTicket>>({ success: true, message: 'Reply sent', data: updated });
    }),
    http.post(`${BASE_URL}/:id/assign`, async ({ params, request }) => {
        await delay(400);
        const id = params.id as string;
        const parsed = TicketAssigneeInputSchema.safeParse(await request.json());
        if (!parsed.success) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Assignee is required', data: null as unknown as SupportTicket }, { status: StatusCodes.BAD_REQUEST });
        }
        const assignee = parsed.data.assignee;
        let updated: SupportTicket | null = null;
        mockTickets = mockTickets.map(t => {
            if (t.id === id) {
                updated = { ...t, assignedTo: assignee, status: 'IN_PROGRESS', lastUpdated: new Date().toISOString() };
                return updated;
            }
            return t;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<SupportTicket>>({ success: false, message: 'Not found', data: null as unknown as SupportTicket }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<SupportTicket>>({
            success: true,
            message: 'Assigned',
            data: updated,
        });
    }),
];
