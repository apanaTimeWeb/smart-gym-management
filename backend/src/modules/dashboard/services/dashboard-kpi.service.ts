import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { DashboardRepository } from '../dashboard.repository';
import { IDashboardKpi } from '../dashboard.interfaces';
import { DASHBOARD_CONSTANTS } from '../dashboard.constants';

@Injectable()
export class DashboardKpiService {
  private readonly logger = new Logger(DashboardKpiService.name);

  constructor(
    private readonly repository: DashboardRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(): Promise<{ success: boolean; data: IDashboardKpi }> {
    const cacheKey = DASHBOARD_CONSTANTS.CACHE_KEYS.KPI;
    const cachedData = await this.cacheManager.get<IDashboardKpi>(cacheKey);

    if (cachedData) {
      this.logger.log('Returning KPI stats from cache');
      return { success: true, data: cachedData };
    }

    this.logger.log('Fetching KPI stats from DB');
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      memberCounts,
      newMembersThisMonth,
      revenueStats,
      staffStats,
      productStats,
      inquiryStats
    ] = await Promise.all([
      this.repository.getMemberCounts(),
      this.repository.getNewMembersThisMonth(firstDayOfMonth),
      this.repository.getRevenueStats(firstDayOfMonth),
      this.repository.getStaffStats(),
      this.repository.getProductStats(),
      this.repository.getInquiryStats()
    ]);

    const data: IDashboardKpi = {
      totalMembers: memberCounts.total,
      activeMembers: memberCounts.active,
      newMembersThisMonth,
      totalRevenue: revenueStats.totalRevenue,
      monthlyRevenue: revenueStats.monthlyRevenue,
      pendingPayments: revenueStats.pendingPayments,
      totalStaff: staffStats.total,
      activeStaff: staffStats.active,
      totalProducts: productStats.total,
      lowStockCount: productStats.lowStockCount,
      totalInquiries: inquiryStats.total,
      newInquiries: inquiryStats.newInquiries,
    };

    await this.cacheManager.set(cacheKey, data, DASHBOARD_CONSTANTS.CACHE_TTL.KPI);
    return { success: true, data };
  }
}
