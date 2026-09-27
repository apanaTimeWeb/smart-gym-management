import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerSettingsEntity } from '@/backend_manager/manager_modules/settings/manager-settings.entity';
import { ManagerSettingsMutationService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerSettingsAuthorizationService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-authorization.service';

import { ManagerSettingsRepository } from '@/backend_manager/manager_modules/settings/manager-settings.repository';
import { ManagerSettingsFindSettingsService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-find-settings.service';
import { ManagerSettingsOrchestratorService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-orchestrator.service';
import { ManagerSettingsUpdateSettingsService } from '@/backend_manager/manager_modules/settings/settings_services/manager-settings-update-settings.service';
import { ManagerSettingsCommandController } from '@/backend_manager/manager_modules/settings/manager-settings-command.controller';
import { ManagerSettingsQueryController } from '@/backend_manager/manager_modules/settings/manager-settings-query.controller';

/**
 * Primary Intent: Defines ManagerSettingsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerSettingsEntity])],
  controllers: [ManagerSettingsQueryController, ManagerSettingsCommandController],
  providers: [ManagerSettingsMutationService, ManagerSettingsUpdateSettingsService, ManagerSettingsFindSettingsService, ManagerSettingsRepository, ManagerSettingsOrchestratorService,
  ManagerSettingsAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:settings`, useFactory: (authorization: ManagerSettingsAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('settings', authorization); return authorization; }, inject: [ManagerSettingsAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerSettingsRepository],
})
export class ManagerSettingsModule {}

export { ManagerSettingsModule as SettingsModule };
