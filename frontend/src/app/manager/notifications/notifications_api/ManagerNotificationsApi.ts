import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { notificationSchema, notificationKpiSchema } from '@/app/manager/notifications/notifications_schemas/ManagerNotificationsSchema';
import { ManagerNotificationsUrlConfig } from '@/app/manager/notifications/notifications_url_config';
import type { Notification, NotificationKPIData } from '@/app/manager/notifications/notifications_types/ManagerNotificationsTypes';
import type { ApiResponse } from '@/lib/api';


const nullResponseSchema = z.null();

export const notificationsApi = {
  fetchManagerNotifications: async (params?: Record<string, string>): Promise<ApiResponse<{ notifications: Notification[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ notifications: z.array(notificationSchema), total: z.number() }) });
  },
  fetchNotificationKPIs: async (): Promise<ApiResponse<NotificationKPIData>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.STATS, { dataSchema: notificationKpiSchema }),
  markNotificationRead: async (id: string, idempotencyKey?: string): Promise<ApiResponse<null>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.MARK_READ(id), { method: 'PATCH', dataSchema: nullResponseSchema,
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
    }),
  markAllNotificationsRead: async (idempotencyKey?: string): Promise<ApiResponse<null>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.MARK_ALL_READ, { method: 'PATCH', dataSchema: nullResponseSchema,
        headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
    }),
  deleteNotification: async (id: string, idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }) };
