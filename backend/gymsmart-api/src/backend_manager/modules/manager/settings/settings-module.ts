// RESPONSIBILITY: Registers the isolated Manager settings feature boundary.
// FLOW: ManagerDomainModule -> SettingsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { SettingsCommandController } from '@/modules/manager/settings/settings-command.controller';
import { SettingsFetchSettingsService } from '@/modules/manager/settings/services/settings-fetch-settings.service';
import { SettingsOrchestratorService } from '@/modules/manager/settings/services/settings-orchestrator.service';
import { SettingsQueryController } from '@/modules/manager/settings/settings-query.controller';
import { SettingsRepository } from '@/modules/manager/settings/repositories/settings-repository';
import { SettingsUpdateSettingsService } from '@/modules/manager/settings/services/settings-update-settings.service';

@Module({
  controllers: [SettingsQueryController, SettingsCommandController],
  providers: [SettingsUpdateSettingsService, SettingsFetchSettingsService, SettingsRepository, SettingsOrchestratorService],
  exports: [SettingsRepository],
})
export class SettingsModule {}
