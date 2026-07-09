import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { DashboardRepository } from '../dashboard.repository';
import { IDashboardCharts } from '../dashboard.interfaces';
import { DASHBOARD_CONSTANTS } from '../dashboard.constants';

@Injectable()
export class DashboardChartsService {
  private readonly logger = new Logger(DashboardChartsService.name);

  constructor(
    private readonly repository: DashboardRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(): Promise<{ success: boolean; data: IDashboardCharts }> {
    const cacheKey = DASHBOARD_CONSTANTS.CACHE_KEYS.CHARTS;
    const cachedData = await this.cacheManager.get<IDashboardCharts>(cacheKey);

    if (cachedData) {
      this.logger.log('Returning Chart stats from cache');
      return { success: true, data: cachedData };
    }

    this.logger.log('Fetching Chart stats from DB');
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - DASHBOARD_CONSTANTS.MONTHS_LOOKBACK);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const [
      recentMembersForChart,
      recentPaymentsForChart,
      membersWithPlans,
      memberCounts
    ] = await Promise.all([
      this.repository.getRecentMembersForChart(sixMonthsAgo),
      this.repository.getRecentPaymentsForChart(sixMonthsAgo),
      this.repository.getMembersWithPlans(),
      this.repository.getMemberCounts()
    ]);

    const memberGrowthMap = new Map<string, number>();
    const revenueMap = new Map<string, number>();

    for (let i = DASHBOARD_CONSTANTS.MONTHS_LOOKBACK; i >= 0; i--) {
      const d = new Date();
      d.setMonth(now.getMonth() - i);
      const mName = DASHBOARD_CONSTANTS.MONTH_NAMES[d.getMonth()];
      memberGrowthMap.set(mName, 0);
      revenueMap.set(mName, 0);
    }

    recentMembersForChart.forEach((m) => {
      const mName = DASHBOARD_CONSTANTS.MONTH_NAMES[m.joinDate.getMonth()];
      if (memberGrowthMap.has(mName)) memberGrowthMap.set(mName, memberGrowthMap.get(mName)! + 1);
    });

    recentPaymentsForChart.forEach((p) => {
      if (p.paidAt) {
        const mName = DASHBOARD_CONSTANTS.MONTH_NAMES[p.paidAt.getMonth()];
        if (revenueMap.has(mName)) revenueMap.set(mName, revenueMap.get(mName)! + p.amount);
      }
    });

    const memberGrowth = Array.from(memberGrowthMap.entries()).map(([month, count]) => ({ month, count }));
    const revenueChart = Array.from(revenueMap.entries()).map(([month, revenue]) => ({ month, revenue }));

    const planCounts = new Map<string, number>();
    membersWithPlans.forEach((m) => {
      const pName = m.plan?.name || 'Unknown';
      planCounts.set(pName, (planCounts.get(pName) || 0) + 1);
    });
    const membersByPlan = Array.from(planCounts.entries()).map(([plan, count]) => ({ plan, count }));

    const data: IDashboardCharts = {
      memberGrowth,
      revenueChart,
      membersByPlan,
      membersByStatus: { 
        active: memberCounts.active, 
        pending: memberCounts.pending, 
        expired: memberCounts.expired 
      },
    };

    await this.cacheManager.set(cacheKey, data, DASHBOARD_CONSTANTS.CACHE_TTL.CHARTS);
    return { success: true, data };
  }
}
