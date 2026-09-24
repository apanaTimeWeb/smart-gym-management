// RESPONSIBILITY: Registers the features feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminFeaturesRolloutInsightsQueryController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-rollout-insights-query.controller';
import { SuperadminFeaturesReleaseNoteCommandController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';
import { SuperadminFeaturesReleaseNoteEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.entity';
import { SuperadminFeaturesReleaseNoteRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.repository';
import { SuperadminFeaturesReleaseNoteService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-release-note.service';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesQueryController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-query.controller';
import { SuperadminFeaturesCommandController } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-command.controller';
import { SuperadminFeaturesListService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-list.service';
import { SuperadminFeaturesFindService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-find.service';
import { SuperadminFeaturesCreateService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-create.service';
import { SuperadminFeaturesUpdateService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-update.service';
import { SuperadminFeaturesToggleService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-toggle.service';
import { SuperadminFeaturesDeleteService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-delete.service';
import { SuperadminFeaturesRolloutInsightsService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-rollout-insights.service';
import { SuperadminFeaturesMainService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-main.service';
/**
 * Primary Intent: Defines SuperadminFeaturesModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminFeaturesEntity, SuperadminFeaturesReleaseNoteEntity])],
  controllers: [SuperadminFeaturesQueryController, SuperadminFeaturesCommandController, SuperadminFeaturesRolloutInsightsQueryController, SuperadminFeaturesReleaseNoteCommandController],
  providers: [SuperadminFeaturesReleaseNoteRepository, SuperadminFeaturesReleaseNoteService, SuperadminFeaturesRolloutInsightsService, SuperadminFeaturesMainService, SuperadminFeaturesRepository, SuperadminFeaturesListService, SuperadminFeaturesFindService, SuperadminFeaturesCreateService, SuperadminFeaturesUpdateService, SuperadminFeaturesToggleService, SuperadminFeaturesDeleteService],
  exports: [SuperadminFeaturesRepository],
})
/**
 * Primary Intent: Defines SuperadminFeaturesModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminFeaturesModule {}
