// RESPONSIBILITY: Registers the settings feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSettingsGovernanceQueryController } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-governance-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
import { SuperadminSettingsQueryController } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-query.controller';
import { SuperadminSettingsCommandController } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-command.controller';
import { SuperadminSettingsListService } from '@/backend_superadmin/superadmin_modules/settings/settings_services/superadmin-settings-list.service';
import { SuperadminSettingsFindService } from '@/backend_superadmin/superadmin_modules/settings/settings_services/superadmin-settings-find.service';
import { SuperadminSettingsCreateService } from '@/backend_superadmin/superadmin_modules/settings/settings_services/superadmin-settings-create.service';
import { SuperadminSettingsUpdateService } from '@/backend_superadmin/superadmin_modules/settings/settings_services/superadmin-settings-update.service';
import { SuperadminSettingsDeleteService } from '@/backend_superadmin/superadmin_modules/settings/settings_services/superadmin-settings-delete.service';
import { SuperadminSettingsGovernanceService } from '@/backend_superadmin/superadmin_modules/settings/settings_services/superadmin-settings-governance.service';
/**
 * Primary Intent: Defines SuperadminSettingsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSettingsEntity])],
  controllers: [SuperadminSettingsQueryController, SuperadminSettingsCommandController, SuperadminSettingsGovernanceQueryController],
  providers: [SuperadminSettingsGovernanceService, SuperadminSettingsRepository, SuperadminSettingsListService, SuperadminSettingsFindService, SuperadminSettingsCreateService, SuperadminSettingsUpdateService, SuperadminSettingsDeleteService],
  exports: [SuperadminSettingsRepository],
})
/**
 * Primary Intent: Defines SuperadminSettingsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSettingsModule {}
