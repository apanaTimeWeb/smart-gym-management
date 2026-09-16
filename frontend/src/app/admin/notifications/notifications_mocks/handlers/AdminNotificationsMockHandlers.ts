// RESPONSIBILITY: Owns MSW handlers for the Admin notifications feature.
// DATA FLOW: notifications API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

import { MOCK_ADMIN_NOTIFICATIONS } from '@/app/admin/notifications/notifications_mocks/fixtures/AdminNotificationsMockFixtures';

export const adminNotificationsMockHandlers = [
  http.get('*/admin/notifications', ({ request }) => {
    const url = new URL(request.url);
    const unreadOnly = url.searchParams.get('read') === 'false';
    const data = MOCK_ADMIN_NOTIFICATIONS.filter((notification) => unreadOnly ? !notification.read : true);
    return ok(data);
  }),
  http.patch('*/admin/notifications/:id/read', ({ params }) => {
    const notification = MOCK_ADMIN_NOTIFICATIONS.find((item) => item.id === String(params.id));
    return ok(notification ? { ...notification, read: true } : null, 'Notification marked as read');
  }),
  http.patch('*/admin/notifications/read-all', () => ok(null, 'Notifications marked as read'))
];
