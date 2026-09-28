// RESPONSIBILITY: Proves the dashboard compatibility facade preserves the frozen frontend response shape.
// FLOW: Jest → TrainerDashboardTrainerStatsCompositionService → widget-service fakes → flattened frontend contract.

import { TrainerDashboardQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_dtos/trainer-dashboard-query.dto';
import { TrainerDashboardKpisService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-kpis.service';
import { TrainerDashboardTrendService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trend.service';
import { TrainerDashboardMembershipDistributionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-membership-distribution.service';
import { TrainerDashboardUpcomingSessionsService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-upcoming-sessions.service';
import { TrainerDashboardRecentProgressService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-recent-progress.service';
import { TrainerDashboardTrainerStatsCompositionService } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_services/trainer-dashboard-trainer-stats-composition.service';

describe('TrainerDashboardTrainerStatsCompositionService', () => {
  it('flattens widget service envelopes into the frozen dashboard stats shape', async () => {
    const kpisData = {
      todaysSessions: 4,
      completedSessions: 2,
      pendingSessions: 2,
      myMembersCount: 18,
      todaysAttendance: 7,
      pendingWorkoutPlans: 3,
      memberGoalCompletionRate: 72,
    };
    const trendData = { goalCompletionTrend: [{ month: 'Sep 2026', rate: 72 }] };
    const membershipData = { membersByPlan: [{ plan: 'Gold', count: 10 }] };
    const upcomingData = { upcomingSessions: [{ id: 's1', name: 'Rahul', time: '10:00', type: 'PT' }] };
    const recentData = { recentMemberProgress: [{ id: 'p1', name: 'Rahul', detail: 'Latest progress: 70 kg, BMI 24', time: '2026-09-24' }] };

    const kpis = { find: jest.fn().mockResolvedValue(kpisData) } as Pick<TrainerDashboardKpisService, 'find'>;
    const trend = { find: jest.fn().mockResolvedValue(trendData) } as Pick<TrainerDashboardTrendService, 'find'>;
    const membership = { find: jest.fn().mockResolvedValue(membershipData) } as Pick<TrainerDashboardMembershipDistributionService, 'find'>;
    const upcoming = { find: jest.fn().mockResolvedValue(upcomingData) } as Pick<TrainerDashboardUpcomingSessionsService, 'find'>;
    const recent = { find: jest.fn().mockResolvedValue(recentData) } as Pick<TrainerDashboardRecentProgressService, 'find'>;

    const service = new TrainerDashboardTrainerStatsCompositionService(
      kpis as TrainerDashboardKpisService,
      trend as TrainerDashboardTrendService,
      membership as TrainerDashboardMembershipDistributionService,
      upcoming as TrainerDashboardUpcomingSessionsService,
      recent as TrainerDashboardRecentProgressService,
    );

    const result = await service.find(new TrainerDashboardQueryDto());

    expect(result).toEqual({
      ...kpisData,
      goalCompletionTrend: trendData.goalCompletionTrend,
      membersByPlan: membershipData.membersByPlan,
      upcomingSessions: upcomingData.upcomingSessions,
      recentMemberProgress: recentData.recentMemberProgress,
    });

    expect(kpis.find).toHaveBeenCalledTimes(1);
    expect(trend.find).toHaveBeenCalledTimes(1);
    expect(membership.find).toHaveBeenCalledTimes(1);
    expect(upcoming.find).toHaveBeenCalledTimes(1);
    expect(recent.find).toHaveBeenCalledTimes(1);
  });
});
