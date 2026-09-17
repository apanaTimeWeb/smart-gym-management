// RESPONSIBILITY: Owns the authenticated Superadmin shell notification API contract used by the global notification bell.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { SuperadminShellNotificationSchema, type SuperadminShellNotification } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationTypes';
import { z } from 'zod';

export const SuperadminShellNotificationApi = {
  fetchNotifications: () => apiFetch<ApiResponse<SuperadminShellNotification[]>>(SuperadminUrlConfig.INFRASTRUCTURE.NOTIFICATIONS_BASE, { dataSchema: z.array(SuperadminShellNotificationSchema) }),
  markNotificationRead: (id: string) => apiFetch<ApiResponse<SuperadminShellNotification>>(`${SuperadminUrlConfig.INFRASTRUCTURE.NOTIFICATIONS_BASE}/${id}/read`, { method: 'PATCH', dataSchema: SuperadminShellNotificationSchema }),
  markAllNotificationsRead: () => apiFetch<ApiResponse<SuperadminShellNotification[]>>(`${SuperadminUrlConfig.INFRASTRUCTURE.NOTIFICATIONS_BASE}/read-all`, { method: 'PATCH', dataSchema: z.array(SuperadminShellNotificationSchema) }),
};
