// RESPONSIBILITY: Registers the white-labeling feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminWhiteLabelingDomainsQueryController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-domains-query.controller';
import { SuperadminWhiteLabelingDomainsCommandController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-domains-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingQueryController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-query.controller';
import { SuperadminWhiteLabelingCommandController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-command.controller';
import { SuperadminWhiteLabelingListService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-list.service';
import { SuperadminWhiteLabelingFindService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-find.service';
import { SuperadminWhiteLabelingCreateService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-create.service';
import { SuperadminWhiteLabelingUpdateService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-update.service';
import { SuperadminWhiteLabelingDeleteService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-delete.service';
import { SuperadminWhiteLabelingStatusService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-status.service';
import { SuperadminWhiteLabelingDomainsService } from '@/backend_superadmin/superadmin_modules/white-labeling/services/superadmin-white-labeling-domains.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminWhiteLabelingEntity])],
  controllers: [SuperadminWhiteLabelingQueryController, SuperadminWhiteLabelingCommandController, SuperadminWhiteLabelingDomainsQueryController, SuperadminWhiteLabelingDomainsCommandController],
  providers: [SuperadminWhiteLabelingDomainsService, SuperadminWhiteLabelingStatusService, SuperadminWhiteLabelingRepository, SuperadminWhiteLabelingListService, SuperadminWhiteLabelingFindService, SuperadminWhiteLabelingCreateService, SuperadminWhiteLabelingUpdateService, SuperadminWhiteLabelingDeleteService],
  exports: [SuperadminWhiteLabelingRepository],
})
export class SuperadminWhiteLabelingModule {}