// RESPONSIBILITY: API functions for the Trainer Notifications module. All calls go through apiFetch.
// DATA FLOW: TrainerNotificationsApi → useTrainerNotificationsLogic → TrainerNotificationsMain

import { apiFetch } from '@/lib/api';
import type { TrainerNotificationsApiResponse } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import { TRAINER_NOTIFICATIONS_API_ROUTES } from '@/app/trainer/notifications/notifications_url_config';

/**
 * Fetches all notifications for the authenticated trainer.
 */
export async function fetchTrainerNotifications(): Promise<TrainerNotificationsApiResponse> {
  return apiFetch<TrainerNotificationsApiResponse>(TRAINER_NOTIFICATIONS_API_ROUTES.list);
}

/**
 * Marks a single notification as read by ID.
 */
export async function markTrainerNotificationRead(id: string): Promise<void> {
  return apiFetch<void>(TRAINER_NOTIFICATIONS_API_ROUTES.markRead(id), { method: 'PATCH' });
}

/**
 * Marks all notifications as read for the authenticated trainer.
 */
export async function markAllTrainerNotificationsRead(): Promise<void> {
  return apiFetch<void>(TRAINER_NOTIFICATIONS_API_ROUTES.markAllRead, { method: 'PATCH' });
}

/**
 * Deletes a single notification by ID.
 */
export async function deleteTrainerNotification(id: string): Promise<void> {
  return apiFetch<void>(TRAINER_NOTIFICATIONS_API_ROUTES.delete(id), { method: 'DELETE' });
}

/**
 * Clears all notifications for the authenticated trainer.
 */
export async function clearAllTrainerNotifications(): Promise<void> {
  return apiFetch<void>(TRAINER_NOTIFICATIONS_API_ROUTES.clearAll, { method: 'DELETE' });
}
