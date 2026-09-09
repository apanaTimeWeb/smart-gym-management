// RESPONSIBILITY: API functions for the Trainer Notifications module. All calls go through apiFetch.
// DATA FLOW: TrainerNotificationsApi → useTrainerNotificationsLogic → TrainerNotificationsMain
// ROLE BOUNDARY: Trainers can read and mark notifications — delete/clearAll are Manager-only.

import { apiFetch } from '@/lib/api';
import type { TrainerNotificationsApiResponse } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import { TRAINER_NOTIFICATIONS_API_ROUTES } from '@/app/trainer/notifications/notifications_url_config';

/**
 * Fetches all notifications for the authenticated trainer.
 * Pass page/limit for paginated results.
 */
export async function fetchTrainerNotifications(page = 1, limit = 20): Promise<TrainerNotificationsApiResponse> {
  return apiFetch<TrainerNotificationsApiResponse>(TRAINER_NOTIFICATIONS_API_ROUTES.listPaginated(page, limit));
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

// NOTE: deleteTrainerNotification and clearAllTrainerNotifications are FORBIDDEN for the trainer role.
// Notifications can only be deleted by managers. See notifications_url_config.ts for details.
