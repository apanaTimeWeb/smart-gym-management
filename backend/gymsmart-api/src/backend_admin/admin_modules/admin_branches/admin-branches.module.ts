// RESPONSIBILITY: Registers the isolated Admin branches feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminBranchesQueryController } from '@/backend_admin/admin_modules/admin_branches/branches_controllers/admin-branches-query.controller.js';
import { AdminBranchesMapper } from '@/backend_admin/admin_modules/admin_branches/branches_mappers/admin-branches.mapper.js';
import { AdminBranchesResponsePresenter } from '@/backend_admin/admin_modules/admin_branches/branches_mappers/admin-branches.response.presenter.js';
import { AdminBranchesRepository } from '@/backend_admin/admin_modules/admin_branches/branches_repositories/admin-branches-repository.js';
import { AdminBranchesQueryService } from '@/backend_admin/admin_modules/admin_branches/branches_services/admin-branches-query.service.js';

@Module({
  controllers: [AdminBranchesQueryController],
  providers: [AdminBranchesQueryService, AdminBranchesRepository, AdminBranchesMapper, AdminBranchesResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminBranchesModule boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchesModule {}
