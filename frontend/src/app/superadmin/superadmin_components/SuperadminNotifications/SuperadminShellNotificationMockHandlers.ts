import { http, HttpResponse, delay } from 'msw';
import type { ApiResponse } from '@/lib/api';
import { StatusCodes } from 'http-status-codes';
import { SUPERADMIN_SHELL_NOTIFICATION_MOCK_FIXTURES } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationMockFixtures';
import { SuperadminShellNotificationSchema, type SuperadminShellNotification } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationTypes';

const BASE_URL = '*/api/v1/superadmin/notifications';
let notifications = [...SUPERADMIN_SHELL_NOTIFICATION_MOCK_FIXTURES];

export const superadminShellNotificationHandlers = [
  http.get(BASE_URL, async () => {
    await delay(150);
    return HttpResponse.json<ApiResponse<SuperadminShellNotification[]>>({ success: true, message: 'Success', data: notifications }, { status: StatusCodes.OK });
  }),
  http.patch(`${BASE_URL}/:id/read`, async ({ params }) => {
    await delay(150);
    const id = String(params.id);
    const current = notifications.find((notification) => notification.id === id);
    if (!current) return HttpResponse.json<ApiResponse<SuperadminShellNotification>>({ success: false, message: 'Notification not found', data: null }, { status: StatusCodes.NOT_FOUND });
    const updated = { ...current, read: true };
    notifications = notifications.map((notification) => notification.id === id ? updated : notification);
    return HttpResponse.json<ApiResponse<SuperadminShellNotification>>({ success: true, message: 'Notification marked as read', data: updated }, { status: StatusCodes.OK });
  }),
  http.patch(`${BASE_URL}/read-all`, async () => {
    await delay(150);
    notifications = notifications.map((notification) => ({ ...notification, read: true }));
    return HttpResponse.json<ApiResponse<SuperadminShellNotification[]>>({ success: true, message: 'All notifications marked as read', data: notifications }, { status: StatusCodes.OK });
  }),
];
