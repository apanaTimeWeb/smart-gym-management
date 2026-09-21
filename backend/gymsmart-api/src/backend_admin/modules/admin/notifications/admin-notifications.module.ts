// RESPONSIBILITY: Registers the isolated Admin notifications feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminNotificationsQueryController } from '@/backend_admin/modules/admin/notifications/controllers/admin-notifications-query.controller';
import { AdminNotificationsQueryService } from '@/backend_admin/modules/admin/notifications/services/admin-notifications-query.service';
import { AdminNotificationsRepository } from '@/backend_admin/modules/admin/notifications/repositories/admin-notifications-repository';
import { AdminNotificationsMapper } from '@/backend_admin/modules/admin/notifications/mappers/admin-notifications.mapper';
import { AdminNotificationsCommandController } from '@/backend_admin/modules/admin/notifications/controllers/admin-notifications-command.controller';
import { AdminNotificationsCommandService } from '@/backend_admin/modules/admin/notifications/services/admin-notifications-command.service';

@Module({
  controllers: [AdminNotificationsQueryController, AdminNotificationsCommandController],
  providers: [AdminNotificationsQueryService, AdminNotificationsRepository, AdminNotificationsMapper, AdminNotificationsCommandService],
  exports: [],
})
export class AdminNotificationsModule {}
