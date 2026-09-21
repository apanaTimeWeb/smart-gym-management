// RESPONSIBILITY: Registers the white-labeling feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhiteLabelDomainEntity } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.entity';
import { WhiteLabelingRepository } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.repository';
import { WhiteLabelingQueryController } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling-query.controller';
import { WhiteLabelingCommandController } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling-command.controller';
import { WhiteLabelingListService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-list.service';
import { WhiteLabelingFindService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-find.service';
import { WhiteLabelingCreateService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-create.service';
import { WhiteLabelingUpdateService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-update.service';
import { WhiteLabelingDeleteService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-delete.service';
import { WhiteLabelingStatusService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-status.service';
import { WhiteLabelingDomainsService } from '@/backend_superadmin/modules/superadmin/white-labeling/services/white-labeling-domains.service';
import { WhiteLabelingSpecialController } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([WhiteLabelDomainEntity])],
  controllers: [WhiteLabelingQueryController, WhiteLabelingCommandController, WhiteLabelingSpecialController],
  providers: [WhiteLabelingDomainsService, WhiteLabelingStatusService, WhiteLabelingRepository, WhiteLabelingListService, WhiteLabelingFindService, WhiteLabelingCreateService, WhiteLabelingUpdateService, WhiteLabelingDeleteService],
  exports: [WhiteLabelingRepository],
})
export class WhiteLabelingModule {}
