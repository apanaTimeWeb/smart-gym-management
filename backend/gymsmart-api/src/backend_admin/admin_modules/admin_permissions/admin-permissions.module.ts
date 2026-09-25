// RESPONSIBILITY: Registers the isolated Admin permissions feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminPermissionsCommandController } from '@/backend_admin/admin_modules/admin_permissions/permissions_controllers/admin-permissions-command.controller'
import { AdminPermissionsQueryController } from '@/backend_admin/admin_modules/admin_permissions/permissions_controllers/admin-permissions-query.controller'
import { AdminPermissionsMapper } from '@/backend_admin/admin_modules/admin_permissions/permissions_mappers/admin-permissions.mapper'
import { AdminPermissionsResponsePresenter } from '@/backend_admin/admin_modules/admin_permissions/permissions_mappers/admin-permissions.response.presenter'
import { AdminPermissionsRepository } from '@/backend_admin/admin_modules/admin_permissions/permissions_repositories/admin-permissions-repository'
import { AdminPermissionsCommandService } from '@/backend_admin/admin_modules/admin_permissions/permissions_services/admin-permissions-command.service'
import { AdminPermissionsQueryService } from '@/backend_admin/admin_modules/admin_permissions/permissions_services/admin-permissions-query.service'

@Module({
  controllers: [AdminPermissionsQueryController, AdminPermissionsCommandController],
  providers: [AdminPermissionsQueryService, AdminPermissionsRepository, AdminPermissionsMapper, AdminPermissionsResponsePresenter, AdminPermissionsCommandService],
  exports: [],
})
/**
 * @description Defines the AdminPermissionsModule boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsModule {}
