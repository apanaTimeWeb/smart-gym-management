// RESPONSIBILITY: Registers Trainer notifications REST query/command services and the authenticated realtime gateway.
// FLOW: Nest bootstrap → TrainerNotificationsModule → REST + Socket.IO realtime.
import { Module } from '@nestjs/common';
import { TrainerNotificationsQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_controllers/trainer-notifications-query.controller';
import { TrainerNotificationsCommandController } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_controllers/trainer-notifications-command.controller';
import { TrainerNotificationsQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-query.service';
import { TrainerNotificationsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-command.service';
import { TrainerNotificationsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_repositories/trainer-notifications-repository';
import { TrainerNotificationsRealtimeGateway } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-realtime.gateway';
import { TrainerNotificationsDeliveryService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-delivery.service';

/**
 * Intent: Defines the TrainerNotificationsModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({ controllers:[TrainerNotificationsQueryController,TrainerNotificationsCommandController], providers:[TrainerNotificationsQueryService,TrainerNotificationsCommandService,TrainerNotificationsRepository,TrainerNotificationsRealtimeGateway,TrainerNotificationsDeliveryService], exports:[TrainerNotificationsRealtimeGateway,TrainerNotificationsDeliveryService] })
export class TrainerNotificationsModule {}
