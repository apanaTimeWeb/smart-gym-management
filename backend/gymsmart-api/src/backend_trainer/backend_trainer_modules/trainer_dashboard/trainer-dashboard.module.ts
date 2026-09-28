// RESPONSIBILITY: Registers isolated Trainer Dashboard widget APIs and their micro-use-case dependencies.
// FLOW: TrainerDomainModule → TrainerDashboardModule → widget controllers/services/repositories.

import { Module } from '@nestjs/common';
import { TrainerDashboardQueryController } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_controllers/trainer-dashboard-query.controller';
import { TrainerDashboardKpisService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-kpis.service';
import { TrainerDashboardTrendService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trend.service';
import { TrainerDashboardMembershipDistributionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-membership-distribution.service';
import { TrainerDashboardUpcomingSessionsService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-upcoming-sessions.service';
import { TrainerDashboardRecentProgressService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-recent-progress.service';
import { TrainerDashboardTrainerStatsCompositionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trainer-stats-composition.service';
import { TrainerDashboardKpisRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-kpis.repository';
import { TrainerDashboardTrendRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-trend.repository';
import { TrainerDashboardMembershipDistributionRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-membership-distribution.repository';
import { TrainerDashboardUpcomingSessionsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-upcoming-sessions.repository';
import { TrainerDashboardRecentProgressRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-recent-progress.repository';


/**
 * Intent: Defines the TrainerDashboardModule boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({
  controllers: [TrainerDashboardQueryController],
  providers: [TrainerDashboardKpisService, TrainerDashboardTrendService, TrainerDashboardMembershipDistributionService, TrainerDashboardUpcomingSessionsService, TrainerDashboardRecentProgressService, TrainerDashboardKpisRepository, TrainerDashboardTrendRepository, TrainerDashboardMembershipDistributionRepository, TrainerDashboardUpcomingSessionsRepository, TrainerDashboardRecentProgressRepository, TrainerDashboardTrainerStatsCompositionService],
})
export class TrainerDashboardModule {}
