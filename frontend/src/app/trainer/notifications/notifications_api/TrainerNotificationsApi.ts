// RESPONSIBILITY: API functions for the Trainer Notifications module with canonical response validation.
// DATA FLOW: HTTP response → Zod schema → notification Query → UI.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { TRAINER_NOTIFICATIONS_API_ROUTES } from '@/app/trainer/Trainer_url_config';
import { TrainerNotificationsResponseSchema, TrainerNotificationMutationResponseSchema } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsApiSchema';
import type { TrainerNotificationsApiResponse } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';

export async function fetchTrainerNotifications(page = 1, limit = 20): Promise<TrainerNotificationsApiResponse> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_NOTIFICATIONS_API_ROUTES.listPaginated(page, limit));
  const response = TrainerNotificationsResponseSchema.parse(raw);
  if (!response.data) throw new Error(response.message);
  return { notifications: response.data.notifications };
}

export async function markTrainerNotificationRead(id: string): Promise<void> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_NOTIFICATIONS_API_ROUTES.markRead(id), { method: 'PATCH' });
  TrainerNotificationMutationResponseSchema.parse(raw);
}

export async function markAllTrainerNotificationsRead(): Promise<void> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_NOTIFICATIONS_API_ROUTES.markAllRead, { method: 'PATCH' });
  TrainerNotificationMutationResponseSchema.parse(raw);
}
