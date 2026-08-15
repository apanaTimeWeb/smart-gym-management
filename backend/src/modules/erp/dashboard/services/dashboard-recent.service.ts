import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { DashboardRepository } from '../dashboard.repository';
import { IDashboardRecent, DashboardRecentResponse } from '../dashboard.interfaces';
import { DASHBOARD_CONSTANTS } from '../dashboard.constants';

@Injectable()
export class DashboardRecentService {
  private readonly logger = new Logger(DashboardRecentService.name);

  constructor(
    private readonly repository: DashboardRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(): Promise<DashboardRecentResponse> {
    const cacheKey = DASHBOARD_CONSTANTS.CACHE_KEYS.RECENT;
    const cachedData = await this.cacheManager.get<IDashboardRecent>(cacheKey);

    if (cachedData) {
      this.logger.log('Returning Recent stats from cache');
      return { success: true, message: DASHBOARD_CONSTANTS.MESSAGES.RECENT_FETCHED, data: cachedData };
    }

    this.logger.log('Fetching Recent stats from DB');

    const [recentMembers, recentPayments, pendingPaymentsList] =
      await Promise.all([
        this.repository.getRecentMembers(),
        this.repository.getRecentPayments(),
        this.repository.getPendingPaymentsList(),
      ]);

    const data: IDashboardRecent = {
      recentMembers,
      recentPayments,
      pendingPaymentsList,
    };

    await this.cacheManager.set(
      cacheKey,
      data,
      DASHBOARD_CONSTANTS.CACHE_TTL.RECENT,
    );
    return { success: true, message: DASHBOARD_CONSTANTS.MESSAGES.RECENT_FETCHED, data };
  }
}
