// RESPONSIBILITY: Owns MSW handlers for the Admin notifications feature.
import { StatusCodes } from 'http-status-codes';
// DATA FLOW: notifications API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

import type { AdminNotificationsJsonObject } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsMockHandlerTypes';
/**
 * parseRequestBody is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

/**
 * asRecord is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function asRecord(value: unknown): AdminNotificationsJsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as AdminNotificationsJsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};

import { getAdminNotificationsMockState } from '@/app/frontend_admin/admin_notifications/admin_notifications_mocks/admin_notifications_fixtures/AdminNotificationsMockState';

export const adminNotificationsMockHandlers = [
  http.get('*/admin/notifications', ({ request }) => {
    const url = new URL(request.url);
    const unreadOnly = url.searchParams.get('read') === 'false';
    const data = getAdminNotificationsMockState().filter((notification) => unreadOnly ? !notification.read : true);
    return ok(data);
  }),
  http.patch('*/admin/notifications/:id/read', ({ params }) => {
    const notification = getAdminNotificationsMockState().find((item) => item.id === String(params.id));
    if (!notification) return HttpResponse.json({ success: false, message: 'Notification not found' }, { status: StatusCodes.NOT_FOUND });
    notification.read = true;
    return ok(notification, 'Notification marked as read');
  }),
  http.patch('*/admin/notifications/read-all', () => {
    for (const notification of getAdminNotificationsMockState()) notification.read = true;
    return ok(null, 'Notifications marked as read');
  })
];
