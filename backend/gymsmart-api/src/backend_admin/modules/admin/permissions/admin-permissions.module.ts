// RESPONSIBILITY: Registers the isolated Admin permissions feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminPermissionsQueryController } from '@/backend_admin/modules/admin/permissions/controllers/admin-permissions-query.controller';
import { AdminPermissionsQueryService } from '@/backend_admin/modules/admin/permissions/services/admin-permissions-query.service';
import { AdminPermissionsRepository } from '@/backend_admin/modules/admin/permissions/repositories/admin-permissions-repository';
import { AdminPermissionsMapper } from '@/backend_admin/modules/admin/permissions/mappers/admin-permissions.mapper';
import { AdminPermissionsCommandController } from '@/backend_admin/modules/admin/permissions/controllers/admin-permissions-command.controller';
import { AdminPermissionsCommandService } from '@/backend_admin/modules/admin/permissions/services/admin-permissions-command.service';

@Module({
  controllers: [AdminPermissionsQueryController, AdminPermissionsCommandController],
  providers: [AdminPermissionsQueryService, AdminPermissionsRepository, AdminPermissionsMapper, AdminPermissionsCommandService],
  exports: [],
})
export class AdminPermissionsModule {}
