// RESPONSIBILITY: Registers the isolated Admin settings feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminSettingsQueryController } from '@/modules/admin/settings/controllers/admin-settings-query.controller';
import { AdminSettingsQueryService } from '@/modules/admin/settings/services/admin-settings-query.service';
import { AdminSettingsRepository } from '@/modules/admin/settings/repositories/admin-settings-repository';
import { AdminSettingsMapper } from '@/modules/admin/settings/mappers/admin-settings.mapper';
import { AdminSettingsCommandController } from '@/modules/admin/settings/controllers/admin-settings-command.controller';
import { AdminSettingsCommandService } from '@/modules/admin/settings/services/admin-settings-command.service';

@Module({
  controllers: [AdminSettingsQueryController, AdminSettingsCommandController],
  providers: [AdminSettingsQueryService, AdminSettingsRepository, AdminSettingsMapper, AdminSettingsCommandService],
  exports: [],
})
export class AdminSettingsModule {}
