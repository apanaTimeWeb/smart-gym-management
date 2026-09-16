import { ManagerNotificationsUrlConfig } from '@/app/manager/notifications/notifications_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Notification, NotificationKPIData } from '@/app/manager/notifications/notifications_types/ManagerNotificationsTypes';
import { notificationSchema, notificationKpiSchema } from '@/app/manager/notifications/notifications_types/ManagerNotificationsSchema';
import { z } from 'zod';

const nullResponseSchema = z.null();

export const notificationsApi = {
  fetchManagerNotifications: async (params?: Record<string, string>): Promise<ApiResponse<{ notifications: Notification[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ notifications: z.array(notificationSchema), total: z.number() }),
    });
  },
  fetchNotificationKPIs: async (): Promise<ApiResponse<NotificationKPIData>> =>
    apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/kpis`, { dataSchema: notificationKpiSchema }),
  markNotificationRead: async (id: string): Promise<ApiResponse<null>> =>
    apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/${id}/read`, { method: 'PATCH', dataSchema: nullResponseSchema }),
  markAllNotificationsRead: async (): Promise<ApiResponse<null>> =>
    apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/read-all`, { method: 'PATCH', dataSchema: nullResponseSchema }),
  deleteNotification: async (id: string): Promise<ApiResponse<null>> =>
    apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: nullResponseSchema }),
};
