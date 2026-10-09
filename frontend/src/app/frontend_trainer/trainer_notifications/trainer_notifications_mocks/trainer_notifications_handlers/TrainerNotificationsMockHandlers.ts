
import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_NOTIFICATIONS_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_constants/TrainerNotificationsHttpStatusCodes';

import { TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_mocks/trainer_notifications_fixtures/TrainerNotificationsMockData';

import { TRAINER_NOTIFICATIONS_URLS } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
let notificationsDB = TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS.map(n => ({ ...n }));
export const TrainerNotificationsMockHandlers = [
  http.get(`${BASE}${TRAINER_NOTIFICATIONS_URLS.API.LIST}`, async ({ request }) => {
    await delay(250); const url = new URL(request.url); const page = Number(url.searchParams.get('page') ?? '1'); const limit = Number(url.searchParams.get('limit') ?? '10'); const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Notifications loaded.', data: { notifications: notificationsDB.slice(start, start + limit), total: notificationsDB.length, page, limit } });
  }),
  http.patch(`${BASE}${TRAINER_NOTIFICATIONS_URLS.API.MARK_READ(':id')}`, async ({ params }) => {
    await delay(200); const index = notificationsDB.findIndex(n => n.id === params.id); if (index === -1) return HttpResponse.json({ success: false, message: 'Notification not found.', data: null }, { status: TRAINER_NOTIFICATIONS_HTTP_STATUS_CODES.NOT_FOUND });
    notificationsDB[index] = { ...notificationsDB[index]!, unread: false };
    return HttpResponse.json({ success: true, message: 'Notification marked as read.', data: { ...notificationsDB[index]! } });
  }),
  http.patch(`${BASE}${TRAINER_NOTIFICATIONS_URLS.API.MARK_ALL_READ}`, async () => {
    await delay(200); notificationsDB = notificationsDB.map(n => ({ ...n, unread: false }));
    return HttpResponse.json({ success: true, message: 'All notifications marked as read.', data: null });
  }),
];
