// RESPONSIBILITY: Module-owned mutable MSW state for Superadmin tenant messaging.
import { StatusCodes } from 'http-status-codes';
import { delay, http, HttpResponse } from 'msw';
import type { ApiResponse } from '@/lib/api';
import type { TenantMessage, SuperadminNotification } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';
import {
  MOCK_SUPERADMIN_MESSAGING_MESSAGES,
  MOCK_SUPERADMIN_NOTIFICATIONS,
  MOCK_SUPERADMIN_MESSAGING_TENANTS,
} from '@/app/superadmin/messaging/messaging_mocks/fixtures/SuperadminMessagingMockFixtures';

const BASE_URL = '*/api/v1/superadmin/messaging';
const DEFAULT_LIMIT = 10;

let mockMessages = [...MOCK_SUPERADMIN_MESSAGING_MESSAGES];
let mockNotifications = [...MOCK_SUPERADMIN_NOTIFICATIONS];

export function resetSuperadminMessagingMockState(): void {
  mockMessages = [...MOCK_SUPERADMIN_MESSAGING_MESSAGES];
  mockNotifications = [...MOCK_SUPERADMIN_NOTIFICATIONS];
}

function parseDateBoundary(value: string | null, endOfDay = false): number | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  if (endOfDay) parsed.setHours(23, 59, 59, 999);
  return parsed.getTime();
}

export const superadminMessagingHandlers = [
  http.get(`${BASE_URL}/messages`, async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || String(DEFAULT_LIMIT)), 1);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const channel = url.searchParams.get('channel');
    const startDate = parseDateBoundary(url.searchParams.get('startDate'));
    const endDate = parseDateBoundary(url.searchParams.get('endDate'), true);

    const filtered = mockMessages.filter((message) => {
      const haystack = `${message.tenantName} ${message.subject} ${message.body}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesChannel = !channel || message.channel === channel;
      const effectiveDate = new Date(message.sentAt ?? message.scheduledAt ?? message.createdAt).getTime();
      const matchesStart = startDate === null || effectiveDate >= startDate;
      const matchesEnd = endDate === null || effectiveDate <= endDate;
      return matchesSearch && matchesChannel && matchesStart && matchesEnd;
    });

    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return HttpResponse.json<ApiResponse<TenantMessage[]>>({
      success: true,
      message: 'Messages loaded.',
      data,
      meta: { total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  }),

  http.get(`${BASE_URL}/notifications`, async () => {
    await delay(150);
    return HttpResponse.json<ApiResponse<SuperadminNotification[]>>({
      success: true,
      message: 'Notifications loaded.',
      data: [...mockNotifications],
    });
  }),

  http.patch(`${BASE_URL}/notifications/:id/read`, async ({ params }) => {
    await delay(100);
    const id = String(params.id ?? '');
    const index = mockNotifications.findIndex((notification) => notification.id === id);
    if (index < 0) {
      return HttpResponse.json<ApiResponse<SuperadminNotification>>({ success: false, message: 'Notification not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    }
    const notification = mockNotifications[index]!;
    mockNotifications[index] = { ...notification, read: true };
    return HttpResponse.json<ApiResponse<SuperadminNotification>>({
      success: true,
      message: 'Notification marked as read.',
      data: mockNotifications[index]!,
    });
  }),

  http.patch(`${BASE_URL}/notifications/read-all`, async () => {
    await delay(100);
    mockNotifications = mockNotifications.map((notification) => ({ ...notification, read: true }));
    return HttpResponse.json<ApiResponse<SuperadminNotification[]>>({
      success: true,
      message: 'Notifications marked as read.',
      data: [...mockNotifications],
    });
  }),

  http.get(`${BASE_URL}/tenants`, async () => {
    await delay(150);
    return HttpResponse.json<ApiResponse<typeof MOCK_SUPERADMIN_MESSAGING_TENANTS>>({
      success: true,
      message: 'Messaging tenants loaded.',
      data: [...MOCK_SUPERADMIN_MESSAGING_TENANTS],
    });
  }),

  http.post(`${BASE_URL}/messages`, async ({ request }) => {
    await delay(150);
    const payload = await request.json() as Partial<TenantMessage>;
    if (!payload.tenantId || !payload.tenantName || !payload.channel || !payload.subject?.trim() || !payload.body?.trim()) {
      return HttpResponse.json<ApiResponse<TenantMessage>>({ success: false, message: 'Invalid message payload.', data: null }, { status: StatusCodes.BAD_REQUEST });
    }
    const newMessage: TenantMessage = {
      id: `m${Date.now()}`,
      tenantId: payload.tenantId,
      tenantName: payload.tenantName,
      channel: payload.channel,
      subject: payload.subject.trim(),
      body: payload.body.trim(),
      status: 'SENT',
      sentAt: new Date().toISOString(),
      scheduledAt: null,
      createdAt: new Date().toISOString(),
    };
    mockMessages = [newMessage, ...mockMessages];
    return HttpResponse.json<ApiResponse<TenantMessage>>({ success: true, message: 'Message sent.', data: newMessage });
  }),
];
