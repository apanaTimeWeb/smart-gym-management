// RESPONSIBILITY: API functions for the Trainer Notifications module with canonical response validation.
// DATA FLOW: HTTP response → Zod schema → notification Query → UI.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { TrainerNotificationsUrlConfig } from '@/app/trainer/notifications/notifications_url_config';
import { TrainerNotificationsResponseSchema, TrainerNotificationMutationResponseSchema } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsApiSchema';
import type { TrainerNotificationsApiResponse } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';

export async function fetchTrainerNotifications(page = 1, limit = 20): Promise<TrainerNotificationsApiResponse> {
  const raw = await apiFetch<ApiResponse<unknown>>(TrainerNotificationsUrlConfig.BACKEND_API.LIST_PAGINATED(page, limit));
  const response = TrainerNotificationsResponseSchema.parse(raw);
  if (!response.data) throw new Error(response.message);
  return { notifications: response.data.notifications };
}

export async function markTrainerNotificationRead(id: string, idempotencyKey?: string): Promise<void> {
  const raw = await apiFetch<ApiResponse<unknown>>(TrainerNotificationsUrlConfig.BACKEND_API.MARK_READ(id), { method: 'PATCH',
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
});
  TrainerNotificationMutationResponseSchema.parse(raw);
}

export async function markAllTrainerNotificationsRead(idempotencyKey?: string): Promise<void> {
  const raw = await apiFetch<ApiResponse<unknown>>(TrainerNotificationsUrlConfig.BACKEND_API.MARK_ALL_READ, { method: 'PATCH',
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined
});
  TrainerNotificationMutationResponseSchema.parse(raw);
}
