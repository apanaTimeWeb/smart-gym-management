// RESPONSIBILITY: Registers the settings feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSettingsGovernanceQueryController } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-governance-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';
import { SuperadminSettingsQueryController } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-query.controller';
import { SuperadminSettingsCommandController } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-command.controller';
import { SuperadminSettingsListService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-list.service';
import { SuperadminSettingsFindService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-find.service';
import { SuperadminSettingsCreateService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-create.service';
import { SuperadminSettingsUpdateService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-update.service';
import { SuperadminSettingsDeleteService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-delete.service';
import { SuperadminSettingsGovernanceService } from '@/backend_superadmin/superadmin_modules/settings/services/superadmin-settings-governance.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSettingsEntity])],
  controllers: [SuperadminSettingsQueryController, SuperadminSettingsCommandController, SuperadminSettingsGovernanceQueryController],
  providers: [SuperadminSettingsGovernanceService, SuperadminSettingsRepository, SuperadminSettingsListService, SuperadminSettingsFindService, SuperadminSettingsCreateService, SuperadminSettingsUpdateService, SuperadminSettingsDeleteService],
  exports: [SuperadminSettingsRepository],
})
export class SuperadminSettingsModule {}