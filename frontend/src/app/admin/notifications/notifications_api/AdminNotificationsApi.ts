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
import { MOCK_ADMIN_NOTIFICATIONS } from '@/app/admin/notifications/notifications_api/AdminNotificationsMockData';

let mockNotifs = [...MOCK_ADMIN_NOTIFICATIONS];

export const adminNotificationsApi = {
  fetchNotifications: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: mockNotifs };
  },

  markRead: async (dto: MarkReadDto) => {
    await new Promise(res => setTimeout(res, 200));
    mockNotifs = mockNotifs.map(n => dto.ids.includes(n.id) ? { ...n, unread: false } : n);
    return { success: true, message: 'Marked read', data: undefined };
  },

  markAllRead: async () => {
    await new Promise(res => setTimeout(res, 300));
    mockNotifs = mockNotifs.map(n => ({ ...n, unread: false }));
    return { success: true, message: 'All marked read', data: undefined };
  },

  deleteNotification: async (id: string) => {
    await new Promise(res => setTimeout(res, 200));
    mockNotifs = mockNotifs.filter(n => n.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },

  clearAll: async () => {
    await new Promise(res => setTimeout(res, 300));
    mockNotifs = [];
    return { success: true, message: 'Cleared', data: undefined };
  },
};
