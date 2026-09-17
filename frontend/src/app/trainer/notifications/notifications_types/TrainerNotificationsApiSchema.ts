import { z } from 'zod';
import { TrainerNotificationItemSchema } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsSchemas';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';
export const TrainerNotificationsResponseSchema = createTrainerApiResponseSchema(z.object({ notifications: z.array(TrainerNotificationItemSchema), total: z.number().optional() }));
export const TrainerNotificationMutationResponseSchema = createTrainerApiResponseSchema(z.unknown());
