// RESPONSIBILITY: Encapsulates functionality for superadmin_messaging_api.ts
import { TenantMessageSchema, SuperadminNotificationSchema, MessagingTenantSchema } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import { z } from "zod";

export const superadminMessagingApi = {
  fetchMessages: () =>
    apiFetch<ApiResponse<TenantMessage[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/messages`, { dataSchema: z.array(TenantMessageSchema) }),
  fetchNotifications: () =>
    apiFetch<ApiResponse<SuperadminNotification[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications`, { dataSchema: z.array(SuperadminNotificationSchema) }),
  fetchTenants: () =>
    apiFetch<ApiResponse<MessagingTenant[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/tenants`, { dataSchema: z.array(MessagingTenantSchema) }),
  markNotificationRead: (id: string) =>
    apiFetch<ApiResponse<SuperadminNotification>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications/${id}/read`, {
      method: 'PATCH',
      dataSchema: SuperadminNotificationSchema,
    }),
  markAllNotificationsRead: () =>
    apiFetch<ApiResponse<SuperadminNotification[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications/read-all`, {
      method: 'PATCH',
      dataSchema: z.array(SuperadminNotificationSchema),
    }),
  sendMessage: (payload: Partial<TenantMessage>) =>
    apiFetch<ApiResponse<TenantMessage>>(`${MessagingUrlConfig.BACKEND_API.BASE}/messages`, {
      method: 'POST',
      body: JSON.stringify(payload),
        dataSchema: TenantMessageSchema
    }),
};

