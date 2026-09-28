// RESPONSIBILITY: Defines the trusted application input for persisted Trainer notification delivery.
// FLOW: Authorized producer → delivery service → repository transaction → commit → realtime payload.

import type { NotificationType } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-enums';

export interface TrainerNotificationsDeliveryInput {
  trainerId: string;
  title: string;
  message: string;
  type?: NotificationType | null;
  actionUrl?: string | null;
  relatedEntityId?: string | null;
  relatedEntityType?: string | null;
  metadata?: Record<string, unknown> | null;
}
