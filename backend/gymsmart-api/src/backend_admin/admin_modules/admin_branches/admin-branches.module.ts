// RESPONSIBILITY: Registers the isolated Admin branches feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminBranchesQueryController } from '@/backend_admin/admin_modules/admin_branches/branches_controllers/admin-branches-query.controller'
import { AdminBranchesMapper } from '@/backend_admin/admin_modules/admin_branches/branches_mappers/admin-branches.mapper'
import { AdminBranchesResponsePresenter } from '@/backend_admin/admin_modules/admin_branches/branches_mappers/admin-branches.response.presenter'
import { AdminBranchesRepository } from '@/backend_admin/admin_modules/admin_branches/branches_repositories/admin-branches-repository'
import { AdminBranchesQueryService } from '@/backend_admin/admin_modules/admin_branches/branches_services/admin-branches-query.service'

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
