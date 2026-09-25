// RESPONSIBILITY: Registers the isolated Admin profile feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminProfileCommandController } from '@/backend_admin/admin_modules/admin_profile/profile_controllers/admin-profile-command.controller.js';
import { AdminProfileQueryController } from '@/backend_admin/admin_modules/admin_profile/profile_controllers/admin-profile-query.controller.js';
import { AdminProfileMapper } from '@/backend_admin/admin_modules/admin_profile/profile_mappers/admin-profile.mapper.js';
import { AdminProfileResponsePresenter } from '@/backend_admin/admin_modules/admin_profile/profile_mappers/admin-profile.response.presenter.js';
import { AdminProfileRepository } from '@/backend_admin/admin_modules/admin_profile/profile_repositories/admin-profile-repository.js';
import { AdminProfileCommandService } from '@/backend_admin/admin_modules/admin_profile/profile_services/admin-profile-command.service.js';
import { AdminProfileQueryService } from '@/backend_admin/admin_modules/admin_profile/profile_services/admin-profile-query.service.js';

@Module({
  controllers: [AdminProfileQueryController, AdminProfileCommandController],
  providers: [AdminProfileQueryService, AdminProfileRepository, AdminProfileMapper, AdminProfileResponsePresenter, AdminProfileCommandService],
  exports: [],
})
/**
 * @description Defines the AdminProfileModule boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileModule {}
