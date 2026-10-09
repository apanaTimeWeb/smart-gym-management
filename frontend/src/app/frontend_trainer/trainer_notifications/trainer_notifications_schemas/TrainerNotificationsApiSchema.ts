import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

import { TrainerNotificationsTrainerNotificationItemSchema } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_schemas/TrainerNotificationsSchemas';




export const TrainerNotificationsResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ notifications: z.array(TrainerNotificationsTrainerNotificationItemSchema), total: z.number().optional() }));
export const TrainerNotificationsTrainerNotificationMutationResponseSchema = TrainerInfrastructureApiResponseSchema(z.unknown());
