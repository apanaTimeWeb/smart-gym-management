// RESPONSIBILITY: Registers the settings feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/settings/settings-contract-snapshot.entity';
import { SettingsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/settings/settings-contract-snapshot.repository';
import { PlatformSettingEntity } from '@/backend_superadmin/modules/superadmin/settings/settings.entity';
import { SettingsRepository } from '@/backend_superadmin/modules/superadmin/settings/settings.repository';
import { SettingsQueryController } from '@/backend_superadmin/modules/superadmin/settings/settings-query.controller';
import { SettingsCommandController } from '@/backend_superadmin/modules/superadmin/settings/settings-command.controller';
import { SettingsListService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-list.service';
import { SettingsFindService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-find.service';
import { SettingsCreateService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-create.service';
import { SettingsUpdateService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-update.service';
import { SettingsDeleteService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-delete.service';
import { SettingsGovernanceService } from '@/backend_superadmin/modules/superadmin/settings/services/settings-governance.service';
import { SettingsSpecialController } from '@/backend_superadmin/modules/superadmin/settings/settings-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([SettingsContractSnapshotEntity, PlatformSettingEntity])],
  controllers: [SettingsQueryController, SettingsCommandController, SettingsSpecialController],
  providers: [SettingsContractSnapshotRepository, SettingsGovernanceService, SettingsRepository, SettingsListService, SettingsFindService, SettingsCreateService, SettingsUpdateService, SettingsDeleteService],
  exports: [SettingsRepository],
})
export class SettingsModule {}
