// RESPONSIBILITY: Registers the isolated Admin plans feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminPlansCommandController } from '@/backend_admin/admin_modules/admin_plans/plans_controllers/admin-plans-command.controller.js';
import { AdminPlansQueryController } from '@/backend_admin/admin_modules/admin_plans/plans_controllers/admin-plans-query.controller.js';
import { AdminPlansMapper } from '@/backend_admin/admin_modules/admin_plans/plans_mappers/admin-plans.mapper.js';
import { AdminPlansResponsePresenter } from '@/backend_admin/admin_modules/admin_plans/plans_mappers/admin-plans.response.presenter.js';
import { AdminPlansRepository } from '@/backend_admin/admin_modules/admin_plans/plans_repositories/admin-plans-repository.js';
import { AdminPlansCommandService } from '@/backend_admin/admin_modules/admin_plans/plans_services/admin-plans-command.service.js';
import { AdminPlansQueryService } from '@/backend_admin/admin_modules/admin_plans/plans_services/admin-plans-query.service.js';

@Module({
  controllers: [AdminPlansQueryController, AdminPlansCommandController],
  providers: [AdminPlansQueryService, AdminPlansRepository, AdminPlansMapper, AdminPlansResponsePresenter, AdminPlansCommandService],
  exports: [],
})
/**
 * @description Defines the AdminPlansModule boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansModule {}
