import { http, HttpResponse, delay } from 'msw';
import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/messaging';

import { MOCK_SUPERADMIN_MESSAGING_MESSAGES, MOCK_SUPERADMIN_NOTIFICATIONS, MOCK_SUPERADMIN_MESSAGING_TENANTS } from '@/app/superadmin/messaging/messaging_mocks/fixtures/SuperadminMessagingMockFixtures';


let mockMessages = [...MOCK_SUPERADMIN_MESSAGING_MESSAGES];
let mockNotifications = [...MOCK_SUPERADMIN_NOTIFICATIONS];

export const superadminMessagingHandlers = [
  http.get(`${BASE_URL}/messages`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<TenantMessage[]>>({
      success: true,
      message: 'Success',
      data: mockMessages,
    });
  }),
  
  http.get(`${BASE_URL}/notifications`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<SuperadminNotification[]>>({
      success: true,
      message: 'Success',
      data: mockNotifications,
    });
  }),
  

  http.patch(`${BASE_URL}/notifications/:id/read`, async ({ params }) => {
    await delay(250);
    const id = String(params.id ?? '');
    const index = mockNotifications.findIndex((notification) => notification.id === id);
    if (index < 0) {
      return HttpResponse.json<ApiResponse<SuperadminNotification>>({ success: false, message: 'Notification not found', data: null });
    }
    const notification = mockNotifications[index]!;
    mockNotifications[index] = { ...notification, read: true };
    return HttpResponse.json<ApiResponse<SuperadminNotification>>({ success: true, message: 'Notification marked as read', data: mockNotifications[index] });
  }),

  http.patch(`${BASE_URL}/notifications/read-all`, async () => {
    await delay(250);
    mockNotifications = mockNotifications.map((notification) => ({ ...notification, read: true }));
    return HttpResponse.json<ApiResponse<SuperadminNotification[]>>({ success: true, message: 'Notifications marked as read', data: mockNotifications });
  }),

  http.get(`${BASE_URL}/tenants`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<MessagingTenant[]>>({
      success: true,
      message: 'Success',
      data: MOCK_SUPERADMIN_MESSAGING_TENANTS,
    });
  }),

  http.post(`${BASE_URL}/messages`, async ({ request }) => {
    await delay(500);
    const payload = await request.json() as Partial<TenantMessage>;
    const newMessage = {
      ...payload,
      id: `m${Date.now()}`,
      status: payload.status || 'SENT',
      createdAt: new Date().toISOString()
    } as TenantMessage;
    mockMessages = [newMessage, ...mockMessages];
    return HttpResponse.json<ApiResponse<TenantMessage>>({
      success: true,
      message: 'Sent',
      data: newMessage,
    });
  }),
];
