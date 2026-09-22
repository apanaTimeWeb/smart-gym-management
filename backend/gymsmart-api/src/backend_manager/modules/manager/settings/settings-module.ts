// RESPONSIBILITY: Registers the isolated Manager settings feature boundary.
// FLOW: ManagerDomainModule -> SettingsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { SettingsCommandController } from '@/backend_manager/modules/manager/settings/settings-command.controller';
import { SettingsFetchSettingsService } from '@/backend_manager/modules/manager/settings/services/settings-fetch-settings.service';
import { SettingsOrchestratorService } from '@/backend_manager/modules/manager/settings/services/settings-orchestrator.service';
import { SettingsQueryController } from '@/backend_manager/modules/manager/settings/settings-query.controller';
import { SettingsRepository } from '@/backend_manager/modules/manager/settings/repositories/settings-repository';
import { SettingsUpdateSettingsService } from '@/backend_manager/modules/manager/settings/services/settings-update-settings.service';

@Module({
  controllers: [SettingsQueryController, SettingsCommandController],
  providers: [SettingsUpdateSettingsService, SettingsFetchSettingsService, SettingsRepository, SettingsOrchestratorService],
  exports: [SettingsRepository],
})
export class SettingsModule {}
