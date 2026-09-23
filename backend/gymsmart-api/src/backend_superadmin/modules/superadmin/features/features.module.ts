// RESPONSIBILITY: Registers the features feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { FeaturesRolloutInsightsQueryController } from '@/backend_superadmin/modules/superadmin/features/features-rollout-insights-query.controller';
import { FeaturesReleaseNoteCommandController } from '@/backend_superadmin/modules/superadmin/features/features-release-note-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';
import { FeaturesReleaseNoteEntity } from '@/backend_superadmin/modules/superadmin/features/features-release-note.entity';
import { FeaturesReleaseNoteRepository } from '@/backend_superadmin/modules/superadmin/features/features-release-note.repository';
import { FeaturesReleaseNoteService } from '@/backend_superadmin/modules/superadmin/features/services/features-release-note.service';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesQueryController } from '@/backend_superadmin/modules/superadmin/features/features-query.controller';
import { FeaturesCommandController } from '@/backend_superadmin/modules/superadmin/features/features-command.controller';
import { FeaturesListService } from '@/backend_superadmin/modules/superadmin/features/services/features-list.service';
import { FeaturesFindService } from '@/backend_superadmin/modules/superadmin/features/services/features-find.service';
import { FeaturesCreateService } from '@/backend_superadmin/modules/superadmin/features/services/features-create.service';
import { FeaturesUpdateService } from '@/backend_superadmin/modules/superadmin/features/services/features-update.service';
import { FeaturesToggleService } from '@/backend_superadmin/modules/superadmin/features/services/features-toggle.service';
import { FeaturesDeleteService } from '@/backend_superadmin/modules/superadmin/features/services/features-delete.service';
import { FeaturesRolloutInsightsService } from '@/backend_superadmin/modules/superadmin/features/services/features-rollout-insights.service';
import { FeaturesMainService } from '@/backend_superadmin/modules/superadmin/features/services/features-main.service';
@Module({
  imports: [TypeOrmModule.forFeature([FeaturesEntity, FeaturesReleaseNoteEntity])],
  controllers: [FeaturesQueryController, FeaturesCommandController, FeaturesRolloutInsightsQueryController, FeaturesReleaseNoteCommandController],
  providers: [FeaturesReleaseNoteRepository, FeaturesReleaseNoteService, FeaturesRolloutInsightsService, FeaturesMainService, FeaturesRepository, FeaturesListService, FeaturesFindService, FeaturesCreateService, FeaturesUpdateService, FeaturesToggleService, FeaturesDeleteService],
  exports: [FeaturesRepository],
})
export class FeaturesModule {}