// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { SettingsRepository } from '@/backend_manager/modules/backend_manager/settings/repositories/settings-repository';
import { SettingsFetchSettingsService } from '@/backend_manager/modules/backend_manager/settings/services/settings-fetch-settings.service';
import { SettingsOrchestratorService } from '@/backend_manager/modules/backend_manager/settings/services/settings-orchestrator.service';
import { SettingsUpdateSettingsService } from '@/backend_manager/modules/backend_manager/settings/services/settings-update-settings.service';
import { SettingsCommandController } from '@/backend_manager/modules/backend_manager/settings/settings-command.controller';
import { SettingsQueryController } from '@/backend_manager/modules/backend_manager/settings/settings-query.controller';

@Module({
  controllers: [SettingsQueryController, SettingsCommandController],
  providers: [SettingsUpdateSettingsService, SettingsFetchSettingsService, SettingsRepository, SettingsOrchestratorService],
  exports: [SettingsRepository],
})
export class SettingsModule {}
