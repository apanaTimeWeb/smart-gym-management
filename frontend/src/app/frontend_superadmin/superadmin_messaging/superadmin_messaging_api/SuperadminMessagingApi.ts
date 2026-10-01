// RESPONSIBILITY: Owns the Superadmin tenant messaging API boundary, query encoding, and runtime Zod validation.
import { SuperadminMessagingMessageResponseSchema, SuperadminMessagingMessagesResponseSchema, SuperadminMessagingNotificationResponseSchema, SuperadminMessagingNotificationsResponseSchema, SuperadminMessagingTenantsResponseSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import {
  MessagingTenantSchema,
  SuperadminNotificationSchema,
  TenantMessageCreatePayloadSchema,
  TenantMessageSchema,
} from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas';
import { SuperadminMessagingUrlConfig } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';

import type { MessagingTenant, SuperadminNotification, TenantMessage, TenantMessageCreatePayload } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';
import type { ApiResponse } from '@/lib/api';

function withQuery(path: string, params?: Record<string, string>): string {
  if (!params) return path;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

export const superadminMessagingApi = {
  fetchMessages: (params?: Record<string, string>) => apiFetch<ApiResponse<TenantMessage[]>>(withQuery(`${SuperadminMessagingUrlConfig.BACKEND_API.BASE}/messages`, params), {
    responseSchema: SuperadminMessagingMessagesResponseSchema,
  }),
  fetchNotifications: () => apiFetch<ApiResponse<SuperadminNotification[]>>(`${SuperadminMessagingUrlConfig.BACKEND_API.BASE}/notifications`, {
    responseSchema: SuperadminMessagingNotificationsResponseSchema,
  }),
  fetchTenants: () => apiFetch<ApiResponse<MessagingTenant[]>>(`${SuperadminMessagingUrlConfig.BACKEND_API.BASE}/tenants`, {
    responseSchema: SuperadminMessagingTenantsResponseSchema,
  }),
  markNotificationRead: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<SuperadminNotification>>(`${SuperadminMessagingUrlConfig.BACKEND_API.BASE}/notifications/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminMessagingNotificationResponseSchema,
  }),
  markAllNotificationsRead: (idempotencyKey: string) => apiFetch<ApiResponse<SuperadminNotification[]>>(`${SuperadminMessagingUrlConfig.BACKEND_API.BASE}/notifications/read-all`, {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminMessagingNotificationsResponseSchema,
  }),
  sendMessage: (payload: TenantMessageCreatePayload, idempotencyKey: string) => {
    const validatedPayload = TenantMessageCreatePayloadSchema.parse(payload);
    return apiFetch<ApiResponse<TenantMessage>>(`${SuperadminMessagingUrlConfig.BACKEND_API.BASE}/messages`, {
      method: 'POST',
      body: JSON.stringify(validatedPayload),
      headers: { 'Idempotency-Key': idempotencyKey },
      responseSchema: SuperadminMessagingMessageResponseSchema,
    });
  },
};
