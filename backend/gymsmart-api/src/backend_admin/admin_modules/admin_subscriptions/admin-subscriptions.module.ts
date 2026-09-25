// RESPONSIBILITY: Registers the isolated Admin subscriptions feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminSubscriptionsCommandController } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_controllers/admin-subscriptions-command.controller'
import { AdminSubscriptionsQueryController } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_controllers/admin-subscriptions-query.controller'
import { AdminSubscriptionsMapper } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_mappers/admin-subscriptions.mapper'
import { AdminSubscriptionsResponsePresenter } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_mappers/admin-subscriptions.response.presenter'
import { AdminSubscriptionsRepository } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_repositories/admin-subscriptions-repository'
import { AdminSubscriptionsCommandService } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_services/admin-subscriptions-command.service'
import { AdminSubscriptionsOrchestratorService } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_services/admin-subscriptions-orchestrator.service'
import { AdminSubscriptionsQueryService } from '@/backend_admin/admin_modules/admin_subscriptions/subscriptions_services/admin-subscriptions-query.service'

@Module({
  controllers: [AdminSubscriptionsQueryController, AdminSubscriptionsCommandController],
  providers: [AdminSubscriptionsQueryService, AdminSubscriptionsRepository, AdminSubscriptionsMapper, AdminSubscriptionsResponsePresenter, AdminSubscriptionsCommandService, AdminSubscriptionsOrchestratorService],
  exports: [],
})
/**
 * @description Defines the AdminSubscriptionsModule boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsModule {}
