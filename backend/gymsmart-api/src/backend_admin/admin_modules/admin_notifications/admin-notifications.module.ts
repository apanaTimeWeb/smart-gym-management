// RESPONSIBILITY: Registers the isolated Admin notifications feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminNotificationsCommandController } from '@/backend_admin/admin_modules/admin_notifications/notifications_controllers/admin-notifications-command.controller'
import { AdminNotificationsQueryController } from '@/backend_admin/admin_modules/admin_notifications/notifications_controllers/admin-notifications-query.controller'
import { AdminNotificationsMapper } from '@/backend_admin/admin_modules/admin_notifications/notifications_mappers/admin-notifications.mapper'
import { AdminNotificationsResponsePresenter } from '@/backend_admin/admin_modules/admin_notifications/notifications_mappers/admin-notifications.response.presenter'
import { AdminNotificationsRepository } from '@/backend_admin/admin_modules/admin_notifications/notifications_repositories/admin-notifications-repository'
import { AdminNotificationsCommandService } from '@/backend_admin/admin_modules/admin_notifications/notifications_services/admin-notifications-command.service'
import { AdminNotificationsQueryService } from '@/backend_admin/admin_modules/admin_notifications/notifications_services/admin-notifications-query.service'

@Module({
  controllers: [AdminNotificationsQueryController, AdminNotificationsCommandController],
  providers: [AdminNotificationsQueryService, AdminNotificationsRepository, AdminNotificationsMapper, AdminNotificationsResponsePresenter, AdminNotificationsCommandService],
  exports: [],
})
/**
 * @description Defines the AdminNotificationsModule boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsModule {}
