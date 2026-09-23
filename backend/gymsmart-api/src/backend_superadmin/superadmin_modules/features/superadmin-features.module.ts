// RESPONSIBILITY: Registers the features feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminFeaturesRolloutInsightsQueryController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-rollout-insights-query.controller';
import { SuperadminFeaturesReleaseNoteCommandController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';
import { SuperadminFeaturesReleaseNoteEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.entity';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';
import { SuperadminFeaturesReleaseNoteService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-release-note.service';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesQueryController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-query.controller';
import { SuperadminFeaturesCommandController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-command.controller';
import { SuperadminFeaturesListService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-list.service';
import { SuperadminFeaturesFindService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-find.service';
import { SuperadminFeaturesCreateService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-create.service';
import { SuperadminFeaturesUpdateService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-update.service';
import { SuperadminFeaturesToggleService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-toggle.service';
import { SuperadminFeaturesDeleteService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-delete.service';
import { SuperadminFeaturesRolloutInsightsService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-rollout-insights.service';
import { SuperadminFeaturesMainService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-main.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminFeaturesEntity, SuperadminFeaturesReleaseNoteEntity])],
  controllers: [SuperadminFeaturesQueryController, SuperadminFeaturesCommandController, SuperadminFeaturesRolloutInsightsQueryController, SuperadminFeaturesReleaseNoteCommandController],
  providers: [SuperadminFeaturesReleaseNoteRepository, SuperadminFeaturesReleaseNoteService, SuperadminFeaturesRolloutInsightsService, SuperadminFeaturesMainService, SuperadminFeaturesRepository, SuperadminFeaturesListService, SuperadminFeaturesFindService, SuperadminFeaturesCreateService, SuperadminFeaturesUpdateService, SuperadminFeaturesToggleService, SuperadminFeaturesDeleteService],
  exports: [SuperadminFeaturesRepository],
})
export class SuperadminFeaturesModule {}