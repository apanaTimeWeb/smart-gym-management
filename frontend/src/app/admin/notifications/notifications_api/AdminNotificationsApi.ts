// RESPONSIBILITY: Modularized API client for the Admin Notifications module.
// All notification-related API calls go through this file. No UI logic.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { AdminNotificationsUrlConfig } from '@/app/admin/notifications/notifications_url_config';

export interface AdminNotification {
  id: string;
  text: string;
  category: 'MEMBER' | 'PAYMENT' | 'SYSTEM' | 'STAFF' | 'GENERAL';
  time: string;
  unread: boolean;
  actionUrl?: string;
}

export interface MarkReadDto {
  ids: string[];
}

/**
 * Fetches all notifications for the authenticated admin.
 */
export const adminNotificationsApi = {
  fetchNotifications: () =>
    apiFetch<ApiResponse<AdminNotification[]>>(AdminNotificationsUrlConfig.BACKEND_API.BASE),

  /** PATCH /admin/notifications/mark-read — mark specific notifications as read */
  markRead: (dto: MarkReadDto) =>
    apiFetch<ApiResponse<void>>(AdminNotificationsUrlConfig.BACKEND_API.MARK_READ, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    }),

  /** PATCH /admin/notifications/mark-all-read — mark ALL notifications as read */
  markAllRead: () =>
    apiFetch<ApiResponse<void>>(AdminNotificationsUrlConfig.BACKEND_API.MARK_ALL_READ, {
      method: 'PATCH',
    }),

  /** DELETE /admin/notifications/:id — remove a single notification */
  deleteNotification: (id: string) =>
    apiFetch<ApiResponse<void>>(`${AdminNotificationsUrlConfig.BACKEND_API.BASE}/${id}`, {
      method: 'DELETE',
    }),

  /** DELETE /admin/notifications — clear all notifications */
  clearAll: () =>
    apiFetch<ApiResponse<void>>(AdminNotificationsUrlConfig.BACKEND_API.BASE, {
      method: 'DELETE',
    }),
};
