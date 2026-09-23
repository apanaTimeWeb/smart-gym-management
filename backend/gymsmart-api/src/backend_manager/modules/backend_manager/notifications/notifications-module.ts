// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { NotificationsCommandController } from '@/backend_manager/modules/backend_manager/notifications/notifications-command.controller';
import { NotificationsQueryController } from '@/backend_manager/modules/backend_manager/notifications/notifications-query.controller';
import { NotificationsRepository } from '@/backend_manager/modules/backend_manager/notifications/repositories/notifications-repository';
import { NotificationsDeleteNotificationService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-delete-notification.service';
import { NotificationsFetchManagerNotificationsService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-fetch-manager-notifications.service';
import { NotificationsFetchNotificationKPIsService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-fetch-notification-k-p-is.service';
import { NotificationsMarkAllNotificationsReadService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-mark-all-notifications-read.service';
import { NotificationsMarkNotificationReadService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-mark-notification-read.service';
import { NotificationsOrchestratorService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-orchestrator.service';

@Module({
  controllers: [NotificationsQueryController, NotificationsCommandController],
  providers: [NotificationsMarkNotificationReadService, NotificationsMarkAllNotificationsReadService, NotificationsDeleteNotificationService, NotificationsFetchManagerNotificationsService, NotificationsFetchNotificationKPIsService, NotificationsRepository, NotificationsOrchestratorService],
  exports: [NotificationsRepository],
})
export class NotificationsModule {}
