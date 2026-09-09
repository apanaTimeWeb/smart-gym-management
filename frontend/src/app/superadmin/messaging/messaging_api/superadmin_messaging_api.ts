import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/messaging_types';

export const superadminMessagingApi = {
  fetchMessages: async () => {
    return apiFetch<ApiResponse<TenantMessage[]>>('/superadmin/messaging/messages');
  },
  fetchNotifications: async () => {
    return apiFetch<ApiResponse<SuperadminNotification[]>>('/superadmin/messaging/notifications');
  },
  fetchTenants: async () => {
    return apiFetch<ApiResponse<MessagingTenant[]>>('/superadmin/messaging/tenants');
  },
  sendMessage: async (payload: Partial<TenantMessage>) => {
    return apiFetch<ApiResponse<TenantMessage>>('/superadmin/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
