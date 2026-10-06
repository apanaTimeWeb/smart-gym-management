import type { AdminNotificationsQueryParams } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsQueryTypes';
// RESPONSIBILITY: Owns typed HTTP access for the Admin notification feed and supported read-state mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_NOTIFICATIONS_API } from '@/app/frontend_admin/admin_notifications/admin_notifications_url_config';
import { adminNotificationSchema } from '@/app/frontend_admin/admin_notifications/admin_notifications_schemas/AdminNotificationsSchemas';
import type { AdminNotification } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsTypes';


export const AdminNotificationsApi = {
  fetchNotifications: async (params?: AdminNotificationsQueryParams) => {
    const search = new URLSearchParams();
    if (params?.read !== undefined) search.set('read', String(params.read));
    const suffix = search.toString() ? `?${search.toString()}` : '';
    return apiFetch<ApiResponse<AdminNotification[]>>(`${ADMIN_NOTIFICATIONS_API.base}${suffix}`, {
      method: 'GET',
      dataSchema: z.array(adminNotificationSchema),
    });
  },
  markNotificationAsRead: async (id: string, idempotencyKey: string) =>
    apiFetch<ApiResponse<AdminNotification | null>>(ADMIN_NOTIFICATIONS_API.markRead(id), {
      method: 'PATCH',
      dataSchema: adminNotificationSchema.nullable(),
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
  markAllNotificationsAsRead: async (idempotencyKey: string) =>
    apiFetch<ApiResponse<null>>(ADMIN_NOTIFICATIONS_API.markAllRead, {
      method: 'PATCH',
      dataSchema: z.null(),
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
};
