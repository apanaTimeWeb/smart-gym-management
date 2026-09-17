// RESPONSIBILITY: Owns the Superadmin tenant messaging API boundary, query encoding, and runtime Zod validation.
import { z } from 'zod';
import { apiFetch, type ApiResponse, type PaginationMeta } from '@/lib/api';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import {
  MessagingTenantSchema,
  SuperadminNotificationSchema,
  TenantMessageCreatePayloadSchema,
  TenantMessageSchema,
} from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import type { MessagingTenant, SuperadminNotification, TenantMessage, TenantMessageCreatePayload } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

const PaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().positive(),
}) satisfies z.ZodType<PaginationMeta>;

function apiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.nullable(),
    meta: PaginationMetaSchema.optional(),
    error: z.unknown().optional(),
    statusCode: z.number().int().optional(),
  });
}

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
  fetchMessages: (params?: Record<string, string>) => apiFetch<ApiResponse<TenantMessage[]>>(withQuery(`${MessagingUrlConfig.BACKEND_API.BASE}/messages`, params), {
    responseSchema: apiResponseSchema(z.array(TenantMessageSchema)),
  }),
  fetchNotifications: () => apiFetch<ApiResponse<SuperadminNotification[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications`, {
    responseSchema: apiResponseSchema(z.array(SuperadminNotificationSchema)),
  }),
  fetchTenants: () => apiFetch<ApiResponse<MessagingTenant[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/tenants`, {
    responseSchema: apiResponseSchema(z.array(MessagingTenantSchema)),
  }),
  markNotificationRead: (id: string) => apiFetch<ApiResponse<SuperadminNotification>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
    responseSchema: apiResponseSchema(SuperadminNotificationSchema),
  }),
  markAllNotificationsRead: () => apiFetch<ApiResponse<SuperadminNotification[]>>(`${MessagingUrlConfig.BACKEND_API.BASE}/notifications/read-all`, {
    method: 'PATCH',
    responseSchema: apiResponseSchema(z.array(SuperadminNotificationSchema)),
  }),
  sendMessage: (payload: TenantMessageCreatePayload) => {
    const validatedPayload = TenantMessageCreatePayloadSchema.parse(payload);
    return apiFetch<ApiResponse<TenantMessage>>(`${MessagingUrlConfig.BACKEND_API.BASE}/messages`, {
      method: 'POST',
      body: JSON.stringify(validatedPayload),
      responseSchema: apiResponseSchema(TenantMessageSchema),
    });
  },
};
