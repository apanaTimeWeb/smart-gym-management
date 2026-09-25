// RESPONSIBILITY: Registers the isolated Admin settings feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminSettingsCommandController } from '@/backend_admin/admin_modules/admin_settings/settings_controllers/admin-settings-command.controller'
import { AdminSettingsQueryController } from '@/backend_admin/admin_modules/admin_settings/settings_controllers/admin-settings-query.controller'
import { AdminSettingsMapper } from '@/backend_admin/admin_modules/admin_settings/settings_mappers/admin-settings.mapper'
import { AdminSettingsResponsePresenter } from '@/backend_admin/admin_modules/admin_settings/settings_mappers/admin-settings.response.presenter'
import { AdminSettingsRepository } from '@/backend_admin/admin_modules/admin_settings/settings_repositories/admin-settings-repository'
import { AdminSettingsCommandService } from '@/backend_admin/admin_modules/admin_settings/settings_services/admin-settings-command.service'
import { AdminSettingsQueryService } from '@/backend_admin/admin_modules/admin_settings/settings_services/admin-settings-query.service'

@Module({
  controllers: [AdminSettingsQueryController, AdminSettingsCommandController],
  providers: [AdminSettingsQueryService, AdminSettingsRepository, AdminSettingsMapper, AdminSettingsResponsePresenter, AdminSettingsCommandService],
  exports: [],
})
/**
 * @description Defines the AdminSettingsModule boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsModule {}
