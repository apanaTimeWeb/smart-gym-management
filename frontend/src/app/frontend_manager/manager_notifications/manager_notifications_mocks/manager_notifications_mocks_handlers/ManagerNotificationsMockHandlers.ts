import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_NOTIFICATIONS_STATUS_VALUES } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsConstants';
import { MOCK_NOTIFICATIONS, MOCK_NOTIFICATION_KPIS } from '@/app/frontend_manager/manager_notifications/manager_notifications_mocks/manager_notifications_mocks_fixtures/ManagerNotificationsMockData';
import { ManagerNotificationsUrlConfig } from '@/app/frontend_manager/manager_notifications/manager_notifications_url_config';


let notifications = structuredClone(MOCK_NOTIFICATIONS);

/**
 * @description Provides the ManagerNotificationsMockHandlers implementation for the notifications module.
 * @dependencies @/app/frontend_manager/manager_notifications/manager_notifications_mocks/manager_notifications_mocks_fixtures/ManagerNotificationsMockData; @/app/frontend_manager/manager_notifications/manager_notifications_url_config; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerNotificationsMockState(): void {
  notifications = structuredClone(MOCK_NOTIFICATIONS);
}

export const managerNotificationsHandlers = [
  http.get(managerMockApiUrl(ManagerNotificationsUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const type = url.searchParams.get('type') ?? 'ALL';
    const priority = url.searchParams.get('priority') ?? 'ALL';
    const status = url.searchParams.get('status') ?? 'ALL';
    const items = notifications.filter((item) =>
      (!search || item.title.toLowerCase().includes(search) || item.message.toLowerCase().includes(search) || Boolean(item.memberName?.toLowerCase().includes(search))) &&
      (type === 'ALL' || item.type === type) &&
      (priority === 'ALL' || item.priority === priority) &&
      (status === MANAGER_NOTIFICATIONS_STATUS_VALUES.ALL || item.status === status),
    );
    return HttpResponse.json({ success: true, message: 'Notifications fetched', data: { notifications: items, total: items.length } });
  }),
  http.get(managerMockApiUrl(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/kpis`), () =>
    HttpResponse.json({ success: true, message: 'Notification KPIs fetched', data: { ...MOCK_NOTIFICATION_KPIS, total: notifications.length, unread: notifications.filter((n) => n.status === MANAGER_NOTIFICATIONS_STATUS_VALUES.UNREAD).length } }),
  ),
  http.patch(managerMockApiUrl(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/:id/read`), ({ params }) => {
    notifications = notifications.map((n) => n.id === params.id ? { ...n, status: MANAGER_NOTIFICATIONS_STATUS_VALUES.READ, readAt: new Date().toISOString() } : n);
    return HttpResponse.json({ success: true, message: 'Notification marked as read', data: null });
  }),
  http.patch(managerMockApiUrl(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/read-all`), () => {
    notifications = notifications.map((n) => ({ ...n, status: MANAGER_NOTIFICATIONS_STATUS_VALUES.READ, readAt: new Date().toISOString() }));
    return HttpResponse.json({ success: true, message: 'All notifications marked as read', data: null });
  }),
  http.delete(managerMockApiUrl(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/:id`), ({ params }) => {
    notifications = notifications.filter((n) => n.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Notification dismissed', data: null });
  }),
];
