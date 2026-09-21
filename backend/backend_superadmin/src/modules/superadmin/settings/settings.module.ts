// RESPONSIBILITY: Registers the settings feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsContractSnapshotEntity } from '@/modules/superadmin/settings/settings-contract-snapshot.entity';
import { SettingsContractSnapshotRepository } from '@/modules/superadmin/settings/settings-contract-snapshot.repository';
import { PlatformSettingEntity } from '@/modules/superadmin/settings/settings.entity';
import { SettingsRepository } from '@/modules/superadmin/settings/settings.repository';
import { SettingsQueryController } from '@/modules/superadmin/settings/settings-query.controller';
import { SettingsCommandController } from '@/modules/superadmin/settings/settings-command.controller';
import { SettingsListService } from '@/modules/superadmin/settings/services/settings-list.service';
import { SettingsFindService } from '@/modules/superadmin/settings/services/settings-find.service';
import { SettingsCreateService } from '@/modules/superadmin/settings/services/settings-create.service';
import { SettingsUpdateService } from '@/modules/superadmin/settings/services/settings-update.service';
import { SettingsDeleteService } from '@/modules/superadmin/settings/services/settings-delete.service';
import { SettingsGovernanceService } from '@/modules/superadmin/settings/services/settings-governance.service';
import { SettingsSpecialController } from '@/modules/superadmin/settings/settings-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([SettingsContractSnapshotEntity, PlatformSettingEntity])],
  controllers: [SettingsQueryController, SettingsCommandController, SettingsSpecialController],
  providers: [SettingsContractSnapshotRepository, SettingsGovernanceService, SettingsRepository, SettingsListService, SettingsFindService, SettingsCreateService, SettingsUpdateService, SettingsDeleteService],
  exports: [SettingsRepository],
})
export class SettingsModule {}
