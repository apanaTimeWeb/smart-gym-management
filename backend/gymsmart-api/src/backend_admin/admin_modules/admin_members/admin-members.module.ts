// RESPONSIBILITY: Registers the isolated Admin members feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminMembersQueryController } from '@/backend_admin/admin_modules/admin_members/members_controllers/admin-members-query.controller'
import { AdminMembersMapper } from '@/backend_admin/admin_modules/admin_members/members_mappers/admin-members.mapper'
import { AdminMembersResponsePresenter } from '@/backend_admin/admin_modules/admin_members/members_mappers/admin-members.response.presenter'
import { AdminMembersRepository } from '@/backend_admin/admin_modules/admin_members/members_repositories/admin-members-repository'
import { AdminMembersQueryService } from '@/backend_admin/admin_modules/admin_members/members_services/admin-members-query.service'

@Module({
  controllers: [AdminMembersQueryController],
  providers: [AdminMembersQueryService, AdminMembersRepository, AdminMembersMapper, AdminMembersResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminMembersModule boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersModule {}
