import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerNotificationsEntity } from '@/backend_manager/manager_modules/notifications/manager-notifications.entity';
import { ManagerNotificationsMutationService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerNotificationsAuthorizationService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-authorization.service';

import { ManagerNotificationsCommandController } from '@/backend_manager/manager_modules/notifications/manager-notifications-command.controller';
import { ManagerNotificationsQueryController } from '@/backend_manager/manager_modules/notifications/manager-notifications-query.controller';
import { ManagerNotificationsRepository } from '@/backend_manager/manager_modules/notifications/manager-notifications.repository';
import { ManagerNotificationsDeleteNotificationService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-delete-notification.service';
import { ManagerNotificationsFindManagerNotificationsService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-find-manager-notifications.service';
import { ManagerNotificationsFindNotificationKPIsService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-find-notification-k-p-is.service';
import { ManagerNotificationsMarkAllNotificationsReadService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mark-all-notifications-read.service';
import { ManagerNotificationsMarkNotificationReadService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-mark-notification-read.service';
import { ManagerNotificationsOrchestratorService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-orchestrator.service';

/**
 * Primary Intent: Defines ManagerNotificationsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerNotificationsEntity])],
  controllers: [ManagerNotificationsQueryController, ManagerNotificationsCommandController],
  providers: [ManagerNotificationsMutationService, ManagerNotificationsMarkNotificationReadService, ManagerNotificationsMarkAllNotificationsReadService, ManagerNotificationsDeleteNotificationService, ManagerNotificationsFindManagerNotificationsService, ManagerNotificationsFindNotificationKPIsService, ManagerNotificationsRepository, ManagerNotificationsOrchestratorService,
  ManagerNotificationsAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:notifications`, useFactory: (authorization: ManagerNotificationsAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('notifications', authorization); return authorization; }, inject: [ManagerNotificationsAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerNotificationsRepository],
})
export class ManagerNotificationsModule {}

export { ManagerNotificationsModule as NotificationsModule };
