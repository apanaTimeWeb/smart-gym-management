// RESPONSIBILITY: Registers the features feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/features/features-contract-snapshot.entity';
import { FeaturesContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/features/features-contract-snapshot.repository';
import { FeatureFlagEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';
import { FeatureReleaseNoteEntity } from '@/backend_superadmin/modules/superadmin/features/features-release-note.entity';
import { FeatureReleaseNoteRepository } from '@/backend_superadmin/modules/superadmin/features/features-release-note.repository';
import { FeaturesReleaseNoteService } from '@/backend_superadmin/modules/superadmin/features/services/features-release-note.service';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesQueryController } from '@/backend_superadmin/modules/superadmin/features/features-query.controller';
import { FeaturesCommandController } from '@/backend_superadmin/modules/superadmin/features/features-command.controller';
import { FeaturesListService } from '@/backend_superadmin/modules/superadmin/features/services/features-list.service';
import { FeaturesFindService } from '@/backend_superadmin/modules/superadmin/features/services/features-find.service';
import { FeaturesCreateService } from '@/backend_superadmin/modules/superadmin/features/services/features-create.service';
import { FeaturesUpdateService } from '@/backend_superadmin/modules/superadmin/features/services/features-update.service';
import { FeaturesDeleteService } from '@/backend_superadmin/modules/superadmin/features/services/features-delete.service';
import { FeaturesRolloutInsightsService } from '@/backend_superadmin/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/backend_superadmin/modules/superadmin/features/services/features-main.service';
import { FeaturesSpecialController } from '@/backend_superadmin/modules/superadmin/features/features-special.controller';
import { FeaturesCompatibilityController, FeaturesInsightsCompatibilityController } from '@/backend_superadmin/modules/superadmin/features/features-compatibility.controller';
@Module({
  imports: [TypeOrmModule.forFeature([FeaturesContractSnapshotEntity, FeatureFlagEntity, FeatureReleaseNoteEntity])],
  controllers: [FeaturesQueryController, FeaturesCommandController, FeaturesSpecialController, FeaturesCompatibilityController, FeaturesInsightsCompatibilityController],
  providers: [FeaturesContractSnapshotRepository, FeatureReleaseNoteRepository, FeaturesReleaseNoteService, FeaturesRolloutInsightsService, FeaturesMainService, FeaturesRepository, FeaturesListService, FeaturesFindService, FeaturesCreateService, FeaturesUpdateService, FeaturesDeleteService],
  exports: [FeaturesRepository],
})
export class FeaturesModule {}
