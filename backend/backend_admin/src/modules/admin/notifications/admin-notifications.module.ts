// RESPONSIBILITY: Registers the isolated Admin notifications feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminNotificationsQueryController } from '@/modules/admin/notifications/controllers/admin-notifications-query.controller';
import { AdminNotificationsQueryService } from '@/modules/admin/notifications/services/admin-notifications-query.service';
import { AdminNotificationsRepository } from '@/modules/admin/notifications/repositories/admin-notifications-repository';
import { AdminNotificationsMapper } from '@/modules/admin/notifications/mappers/admin-notifications.mapper';
import { AdminNotificationsCommandController } from '@/modules/admin/notifications/controllers/admin-notifications-command.controller';
import { AdminNotificationsCommandService } from '@/modules/admin/notifications/services/admin-notifications-command.service';

@Module({
  controllers: [AdminNotificationsQueryController, AdminNotificationsCommandController],
  providers: [AdminNotificationsQueryService, AdminNotificationsRepository, AdminNotificationsMapper, AdminNotificationsCommandService],
  exports: [],
})
export class AdminNotificationsModule {}
