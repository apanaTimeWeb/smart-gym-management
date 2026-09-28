// RESPONSIBILITY: Defines the strict payload contract for Trainer notification WebSocket events.
// FLOW: Persisted notification mapper → realtime payload → canonical socket envelope → authenticated Trainer room.

import type { CoreApiSuccessResponse } from '@/backend_trainer/backend_core/core_types/core-api-response.types';
import type { NotificationType as TrainerNotificationType } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-enums';

export interface TrainerNotificationsRealtimePayload {
  id: string;
  text: string;
  time: string;
  unread: boolean;
  type?: TrainerNotificationType;
  actionUrl?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export type TrainerNotificationsRealtimeEvent = CoreApiSuccessResponse<TrainerNotificationsRealtimePayload>;
