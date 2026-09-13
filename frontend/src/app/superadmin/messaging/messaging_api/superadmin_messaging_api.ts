import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/messaging_types';

import { MOCK_SUPERADMIN_MESSAGES, MOCK_SUPERADMIN_NOTIFICATIONS, MOCK_SUPERADMIN_MESSAGING_TENANTS } from '@/app/superadmin/messaging/messaging_api/SuperadminMessagingMockData';

let mockMessages = [...MOCK_SUPERADMIN_MESSAGES];

export const superadminMessagingApi = {
  fetchMessages: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockMessages };
  },
  fetchNotifications: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_NOTIFICATIONS };
  },
  fetchTenants: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_MESSAGING_TENANTS };
  },
  sendMessage: async (payload: Partial<TenantMessage>) => {
    await new Promise(r => setTimeout(r, 500));
    const newMessage = { ...payload, id: `m${Date.now()}`, status: payload.status || 'SENT', createdAt: new Date().toISOString() } as TenantMessage;
    mockMessages = [newMessage, ...mockMessages];
    return { success: true, message: 'Sent', data: newMessage };
  },
};
