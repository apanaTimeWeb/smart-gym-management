// RESPONSIBILITY: Registers the isolated Manager notifications feature boundary.
// FLOW: ManagerDomainModule -> NotificationsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { NotificationsCommandController } from '@/modules/manager/notifications/notifications-command.controller';
import { NotificationsDeleteNotificationService } from '@/modules/manager/notifications/services/notifications-delete-notification.service';
import { NotificationsFetchManagerNotificationsService } from '@/modules/manager/notifications/services/notifications-fetch-manager-notifications.service';
import { NotificationsFetchNotificationKPIsService } from '@/modules/manager/notifications/services/notifications-fetch-notification-k-p-is.service';
import { NotificationsMarkAllNotificationsReadService } from '@/modules/manager/notifications/services/notifications-mark-all-notifications-read.service';
import { NotificationsMarkNotificationReadService } from '@/modules/manager/notifications/services/notifications-mark-notification-read.service';
import { NotificationsOrchestratorService } from '@/modules/manager/notifications/services/notifications-orchestrator.service';
import { NotificationsQueryController } from '@/modules/manager/notifications/notifications-query.controller';
import { NotificationsRepository } from '@/modules/manager/notifications/repositories/notifications-repository';

@Module({
  controllers: [NotificationsQueryController, NotificationsCommandController],
  providers: [NotificationsMarkNotificationReadService, NotificationsMarkAllNotificationsReadService, NotificationsDeleteNotificationService, NotificationsFetchManagerNotificationsService, NotificationsFetchNotificationKPIsService, NotificationsRepository, NotificationsOrchestratorService],
  exports: [NotificationsRepository],
})
export class NotificationsModule {}
