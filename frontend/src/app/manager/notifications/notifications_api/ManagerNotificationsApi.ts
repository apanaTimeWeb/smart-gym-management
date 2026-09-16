import { ManagerNotificationsUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { Notification, NotificationKPIData } from '@/app/manager/notifications/notifications_types/ManagerNotificationsTypes';
import { notificationSchema, notificationKpiSchema } from '@/app/manager/notifications/notifications_types/ManagerNotificationsSchema';
import { z } from 'zod';

export const notificationsApi = {
  getAll: async (params?: Record<string, string>): Promise<ApiResponse<{ notifications: Notification[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ notifications: z.array(notificationSchema), total: z.number() }),
    });
  },
  getKPIs: async (): Promise<ApiResponse<NotificationKPIData>> =>
    apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/kpis`, { dataSchema: notificationKpiSchema }),
  markRead: async (id: string) => apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/${id}/read`, { method: 'PATCH', dataSchema: z.unknown() }),
  markAllRead: async () => apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/read-all`, { method: 'PATCH', dataSchema: z.unknown() }),
  deleteNotification: async (id: string) => apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE', dataSchema: z.object({ id: z.string() }) }),
};
