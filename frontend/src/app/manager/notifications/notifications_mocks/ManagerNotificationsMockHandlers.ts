import { http, HttpResponse } from 'msw';
import { MOCK_NOTIFICATIONS, MOCK_NOTIFICATION_KPIS } from '@/app/manager/notifications/notifications_fixtures/ManagerNotificationsMockData';
import { ManagerNotificationsUrlConfig } from '@/app/manager/Manager_url_config';

let notifications = structuredClone(MOCK_NOTIFICATIONS);

export const managerNotificationsHandlers = [
  http.get(`http://localhost:5000/api/v1${ManagerNotificationsUrlConfig.BACKEND_API.BASE}`, ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const type = url.searchParams.get('type') ?? 'ALL';
    const priority = url.searchParams.get('priority') ?? 'ALL';
    const status = url.searchParams.get('status') ?? 'ALL';
    const items = notifications.filter((item) =>
      (!search || item.title.toLowerCase().includes(search) || item.message.toLowerCase().includes(search) || Boolean(item.memberName?.toLowerCase().includes(search))) &&
      (type === 'ALL' || item.type === type) &&
      (priority === 'ALL' || item.priority === priority) &&
      (status === 'ALL' || item.status === status),
    );
    return HttpResponse.json({ success: true, message: 'Notifications fetched', data: { notifications: items, total: items.length } });
  }),
  http.get(`http://localhost:5000/api/v1${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/kpis`, () =>
    HttpResponse.json({ success: true, message: 'Notification KPIs fetched', data: { ...MOCK_NOTIFICATION_KPIS, total: notifications.length, unread: notifications.filter((n) => n.status === 'UNREAD').length } }),
  ),
  http.patch(`http://localhost:5000/api/v1${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/:id/read`, ({ params }) => {
    notifications = notifications.map((n) => n.id === params.id ? { ...n, status: 'READ', readAt: new Date().toISOString() } : n);
    return HttpResponse.json({ success: true, message: 'Notification marked as read', data: null });
  }),
  http.patch(`http://localhost:5000/api/v1${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/read-all`, () => {
    notifications = notifications.map((n) => ({ ...n, status: 'READ', readAt: new Date().toISOString() }));
    return HttpResponse.json({ success: true, message: 'All notifications marked as read', data: null });
  }),
  http.delete(`http://localhost:5000/api/v1${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/:id`, ({ params }) => {
    notifications = notifications.filter((n) => n.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Notification dismissed', data: null });
  }),
];
