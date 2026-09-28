// RESPONSIBILITY: Composes the current Trainer Dashboard frontend contract from canonical widget-level services.
// FLOW: GET /trainer/dashboard/stats → five widget services → frontend-compatible DTO.
import { Injectable } from '@nestjs/common';
import { TrainerDashboardQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_dtos/trainer-dashboard-query.dto';
import { TrainerDashboardKpisService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-kpis.service';
import { TrainerDashboardTrendService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trend.service';
import { TrainerDashboardMembershipDistributionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-membership-distribution.service';
import { TrainerDashboardUpcomingSessionsService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-upcoming-sessions.service';
import { TrainerDashboardRecentProgressService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-recent-progress.service';
import type { DashboardInterfaces } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';
/**
 * Intent: Defines the TrainerDashboardTrainerStatsCompositionService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardTrainerStatsCompositionService {
  constructor(
    private readonly kpis: TrainerDashboardKpisService,
    private readonly trend: TrainerDashboardTrendService,
    private readonly membership: TrainerDashboardMembershipDistributionService,
    private readonly upcoming: TrainerDashboardUpcomingSessionsService,
    private readonly recent: TrainerDashboardRecentProgressService,
  ) {}
  /** Composes the legacy frontend stats contract without introducing repository logic or a second query implementation. */
  /**
 * Intent: Executes the find operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes find inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for find.
 * @returns {Promise<DashboardInterfaces>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async find(query: TrainerDashboardQueryDto): Promise<DashboardInterfaces> {
    const [kpis, trend, membersByPlan, upcomingSessions, recentMemberProgress] = await Promise.all([
      this.kpis.find(),
      this.trend.find(query),
      this.membership.find(),
      this.upcoming.find(query),
      this.recent.find(),
    ]);
    return {
      ...kpis,
      goalCompletionTrend: trend.goalCompletionTrend,
      membersByPlan: membersByPlan.membersByPlan,
      upcomingSessions: upcomingSessions.upcomingSessions,
      recentMemberProgress: recentMemberProgress.recentMemberProgress,
    };
  }
}
