import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { STORE_CONSTANTS } from '../store.constants';
import { StoreSummaryResponse } from '../store.interfaces';

@Injectable()
export class StoreSummaryService {
  private readonly logger = new Logger(StoreSummaryService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(): Promise<StoreSummaryResponse> {
    this.logger.log(`Fetching store summary stats`);
    const stats = await this.repository.getSummaryStats();

    return {
      success: true,
      message: STORE_CONSTANTS.SUCCESS_MESSAGES.SUMMARY_FETCHED,
      data: {
        totalProducts: stats.totalProducts,
        totalOrders: stats.totalOrders,
        totalRevenue: parseFloat(stats.totalRevenue) || 0,
        lowStockProducts: stats.lowStockProducts,
      },
    };
  }
}
