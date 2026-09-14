import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/messaging_types';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/messaging_url_config';
import { z } from "zod";

export const superadminMessagingApi = {
  fetchMessages: () =>
    apiFetch<ApiResponse<TenantMessage[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/messages`, { dataSchema: z.any() }),
  fetchNotifications: () =>
    apiFetch<ApiResponse<SuperadminNotification[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications`, { dataSchema: z.any() }),
  fetchTenants: () =>
    apiFetch<ApiResponse<MessagingTenant[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/tenants`, { dataSchema: z.any() }),
  sendMessage: (payload: Partial<TenantMessage>) =>
    apiFetch<ApiResponse<TenantMessage>>(`${MessagingUrlConfig.BACKEND_API.BASE}/messages`, {
      method: 'POST',
      body: JSON.stringify(payload),
        dataSchema: z.any()
    }),
};
