// RESPONSIBILITY: Registers the features feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesContractSnapshotEntity } from '@/modules/superadmin/features/features-contract-snapshot.entity';
import { FeaturesContractSnapshotRepository } from '@/modules/superadmin/features/features-contract-snapshot.repository';
import { FeatureFlagEntity } from '@/modules/superadmin/features/features.entity';
import { FeatureReleaseNoteEntity } from '@/modules/superadmin/features/features-release-note.entity';
import { FeatureReleaseNoteRepository } from '@/modules/superadmin/features/features-release-note.repository';
import { FeaturesReleaseNoteService } from '@/modules/superadmin/features/services/features-release-note.service';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';
import { FeaturesQueryController } from '@/modules/superadmin/features/features-query.controller';
import { FeaturesCommandController } from '@/modules/superadmin/features/features-command.controller';
import { FeaturesListService } from '@/modules/superadmin/features/services/features-list.service';
import { FeaturesFindService } from '@/modules/superadmin/features/services/features-find.service';
import { FeaturesCreateService } from '@/modules/superadmin/features/services/features-create.service';
import { FeaturesUpdateService } from '@/modules/superadmin/features/services/features-update.service';
import { FeaturesDeleteService } from '@/modules/superadmin/features/services/features-delete.service';
import { FeaturesRolloutInsightsService } from '@/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/modules/superadmin/features/services/features-main.service';
import { FeaturesSpecialController } from '@/modules/superadmin/features/features-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([FeaturesContractSnapshotEntity, FeatureFlagEntity, FeatureReleaseNoteEntity])],
  controllers: [FeaturesQueryController, FeaturesCommandController, FeaturesSpecialController],
  providers: [FeaturesContractSnapshotRepository, FeatureReleaseNoteRepository, FeaturesReleaseNoteService, FeaturesRolloutInsightsService, FeaturesMainService, FeaturesRepository, FeaturesListService, FeaturesFindService, FeaturesCreateService, FeaturesUpdateService, FeaturesDeleteService],
  exports: [FeaturesRepository],
})
export class FeaturesModule {}
