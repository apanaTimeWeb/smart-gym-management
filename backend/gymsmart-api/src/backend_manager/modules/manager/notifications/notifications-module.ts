// RESPONSIBILITY: Registers the isolated Manager notifications feature boundary.
// FLOW: ManagerDomainModule -> NotificationsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { NotificationsCommandController } from '@/backend_manager/modules/manager/notifications/notifications-command.controller';
import { NotificationsDeleteNotificationService } from '@/backend_manager/modules/manager/notifications/services/notifications-delete-notification.service';
import { NotificationsFetchManagerNotificationsService } from '@/backend_manager/modules/manager/notifications/services/notifications-fetch-manager-notifications.service';
import { NotificationsFetchNotificationKPIsService } from '@/backend_manager/modules/manager/notifications/services/notifications-fetch-notification-k-p-is.service';
import { NotificationsMarkAllNotificationsReadService } from '@/backend_manager/modules/manager/notifications/services/notifications-mark-all-notifications-read.service';
import { NotificationsMarkNotificationReadService } from '@/backend_manager/modules/manager/notifications/services/notifications-mark-notification-read.service';
import { NotificationsOrchestratorService } from '@/backend_manager/modules/manager/notifications/services/notifications-orchestrator.service';
import { NotificationsQueryController } from '@/backend_manager/modules/manager/notifications/notifications-query.controller';
import { NotificationsRepository } from '@/backend_manager/modules/manager/notifications/repositories/notifications-repository';

@Module({
  controllers: [NotificationsQueryController, NotificationsCommandController],
  providers: [NotificationsMarkNotificationReadService, NotificationsMarkAllNotificationsReadService, NotificationsDeleteNotificationService, NotificationsFetchManagerNotificationsService, NotificationsFetchNotificationKPIsService, NotificationsRepository, NotificationsOrchestratorService],
  exports: [NotificationsRepository],
})
export class NotificationsModule {}
