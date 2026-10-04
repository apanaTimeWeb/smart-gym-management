import { TenantMessageCreatePayloadSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas';
import { SuperadminMessagingMessageResponseSchema, SuperadminMessagingMessagesResponseSchema, SuperadminMessagingNotificationsResponseSchema, SuperadminMessagingNotificationResponseSchema, SuperadminMessagingTenantsResponseSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingApiSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingApi owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingApiSchema, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the Superadmin tenant messaging API boundary, query encoding, and runtime Zod validation.


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
  fetchMessages: (params?: Record<string, string>) => apiFetch<ApiResponse<TenantMessage[]>>(withQuery(`${SUPERADMIN_MESSAGING_API.BASE}/messages`, params), {
    responseSchema: SuperadminMessagingMessagesResponseSchema,
  }),
  fetchNotifications: () => apiFetch<ApiResponse<SuperadminNotification[]>>(`${SUPERADMIN_MESSAGING_API.BASE}/notifications`, {
    responseSchema: SuperadminMessagingNotificationsResponseSchema,
  }),
  fetchTenants: () => apiFetch<ApiResponse<MessagingTenant[]>>(`${SUPERADMIN_MESSAGING_API.BASE}/tenants`, {
    responseSchema: SuperadminMessagingTenantsResponseSchema,
  }),
  markNotificationRead: (id: string, idempotencyKey: string) => apiFetch<ApiResponse<SuperadminNotification>>(`${SUPERADMIN_MESSAGING_API.BASE}/notifications/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminMessagingNotificationResponseSchema,
  }),
  markAllNotificationsRead: (idempotencyKey: string) => apiFetch<ApiResponse<SuperadminNotification[]>>(`${SUPERADMIN_MESSAGING_API.BASE}/notifications/read-all`, {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminMessagingNotificationsResponseSchema,
  }),
  sendMessage: (payload: TenantMessageCreatePayload, idempotencyKey: string) => {
    const validatedPayload = TenantMessageCreatePayloadSchema.parse(payload);
    return apiFetch<ApiResponse<TenantMessage>>(`${SUPERADMIN_MESSAGING_API.BASE}/messages`, {
      method: 'POST',
      body: JSON.stringify(validatedPayload),
      headers: { 'Idempotency-Key': idempotencyKey },
      responseSchema: SuperadminMessagingMessageResponseSchema,
    });
  },
};
