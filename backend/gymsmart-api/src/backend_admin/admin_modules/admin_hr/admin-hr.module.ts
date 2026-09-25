// RESPONSIBILITY: Registers the isolated Admin hr feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminHrCommandController } from '@/backend_admin/admin_modules/admin_hr/hr_controllers/admin-hr-command.controller'
import { AdminHrQueryController } from '@/backend_admin/admin_modules/admin_hr/hr_controllers/admin-hr-query.controller'
import { AdminHrMapper } from '@/backend_admin/admin_modules/admin_hr/hr_mappers/admin-hr.mapper'
import { AdminHrResponsePresenter } from '@/backend_admin/admin_modules/admin_hr/hr_mappers/admin-hr.response.presenter'
import { AdminHrRepository } from '@/backend_admin/admin_modules/admin_hr/hr_repositories/admin-hr-repository'
import { AdminHrCommandService } from '@/backend_admin/admin_modules/admin_hr/hr_services/admin-hr-command.service'
import { AdminHrQueryService } from '@/backend_admin/admin_modules/admin_hr/hr_services/admin-hr-query.service'

@Module({
  controllers: [AdminHrQueryController, AdminHrCommandController],
  providers: [AdminHrQueryService, AdminHrRepository, AdminHrMapper, AdminHrResponsePresenter, AdminHrCommandService],
  exports: [],
})
/**
 * @description Defines the AdminHrModule boundary for the admin_hr backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminHrModule {}
