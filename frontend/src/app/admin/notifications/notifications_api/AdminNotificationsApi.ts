import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminNotificationsUrlConfig } from '@/app/admin/notifications/admin_notifications_url_config';
import { adminNotificationSchema } from '@/app/admin/notifications/notifications_types/AdminNotificationsSchemas';
import type { AdminNotification } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';

// RESPONSIBILITY: Owns typed HTTP access for the Admin notification feed and supported read-state mutations.

export interface AdminNotificationsQueryParams {
  read?: boolean;
}

export const AdminNotificationsApi = {
  fetchNotifications: async (params?: AdminNotificationsQueryParams) => {
    const search = new URLSearchParams();
    if (params?.read !== undefined) search.set('read', String(params.read));
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiFetch<ApiResponse<AdminNotification[]>>(`${AdminNotificationsUrlConfig.api.base}${suffix}`, {
      method: 'GET',
      dataSchema: z.array(adminNotificationSchema),
    });
  },
  markNotificationAsRead: async (id: string) =>
    apiFetch<ApiResponse<AdminNotification | null>>(`${AdminNotificationsUrlConfig.api.base}/${id}/read`, {
      method: 'PATCH',
      dataSchema: adminNotificationSchema.nullable(),
    }),
  markAllNotificationsAsRead: async () =>
    apiFetch<ApiResponse<null>>(`${AdminNotificationsUrlConfig.api.base}/read-all`, {
      method: 'PATCH',
      dataSchema: z.null(),
    }),
};
