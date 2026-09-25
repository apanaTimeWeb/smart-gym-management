// RESPONSIBILITY: Registers the isolated Admin usage feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminUsageCommandController } from '@/backend_admin/admin_modules/admin_usage/usage_controllers/admin-usage-command.controller.js';
import { AdminUsageQueryController } from '@/backend_admin/admin_modules/admin_usage/usage_controllers/admin-usage-query.controller.js';
import { AdminUsageMapper } from '@/backend_admin/admin_modules/admin_usage/usage_mappers/admin-usage.mapper.js';
import { AdminUsageResponsePresenter } from '@/backend_admin/admin_modules/admin_usage/usage_mappers/admin-usage.response.presenter.js';
import { AdminUsageRepository } from '@/backend_admin/admin_modules/admin_usage/usage_repositories/admin-usage-repository.js';
import { AdminUsageCommandService } from '@/backend_admin/admin_modules/admin_usage/usage_services/admin-usage-command.service.js';
import { AdminUsageOrchestratorService } from '@/backend_admin/admin_modules/admin_usage/usage_services/admin-usage-orchestrator.service.js';
import { AdminUsageQueryService } from '@/backend_admin/admin_modules/admin_usage/usage_services/admin-usage-query.service.js';

@Module({
  controllers: [AdminUsageQueryController, AdminUsageCommandController],
  providers: [AdminUsageQueryService, AdminUsageRepository, AdminUsageMapper, AdminUsageResponsePresenter, AdminUsageCommandService, AdminUsageOrchestratorService],
  exports: [],
})
/**
 * @description Defines the AdminUsageModule boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageModule {}
